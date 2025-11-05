// Context Awareness Service - Emotional intelligence for suggestions
import type { Env } from '../types'

export interface RelationshipContext {
  avg_stress_level?: number
  avg_connection_score?: number
  days_since_last_date: number
  recent_conflict_detected: boolean
  energy_level_trend: 'high' | 'medium' | 'low'
  upcoming_milestone_days?: number
  upcoming_milestone_type?: string
  suggestion_context: any
}

export interface ContextAdjustment {
  boost_categories: Array<{ category: string; boost: number }>
  deprioritize_categories: Array<{ category: string; penalty: number }>
  boost_tags: Array<{ tag: string; boost: number }>
  min_rating?: number
  explanation: string
}

/**
 * Analyze current relationship context
 */
export async function analyzeRelationshipContext(
  env: Env,
  relationshipId: string
): Promise<RelationshipContext> {
  // Get recent check-ins (last 7 days)
  const recentCheckins = await env.DB.prepare(`
    SELECT
      connection_score,
      mood_score,
      relationship_satisfaction,
      support_needed,
      checkin_date
    FROM daily_checkins
    WHERE relationship_id = ?
      AND checkin_date >= date('now', '-7 days')
    ORDER BY checkin_date DESC
  `).bind(relationshipId).all()

  // Calculate stress level from mood and satisfaction
  let avgStressLevel: number | undefined
  let avgConnectionScore: number | undefined
  let recentConflict = false

  if (recentCheckins.results.length > 0) {
    const moodScores = recentCheckins.results
      .map((c: any) => c.mood_score)
      .filter((s: any) => s !== null)

    const connectionScores = recentCheckins.results
      .map((c: any) => c.connection_score)
      .filter((s: any) => s !== null)

    const satisfactionScores = recentCheckins.results
      .map((c: any) => c.relationship_satisfaction)
      .filter((s: any) => s !== null)

    if (moodScores.length > 0) {
      const avgMood = moodScores.reduce((a: number, b: number) => a + b, 0) / moodScores.length
      const avgSatisfaction =
        satisfactionScores.length > 0
          ? satisfactionScores.reduce((a: number, b: number) => a + b, 0) / satisfactionScores.length
          : 5

      // Stress = inverse of (mood + satisfaction) / 2
      avgStressLevel = 10 - (avgMood + avgSatisfaction) / 2
    }

    if (connectionScores.length > 0) {
      avgConnectionScore =
        connectionScores.reduce((a: number, b: number) => a + b, 0) / connectionScores.length
    }

    // Detect recent conflict from support_needed field
    recentConflict = recentCheckins.results.some(
      (c: any) =>
        c.support_needed &&
        (c.support_needed.toLowerCase().includes('conflict') ||
          c.support_needed.toLowerCase().includes('argument') ||
          c.support_needed.toLowerCase().includes('fight') ||
          c.support_needed.toLowerCase().includes('disagreement'))
    )
  }

  // Get last completed date
  const lastDate = await env.DB.prepare(`
    SELECT MAX(completed_date) as last_date
    FROM activities
    WHERE relationship_id = ?
      AND status = 'completed'
      AND completed_date IS NOT NULL
  `).bind(relationshipId).first()

  const daysSinceLastDate = lastDate?.last_date
    ? Math.floor(
        (Date.now() - new Date(lastDate.last_date as string).getTime()) / (1000 * 60 * 60 * 24)
      )
    : 999

  // Get upcoming milestone
  const upcomingMilestone = await env.DB.prepare(`
    SELECT
      event_name,
      event_type,
      date_value,
      julianday(date_value) - julianday('now') as days_until
    FROM important_dates
    WHERE relationship_id = ?
      AND date_value >= date('now')
    ORDER BY date_value ASC
    LIMIT 1
  `).bind(relationshipId).first()

  // Determine energy level trend from recent activity types
  const recentActivities = await env.DB.prepare(`
    SELECT activity_type, COUNT(*) as count
    FROM activities
    WHERE relationship_id = ?
      AND completed_date >= date('now', '-30 days')
      AND status = 'completed'
    GROUP BY activity_type
  `).bind(relationshipId).all()

  let energyTrend: 'high' | 'medium' | 'low' = 'medium'

  if (recentActivities.results.length > 0) {
    const highEnergyTypes = ['adventure', 'sports', 'exercise']
    const lowEnergyTypes = ['relaxation', 'quality_time']

    const highEnergyCount = recentActivities.results
      .filter((a: any) => highEnergyTypes.includes(a.activity_type))
      .reduce((sum: number, a: any) => sum + (a.count as number), 0)

    const lowEnergyCount = recentActivities.results
      .filter((a: any) => lowEnergyTypes.includes(a.activity_type))
      .reduce((sum: number, a: any) => sum + (a.count as number), 0)

    if (highEnergyCount > lowEnergyCount * 1.5) {
      energyTrend = 'high'
    } else if (lowEnergyCount > highEnergyCount * 1.5) {
      energyTrend = 'low'
    }
  }

  const context: RelationshipContext = {
    avg_stress_level: avgStressLevel,
    avg_connection_score: avgConnectionScore,
    days_since_last_date: daysSinceLastDate,
    recent_conflict_detected: recentConflict,
    energy_level_trend: energyTrend,
    upcoming_milestone_days: upcomingMilestone
      ? Math.floor(upcomingMilestone.days_until as number)
      : undefined,
    upcoming_milestone_type: upcomingMilestone?.event_type as string | undefined,
    suggestion_context: {
      checkin_count: recentCheckins.results.length,
      recent_activities_count: recentActivities.results.length,
    },
  }

  // Save context snapshot
  await saveContextSnapshot(env, relationshipId, context)

  return context
}

