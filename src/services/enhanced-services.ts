// Enhanced Services - Weather, Booking, Predictive Scheduling, Social Proof
import type { Env } from '../types'

// =============================================================================
// WEATHER SERVICE
// =============================================================================

export interface WeatherForecast {
  location: string
  date: Date
  temperature_high: number
  temperature_low: number
  precipitation_probability: number
  conditions: string
  wind_speed: number
}

/**
 * Get weather forecast for a location and date
 * Uses caching to avoid excessive API calls
 */
export async function getWeatherForecast(
  env: Env,
  location: string,
  date: Date
): Promise<WeatherForecast | null> {
  const dateStr = date.toISOString().split('T')[0]

  // Check cache first
  const cached = await env.DB.prepare(`
    SELECT * FROM weather_cache
    WHERE location = ? AND forecast_date = ?
      AND expires_at > datetime('now')
  `).bind(location, dateStr).first()

  if (cached) {
    return {
      location: cached.location as string,
      date: new Date(cached.forecast_date as string),
      temperature_high: cached.temperature_high as number,
      temperature_low: cached.temperature_low as number,
      precipitation_probability: cached.precipitation_probability as number,
      conditions: cached.conditions as string,
      wind_speed: cached.wind_speed as number,
    }
  }

  // Fetch from weather API (mock implementation)
  const forecast = await fetchWeatherAPI(location, date)

  if (forecast) {
    // Cache for 6 hours
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 6 * 60 * 60 * 1000)

    await env.DB.prepare(`
      INSERT INTO weather_cache (
        id, location, forecast_date, temperature_high, temperature_low,
        precipitation_probability, conditions, wind_speed, cached_at, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(location, forecast_date) DO UPDATE SET
        temperature_high = excluded.temperature_high,
        temperature_low = excluded.temperature_low,
        precipitation_probability = excluded.precipitation_probability,
        conditions = excluded.conditions,
        wind_speed = excluded.wind_speed,
        cached_at = excluded.cached_at,
        expires_at = excluded.expires_at
    `).bind(
      generateId(),
      location,
      dateStr,
      forecast.temperature_high,
      forecast.temperature_low,
      forecast.precipitation_probability,
      forecast.conditions,
      forecast.wind_speed,
      now.toISOString(),
      expiresAt.toISOString()
    ).run()
  }

  return forecast
}

/**
 * Check if weather is suitable for outdoor activity
 */
export function isWeatherSuitable(
  forecast: WeatherForecast,
  outdoorActivity: boolean
): { suitable: boolean; warning?: string } {
  if (!outdoorActivity) {
    return { suitable: true }
  }

  // High chance of rain
  if (forecast.precipitation_probability > 0.5) {
    return {
      suitable: false,
      warning: `${Math.round(forecast.precipitation_probability * 100)}% chance of rain`,
    }
  }

  // Very hot or very cold
  if (forecast.temperature_high > 95) {
    return { suitable: false, warning: 'Very hot weather - consider indoor alternative' }
  }
  if (forecast.temperature_high < 32) {
    return { suitable: false, warning: 'Freezing weather - consider indoor alternative' }
  }

  // High winds
  if (forecast.wind_speed > 25) {
    return { suitable: false, warning: 'High winds expected' }
  }

  // Mild warning for moderate rain chance
  if (forecast.precipitation_probability > 0.3) {
    return {
      suitable: true,
      warning: `${Math.round(forecast.precipitation_probability * 100)}% chance of rain - bring umbrella`,
    }
  }

  return { suitable: true }
}

async function fetchWeatherAPI(location: string, date: Date): Promise<WeatherForecast | null> {
  // Mock implementation
  // In production, integrate with OpenWeatherMap, Weather.gov, or similar
  // Example: https://api.openweathermap.org/data/2.5/forecast

  console.log(`[Mock] Fetching weather for ${location} on ${date.toISOString().split('T')[0]}`)

  // Return mock data for now
  return {
    location,
    date,
    temperature_high: 72,
    temperature_low: 58,
    precipitation_probability: 0.1,
    conditions: 'partly_cloudy',
    wind_speed: 8,
  }
}

// =============================================================================
// BOOKING SERVICE
// =============================================================================

export interface BookingRequest {
  relationship_id: string
  suggestion_id?: string
  partner_business_id?: string
  booking_datetime: Date
  party_size: number
  special_requests?: string
}

export interface BookingResult {
  booking_id: string
  status: 'confirmed' | 'pending' | 'failed'
  confirmation_code?: string
  error?: string
}

/**
 * Create a booking with a partner business
 */
