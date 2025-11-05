// Better Together: TypeScript Type Definitions

export interface User {
  id: string
  email: string
  name: string
  nickname?: string
  profile_photo_url?: string
  phone_number?: string
  timezone: string
  love_language_primary?: LoveLanguage
  love_language_secondary?: LoveLanguage
  relationship_preferences?: string
  created_at: string
  updated_at: string
  last_active_at: string
}

export type LoveLanguage = 
  | 'words_of_affirmation' 
  | 'quality_time' 
  | 'physical_touch' 
  | 'acts_of_service' 
  | 'receiving_gifts'

export interface Relationship {
  id: string
  user_1_id: string
  user_2_id: string
  relationship_type: 'dating' | 'engaged' | 'married' | 'partnership'
  start_date?: string
  anniversary_date?: string
  status: 'active' | 'paused' | 'ended'
  privacy_level: 'private' | 'friends' | 'public'
  created_at: string
  updated_at: string
}

export interface ImportantDate {
  id: string
  relationship_id: string
  date_value: string
  event_name: string
  event_type: 'anniversary' | 'milestone' | 'birthday' | 'holiday' | 'custom'
  description?: string
  is_recurring: boolean
  recurrence_pattern?: string
  reminder_days_before: number
  created_by_user_id: string
  created_at: string
}

export interface SharedGoal {
  id: string
  relationship_id: string
  goal_name: string
  goal_description?: string
  goal_type: 'weekly' | 'monthly' | 'milestone' | 'custom'
  target_count?: number
  current_progress: number
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  start_date?: string
  target_date?: string
  completion_date?: string
  created_by_user_id: string
  created_at: string
  updated_at: string
}

export interface DailyCheckin {
  id: string
  relationship_id: string
  user_id: string
  checkin_date: string
  connection_score?: number
  mood_score?: number
  relationship_satisfaction?: number
  gratitude_note?: string
  support_needed?: string
  highlight_of_day?: string
  created_at: string
}

export interface Activity {
  id: string
  relationship_id: string
  activity_name: string
  activity_type: 'date_night' | 'quality_time' | 'adventure' | 'relaxation' | 'learning' | 'exercise' | 'social' | 'custom'
  description?: string
  location?: string
  planned_date?: string
  completed_date?: string
  duration_minutes?: number
  cost_amount?: number
  satisfaction_rating_user1?: number
  satisfaction_rating_user2?: number
  notes?: string
  photos?: string
  status: 'planned' | 'completed' | 'cancelled'
  created_by_user_id: string
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  challenge_name: string
  challenge_description?: string
  challenge_type: 'daily' | 'weekly' | 'monthly' | 'milestone'
  duration_days?: number
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  category: 'communication' | 'intimacy' | 'adventure' | 'gratitude' | 'quality_time' | 'support'
  instructions?: string
  is_template: boolean
  created_at: string
}

export interface ChallengeParticipation {
  id: string
  relationship_id: string
  challenge_id: string
  start_date: string
  target_end_date?: string
  actual_end_date?: string
  status: 'active' | 'completed' | 'paused' | 'abandoned'
  progress_percentage: number
  completion_notes?: string
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  achievement_name: string
  achievement_description?: string
  achievement_type: 'milestone' | 'streak' | 'completion' | 'special'
  category: 'communication' | 'activities' | 'goals' | 'challenges' | 'consistency'
  icon_url?: string
  requirements?: string
  point_value: number
  is_active: boolean
  created_at: string
}

export interface RelationshipAnalytics {
  id: string
  relationship_id: string
  analytics_date: string
  days_together?: number
  average_connection_score?: number
  average_satisfaction_score?: number
  checkin_streak?: number
  activities_completed_this_month?: number
  goals_completed_this_month?: number
  communication_frequency_score?: number
  overall_health_score?: number
  trends?: string
  created_at: string
}

// API Request/Response Types
export interface CreateUserRequest {
  email: string
  name: string
  nickname?: string
  phone_number?: string
  timezone?: string
  love_language_primary?: LoveLanguage
  love_language_secondary?: LoveLanguage
}

export interface InvitePartnerRequest {
  user_id: string
  partner_email: string
  relationship_type?: string
  start_date?: string
}

export interface CreateGoalRequest {
  relationship_id: string
  goal_name: string
  goal_description?: string
  goal_type: 'weekly' | 'monthly' | 'milestone' | 'custom'
  target_count?: number
  target_date?: string
}

