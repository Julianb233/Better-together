// Learning Service - Smart learning from past dates and feedback
import type { Env } from '../types'

export interface ActivityFeedbackData {
  activity_id: string
  relationship_id: string
  suggested_experience_id?: string
  user_1_rating?: number
  user_2_rating?: number
  would_repeat?: boolean
  time_of_day_was_good?: boolean
  cost_felt_right?: boolean
  energy_level_match?: boolean
  feedback_notes?: string
}

export interface LearningScore {
  experience_type: string
  times_suggested: number
  times_accepted: number
  times_enjoyed: number
  success_rate: number
  score_adjustment: number
}

/**
 * Save activity feedback from users
 */
export async function saveActivityFeedback(
  env: Env,
  feedback: ActivityFeedbackData
): Promise<void> {
  const feedbackId = generateId()
  const now = new Date().toISOString()

  const bothEnjoyed =
    feedback.user_1_rating && feedback.user_2_rating
      ? feedback.user_1_rating >= 4 && feedback.user_2_rating >= 4
      : false

  await env.DB.prepare(`
    INSERT INTO activity_feedback (
      id, activity_id, relationship_id, suggested_experience_id,
      user_1_rating, user_2_rating, both_enjoyed, would_repeat,
      time_of_day_was_good, cost_felt_right, energy_level_match,
      feedback_notes, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    feedbackId,
    feedback.activity_id,
    feedback.relationship_id,
    feedback.suggested_experience_id || null,
    feedback.user_1_rating || null,
    feedback.user_2_rating || null,
    bothEnjoyed,
    feedback.would_repeat !== false,
    feedback.time_of_day_was_good !== false,
    feedback.cost_felt_right !== false,
    feedback.energy_level_match !== false,
    feedback.feedback_notes || null,
    now
  ).run()

  // Update learning scores
  if (feedback.suggested_experience_id) {
    await updateLearningScores(env, feedback.relationship_id)
  }
}

/**
 * Update learning scores based on feedback history
 */
export async function updateLearningScores(
  env: Env,
  relationshipId: string
): Promise<void> {
  // Get all feedback for this relationship
  const feedback = await env.DB.prepare(`
    SELECT
      ec.experience_type,
      COUNT(*) as times_suggested,
      SUM(CASE WHEN ds.status IN ('accepted', 'scheduled', 'completed') THEN 1 ELSE 0 END) as times_accepted,
      SUM(CASE WHEN af.both_enjoyed = TRUE THEN 1 ELSE 0 END) as times_enjoyed
    FROM activity_feedback af
    LEFT JOIN experience_catalog ec ON af.suggested_experience_id = ec.id
    LEFT JOIN activities a ON af.activity_id = a.id
    LEFT JOIN date_suggestions ds ON a.id = ds.activity_id
    WHERE af.relationship_id = ?
      AND ec.experience_type IS NOT NULL
    GROUP BY ec.experience_type
  `).bind(relationshipId).all()

  const now = new Date().toISOString()

  for (const row of feedback.results) {
    const experienceType = row.experience_type as string
    const timesSuggested = row.times_suggested as number
    const timesAccepted = row.times_accepted as number
    const timesEnjoyed = row.times_enjoyed as number

    const successRate = timesSuggested > 0 ? timesEnjoyed / timesSuggested : 0

    // Calculate score adjustment: -0.3 to +0.3 based on success rate
    // 0% success = -0.3, 50% = 0, 100% = +0.3
    const scoreAdjustment = (successRate - 0.5) * 0.6

    // Upsert learning score
    await env.DB.prepare(`
      INSERT INTO experience_learning_scores (
        id, relationship_id, experience_type, times_suggested, times_accepted,
        times_enjoyed, success_rate, score_adjustment, last_updated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(relationship_id, experience_type) DO UPDATE SET
        times_suggested = excluded.times_suggested,
        times_accepted = excluded.times_accepted,
        times_enjoyed = excluded.times_enjoyed,
        success_rate = excluded.success_rate,
        score_adjustment = excluded.score_adjustment,
        last_updated = excluded.last_updated
    `).bind(
      generateId(),
      relationshipId,
      experienceType,
      timesSuggested,
      timesAccepted,
      timesEnjoyed,
      successRate,
      scoreAdjustment,
      now
    ).run()
  }
}

/**
 * Get learning-adjusted match score for an experience
 */
export async function getAdjustedMatchScore(
  env: Env,
  relationshipId: string,
  experienceType: string,
  baseScore: number
): Promise<number> {
  const learningScore = await env.DB.prepare(`
    SELECT score_adjustment FROM experience_learning_scores
    WHERE relationship_id = ? AND experience_type = ?
  `).bind(relationshipId, experienceType).first()

  if (!learningScore) {
    return baseScore
  }

  const adjustment = learningScore.score_adjustment as number
  const adjustedScore = baseScore + adjustment

  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, adjustedScore))
}

/**
 * Get all learning scores for a relationship
 */
export async function getLearningScores(
  env: Env,
  relationshipId: string
): Promise<LearningScore[]> {
  const scores = await env.DB.prepare(`
    SELECT * FROM experience_learning_scores
    WHERE relationship_id = ?
    ORDER BY success_rate DESC
  `).bind(relationshipId).all()

  return scores.results as any[]
}

/**
 * Get feedback statistics for a relationship
 */
export async function getFeedbackStats(
  env: Env,
  relationshipId: string
): Promise<any> {
  const stats = await env.DB.prepare(`
    SELECT
      COUNT(*) as total_feedback,
      AVG(user_1_rating) as avg_user_1_rating,
      AVG(user_2_rating) as avg_user_2_rating,
      SUM(CASE WHEN both_enjoyed = TRUE THEN 1 ELSE 0 END) as both_enjoyed_count,
      SUM(CASE WHEN would_repeat = TRUE THEN 1 ELSE 0 END) as would_repeat_count,
      AVG(CASE WHEN cost_felt_right = TRUE THEN 1.0 ELSE 0.0 END) as cost_satisfaction,
      AVG(CASE WHEN time_of_day_was_good = TRUE THEN 1.0 ELSE 0.0 END) as time_satisfaction
    FROM activity_feedback
    WHERE relationship_id = ?
  `).bind(relationshipId).first()

  return stats
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