export async function createBooking(
  env: Env,
  request: BookingRequest
): Promise<BookingResult> {
  const bookingId = generateId()
  const now = new Date().toISOString()

  try {
    // Get partner business details
    let partnerBusiness = null
    if (request.partner_business_id) {
      partnerBusiness = await env.DB.prepare(`
        SELECT * FROM partner_businesses
        WHERE id = ? AND is_active = TRUE AND booking_enabled = TRUE
      `).bind(request.partner_business_id).first()

      if (!partnerBusiness) {
        throw new Error('Partner business not available for booking')
      }
    }

    // Mock booking with external API
    const externalBooking = partnerBusiness
      ? await bookWithPartnerAPI(partnerBusiness, request)
      : null

    const status = externalBooking?.confirmed ? 'confirmed' : 'pending'
    const confirmationCode = externalBooking?.confirmation_code

    // Save booking
    await env.DB.prepare(`
      INSERT INTO bookings (
        id, relationship_id, suggestion_id, partner_business_id,
        booking_type, external_booking_id, booking_status, booking_datetime,
        party_size, special_requests, confirmation_code, booked_at
      ) VALUES (?, ?, ?, ?, 'reservation', ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      bookingId,
      request.relationship_id,
      request.suggestion_id || null,
      request.partner_business_id || null,
      externalBooking?.external_id || null,
      status,
      request.booking_datetime.toISOString(),
      request.party_size,
      request.special_requests || null,
      confirmationCode || null,
      now
    ).run()

    return {
      booking_id: bookingId,
      status: status as 'confirmed' | 'pending',
      confirmation_code: confirmationCode,
    }
  } catch (error: any) {
    // Save failed booking
    await env.DB.prepare(`
      INSERT INTO bookings (
        id, relationship_id, suggestion_id, booking_status,
        booking_datetime, party_size, booked_at
      ) VALUES (?, ?, ?, 'cancelled', ?, ?, ?)
    `).bind(
      bookingId,
      request.relationship_id,
      request.suggestion_id || null,
      request.booking_datetime.toISOString(),
      request.party_size,
      now
    ).run()

    return {
      booking_id: bookingId,
      status: 'failed',
      error: error.message,
    }
  }
}

async function bookWithPartnerAPI(
  business: any,
  request: BookingRequest
): Promise<any> {
  // Mock implementation
  // In production, integrate with:
  // - OpenTable API
  // - Resy API
  // - Custom partner APIs

  console.log(`[Mock] Booking with ${business.business_name}`)

  return {
    confirmed: true,
    external_id: `ext-${generateId()}`,
    confirmation_code: generateConfirmationCode(),
  }
}

function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

// =============================================================================
// PREDICTIVE SCHEDULING SERVICE
// =============================================================================

export interface SchedulingPattern {
  preferred_day_of_week: number
  preferred_hour: number
  typical_duration_minutes: number
  planning_lead_time_days: number
  time_of_day_distribution: {
    morning: number
    afternoon: number
    evening: number
    night: number
  }
}

/**
 * Learn scheduling patterns from past activities
 */
export async function learnSchedulingPatterns(
  env: Env,
  relationshipId: string
): Promise<SchedulingPattern | null> {
  // Get last 20 completed activities
  const activities = await env.DB.prepare(`
    SELECT
      planned_date,
      completed_date,
      duration_minutes,
      created_at
    FROM activities
    WHERE relationship_id = ?
      AND status = 'completed'
      AND planned_date IS NOT NULL
    ORDER BY completed_date DESC
    LIMIT 20
  `).bind(relationshipId).all()

  if (activities.results.length < 3) {
    return null // Not enough data
  }

  // Analyze patterns
  const dayOfWeekCounts = new Array(7).fill(0)
  const hourCounts = new Array(24).fill(0)
  const durations: number[] = []
  const leadTimes: number[] = []
  const timeOfDayCounts = { morning: 0, afternoon: 0, evening: 0, night: 0 }

  for (const activity of activities.results) {
    const plannedDate = new Date(activity.planned_date as string)
    const createdDate = new Date(activity.created_at as string)

    // Day of week preference
    dayOfWeekCounts[plannedDate.getDay()]++

    // Hour preference
    hourCounts[plannedDate.getHours()]++

    // Duration
    if (activity.duration_minutes) {
      durations.push(activity.duration_minutes as number)
    }

    // Lead time (days between creation and planned date)
    const leadTimeDays = Math.floor(
      (plannedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    leadTimes.push(leadTimeDays)

    // Time of day
    const hour = plannedDate.getHours()
    if (hour >= 6 && hour < 12) timeOfDayCounts.morning++
    else if (hour >= 12 && hour < 17) timeOfDayCounts.afternoon++
    else if (hour >= 17 && hour < 21) timeOfDayCounts.evening++
    else timeOfDayCounts.night++
  }

  const pattern: SchedulingPattern = {
    preferred_day_of_week: dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts)),
    preferred_hour: hourCounts.indexOf(Math.max(...hourCounts)),
    typical_duration_minutes: Math.round(average(durations)),
    planning_lead_time_days: Math.round(average(leadTimes)),
    time_of_day_distribution: {
      morning: timeOfDayCounts.morning,
      afternoon: timeOfDayCounts.afternoon,
      evening: timeOfDayCounts.evening,
      night: timeOfDayCounts.night,
    },
  }

  // Save pattern
  await env.DB.prepare(`
    INSERT INTO scheduling_patterns (
      id, relationship_id, preferred_day_of_week, preferred_hour,
      typical_duration_minutes, planning_lead_time_days,
      morning_dates_count, afternoon_dates_count,
      evening_dates_count, night_dates_count, last_computed
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(relationship_id) DO UPDATE SET
      preferred_day_of_week = excluded.preferred_day_of_week,
      preferred_hour = excluded.preferred_hour,
      typical_duration_minutes = excluded.typical_duration_minutes,
      planning_lead_time_days = excluded.planning_lead_time_days,
      morning_dates_count = excluded.morning_dates_count,
      afternoon_dates_count = excluded.afternoon_dates_count,
      evening_dates_count = excluded.evening_dates_count,
      night_dates_count = excluded.night_dates_count,
      last_computed = excluded.last_computed
  `).bind(
    generateId(),
    relationshipId,
    pattern.preferred_day_of_week,
    pattern.preferred_hour,
    pattern.typical_duration_minutes,
    pattern.planning_lead_time_days,
    pattern.time_of_day_distribution.morning,
    pattern.time_of_day_distribution.afternoon,
    pattern.time_of_day_distribution.evening,
    pattern.time_of_day_distribution.night,
    new Date().toISOString()
  ).run()

  return pattern
}

/**
 * Sort time slots by learned preferences
 */
export function sortByPreferredTimes(
  slots: any[],
  pattern: SchedulingPattern | null
): any[] {
  if (!pattern) return slots

  return slots.sort((a, b) => {
    const aDate = new Date(a.startDatetime)
    const bDate = new Date(b.startDatetime)

    // Prefer learned day of week
    const aDayMatch = aDate.getDay() === pattern.preferred_day_of_week ? 1 : 0
    const bDayMatch = bDate.getDay() === pattern.preferred_day_of_week ? 1 : 0
    if (aDayMatch !== bDayMatch) return bDayMatch - aDayMatch

    // Prefer learned hour
    const aHourMatch = aDate.getHours() === pattern.preferred_hour ? 1 : 0
    const bHourMatch = bDate.getHours() === pattern.preferred_hour ? 1 : 0
    if (aHourMatch !== bHourMatch) return bHourMatch - aHourMatch

    // Otherwise by date
    return aDate.getTime() - bDate.getTime()
  })
}

// =============================================================================
// SOCIAL PROOF SERVICE
// =============================================================================

export interface SocialProofScore {
  avg_rating_from_similar: number
  review_count: number
  top_tags: string[]
  sample_review?: any
  trust_score: number
}

/**
 * Get social proof for an experience based on similar couples' reviews
 */
export async function getSocialProof(
  env: Env,
  experienceId: string,
  relationshipId: string
): Promise<SocialProofScore | null> {
  // Get this couple's interests
  const relationship = await env.DB.prepare(`
    SELECT user_1_id, user_2_id FROM relationships WHERE id = ?
  `).bind(relationshipId).first()

  if (!relationship) return null

  const user1Id = relationship.user_1_id as string
  const user2Id = relationship.user_2_id as string

  const interests = await env.DB.prepare(`
    SELECT category, preference_level FROM user_interests
    WHERE user_id IN (?, ?)
  `).bind(user1Id, user2Id).all()

  // Find couples with similar interests (mock - in production, use similarity algorithm)
  // For now, get all reviews
  const reviews = await env.DB.prepare(`
    SELECT
      cr.*,
      r.user_1_id,
      r.user_2_id
    FROM couple_reviews cr
    JOIN relationships r ON cr.relationship_id = r.id
    WHERE cr.experience_id = ?
      AND cr.overall_rating IS NOT NULL
    ORDER BY cr.created_at DESC
    LIMIT 50
  `).bind(experienceId).all()

  if (reviews.results.length === 0) {
    return null
  }

  // Calculate average rating
  const ratings = reviews.results.map((r: any) => r.overall_rating as number)
  const avgRating = average(ratings)

  // Extract tags
  const allTags: string[] = []
  for (const review of reviews.results) {
    if (review.tags) {
      try {
        const tags = JSON.parse(review.tags as string)
        allTags.push(...tags)
      } catch (e) {
        // ignore
      }
    }
  }

  const tagCounts: Record<string, number> = {}
  for (const tag of allTags) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  }

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag)

  return {
    avg_rating_from_similar: avgRating,
    review_count: reviews.results.length,
    top_tags: topTags,
    sample_review: reviews.results[0],
    trust_score: Math.min(1, reviews.results.length / 20), // More reviews = higher trust
  }
}

// =============================================================================
// PREMIUM TIER SERVICE
// =============================================================================

export const FEATURE_LIMITS = {
  free: {
    suggestions_per_week: 3,
    calendar_sync: false,
    ai_date_guide: false,
    booking_integration: false,
    group_dates: false,
  },
  plus: {
    suggestions_per_week: 10,
    calendar_sync: true,
    ai_date_guide: true,
    booking_integration: true,
    group_dates: false,
  },
  premium: {
    suggestions_per_week: Infinity,
    calendar_sync: true,
    ai_date_guide: true,
    booking_integration: true,
    group_dates: true,
  },
}

/**
 * Check if relationship can use a feature
 */
export async function checkFeatureAccess(
  env: Env,
  relationshipId: string,
  featureName: string
): Promise<{ allowed: boolean; reason?: string }> {
  // Get subscription
  const subscription = await env.DB.prepare(`
    SELECT tier, status FROM subscriptions
    WHERE relationship_id = ?
      AND status IN ('active', 'trial')
    ORDER BY created_at DESC
    LIMIT 1
  `).bind(relationshipId).first()

  const tier = (subscription?.tier as 'free' | 'plus' | 'premium') || 'free'
  const limits = FEATURE_LIMITS[tier]

  // Check feature-specific access
  if (featureName === 'calendar_sync' && !limits.calendar_sync) {
    return { allowed: false, reason: 'Upgrade to Plus for calendar sync' }
  }

  if (featureName === 'ai_date_guide' && !limits.ai_date_guide) {
    return { allowed: false, reason: 'Upgrade to Plus for AI date guides' }
  }

  if (featureName === 'booking' && !limits.booking_integration) {
    return { allowed: false, reason: 'Upgrade to Plus for one-click booking' }
  }

  if (featureName === 'group_dates' && !limits.group_dates) {
    return { allowed: false, reason: 'Upgrade to Premium for group dates' }
  }

  // Check usage limits
  if (featureName === 'suggestions') {
    const thisWeek = getStartOfWeek()
    const usage = await env.DB.prepare(`
      SELECT usage_count FROM feature_usage
      WHERE relationship_id = ?
        AND feature_name = 'suggestions_generated'
        AND period_start = ?
    `).bind(relationshipId, thisWeek).first()

    const usageCount = (usage?.usage_count as number) || 0

    if (usageCount >= limits.suggestions_per_week) {
      return {
        allowed: false,
        reason: `You've used ${usageCount}/${limits.suggestions_per_week} suggestions this week. Upgrade for more!`,
      }
    }
  }

  return { allowed: true }
}

/**
 * Track feature usage
 */
export async function trackFeatureUsage(
  env: Env,
  relationshipId: string,
  featureName: string
): Promise<void> {
  const thisWeek = getStartOfWeek()
  const nextWeek = new Date(thisWeek)
  nextWeek.setDate(nextWeek.getDate() + 7)

  await env.DB.prepare(`
    INSERT INTO feature_usage (
      id, relationship_id, feature_name, usage_count,
      period_start, period_end, last_used
    ) VALUES (?, ?, ?, 1, ?, ?, ?)
    ON CONFLICT(relationship_id, feature_name, period_start) DO UPDATE SET
      usage_count = usage_count + 1,
      last_used = excluded.last_used
  `).bind(
    generateId(),
    relationshipId,
    featureName,
    thisWeek,
    nextWeek.toISOString().split('T')[0],
    new Date().toISOString()
  ).run()
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((a, b) => a + b, 0) / numbers.length
}

function getStartOfWeek(): string {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - dayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)
  return startOfWeek.toISOString().split('T')[0]
}
