// Calendar Matching & Date Suggestion API
// Backend logic for partner calendar matching and intelligent date suggestions
import { Hono } from 'hono'
import type { Env } from '../types'

const calendarApi = new Hono<{ Bindings: Env }>()

// =============================================================================
// HELPER FUNCTIONS - CORE BACKEND LOGIC
// =============================================================================

/**
 * Find mutual free time slots between two partners
 * Analyzes both calendars and returns time slots when both are available
 */
async function findMutualFreeTime(
  env: Env,
  relationshipId: string,
  startDate: Date,
  endDate: Date,
  minDurationMinutes: number = 60
) {
  // Get both users in the relationship
  const relationship = await env.DB.prepare(`
    SELECT user_1_id, user_2_id FROM relationships WHERE id = ? AND status = 'active'
  `).bind(relationshipId).first()

  if (!relationship) {
    throw new Error('Relationship not found')
  }

  const user1Id = relationship.user_1_id as string
  const user2Id = relationship.user_2_id as string

  // Get user timezones
  const users = await env.DB.prepare(`
    SELECT id, timezone FROM users WHERE id IN (?, ?)
  `).bind(user1Id, user2Id).all()

  const user1Tz = users.results.find((u: any) => u.id === user1Id)?.timezone || 'UTC'
  const user2Tz = users.results.find((u: any) => u.id === user2Id)?.timezone || 'UTC'

  // Get scheduled activities for both users during this period
  const scheduledActivities = await env.DB.prepare(`
    SELECT planned_date, duration_minutes, created_by_user_id
    FROM activities
    WHERE relationship_id = ?
      AND status = 'planned'
      AND planned_date >= ?
      AND planned_date <= ?
    ORDER BY planned_date
  `).bind(relationshipId, startDate.toISOString(), endDate.toISOString()).all()

  // Get calendar availability for both users
  const availability = await env.DB.prepare(`
    SELECT user_id, day_of_week, start_time, end_time, specific_date, availability_type
    FROM calendar_availability
    WHERE user_id IN (?, ?)
      AND (is_recurring = TRUE OR specific_date BETWEEN ? AND ?)
    ORDER BY day_of_week, start_time
  `).bind(user1Id, user2Id, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]).all()

  // Build free time slots
  const mutualSlots: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay()
    const dateStr = currentDate.toISOString().split('T')[0]

    // Get availability for both users on this day
    const user1Availability = availability.results.filter((a: any) =>
      a.user_id === user1Id &&
      (a.day_of_week === dayOfWeek || a.specific_date === dateStr) &&
      a.availability_type === 'free'
    )

    const user2Availability = availability.results.filter((a: any) =>
      a.user_id === user2Id &&
      (a.day_of_week === dayOfWeek || a.specific_date === dateStr) &&
      a.availability_type === 'free'
    )

    // Find overlapping time slots
    for (const slot1 of user1Availability) {
      for (const slot2 of user2Availability) {
        const overlap = findTimeOverlap(
          slot1.start_time as string,
          slot1.end_time as string,
          slot2.start_time as string,
          slot2.end_time as string
        )

        if (overlap && overlap.durationMinutes >= minDurationMinutes) {
          // Check if this slot conflicts with scheduled activities
          const hasConflict = scheduledActivities.results.some((activity: any) => {
            const activityDate = new Date(activity.planned_date as string)
            const activityDateStr = activityDate.toISOString().split('T')[0]

            if (activityDateStr !== dateStr) return false

            const activityTime = activityDate.toTimeString().slice(0, 5)
            const activityEndTime = addMinutesToTime(activityTime, activity.duration_minutes || 60)

            return timeRangesOverlap(
              overlap.startTime,
              overlap.endTime,
              activityTime,
              activityEndTime
            )
          })

          if (!hasConflict) {
            mutualSlots.push({
              date: dateStr,
              startTime: overlap.startTime,
              endTime: overlap.endTime,
              durationMinutes: overlap.durationMinutes,
              startDatetime: new Date(`${dateStr}T${overlap.startTime}:00`),
              endDatetime: new Date(`${dateStr}T${overlap.endTime}:00`)
            })
          }
        }
      }
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return mutualSlots
}

/**
 * Find overlap between two time ranges
 */
