// Better Together: Utility Functions

import {
  Env,
  User,
  Relationship,
  QuizAnswer,
  ConnectionCompassResult,
  ConnectionStyle,
  ConnectionStyleInfo
} from './types'

/**
 * Generate a unique ID for database records
 */
export function generateId(): string {
  return crypto.randomUUID()
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Get current datetime in ISO format
 */
export function getCurrentDateTime(): string {
  return new Date().toISOString()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get partner ID from relationship
 */
export function getPartnerId(relationship: Relationship, currentUserId: string): string {
  return relationship.user_1_id === currentUserId 
    ? relationship.user_2_id 
    : relationship.user_1_id
}

/**
 * Calculate relationship health score based on various metrics
 */
export function calculateHealthScore(
  avgConnectionScore: number,
  avgSatisfactionScore: number,
  checkinFrequency: number,
  goalCompletionRate: number
): number {
  const connectionWeight = 0.3
  const satisfactionWeight = 0.3
  const consistencyWeight = 0.2
  const goalsWeight = 0.2
  
  const normalizedConnection = (avgConnectionScore / 10) * 100
  const normalizedSatisfaction = (avgSatisfactionScore / 10) * 100
  const normalizedConsistency = Math.min(checkinFrequency * 10, 100) // Assume 10 checkins per month is 100%
  const normalizedGoals = goalCompletionRate * 100
  
  return Math.round(
    (normalizedConnection * connectionWeight) +
    (normalizedSatisfaction * satisfactionWeight) +
    (normalizedConsistency * consistencyWeight) +
    (normalizedGoals * goalsWeight)
  )
}

/**
 * Get user by email
 */
export async function getUserByEmail(env: Env, email: string): Promise<User | null> {
  const result = await env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first()
  
  return result as User | null
}

/**
 * Get user by ID
 */
export async function getUserById(env: Env, userId: string): Promise<User | null> {
  const result = await env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(userId).first()
  
  return result as User | null
}

/**
 * Get relationship by user ID
 */
export async function getRelationshipByUserId(env: Env, userId: string): Promise<Relationship | null> {
  const result = await env.DB.prepare(
    'SELECT * FROM relationships WHERE (user_1_id = ? OR user_2_id = ?) AND status = "active"'
  ).bind(userId, userId).first()
  
  return result as Relationship | null
}

/**
 * Check if user has completed checkin for today
 */
export async function hasTodayCheckin(env: Env, relationshipId: string, userId: string): Promise<boolean> {
  const today = getCurrentDate()
  const result = await env.DB.prepare(
    'SELECT id FROM daily_checkins WHERE relationship_id = ? AND user_id = ? AND checkin_date = ?'
  ).bind(relationshipId, userId, today).first()
  
  return result !== null
}

/**
 * Calculate current checkin streak for a relationship
 */
export async function calculateCheckinStreak(env: Env, relationshipId: string): Promise<number> {
  const results = await env.DB.prepare(`
    SELECT DISTINCT checkin_date 
    FROM daily_checkins 
    WHERE relationship_id = ? 
    ORDER BY checkin_date DESC
    LIMIT 100
  `).bind(relationshipId).all()
  
  if (!results.results || results.results.length === 0) return 0
  
  const dates = results.results.map(row => new Date(row.checkin_date as string))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  for (const date of dates) {
    date.setHours(0, 0, 0, 0)
    if (date.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}

/**
 * Get upcoming important dates (next 30 days)
 */
export async function getUpcomingDates(env: Env, relationshipId: string): Promise<any[]> {
  const today = getCurrentDate()
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 30)
  const future = futureDate.toISOString().split('T')[0]
  
  const results = await env.DB.prepare(`
    SELECT * FROM important_dates 
    WHERE relationship_id = ? 
    AND date_value BETWEEN ? AND ?
    ORDER BY date_value ASC
  `).bind(relationshipId, today, future).all()
  
  return results.results || []
}

/**
 * Check and award achievements
 */
export async function checkAchievements(env: Env, relationshipId: string, userId: string): Promise<string[]> {
  const newAchievements: string[] = []
  
  // Check for checkin streak achievements
  const streak = await calculateCheckinStreak(env, relationshipId)
  
  if (streak === 7) {
    await awardAchievement(env, relationshipId, 'week_streak', userId)
    newAchievements.push('week_streak')
  }
  
  if (streak === 30) {
    await awardAchievement(env, relationshipId, 'month_streak', userId)
    newAchievements.push('month_streak')
  }
  
  return newAchievements
}

/**
 * Award an achievement to a relationship
 */
export async function awardAchievement(env: Env, relationshipId: string, achievementId: string, userId?: string): Promise<void> {
  try {
    await env.DB.prepare(`
      INSERT OR IGNORE INTO user_achievements (id, relationship_id, achievement_id, earned_by_user_id)
      VALUES (?, ?, ?, ?)
    `).bind(generateId(), relationshipId, achievementId, userId || null).run()
  } catch (error) {
    console.error('Error awarding achievement:', error)
  }
}

/**
 * Send notification to user
 */
export async function sendNotification(
  env: Env, 
  userId: string, 
  type: string, 
  title: string, 
  message: string,
  relationshipId?: string,
  actionUrl?: string
): Promise<void> {
  try {
    await env.DB.prepare(`
      INSERT INTO notifications (id, user_id, relationship_id, notification_type, title, message, action_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(generateId(), userId, relationshipId || null, type, title, message, actionUrl || null).run()
  } catch (error) {
    console.error('Error sending notification:', error)
  }
}

/**
 * Calculate analytics for a relationship
 */
export async function calculateAnalytics(env: Env, relationshipId: string): Promise<any> {
  const today = getCurrentDate()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const monthAgo = thirtyDaysAgo.toISOString().split('T')[0]
  
  // Get relationship start date for days together
  const relationship = await env.DB.prepare(
    'SELECT start_date FROM relationships WHERE id = ?'
  ).bind(relationshipId).first()
  
  const daysTogether = relationship?.start_date 
    ? daysBetween(relationship.start_date, today)
    : 0
  
  // Calculate average scores from recent checkins
  const checkinStats = await env.DB.prepare(`
    SELECT 
      AVG(connection_score) as avg_connection,
      AVG(relationship_satisfaction) as avg_satisfaction,
      COUNT(*) as checkin_count
    FROM daily_checkins 
    WHERE relationship_id = ? 
    AND checkin_date >= ?
  `).bind(relationshipId, monthAgo).first()
  
  // Count activities and goals this month
  const activityCount = await env.DB.prepare(`
    SELECT COUNT(*) as count 
    FROM activities 
    WHERE relationship_id = ? 
    AND status = 'completed'
    AND completed_date >= ?
  `).bind(relationshipId, monthAgo).first()
  
  const goalCount = await env.DB.prepare(`
    SELECT COUNT(*) as count 
    FROM shared_goals 
    WHERE relationship_id = ? 
    AND status = 'completed'
    AND completion_date >= ?
  `).bind(relationshipId, monthAgo).first()
  
  const checkinStreak = await calculateCheckinStreak(env, relationshipId)
  
  const avgConnection = Number(checkinStats?.avg_connection || 0)
  const avgSatisfaction = Number(checkinStats?.avg_satisfaction || 0)
  const checkinFrequency = Number(checkinStats?.checkin_count || 0)
  const goalCompletionRate = Number(goalCount?.count || 0) / 30 // Simple rate calculation
  
  const overallHealthScore = calculateHealthScore(
    avgConnection,
    avgSatisfaction, 
    checkinFrequency,
    goalCompletionRate
  )
  
  return {
    days_together: daysTogether,
    average_connection_score: avgConnection,
    average_satisfaction_score: avgSatisfaction,
    checkin_streak: checkinStreak,
    activities_completed_this_month: Number(activityCount?.count || 0),
    goals_completed_this_month: Number(goalCount?.count || 0),
    communication_frequency_score: checkinFrequency,
    overall_health_score: overallHealthScore
  }
}

// ============================================================================
// QUIZ SYSTEM UTILITIES
// ============================================================================

/**
 * Connection Style metadata for results display
 */
export const CONNECTION_STYLES: Record<ConnectionStyle, ConnectionStyleInfo> = {
  verbal_appreciation: {
    key: 'verbal_appreciation',
    name: 'Verbal Appreciation',
    icon: '🗣️',
    description: 'You feel most valued when your partner expresses appreciation, affection, and encouragement through words—whether spoken or written. Compliments, heartfelt conversations, and verbal affirmations fill your emotional tank.',
    actionSteps: [
      'Schedule regular check-ins for sharing appreciations',
      'Leave love notes or send thoughtful texts during the day',
      'Practice giving specific compliments (not generic "you\'re great")'
    ]
  },
  focused_presence: {
    key: 'focused_presence',
    name: 'Focused Presence',
    icon: '🎯',
    description: 'You feel most connected through undivided attention and meaningful shared experiences. When your partner puts away distractions and is fully present with you, that\'s when you feel truly valued.',
    actionSteps: [
      'Establish phone-free times for connection',
      'Plan activities where you\'re both actively engaged',
      'Practice active listening without multitasking'
    ]
  },
  thoughtful_gestures: {
    key: 'thoughtful_gestures',
    name: 'Thoughtful Gestures',
    icon: '🎁',
    description: 'You feel loved through intentional actions that show your partner remembers and considers what matters to you. It\'s not about the cost—it\'s about the thought and meaning behind the gesture.',
    actionSteps: [
      'Keep a running list of things your partner mentions wanting',
      'Surprise them with their favorite snack or coffee order',
      'Plan experiences based on their interests, not just yours'
    ]
  },
  supportive_partnership: {
    key: 'supportive_partnership',
    name: 'Supportive Partnership',
    icon: '🤲',
    description: 'You feel most cared for when your partner shares life\'s practical responsibilities and helps lighten your load. Actions that make your life easier demonstrate love to you.',
    actionSteps: [
      'Divide household tasks fairly and follow through',
      'Offer help before being asked',
      'Notice what your partner does and reciprocate'
    ]
  },
  physical_connection: {
    key: 'physical_connection',
    name: 'Physical Connection',
    icon: '🫂',
    description: 'You feel close and valued through appropriate physical touch, affection, and proximity. Physical connection is how you most naturally give and receive emotional reassurance.',
    actionSteps: [
      'Increase casual touch (hand-holding, hugs, shoulder touches)',
      'Make physical affection part of daily routines',
      'Respect boundaries while staying connected'
    ]
  },
  growth_championing: {
    key: 'growth_championing',
    name: 'Growth Championing',
    icon: '🌟',
    description: 'You feel most valued when your partner actively supports your personal dreams, interests, and development. Encouragement to be your best self demonstrates their love.',
    actionSteps: [
      'Ask about your partner\'s goals and dreams regularly',
      'Create space and time for their personal pursuits',
      'Celebrate their individual achievements enthusiastically'
    ]
  }
}

/**
 * Calculate Connection Compass scores from quiz answers
 */
export async function calculateConnectionCompassScores(
  env: Env,
  responseId: string
): Promise<Record<ConnectionStyle, number>> {
  // Get all answers for this response with their scoring data
  const answers = await env.DB.prepare(`
    SELECT
      qa.answer_numeric,
      qa.answer_data,
      qo.score_key,
      qo.score_value,
      qq.question_type,
      qo.metadata
    FROM quiz_answers qa
    JOIN quiz_options qo ON qa.option_id = qo.id
    JOIN quiz_questions qq ON qa.question_id = qq.id
    WHERE qa.response_id = ?
    AND qo.score_key IS NOT NULL
  `).bind(responseId).all()

  const scores: Record<ConnectionStyle, number> = {
    verbal_appreciation: 0,
    focused_presence: 0,
    thoughtful_gestures: 0,
    supportive_partnership: 0,
    physical_connection: 0,
    growth_championing: 0
  }

  // Calculate scores based on question types and scoring rules
  for (const answer of answers.results) {
    const scoreKey = answer.score_key as ConnectionStyle
    if (!scoreKey) continue

    // Basic score (for forced-choice questions)
    scores[scoreKey] += Number(answer.score_value || 0)
  }

  // Handle ranking question (Q16) - stored in answer_data as JSON
  const rankingAnswer = await env.DB.prepare(`
    SELECT answer_data
    FROM quiz_answers
    WHERE response_id = ?
    AND question_id = 'cc-q16'
  `).bind(responseId).first()

  if (rankingAnswer?.answer_data) {
    try {
      const rankings = JSON.parse(rankingAnswer.answer_data as string)
      // Rankings format: { "cc-q16-o1": 1, "cc-q16-o2": 2, ... }
      // Scoring: 1st = 6 points, 2nd = 5 points, etc.
      const rankingScores: Record<string, ConnectionStyle> = {
        'cc-q16-o1': 'verbal_appreciation',
        'cc-q16-o2': 'focused_presence',
        'cc-q16-o3': 'thoughtful_gestures',
        'cc-q16-o4': 'supportive_partnership',
        'cc-q16-o5': 'physical_connection',
        'cc-q16-o6': 'growth_championing'
      }

      for (const [optionId, rank] of Object.entries(rankings)) {
        const style = rankingScores[optionId]
        if (style) {
          scores[style] += (7 - Number(rank)) // 1st = 6 points, 2nd = 5, etc.
        }
      }
    } catch (error) {
      console.error('Error parsing ranking data:', error)
    }
  }

  return scores
}

/**
 * Determine primary and secondary connection styles
 */
export function determinePrimaryStyles(
  scores: Record<ConnectionStyle, number>
): { primary: ConnectionStyle; secondary: ConnectionStyle } {
  const sortedStyles = (Object.entries(scores) as [ConnectionStyle, number][])
    .sort((a, b) => b[1] - a[1])

  return {
    primary: sortedStyles[0][0],
    secondary: sortedStyles[1][0]
  }
}

/**
 * Calculate percentage distribution of connection styles
 */
export function calculateStylePercentages(
  scores: Record<ConnectionStyle, number>
): Record<ConnectionStyle, number> {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const percentages: Record<ConnectionStyle, number> = {} as any

  for (const [style, score] of Object.entries(scores)) {
    percentages[style as ConnectionStyle] = total > 0
      ? Math.round((score / total) * 100)
      : 0
  }

  return percentages
}

/**
 * Generate personalized insights for Connection Compass results
 */
export function generateConnectionInsights(
  primaryStyle: ConnectionStyle,
  secondaryStyle: ConnectionStyle
): string {
  const primary = CONNECTION_STYLES[primaryStyle]
  const secondary = CONNECTION_STYLES[secondaryStyle]

  return `You feel most valued when your partner demonstrates ${primary.name.toLowerCase()} combined with ${secondary.name.toLowerCase()}. ${primary.description.split('.')[0]}. Additionally, ${secondary.description.split('.')[0].toLowerCase()}.`
}

/**
 * Calculate compatibility score between two partners
 */
export function calculateCompatibilityScore(
  user1Scores: Record<ConnectionStyle, number>,
  user2Scores: Record<ConnectionStyle, number>
): {
  overallScore: number
  styleOverlap: number
  complementaryStyles: string[]
} {
  // Calculate overlap percentage (how similar their primary styles are)
  let overlapScore = 0
  const styles = Object.keys(user1Scores) as ConnectionStyle[]

  for (const style of styles) {
    const diff = Math.abs(user1Scores[style] - user2Scores[style])
    overlapScore += (100 - diff)
  }

  const styleOverlap = Math.round(overlapScore / styles.length)

  // Identify complementary patterns
  const complementary: string[] = []

  const user1Primary = determinePrimaryStyles(user1Scores).primary
  const user2Primary = determinePrimaryStyles(user2Scores).primary

  if (user1Primary === user2Primary) {
    complementary.push(`Both value ${CONNECTION_STYLES[user1Primary].name} - strong alignment`)
  } else {
    complementary.push(`Different primary styles can create balance: ${CONNECTION_STYLES[user1Primary].name} and ${CONNECTION_STYLES[user2Primary].name}`)
  }

  // Overall compatibility (weighted)
  const overallScore = Math.round((styleOverlap * 0.7) + 30) // Base score of 30, overlap contributes 70%

  return {
    overallScore,
    styleOverlap,
    complementaryStyles: complementary
  }
}

/**
 * Generate compatibility report content
 */
export function generateCompatibilityReport(
  user1Name: string,
  user2Name: string,
  user1Result: ConnectionCompassResult,
  user2Result: ConnectionCompassResult
): {
  strengths: string[]
  growthAreas: string[]
  communicationTips: string[]
  recommendedActivities: string[]
} {
  const user1Scores: Record<ConnectionStyle, number> = {
    verbal_appreciation: user1Result.verbal_appreciation_score,
    focused_presence: user1Result.focused_presence_score,
    thoughtful_gestures: user1Result.thoughtful_gestures_score,
    supportive_partnership: user1Result.supportive_partnership_score,
    physical_connection: user1Result.physical_connection_score,
    growth_championing: user1Result.growth_championing_score
  }

  const user2Scores: Record<ConnectionStyle, number> = {
    verbal_appreciation: user2Result.verbal_appreciation_score,
    focused_presence: user2Result.focused_presence_score,
    thoughtful_gestures: user2Result.thoughtful_gestures_score,
    supportive_partnership: user2Result.supportive_partnership_score,
    physical_connection: user2Result.physical_connection_score,
    growth_championing: user2Result.growth_championing_score
  }

  const styles = Object.keys(user1Scores) as ConnectionStyle[]

  // Find shared high scores (strengths)
  const strengths: string[] = []
  for (const style of styles) {
    if (user1Scores[style] >= 15 && user2Scores[style] >= 15) {
      strengths.push(`Both value ${CONNECTION_STYLES[style].name} - this is a strong connection point`)
    }
  }

  // Find mismatched scores (growth areas)
  const growthAreas: string[] = []
  for (const style of styles) {
    const diff = Math.abs(user1Scores[style] - user2Scores[style])
    if (diff > 10) {
      const higher = user1Scores[style] > user2Scores[style] ? user1Name : user2Name
      const lower = user1Scores[style] > user2Scores[style] ? user2Name : user1Name
      growthAreas.push(`${higher} values ${CONNECTION_STYLES[style].name} more than ${lower} - be mindful of this difference`)
    }
  }

  // Generate communication tips
  const communicationTips: string[] = [
    `${user1Name}: Show love through ${CONNECTION_STYLES[user1Result.primary_style as ConnectionStyle].name.toLowerCase()}`,
    `${user2Name}: Show love through ${CONNECTION_STYLES[user2Result.primary_style as ConnectionStyle].name.toLowerCase()}`,
    'Discuss your different styles openly and without judgment',
    'Ask your partner how they want to receive appreciation'
  ]

  // Recommend activities based on shared styles
  const recommendedActivities: string[] = [
    'Plan a weekly "connection hour" with phones off',
    'Exchange handwritten appreciation notes',
    'Try a new shared hobby together',
    'Schedule regular check-ins about your relationship'
  ]

  return {
    strengths,
    growthAreas,
    communicationTips,
    recommendedActivities
  }
}

/**
 * Process intake quiz responses to extract profile data
 */
export async function processIntakeProfile(
  env: Env,
  responseId: string
): Promise<{
  relationshipStatus: string
  connectionGoals: string[]
  primaryChallenge: string
  [key: string]: any
}> {
  // Get all answers with question and option metadata
  const answers = await env.DB.prepare(`
    SELECT
      qq.id as question_id,
      qq.question_text,
      qo.option_text,
      qo.metadata,
      qa.answer_text
    FROM quiz_answers qa
    JOIN quiz_questions qq ON qa.question_id = qq.id
    LEFT JOIN quiz_options qo ON qa.option_id = qo.id
    WHERE qa.response_id = ?
    ORDER BY qq.order_num
  `).bind(responseId).all()

  const profile: any = {
    relationshipStatus: '',
    connectionGoals: [],
    primaryChallenge: '',
    idealDateVibe: '',
    energyLevel: '',
    budgetComfort: '',
    planningStyle: '',
    socialPreference: '',
    growthMindset: '',
    communicationQuality: '',
    loveExpression: '',
    availability: []
  }

  // Map answers to profile fields based on question IDs
  for (const answer of answers.results) {
    const questionId = answer.question_id as string
    const metadata = answer.metadata ? JSON.parse(answer.metadata as string) : {}

    switch (questionId) {
      case 'iq-q1': // Relationship Status
        profile.relationshipStatus = metadata.stage || ''
        profile.relationshipStageMonths = metadata.months || 0
        break
      case 'iq-q2': // Connection Goals (multiple)
        profile.connectionGoals.push(metadata.goal_type || answer.option_text)
        break
      case 'iq-q3': // Current Challenge
        profile.primaryChallenge = metadata.challenge || ''
        break
      case 'iq-q4': // Ideal Date Vibe
        profile.idealDateVibe = metadata.vibe || ''
        break
      case 'iq-q5': // Energy Level
        profile.energyLevel = metadata.energy || ''
        break
      case 'iq-q6': // Budget Comfort
        profile.budgetComfort = metadata.budget_label || ''
        break
      case 'iq-q7': // Planning Style
        profile.planningStyle = metadata.planning || ''
        break
      case 'iq-q8': // Social Preference
        profile.socialPreference = metadata.social || ''
        break
      case 'iq-q9': // Growth Mindset
        profile.growthMindset = metadata.growth || ''
        break
      case 'iq-q10': // Communication Quality
        profile.communicationQuality = metadata.communication || ''
        break
      case 'iq-q11': // Love Expression
        profile.loveExpression = metadata.love_style || ''
        break
      case 'iq-q12': // Availability (multiple)
        profile.availability.push(metadata.time_slot || answer.option_text)
        break
    }
  }

  return profile
}

/**
 * Generate personalized experience recommendations from intake profile
 */
export function generateExperienceRecommendations(profile: any): string[] {
  const recommendations: string[] = []

  // Recommend based on date vibe
  const vibeRecommendations: Record<string, string> = {
    adventure: 'Try rock climbing or a hiking trail you\'ve never explored',
    intimate: 'Book a wine tasting with small plates for deep conversation',
    playful: 'Game night at home with your favorite board games and snacks',
    zen: 'Couples yoga class followed by a relaxing spa experience',
    creative: 'Take a pottery or painting class together',
    social: 'Host a dinner party or join a couples meetup group',
    homebody: 'Create a cozy movie marathon with a themed dinner',
    culture: 'Visit a local museum or attend a live theater performance'
  }

  if (profile.idealDateVibe && vibeRecommendations[profile.idealDateVibe]) {
    recommendations.push(vibeRecommendations[profile.idealDateVibe])
  }

  // Recommend based on budget
  const budgetRecommendations: Record<string, string> = {
    free: 'Sunset picnic at a scenic park with homemade favorites',
    budget: 'Coffee shop date followed by a walk in nature',
    moderate: 'Try that new restaurant you\'ve been eyeing',
    flexible: 'Weekend getaway to a nearby city or nature spot',
    generous: 'Book a special experience like hot air ballooning or a chef\'s tasting menu'
  }

  if (profile.budgetComfort && budgetRecommendations[profile.budgetComfort]) {
    recommendations.push(budgetRecommendations[profile.budgetComfort])
  }

  // Recommend based on energy level
  const energyRecommendations: Record<string, string> = {
    high: 'Evening dance class or active outdoor adventure',
    medium: 'Cooking a new recipe together at home',
    low: 'Gentle evening walk followed by a cozy movie night',
    variable: 'Keep a list of flexible plans for both high and low energy days',
    mismatched: 'Plan activities where one can be active while the other relaxes nearby',
    night_owl: 'Late night stargazing or midnight diner adventure'
  }

  if (profile.energyLevel && energyRecommendations[profile.energyLevel]) {
    recommendations.push(energyRecommendations[profile.energyLevel])
  }

  return recommendations.slice(0, 3) // Return top 3 recommendations
}