export interface CheckinRequest {
  relationship_id: string
  user_id: string
  connection_score?: number
  mood_score?: number
  relationship_satisfaction?: number
  gratitude_note?: string
  support_needed?: string
  highlight_of_day?: string
}

export interface CreateActivityRequest {
  relationship_id: string
  activity_name: string
  activity_type: string
  description?: string
  location?: string
  planned_date?: string
  cost_amount?: number
}

// Dashboard Data Types
export interface DashboardData {
  relationship: Relationship & {
    partner: User
    days_together: number
  }
  recent_checkins: DailyCheckin[]
  upcoming_dates: ImportantDate[]
  active_goals: SharedGoal[]
  recent_activities: Activity[]
  current_challenges: ChallengeParticipation[]
  analytics: RelationshipAnalytics
  achievements_earned: Achievement[]
  checkin_streak: number
}

// Quiz System Types
export interface Quiz {
  id: string
  title: string
  slug: string
  description?: string
  quiz_type: 'intake' | 'assessment' | 'personality'
  estimated_time_minutes: number
  icon?: string
  is_active: boolean
  requires_partner: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_text: string
  question_subtitle?: string
  question_type: 'single' | 'multiple' | 'scale' | 'ranking' | 'text'
  section_name?: string
  order_num: number
  is_required: boolean
  max_selections?: number
  scale_min?: number
  scale_max?: number
  scale_labels?: string
  metadata?: string
  created_at: string
}

export interface QuizOption {
  id: string
  question_id: string
  option_text: string
  option_subtitle?: string
  icon?: string
  order_num: number
  score_key?: string
  score_value: number
  metadata?: string
  created_at: string
}

export interface QuizResponse {
  id: string
  relationship_id?: string
  user_id: string
  quiz_id: string
  started_at: string
  completed_at?: string
  current_question_index: number
  total_questions: number
  is_completed: boolean
  time_spent_seconds: number
  created_at: string
  updated_at: string
}

export interface QuizAnswer {
  id: string
  response_id: string
  question_id: string
  option_id?: string
  answer_text?: string
  answer_numeric?: number
  answer_data?: string
  answered_at: string
  created_at: string
}

export interface ConnectionCompassResult {
  id: string
  response_id: string
  user_id: string
  relationship_id?: string
  verbal_appreciation_score: number
  focused_presence_score: number
  thoughtful_gestures_score: number
  supportive_partnership_score: number
  physical_connection_score: number
  growth_championing_score: number
  primary_style: string
  secondary_style: string
  total_points: number
  partner_visible: boolean
  insights_text?: string
  action_steps?: string
  created_at: string
  updated_at: string
}

export interface CompatibilityReport {
  id: string
  relationship_id: string
  user1_response_id: string
  user2_response_id: string
  overall_compatibility_score?: number
  style_overlap_percentage?: number
  complementary_styles?: string
  strengths?: string
  growth_areas?: string
  communication_tips?: string
  recommended_activities?: string
  generated_at: string
  expires_at?: string
  is_viewed: boolean
  created_at: string
  updated_at: string
}

export interface IntakeProfile {
  id: string
  response_id: string
  user_id: string
  relationship_id?: string
  relationship_status?: string
  relationship_stage_months?: number
  connection_goals?: string
  primary_challenge?: string
  ideal_date_vibe?: string
  energy_level?: string
  budget_comfort?: string
  planning_style?: string
  social_preference?: string
  growth_mindset?: string
  communication_quality?: string
  love_expression?: string
  availability?: string
  recommended_experiences?: string
  communication_tips?: string
  potential_growth_areas?: string
  red_flags?: string
  profile_completeness: number
  last_updated: string
  created_at: string
  updated_at: string
}

// Quiz API Request/Response Types
export interface StartQuizRequest {
  user_id: string
  relationship_id?: string
  quiz_id: string
}

export interface SubmitQuizAnswerRequest {
  response_id: string
  question_id: string
  option_ids?: string[]
  answer_text?: string
  answer_numeric?: number
  answer_data?: any
}

export interface CompleteQuizRequest {
  response_id: string
  time_spent_seconds: number
}

export interface QuizResultsResponse {
  quiz: Quiz
  response: QuizResponse
  connection_compass_result?: ConnectionCompassResult
  intake_profile?: IntakeProfile
  compatibility_report?: CompatibilityReport
}

export interface QuizWithQuestions extends Quiz {
  questions: (QuizQuestion & { options: QuizOption[] })[]
}

export type ConnectionStyle =
  | 'verbal_appreciation'
  | 'focused_presence'
  | 'thoughtful_gestures'
  | 'supportive_partnership'
  | 'physical_connection'
  | 'growth_championing'