function findTimeOverlap(start1: string, end1: string, start2: string, end2: string) {
  const start1Mins = timeToMinutes(start1)
  const end1Mins = timeToMinutes(end1)
  const start2Mins = timeToMinutes(start2)
  const end2Mins = timeToMinutes(end2)

  const overlapStart = Math.max(start1Mins, start2Mins)
  const overlapEnd = Math.min(end1Mins, end2Mins)

  if (overlapStart >= overlapEnd) {
    return null // No overlap
  }

  return {
    startTime: minutesToTime(overlapStart),
    endTime: minutesToTime(overlapEnd),
    durationMinutes: overlapEnd - overlapStart
  }
}

/**
 * Check if two time ranges overlap
 */
function timeRangesOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const start1Mins = timeToMinutes(start1)
  const end1Mins = timeToMinutes(end1)
  const start2Mins = timeToMinutes(start2)
  const end2Mins = timeToMinutes(end2)

  return start1Mins < end2Mins && end1Mins > start2Mins
}

/**
 * Convert time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Convert minutes since midnight to time string (HH:MM)
 */
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

/**
 * Add minutes to a time string
 */
function addMinutesToTime(time: string, minutesToAdd: number): string {
  const totalMinutes = timeToMinutes(time) + minutesToAdd
  return minutesToTime(totalMinutes)
}

/**
 * Generate date suggestions based on interests, budget, and availability
 */
async function generateDateSuggestions(
  env: Env,
  relationshipId: string,
  mutualSlots: any[],
  options: {
    maxSuggestions?: number
    budgetMin?: number
    budgetMax?: number
  } = {}
) {
  const { maxSuggestions = 10, budgetMin, budgetMax } = options

  // Get relationship details
  const relationship = await env.DB.prepare(`
    SELECT user_1_id, user_2_id FROM relationships WHERE id = ? AND status = 'active'
  `).bind(relationshipId).first()

  if (!relationship) {
    throw new Error('Relationship not found')
  }

  const user1Id = relationship.user_1_id as string
  const user2Id = relationship.user_2_id as string

  // Get both users' interests
  const interests = await env.DB.prepare(`
    SELECT user_id, category, subcategory, preference_level
    FROM user_interests
    WHERE user_id IN (?, ?)
    ORDER BY preference_level DESC
  `).bind(user1Id, user2Id).all()

  // Calculate shared interests and preference scores
  const user1Interests = interests.results.filter((i: any) => i.user_id === user1Id)
  const user2Interests = interests.results.filter((i: any) => i.user_id === user2Id)

  const sharedInterests = findSharedInterests(user1Interests, user2Interests)

  // Get budget preferences
  const budgetPref = await env.DB.prepare(`
    SELECT min_amount, max_amount FROM budget_preferences
    WHERE relationship_id = ? AND budget_type = 'per_date'
    ORDER BY created_at DESC LIMIT 1
  `).bind(relationshipId).first()

  const effectiveBudgetMin = budgetMin ?? (budgetPref?.min_amount as number) ?? 0
  const effectiveBudgetMax = budgetMax ?? (budgetPref?.max_amount as number) ?? 999999

  // Get experiences from catalog that match preferences and budget
  let experienceQuery = `
    SELECT * FROM experience_catalog
    WHERE is_active = TRUE
      AND cost_min >= ?
      AND cost_max <= ?
  `
  const experienceParams = [effectiveBudgetMin, effectiveBudgetMax]

  // Filter by shared interest categories if available
  if (sharedInterests.length > 0) {
    const categories = sharedInterests.map((i: any) => i.category)
    const placeholders = categories.map(() => '?').join(',')
    experienceQuery += ` AND experience_type IN (${placeholders})`
    experienceParams.push(...categories)
  }

  experienceQuery += ' ORDER BY rating DESC LIMIT 50'

  const experiences = await env.DB.prepare(experienceQuery)
    .bind(...experienceParams)
    .all()

  // Score and match experiences with time slots
  const suggestions: any[] = []

  for (const experience of experiences.results) {
    // Find suitable time slots for this experience
    const suitableSlots = mutualSlots.filter((slot: any) => {
      const durationMatches = slot.durationMinutes >= (experience.estimated_duration_minutes || 60)

      // Check time of day preference
      const slotHour = parseInt(slot.startTime.split(':')[0])
      let timeMatches = true

      if (experience.best_time_of_day === 'morning') timeMatches = slotHour >= 6 && slotHour < 12
      else if (experience.best_time_of_day === 'afternoon') timeMatches = slotHour >= 12 && slotHour < 17
      else if (experience.best_time_of_day === 'evening') timeMatches = slotHour >= 17 && slotHour < 21
      else if (experience.best_time_of_day === 'night') timeMatches = slotHour >= 21 || slotHour < 6

      return durationMatches && timeMatches
    })

    if (suitableSlots.length > 0) {
      // Pick the best slot (closest to ideal time for this experience)
      const bestSlot = suitableSlots[0]

      // Calculate match score based on interests alignment
      const matchScore = calculateMatchScore(
        experience,
        sharedInterests,
        user1Interests,
        user2Interests
      )

      suggestions.push({
        experienceId: experience.id,
        experienceName: experience.experience_name,
        experienceType: experience.experience_type,
        description: experience.description,
        location: experience.location,
        venueName: experience.venue_name,
        suggestedDate: bestSlot.startDatetime.toISOString(),
        suggestedDuration: experience.estimated_duration_minutes || 120,
        estimatedCost: ((experience.cost_min as number) + (experience.cost_max as number)) / 2,
        rating: experience.rating,
        matchScore,
        suggestionReason: generateSuggestionReason(experience, sharedInterests, matchScore),
        requiresBooking: experience.requires_booking,
        bookingUrl: experience.booking_url,
        bookingLeadTime: experience.booking_lead_time_days || 0
      })
    }

    if (suggestions.length >= maxSuggestions) break
  }

  // Sort by match score
  suggestions.sort((a, b) => b.matchScore - a.matchScore)

  return suggestions.slice(0, maxSuggestions)
}