/**
 * Get context-based adjustments for suggestions
 */
export function getContextAdjustments(context: RelationshipContext): ContextAdjustment {
  const adjustments: ContextAdjustment = {
    boost_categories: [],
    deprioritize_categories: [],
    boost_tags: [],
    explanation: '',
  }

  const reasons: string[] = []

  // High stress? Prioritize relaxation
  if (context.avg_stress_level && context.avg_stress_level > 7) {
    adjustments.boost_categories.push(
      { category: 'relaxation', boost: 0.3 },
      { category: 'wellness', boost: 0.25 }
    )
    adjustments.deprioritize_categories.push(
      { category: 'adventure', penalty: 0.2 },
      { category: 'sports', penalty: 0.2 }
    )
    reasons.push('Detected high stress - suggesting relaxing activities')
  }

  // Recent conflict? Suggest connecting activities
  if (context.recent_conflict_detected) {
    adjustments.boost_categories.push(
      { category: 'quality_time', boost: 0.25 },
      { category: 'relaxation', boost: 0.2 }
    )
    adjustments.boost_tags.push({ tag: 'romantic', boost: 0.2 })
    reasons.push('Suggesting activities to reconnect')
  }

  // Long time since last date? Make it special
  if (context.days_since_last_date > 14) {
    adjustments.min_rating = 4.5
    adjustments.boost_tags.push({ tag: 'special', boost: 0.2 })
    reasons.push('Been a while - suggesting something special!')
  }

  // Upcoming milestone? Romantic/special experiences
  if (context.upcoming_milestone_days && context.upcoming_milestone_days < 7) {
    adjustments.boost_categories.push({ category: 'dining', boost: 0.25 })
    adjustments.boost_tags.push(
      { tag: 'romantic', boost: 0.3 },
      { tag: 'special', boost: 0.25 }
    )
    adjustments.min_rating = 4.3
    reasons.push(`${context.upcoming_milestone_type} coming up - suggesting romantic options`)
  }

  // Energy level balancing
  if (context.energy_level_trend === 'high') {
    adjustments.boost_categories.push(
      { category: 'relaxation', boost: 0.2 },
      { category: 'wellness', boost: 0.15 }
    )
    reasons.push('Balancing recent high-energy activities with relaxation')
  } else if (context.energy_level_trend === 'low') {
    adjustments.boost_categories.push(
      { category: 'adventure', boost: 0.2 },
      { category: 'outdoors', boost: 0.15 }
    )
    reasons.push('Adding some energy with adventure activities')
  }

  // Low connection score? Quality time focus
  if (context.avg_connection_score && context.avg_connection_score < 6) {
    adjustments.boost_categories.push({ category: 'quality_time', boost: 0.3 })
    adjustments.boost_tags.push({ tag: 'intimate', boost: 0.25 })
    reasons.push('Focusing on quality time to strengthen connection')
  }

  adjustments.explanation = reasons.join(' • ')

  return adjustments
}

/**
 * Apply context adjustments to suggestion scores
 */
export function applyContextToScore(
  baseScore: number,
  experienceType: string,
  experienceTags: string[],
  experienceRating: number,
  adjustments: ContextAdjustment
): { score: number; contextBoost: number } {
  let adjustedScore = baseScore
  let totalBoost = 0

  // Apply category boosts
  for (const boost of adjustments.boost_categories) {
    if (boost.category === experienceType) {
      adjustedScore += boost.boost
      totalBoost += boost.boost
    }
  }

  // Apply category penalties
  for (const penalty of adjustments.deprioritize_categories) {
    if (penalty.category === experienceType) {
      adjustedScore -= penalty.penalty
      totalBoost -= penalty.penalty
    }
  }

  // Apply tag boosts
  for (const tagBoost of adjustments.boost_tags) {
    if (experienceTags.includes(tagBoost.tag)) {
      adjustedScore += tagBoost.boost
      totalBoost += tagBoost.boost
    }
  }

  // Apply minimum rating filter
  if (adjustments.min_rating && experienceRating < adjustments.min_rating) {
    adjustedScore *= 0.7 // Reduce score for experiences below min rating
  }

  // Clamp between 0 and 1
  adjustedScore = Math.max(0, Math.min(1, adjustedScore))

  return { score: adjustedScore, contextBoost: totalBoost }
}

/**
 * Save context snapshot to database
 */
async function saveContextSnapshot(
  env: Env,
  relationshipId: string,
  context: RelationshipContext
): Promise<void> {
  const snapshotId = generateId()
  const now = new Date().toISOString()
  const today = now.split('T')[0]

  await env.DB.prepare(`
    INSERT INTO relationship_context (
      id, relationship_id, snapshot_date, avg_stress_level, avg_connection_score,
      days_since_last_date, recent_conflict_detected, energy_level_trend,
      upcoming_milestone_days, suggestion_context, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    snapshotId,
    relationshipId,
    today,
    context.avg_stress_level || null,
    context.avg_connection_score || null,
    context.days_since_last_date,
    context.recent_conflict_detected,
    context.energy_level_trend,
    context.upcoming_milestone_days || null,
    JSON.stringify(context.suggestion_context),
    now
  ).run()
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