export interface ConnectionStyleInfo {
  key: ConnectionStyle
  name: string
  icon: string
  description: string
  actionSteps: string[]
}

// Cloudflare Environment Bindings
export interface Env {
  DB: D1Database
}

// =============================================================================
// Calendar Matching & Date Suggestions Types
// =============================================================================

export type InterestCategory =
  | 'dining'
  | 'adventure'
  | 'relaxation'
  | 'arts_culture'
  | 'sports'
  | 'entertainment'
  | 'learning'
  | 'travel'
  | 'wellness'
  | 'outdoors'
  | 'gaming'
  | 'music'
  | 'other'

export interface UserInterest {
  id: string
  user_id: string
  category: InterestCategory
  subcategory?: string
  preference_level: number // 1-10
  created_at: string
  updated_at: string
}

export interface BudgetPreference {
  id: string
  relationship_id: string
  budget_type: 'per_date' | 'weekly' | 'monthly' | 'special_occasion'
  min_amount?: number
  max_amount?: number
  currency: string
  preferences_note?: string
  created_at: string
  updated_at: string
}

export interface CalendarAvailability {
  id: string
  user_id: string
  day_of_week: number // 0-6 (Sunday-Saturday)
  start_time: string // "HH:MM"
  end_time: string // "HH:MM"
  is_recurring: boolean
  specific_date?: string
  availability_type: 'free' | 'busy' | 'preferred'
  notes?: string
  created_at: string
  updated_at: string
}

export interface ExperienceCatalog {
  id: string
  experience_name: string
  experience_type: InterestCategory
  description?: string
  location?: string
  venue_name?: string
  estimated_duration_minutes?: number
  cost_min?: number
  cost_max?: number
  currency: string
  rating?: number
  tags?: string
  best_time_of_day?: 'morning' | 'afternoon' | 'evening' | 'night' | 'any'
  best_season?: 'spring' | 'summer' | 'fall' | 'winter' | 'any'
  requires_booking: boolean
  booking_url?: string
  booking_lead_time_days: number
  weather_dependent: boolean
  outdoor_activity: boolean
  physical_intensity?: 'low' | 'medium' | 'high'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DateSuggestion {
  id: string
  relationship_id: string
  experience_id?: string
  suggested_date: string
  suggested_duration_minutes: number
  estimated_cost?: number
  suggestion_reason?: string
  match_score?: number // 0-1
  status: 'pending' | 'accepted' | 'rejected' | 'scheduled' | 'completed'
  accepted_by_user_1: boolean
  accepted_by_user_2: boolean
  activity_id?: string
  generated_at: string
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface CalendarSyncSettings {
  id: string
  user_id: string
  provider: 'google' | 'outlook' | 'apple' | 'other'
  sync_enabled: boolean
  access_token_encrypted?: string
  refresh_token_encrypted?: string
  calendar_ids?: string
  last_sync_at?: string
  sync_frequency_minutes: number
  auto_block_events: boolean
  created_at: string
  updated_at: string
}

export interface MutualFreeTime {
  id: string
  relationship_id: string
  start_datetime: string
  end_datetime: string
  duration_minutes: number
  confidence_score?: number // 0-1
  is_preferred_time: boolean
  last_computed_at: string
}

// API Request/Response Types for Calendar Matching
export interface FindMutualSlotsRequest {
  relationship_id: string
  start_date: string
  end_date: string
  min_duration_minutes?: number
}

export interface FindMutualSlotsResponse {
  relationship_id: string
  date_range: {
    start: string
    end: string
  }
  mutual_free_slots: {
    date: string
    startTime: string
    endTime: string
    durationMinutes: number
    startDatetime: Date
    endDatetime: Date
  }[]
  total_slots: number
}

export interface GenerateSuggestionsRequest {
  relationship_id: string
  start_date: string
  end_date: string
  min_duration_minutes?: number
  budget_min?: number
  budget_max?: number
  max_suggestions?: number
}

export interface GenerateSuggestionsResponse {
  relationship_id: string
  date_range: {
    start: string
    end: string
  }
  suggestions: {
    suggestionId?: string
    experienceId: string
    experienceName: string
    experienceType: InterestCategory
    description?: string
    location?: string
    venueName?: string
    suggestedDate: string
    suggestedDuration: number
    estimatedCost: number
    rating?: number
    matchScore: number
    suggestionReason: string
    requiresBooking: boolean
    bookingUrl?: string
    bookingLeadTime: number
  }[]
  total_suggestions: number
  mutual_slots_found: number
}