/**
 * Find shared interests between two users
 */
function findSharedInterests(user1Interests: any[], user2Interests: any[]) {
  const shared: any[] = []

  for (const interest1 of user1Interests) {
    const matchingInterest = user2Interests.find(
      (i: any) => i.category === interest1.category
    )

    if (matchingInterest) {
      shared.push({
        category: interest1.category,
        avgPreference: (interest1.preference_level + matchingInterest.preference_level) / 2
      })
    }
  }

  return shared.sort((a, b) => b.avgPreference - a.avgPreference)
}

/**
 * Calculate match score for an experience
 */
function calculateMatchScore(
  experience: any,
  sharedInterests: any[],
  user1Interests: any[],
  user2Interests: any[]
): number {
  let score = 0.5 // Base score

  // Boost for shared interests
  const sharedMatch = sharedInterests.find((i: any) => i.category === experience.experience_type)
  if (sharedMatch) {
    score += (sharedMatch.avgPreference / 10) * 0.3 // Up to +0.3
  }

  // Partial boost if either user is interested
  const user1Match = user1Interests.find((i: any) => i.category === experience.experience_type)
  const user2Match = user2Interests.find((i: any) => i.category === experience.experience_type)

  if (user1Match || user2Match) {
    const maxPreference = Math.max(
      user1Match?.preference_level || 0,
      user2Match?.preference_level || 0
    )
    score += (maxPreference / 10) * 0.15 // Up to +0.15
  }

  // Boost for high ratings
  if (experience.rating) {
    score += (experience.rating / 5) * 0.05 // Up to +0.05
  }

  return Math.min(score, 1.0) // Cap at 1.0
}

/**
 * Generate human-readable suggestion reason
 */
function generateSuggestionReason(experience: any, sharedInterests: any[], matchScore: number): string {
  const reasons: string[] = []

  const sharedMatch = sharedInterests.find((i: any) => i.category === experience.experience_type)
  if (sharedMatch) {
    reasons.push(`Both of you love ${experience.experience_type} activities`)
  }

  if (experience.rating >= 4.5) {
    reasons.push(`Highly rated (${experience.rating}⭐)`)
  }

  if (matchScore > 0.8) {
    reasons.push('Perfect match for your interests')
  } else if (matchScore > 0.6) {
    reasons.push('Great match for your preferences')
  }

  return reasons.join(' • ') || 'Recommended experience for couples'
}

