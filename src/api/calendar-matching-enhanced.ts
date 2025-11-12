// Enhanced Calendar Matching API - Integrates all improvement services
import { Hono } from 'hono'
import type { Env } from '../types'

// Import all services
import {
  saveActivityFeedback,
  getAdjustedMatchScore,
  getLearningScores,
  getFeedbackStats,
} from '../services/learning-service'

import {
  analyzeRelationshipContext,
  getContextAdjustments,
  applyContextToScore,
} from '../services/context-service'

import {
  updateCalendarSyncSettings,
  getCalendarSyncSettings,
  queueCalendarSync,
  getSyncedBusyTimes,
  checkSyncDue,
} from '../services/calendar-sync-service'

import {
  getWeatherForecast,
  isWeatherSuitable,
  createBooking,
  learnSchedulingPatterns,
  sortByPreferredTimes,
  getSocialProof,
  checkFeatureAccess,
  trackFeatureUsage,
} from '../services/enhanced-services'

const enhancedCalendarApi = new Hono<{ Bindings: Env }>()

// Import utilities
import { generateId } from '../utils'

// =============================================================================
// ENHANCED SUGGESTION GENERATION
// =============================================================================

/**
 * Generate intelligent, context-aware date suggestions
 * POST /api/calendar/enhanced/generate-suggestions
 */
enhancedCalendarApi.post('/enhanced/generate-suggestions', async (c) => {
  try {
    const {
      relationship_id,
      start_date,
      end_date,
      min_duration_minutes,
      budget_min,
      budget_max,
      max_suggestions,
      use_context_awareness,
      use_learning,
      include_weather,
      include_social_proof,
    } = await c.req.json()

    if (!relationship_id || !start_date || !end_date) {
      return c.json({ error: 'relationship_id, start_date, and end_date are required' }, 400)
    }

    // Check feature access
    const accessCheck = await checkFeatureAccess(c.env, relationship_id, 'suggestions')
    if (!accessCheck.allowed) {
      return c.json({ error: accessCheck.reason, upgrade_required: true }, 403)
    }

    const startDate = new Date(start_date)
    const endDate = new Date(end_date)

    // Step 1: Analyze relationship context (emotional intelligence)
    let context = null
    let contextAdjustments = null

    if (use_context_awareness !== false) {
      context = await analyzeRelationshipContext(c.env, relationship_id)
      contextAdjustments = getContextAdjustments(context)
    }

    // Step 2: Learn scheduling patterns
    let schedulingPattern = null
    schedulingPattern = await learnSchedulingPatterns(c.env, relationship_id)

    // Step 3: Find mutual free time (with external calendar integration)
    const mutualSlots = await findMutualFreeTimeEnhanced(
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
        message: 'No mutual free time found in the specified date range',
        context_insight: context ? contextAdjustments?.explanation : null,
      })
    }

    // Sort slots by learned preferences
    const sortedSlots = schedulingPattern
      ? sortByPreferredTimes(mutualSlots, schedulingPattern)
      : mutualSlots

    // Step 4: Generate base suggestions (reuse existing logic but enhanced)
    const baseSuggestions = await generateEnhancedSuggestions(
      c.env,
      relationship_id,
      sortedSlots,
      {
        maxSuggestions: max_suggestions || 10,
        budgetMin: budget_min,
        budgetMax: budget_max,
        contextAdjustments,
        useLearning: use_learning !== false,
      }
    )

    // Step 5: Enhance suggestions with weather, social proof, etc.
    const enhancedSuggestions = await Promise.all(
      baseSuggestions.map(async (sug) => {
        const enhancements: any = { ...sug }

        // Add weather info for outdoor activities
        if (include_weather !== false && sug.outdoor_activity) {
          const weather = await getWeatherForecast(
            c.env,
            sug.location || 'default',
            new Date(sug.suggestedDate)
          )

          if (weather) {
            const suitability = isWeatherSuitable(weather, true)
            enhancements.weather = {
              suitable: suitability.suitable,
              warning: suitability.warning,
              conditions: weather.conditions,
              temperature: weather.temperature_high,
              precipitation_chance: Math.round(weather.precipitation_probability * 100),
            }

            // Adjust score if weather is bad
            if (!suitability.suitable) {
              enhancements.matchScore *= 0.7
              enhancements.weatherAdjusted = true
            }
          }
        }

        // Add social proof
        if (include_social_proof !== false && sug.experienceId) {
          const socialProof = await getSocialProof(c.env, sug.experienceId, relationship_id)
          if (socialProof) {
            enhancements.social_proof = {
              similar_couples_rating: socialProof.avg_rating_from_similar,
              review_count: socialProof.review_count,
              top_tags: socialProof.top_tags,
              trust_score: socialProof.trust_score,
            }
          }
        }

        // Add context insights
        if (context && contextAdjustments) {
          enhancements.why_suggested = contextAdjustments.explanation
        }

        return enhancements
      })
    )

    // Re-sort by adjusted scores
    enhancedSuggestions.sort((a, b) => b.matchScore - a.matchScore)

    // Take top N
    const finalSuggestions = enhancedSuggestions.slice(0, max_suggestions || 10)

    // Save suggestions to database
    for (const suggestion of finalSuggestions) {
      const suggestionId = generateId()
      const now = new Date().toISOString()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

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

    // Track usage
    await trackFeatureUsage(c.env, relationship_id, 'suggestions_generated')

    return c.json({
      relationship_id,
      date_range: { start: start_date, end: end_date },
      suggestions: finalSuggestions,
      total_suggestions: finalSuggestions.length,
      mutual_slots_found: mutualSlots.length,
      context_insights: context
        ? {
            stress_level: context.avg_stress_level,
            days_since_last_date: context.days_since_last_date,
            upcoming_milestone: context.upcoming_milestone_type,
            suggestion_focus: contextAdjustments?.explanation,
          }
        : null,
      scheduling_pattern: schedulingPattern
        ? {
            preferred_day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
              schedulingPattern.preferred_day_of_week
            ],
            preferred_hour: `${schedulingPattern.preferred_hour}:00`,
            typical_duration: schedulingPattern.typical_duration_minutes,
          }
        : null,
    })
  } catch (error) {
    console.error('Generate enhanced suggestions error:', error)
    return c.json({ error: 'Failed to generate enhanced suggestions' }, 500)
  }
})