// =============================================================================
// API ENDPOINTS
// =============================================================================

/**
 * Find available time slots for both partners
 * POST /api/calendar/find-mutual-slots
 */
calendarApi.post('/find-mutual-slots', async (c) => {
  try {
    const { relationship_id, start_date, end_date, min_duration_minutes } = await c.req.json()

    if (!relationship_id || !start_date || !end_date) {
      return c.json({ error: 'relationship_id, start_date, and end_date are required' }, 400)
    }

    const startDate = new Date(start_date)
    const endDate = new Date(end_date)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return c.json({ error: 'Invalid date format' }, 400)
    }

    const mutualSlots = await findMutualFreeTime(
      c.env,
      relationship_id,
      startDate,
      endDate,
      min_duration_minutes || 60
    )

    return c.json({
      relationship_id,
      date_range: { start: start_date, end: end_date },
      mutual_free_slots: mutualSlots,
      total_slots: mutualSlots.length
    })
  } catch (error) {
    console.error('Find mutual slots error:', error)
    return c.json({ error: 'Failed to find mutual free time slots' }, 500)
  }
})

/**
 * Generate date suggestions based on availability, interests, and budget
 * POST /api/calendar/generate-suggestions
 */
calendarApi.post('/generate-suggestions', async (c) => {
  try {
    const {
      relationship_id,
      start_date,
      end_date,
      min_duration_minutes,
      budget_min,
      budget_max,
      max_suggestions
    } = await c.req.json()

    if (!relationship_id || !start_date || !end_date) {
      return c.json({ error: 'relationship_id, start_date, and end_date are required' }, 400)
    }

    const startDate = new Date(start_date)
    const endDate = new Date(end_date)

    // First, find mutual free time
    const mutualSlots = await findMutualFreeTime(
      c.env,
      relationship_id,
      startDate,
      endDate,
      min_duration_minutes || 60
    )

    if (mutualSlots.length === 0) {
      return c.json({
        relationship_id,
        suggestions: [],
        message: 'No mutual free time found in the specified date range'
      })
    }

    // Generate suggestions
    const suggestions = await generateDateSuggestions(
      c.env,
      relationship_id,
      mutualSlots,
      {
        maxSuggestions: max_suggestions || 10,
        budgetMin: budget_min,
        budgetMax: budget_max
      }
    )

    // Save suggestions to database
    for (const suggestion of suggestions) {
      const suggestionId = generateId()
      const now = new Date().toISOString()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days

      await c.env.DB.prepare(`
        INSERT INTO date_suggestions (
          id, relationship_id, experience_id, suggested_date, suggested_duration_minutes,
          estimated_cost, suggestion_reason, match_score, status, expires_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)
      `).bind(
        suggestionId,
        relationship_id,
        suggestion.experienceId,
        suggestion.suggestedDate,
        suggestion.suggestedDuration,
        suggestion.estimatedCost,
        suggestion.suggestionReason,
        suggestion.matchScore,
        expiresAt,
        now,
        now
      ).run()

      suggestion.suggestionId = suggestionId
    }

    return c.json({
      relationship_id,
      date_range: { start: start_date, end: end_date },
      suggestions,
      total_suggestions: suggestions.length,
      mutual_slots_found: mutualSlots.length
    })
  } catch (error) {
    console.error('Generate suggestions error:', error)
    return c.json({ error: 'Failed to generate date suggestions' }, 500)
  }
})

/**
 * Save user's calendar availability
 * POST /api/calendar/availability
 */
calendarApi.post('/availability', async (c) => {
  try {
    const {
      user_id,
      day_of_week,
      start_time,
      end_time,
      is_recurring,
      specific_date,
      availability_type
    } = await c.req.json()

    if (!user_id || start_time === undefined || end_time === undefined) {
      return c.json({ error: 'user_id, start_time, and end_time are required' }, 400)
    }

    const availabilityId = generateId()
    const now = new Date().toISOString()

    await c.env.DB.prepare(`
      INSERT INTO calendar_availability (
        id, user_id, day_of_week, start_time, end_time, is_recurring, specific_date, availability_type, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      availabilityId,
      user_id,
      day_of_week || 0,
      start_time,
      end_time,
      is_recurring !== false,
      specific_date || null,
      availability_type || 'free',
      now,
      now
    ).run()

    return c.json({
      id: availabilityId,
      message: 'Availability saved successfully'
    }, 201)
  } catch (error) {
    console.error('Save availability error:', error)
    return c.json({ error: 'Failed to save availability' }, 500)
  }
})

/**
 * Get user's calendar availability
 * GET /api/calendar/availability/:userId
 */
calendarApi.get('/availability/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')

    const availability = await c.env.DB.prepare(`
      SELECT * FROM calendar_availability
      WHERE user_id = ?
      ORDER BY day_of_week, start_time
    `).bind(userId).all()

    return c.json({
      user_id: userId,
      availability: availability.results
    })
  } catch (error) {
    console.error('Get availability error:', error)
    return c.json({ error: 'Failed to get availability' }, 500)
  }
})

/**
 * Save user interests
 * POST /api/calendar/interests
 */
calendarApi.post('/interests', async (c) => {
  try {
    const { user_id, category, subcategory, preference_level } = await c.req.json()

    if (!user_id || !category) {
      return c.json({ error: 'user_id and category are required' }, 400)
    }

    const interestId = generateId()
    const now = new Date().toISOString()

    await c.env.DB.prepare(`
      INSERT INTO user_interests (id, user_id, category, subcategory, preference_level, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      interestId,
      user_id,
      category,
      subcategory || null,
      preference_level || 5,
      now,
      now
    ).run()

    return c.json({
      id: interestId,
      message: 'Interest saved successfully'
    }, 201)
  } catch (error) {
    console.error('Save interest error:', error)
    return c.json({ error: 'Failed to save interest' }, 500)
  }
})

/**
 * Get user interests
 * GET /api/calendar/interests/:userId
 */
calendarApi.get('/interests/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')

    const interests = await c.env.DB.prepare(`
      SELECT * FROM user_interests
      WHERE user_id = ?
      ORDER BY preference_level DESC
    `).bind(userId).all()

    return c.json({
      user_id: userId,
      interests: interests.results
    })
  } catch (error) {
    console.error('Get interests error:', error)
    return c.json({ error: 'Failed to get interests' }, 500)
  }
})

/**
 * Save budget preferences
 * POST /api/calendar/budget-preferences
 */