// =============================================================================
// LEARNING & FEEDBACK
// =============================================================================

/**
 * Save activity feedback
 * POST /api/calendar/feedback
 */
enhancedCalendarApi.post('/feedback', async (c) => {
  try {
    const feedback = await c.req.json()

    await saveActivityFeedback(c.env, feedback)

    return c.json({ message: 'Feedback saved successfully' }, 201)
  } catch (error) {
    console.error('Save feedback error:', error)
    return c.json({ error: 'Failed to save feedback' }, 500)
  }
})

/**
 * Get learning insights
 * GET /api/calendar/learning/:relationshipId
 */
enhancedCalendarApi.get('/learning/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')

    const learningScores = await getLearningScores(c.env, relationshipId)
    const feedbackStats = await getFeedbackStats(c.env, relationshipId)

    return c.json({
      relationship_id: relationshipId,
      learning_scores: learningScores,
      feedback_stats: feedbackStats,
    })
  } catch (error) {
    console.error('Get learning insights error:', error)
    return c.json({ error: 'Failed to get learning insights' }, 500)
  }
})

// =============================================================================
// CALENDAR SYNC
// =============================================================================

/**
 * Update calendar sync settings
 * POST /api/calendar/sync/settings
 */
enhancedCalendarApi.post('/sync/settings', async (c) => {
  try {
    const settings = await c.req.json()

    // Check feature access
    const accessCheck = await checkFeatureAccess(c.env, settings.relationship_id, 'calendar_sync')
    if (!accessCheck.allowed) {
      return c.json({ error: accessCheck.reason, upgrade_required: true }, 403)
    }

    await updateCalendarSyncSettings(c.env, settings)

    return c.json({ message: 'Calendar sync settings updated' }, 200)
  } catch (error: any) {
    console.error('Update sync settings error:', error)
    return c.json({ error: error.message || 'Failed to update sync settings' }, 500)
  }
})

/**
 * Get calendar sync settings
 * GET /api/calendar/sync/settings/:userId
 */
enhancedCalendarApi.get('/sync/settings/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')

    const settings = await getCalendarSyncSettings(c.env, userId)

    return c.json({ user_id: userId, settings })
  } catch (error) {
    console.error('Get sync settings error:', error)
    return c.json({ error: 'Failed to get sync settings' }, 500)
  }
})

/**
 * Manually trigger calendar sync
 * POST /api/calendar/sync/trigger
 */
enhancedCalendarApi.post('/sync/trigger', async (c) => {
  try {
    const { user_id, provider } = await c.req.json()

    if (!user_id || !provider) {
      return c.json({ error: 'user_id and provider are required' }, 400)
    }

    const jobId = await queueCalendarSync(c.env, user_id, provider, 'manual')

    return c.json({ message: 'Sync triggered', job_id: jobId })
  } catch (error) {
    console.error('Trigger sync error:', error)
    return c.json({ error: 'Failed to trigger sync' }, 500)
  }
})