calendarApi.post('/budget-preferences', async (c) => {
  try {
    const { relationship_id, budget_type, min_amount, max_amount, preferences_note } = await c.req.json()

    if (!relationship_id || !budget_type) {
      return c.json({ error: 'relationship_id and budget_type are required' }, 400)
    }

    const budgetId = generateId()
    const now = new Date().toISOString()

    // Delete existing budget preference of same type
    await c.env.DB.prepare(`
      DELETE FROM budget_preferences
      WHERE relationship_id = ? AND budget_type = ?
    `).bind(relationship_id, budget_type).run()

    await c.env.DB.prepare(`
      INSERT INTO budget_preferences (id, relationship_id, budget_type, min_amount, max_amount, preferences_note, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      budgetId,
      relationship_id,
      budget_type,
      min_amount || null,
      max_amount || null,
      preferences_note || null,
      now,
      now
    ).run()

    return c.json({
      id: budgetId,
      message: 'Budget preferences saved successfully'
    }, 201)
  } catch (error) {
    console.error('Save budget preferences error:', error)
    return c.json({ error: 'Failed to save budget preferences' }, 500)
  }
})

/**
 * Get budget preferences
 * GET /api/calendar/budget-preferences/:relationshipId
 */
calendarApi.get('/budget-preferences/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')

    const budgets = await c.env.DB.prepare(`
      SELECT * FROM budget_preferences
      WHERE relationship_id = ?
      ORDER BY created_at DESC
    `).bind(relationshipId).all()

    return c.json({
      relationship_id: relationshipId,
      budget_preferences: budgets.results
    })
  } catch (error) {
    console.error('Get budget preferences error:', error)
    return c.json({ error: 'Failed to get budget preferences' }, 500)
  }
})

/**
 * Get date suggestions for a relationship
 * GET /api/calendar/suggestions/:relationshipId
 */
calendarApi.get('/suggestions/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const status = c.req.query('status') || 'pending'

    const suggestions = await c.env.DB.prepare(`
      SELECT ds.*, ec.experience_name, ec.description, ec.location, ec.venue_name, ec.rating
      FROM date_suggestions ds
      LEFT JOIN experience_catalog ec ON ds.experience_id = ec.id
      WHERE ds.relationship_id = ?
        AND ds.status = ?
        AND (ds.expires_at IS NULL OR ds.expires_at > datetime('now'))
      ORDER BY ds.match_score DESC, ds.suggested_date ASC
    `).bind(relationshipId, status).all()

    return c.json({
      relationship_id: relationshipId,
      suggestions: suggestions.results
    })
  } catch (error) {
    console.error('Get suggestions error:', error)
    return c.json({ error: 'Failed to get suggestions' }, 500)
  }
})

/**
 * Accept/Reject a date suggestion
 * PUT /api/calendar/suggestions/:suggestionId
 */
calendarApi.put('/suggestions/:suggestionId', async (c) => {
  try {
    const suggestionId = c.req.param('suggestionId')
    const { user_id, status } = await c.req.json()

    if (!user_id || !status) {
      return c.json({ error: 'user_id and status are required' }, 400)
    }

    // Get the suggestion and relationship
    const suggestion = await c.env.DB.prepare(`
      SELECT ds.*, r.user_1_id, r.user_2_id
      FROM date_suggestions ds
      JOIN relationships r ON ds.relationship_id = r.id
      WHERE ds.id = ?
    `).bind(suggestionId).first()

    if (!suggestion) {
      return c.json({ error: 'Suggestion not found' }, 404)
    }

    // Determine which user is accepting
    const isUser1 = suggestion.user_1_id === user_id
    const isUser2 = suggestion.user_2_id === user_id

    if (!isUser1 && !isUser2) {
      return c.json({ error: 'User not part of this relationship' }, 403)
    }

    const now = new Date().toISOString()

    if (status === 'rejected') {
      // Either partner can reject
      await c.env.DB.prepare(`
        UPDATE date_suggestions
        SET status = 'rejected', updated_at = ?
        WHERE id = ?
      `).bind(now, suggestionId).run()

      return c.json({ message: 'Suggestion rejected' })
    }

    if (status === 'accepted') {
      // Update acceptance status
      const acceptanceField = isUser1 ? 'accepted_by_user_1' : 'accepted_by_user_2'

      await c.env.DB.prepare(`
        UPDATE date_suggestions
        SET ${acceptanceField} = TRUE, updated_at = ?
        WHERE id = ?
      `).bind(now, suggestionId).run()

      // Check if both have accepted
      const updated = await c.env.DB.prepare(`
        SELECT * FROM date_suggestions WHERE id = ?
      `).bind(suggestionId).first()

      if (updated.accepted_by_user_1 && updated.accepted_by_user_2) {
        // Both accepted - create activity and mark as scheduled
        const activityId = generateId()

        await c.env.DB.prepare(`
          INSERT INTO activities (
            id, relationship_id, activity_name, activity_type, description, location,
            planned_date, duration_minutes, cost_amount, status, created_by_user_id, created_at, updated_at
          )
          SELECT ?, ds.relationship_id, ec.experience_name, ec.experience_type, ec.description, ec.location,
                 ds.suggested_date, ds.suggested_duration_minutes, ds.estimated_cost, 'planned', ?, ?, ?
          FROM date_suggestions ds
          LEFT JOIN experience_catalog ec ON ds.experience_id = ec.id
          WHERE ds.id = ?
        `).bind(activityId, user_id, now, now, suggestionId).run()

        await c.env.DB.prepare(`
          UPDATE date_suggestions
          SET status = 'scheduled', activity_id = ?, updated_at = ?
          WHERE id = ?
        `).bind(activityId, now, suggestionId).run()

        return c.json({
          message: 'Suggestion accepted by both partners and scheduled!',
          activity_id: activityId
        })
      }

      return c.json({
        message: 'Suggestion accepted. Waiting for partner approval.',
        needs_partner_approval: true
      })
    }

    return c.json({ error: 'Invalid status' }, 400)
  } catch (error) {
    console.error('Update suggestion error:', error)
    return c.json({ error: 'Failed to update suggestion' }, 500)
  }
})

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export default calendarApi