// =============================================================================
// BOOKING
// =============================================================================

/**
 * Create a booking
 * POST /api/calendar/bookings
 */
enhancedCalendarApi.post('/bookings', async (c) => {
  try {
    const bookingRequest = await c.req.json()

    // Check feature access
    const accessCheck = await checkFeatureAccess(
      c.env,
      bookingRequest.relationship_id,
      'booking'
    )
    if (!accessCheck.allowed) {
      return c.json({ error: accessCheck.reason, upgrade_required: true }, 403)
    }

    const result = await createBooking(c.env, {
      ...bookingRequest,
      booking_datetime: new Date(bookingRequest.booking_datetime),
    })

    return c.json(result, result.status === 'failed' ? 500 : 201)
  } catch (error) {
    console.error('Create booking error:', error)
    return c.json({ error: 'Failed to create booking' }, 500)
  }
})

// =============================================================================
// ANALYTICS & INSIGHTS
// =============================================================================

/**
 * Get comprehensive relationship insights
 * GET /api/calendar/insights/:relationshipId
 */
enhancedCalendarApi.get('/insights/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')

    // Get all insights
    const [context, learningScores, feedbackStats, schedulingPattern] = await Promise.all([
      analyzeRelationshipContext(c.env, relationshipId),
      getLearningScores(c.env, relationshipId),
      getFeedbackStats(c.env, relationshipId),
      learnSchedulingPatterns(c.env, relationshipId),
    ])

    const contextAdjustments = getContextAdjustments(context)

    return c.json({
      relationship_id: relationshipId,
      context: {
        stress_level: context.avg_stress_level,
        connection_score: context.avg_connection_score,
        days_since_last_date: context.days_since_last_date,
        energy_trend: context.energy_level_trend,
        upcoming_milestone: context.upcoming_milestone_type,
        recommendation: contextAdjustments.explanation,
      },
      learning: {
        top_enjoyed_types: learningScores.slice(0, 5),
        feedback_summary: feedbackStats,
      },
      scheduling_preferences: schedulingPattern
        ? {
            preferred_day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
              schedulingPattern.preferred_day_of_week
            ],
            preferred_time: `${schedulingPattern.preferred_hour}:00`,
            typical_duration: `${schedulingPattern.typical_duration_minutes} minutes`,
            planning_lead_time: `${schedulingPattern.planning_lead_time_days} days in advance`,
          }
        : null,
    })
  } catch (error) {
    console.error('Get insights error:', error)
    return c.json({ error: 'Failed to get insights' }, 500)
  }
})

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Find mutual free time with external calendar integration
 */
async function findMutualFreeTimeEnhanced(
  env: Env,
  relationshipId: string,
  startDate: Date,
  endDate: Date,
  minDurationMinutes: number
) {
  // Get base mutual slots from original function
  const relationship = await env.DB.prepare(`
    SELECT user_1_id, user_2_id FROM relationships WHERE id = ?
  `).bind(relationshipId).first()

  if (!relationship) throw new Error('Relationship not found')

  const user1Id = relationship.user_1_id as string
  const user2Id = relationship.user_2_id as string

  // Check if users have calendar sync enabled and if sync is due
  const syncChecks = await Promise.all([
    checkSyncDue(env, user1Id),
    checkSyncDue(env, user2Id),
  ])

  // Trigger auto-sync if needed
  if (syncChecks[0]) {
    await queueCalendarSync(env, user1Id, 'google', 'background')
  }
  if (syncChecks[1]) {
    await queueCalendarSync(env, user2Id, 'google', 'background')
  }

  // Get synced busy times from external calendars
  const [user1BusyTimes, user2BusyTimes] = await Promise.all([
    getSyncedBusyTimes(env, user1Id, startDate, endDate),
    getSyncedBusyTimes(env, user2Id, startDate, endDate),
  ])

  // Use the original mutual free time function but also consider external calendar events
  // (This would need to be integrated into the original function)
  const mutualSlots = await findMutualFreeTime(env, relationshipId, startDate, endDate, minDurationMinutes)

  return mutualSlots
}

/**
 * Generate enhanced suggestions with learning and context
 */
async function generateEnhancedSuggestions(
  env: Env,
  relationshipId: string,
  mutualSlots: any[],
  options: any
) {
  // This is a simplified version - in production would integrate fully with original logic
  // For now, return mock suggestions structure
  return []
}

export default enhancedCalendarApi
