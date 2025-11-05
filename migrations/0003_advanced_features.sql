-- Advanced Features Migration for Calendar Matching System
-- Adds tables for learning, feedback, context awareness, social proof, and premium features

-- =============================================================================
-- Learning & Feedback System
-- =============================================================================

-- Activity Feedback - Learn from what couples actually enjoy
CREATE TABLE IF NOT EXISTS activity_feedback (
  id TEXT PRIMARY KEY,
  activity_id TEXT NOT NULL,
  relationship_id TEXT NOT NULL,
  suggested_experience_id TEXT,
  user_1_rating INTEGER CHECK(user_1_rating BETWEEN 1 AND 5),
  user_2_rating INTEGER CHECK(user_2_rating BETWEEN 1 AND 5),
  both_enjoyed BOOLEAN DEFAULT FALSE,
  would_repeat BOOLEAN DEFAULT FALSE,
  time_of_day_was_good BOOLEAN DEFAULT TRUE,
  cost_felt_right BOOLEAN DEFAULT TRUE,
  energy_level_match BOOLEAN DEFAULT TRUE,
  feedback_notes TEXT,
  suggested_improvements TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (suggested_experience_id) REFERENCES experience_catalog(id) ON DELETE SET NULL
);

-- Experience Learning Scores - Adjust match scores based on history
CREATE TABLE IF NOT EXISTS experience_learning_scores (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  experience_type TEXT NOT NULL,
  times_suggested INTEGER DEFAULT 0,
  times_accepted INTEGER DEFAULT 0,
  times_enjoyed INTEGER DEFAULT 0, -- Both rated 4+
  success_rate DECIMAL(3,2) DEFAULT 0.0,
  score_adjustment DECIMAL(3,2) DEFAULT 0.0, -- -0.3 to +0.3
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  UNIQUE(relationship_id, experience_type)
);

-- =============================================================================
-- Context Awareness & Predictive Scheduling
-- =============================================================================

-- Scheduling Patterns - Learn when couples prefer dates
CREATE TABLE IF NOT EXISTS scheduling_patterns (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  preferred_day_of_week INTEGER, -- 0-6, most common day
  preferred_hour INTEGER, -- 0-23, most common start time
  typical_duration_minutes INTEGER,
  planning_lead_time_days INTEGER, -- How far in advance they book
  morning_dates_count INTEGER DEFAULT 0,
  afternoon_dates_count INTEGER DEFAULT 0,
  evening_dates_count INTEGER DEFAULT 0,
  night_dates_count INTEGER DEFAULT 0,
  last_computed DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  UNIQUE(relationship_id)
);

-- Relationship Context Snapshots - Track relationship state for context-aware suggestions
CREATE TABLE IF NOT EXISTS relationship_context (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  snapshot_date DATE NOT NULL,
  avg_stress_level DECIMAL(3,1), -- From recent check-ins
  avg_connection_score DECIMAL(3,1),
  days_since_last_date INTEGER,
  recent_conflict_detected BOOLEAN DEFAULT FALSE,
  energy_level_trend TEXT CHECK(energy_level_trend IN ('high', 'medium', 'low')),
  upcoming_milestone_days INTEGER, -- Days until next important date
  suggestion_context TEXT, -- JSON with detailed context
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- =============================================================================
-- External Calendar Integration
-- =============================================================================

-- Calendar Sync Jobs - Track sync operations
CREATE TABLE IF NOT EXISTS calendar_sync_jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  sync_type TEXT CHECK(sync_type IN ('manual', 'auto', 'background')) DEFAULT 'manual',
  status TEXT CHECK(status IN ('pending', 'running', 'completed', 'failed')) DEFAULT 'pending',
  events_imported INTEGER DEFAULT 0,
  events_updated INTEGER DEFAULT 0,
  started_at DATETIME,
  completed_at DATETIME,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Synced Calendar Events - Store imported busy times
CREATE TABLE IF NOT EXISTS synced_calendar_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  external_event_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  event_title TEXT,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  is_flexible BOOLEAN DEFAULT FALSE, -- Some events like "lunch" might be flexible
  is_all_day BOOLEAN DEFAULT FALSE,
  location TEXT,
  last_synced DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, external_event_id, provider)
);

-- =============================================================================
-- Weather & Real-Time Context
-- =============================================================================

-- Weather Cache - Cache weather forecasts
CREATE TABLE IF NOT EXISTS weather_cache (
  id TEXT PRIMARY KEY,
  location TEXT NOT NULL,
  forecast_date DATE NOT NULL,
  temperature_high DECIMAL(4,1),
  temperature_low DECIMAL(4,1),
  precipitation_probability DECIMAL(3,2),
  conditions TEXT, -- "sunny", "rainy", "cloudy", etc.
  wind_speed DECIMAL(4,1),
  cached_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  UNIQUE(location, forecast_date)
);

-- =============================================================================
-- Partner Business Integration & Booking
-- =============================================================================

-- Partner Businesses - Local businesses with API integration
CREATE TABLE IF NOT EXISTS partner_businesses (
  id TEXT PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  location TEXT,
  api_provider TEXT, -- "opentable", "resy", "custom", etc.
  api_endpoint TEXT,
  api_credentials_encrypted TEXT,
  commission_rate DECIMAL(4,2) DEFAULT 10.00, -- Percentage
  is_active BOOLEAN DEFAULT TRUE,
  booking_enabled BOOLEAN DEFAULT FALSE,
  contact_email TEXT,
  contact_phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bookings & Reservations - Track bookings made through the platform
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  activity_id TEXT,
  suggestion_id TEXT,
  partner_business_id TEXT,
  booking_type TEXT CHECK(booking_type IN ('reservation', 'ticket', 'appointment', 'other')),
  external_booking_id TEXT,
  booking_status TEXT CHECK(booking_status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  booking_datetime DATETIME NOT NULL,
  party_size INTEGER DEFAULT 2,
  special_requests TEXT,
  confirmation_code TEXT,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  commission_earned DECIMAL(10,2),
  booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cancelled_at DATETIME,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL,
  FOREIGN KEY (suggestion_id) REFERENCES date_suggestions(id) ON DELETE SET NULL,
  FOREIGN KEY (partner_business_id) REFERENCES partner_businesses(id) ON DELETE SET NULL
);

-- =============================================================================
-- Social Proof & Reviews
-- =============================================================================

-- Couple Reviews - Reviews from other couples
CREATE TABLE IF NOT EXISTS couple_reviews (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  experience_id TEXT NOT NULL,
  activity_id TEXT,
  overall_rating INTEGER NOT NULL CHECK(overall_rating BETWEEN 1 AND 5),
  romantic_rating INTEGER CHECK(romantic_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK(value_rating BETWEEN 1 AND 5),
  service_rating INTEGER CHECK(service_rating BETWEEN 1 AND 5),
  review_text TEXT,
  tags TEXT, -- JSON array: ["romantic", "loud", "great_for_anniversaries"]
  would_recommend BOOLEAN DEFAULT TRUE,
  visited_date DATE,
  is_anonymous BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (experience_id) REFERENCES experience_catalog(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL
);

-- Review Helpfulness - Track which reviews are helpful
CREATE TABLE IF NOT EXISTS review_helpfulness (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  relationship_id TEXT NOT NULL,
  is_helpful BOOLEAN NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES couple_reviews(id) ON DELETE CASCADE,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  UNIQUE(review_id, relationship_id)
);

-- =============================================================================
-- Premium Features & Subscription
-- =============================================================================

-- Subscriptions - Track subscription tiers
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK(tier IN ('free', 'plus', 'premium')) DEFAULT 'free',
  status TEXT NOT NULL CHECK(status IN ('active', 'cancelled', 'expired', 'trial')) DEFAULT 'trial',
  billing_cycle TEXT CHECK(billing_cycle IN ('monthly', 'annual')),
  price_paid DECIMAL(10,2),
  trial_ends_at DATETIME,
  current_period_start DATETIME,
  current_period_end DATETIME,
  cancelled_at DATETIME,
  cancellation_reason TEXT,
  stripe_subscription_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- Feature Usage Tracking - Track API usage for rate limiting
CREATE TABLE IF NOT EXISTS feature_usage (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  feature_name TEXT NOT NULL, -- "suggestions_generated", "calendar_syncs", etc.
  usage_count INTEGER DEFAULT 1,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  UNIQUE(relationship_id, feature_name, period_start)
);

-- =============================================================================
-- AI & Enhanced Suggestions
-- =============================================================================

-- Date Guides - AI-generated date preparation guides
CREATE TABLE IF NOT EXISTS date_guides (
  id TEXT PRIMARY KEY,
  suggestion_id TEXT,
  activity_id TEXT,
  experience_id TEXT,
  relationship_id TEXT NOT NULL,
  conversation_starters TEXT, -- JSON array
  fun_facts TEXT, -- JSON array
  photo_opportunities TEXT, -- JSON array with locations
  what_to_wear TEXT,
  parking_tips TEXT,
  insider_tips TEXT, -- JSON array
  weather_considerations TEXT,
  estimated_prep_time_minutes INTEGER,
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (suggestion_id) REFERENCES date_suggestions(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  FOREIGN KEY (experience_id) REFERENCES experience_catalog(id) ON DELETE SET NULL,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- Suggestion Enhancement Log - Track real-time enhancements applied
CREATE TABLE IF NOT EXISTS suggestion_enhancements (
  id TEXT PRIMARY KEY,
  suggestion_id TEXT NOT NULL,
  enhancement_type TEXT NOT NULL, -- "weather_warning", "booking_check", "traffic_alert", "local_event"
  enhancement_data TEXT, -- JSON with details
  severity TEXT CHECK(severity IN ('info', 'warning', 'critical')),
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (suggestion_id) REFERENCES date_suggestions(id) ON DELETE CASCADE
);

-- =============================================================================
-- Background Jobs & Processing
-- =============================================================================

-- Background Jobs Queue
CREATE TABLE IF NOT EXISTS background_jobs (
  id TEXT PRIMARY KEY,
  job_type TEXT NOT NULL, -- "weekly_suggestions", "calendar_sync", "analytics_update"
  relationship_id TEXT,
  user_id TEXT,
  status TEXT CHECK(status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  priority INTEGER DEFAULT 5, -- 1-10, higher = more urgent
  scheduled_for DATETIME,
  started_at DATETIME,
  completed_at DATETIME,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  error_message TEXT,
  job_data TEXT, -- JSON with job-specific data
  result_data TEXT, -- JSON with results
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================================================
-- Group Dates
-- =============================================================================

-- Group Date Invitations
CREATE TABLE IF NOT EXISTS group_date_invitations (
  id TEXT PRIMARY KEY,
  host_relationship_id TEXT NOT NULL,
  invited_relationship_id TEXT NOT NULL,
  suggestion_id TEXT,
  activity_id TEXT,
  invitation_status TEXT CHECK(invitation_status IN ('pending', 'accepted', 'declined', 'cancelled')) DEFAULT 'pending',
  invited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME,
  FOREIGN KEY (host_relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (invited_relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (suggestion_id) REFERENCES date_suggestions(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- =============================================================================
-- Create Indexes for Performance
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_activity_feedback_relationship ON activity_feedback(relationship_id);
CREATE INDEX IF NOT EXISTS idx_activity_feedback_experience ON activity_feedback(suggested_experience_id);
CREATE INDEX IF NOT EXISTS idx_experience_learning_relationship ON experience_learning_scores(relationship_id);
CREATE INDEX IF NOT EXISTS idx_scheduling_patterns_relationship ON scheduling_patterns(relationship_id);
CREATE INDEX IF NOT EXISTS idx_relationship_context_relationship_date ON relationship_context(relationship_id, snapshot_date);
CREATE INDEX IF NOT EXISTS idx_calendar_sync_jobs_user_status ON calendar_sync_jobs(user_id, status);
CREATE INDEX IF NOT EXISTS idx_synced_events_user_datetime ON synced_calendar_events(user_id, start_datetime, end_datetime);
CREATE INDEX IF NOT EXISTS idx_weather_cache_location_date ON weather_cache(location, forecast_date);
CREATE INDEX IF NOT EXISTS idx_partner_businesses_active ON partner_businesses(is_active, booking_enabled);
CREATE INDEX IF NOT EXISTS idx_bookings_relationship ON bookings(relationship_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_couple_reviews_experience ON couple_reviews(experience_id);
CREATE INDEX IF NOT EXISTS idx_couple_reviews_rating ON couple_reviews(overall_rating);
CREATE INDEX IF NOT EXISTS idx_subscriptions_relationship_status ON subscriptions(relationship_id, status);
CREATE INDEX IF NOT EXISTS idx_feature_usage_relationship_period ON feature_usage(relationship_id, period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_date_guides_suggestion ON date_guides(suggestion_id);
CREATE INDEX IF NOT EXISTS idx_background_jobs_status_scheduled ON background_jobs(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_background_jobs_type_relationship ON background_jobs(job_type, relationship_id);
CREATE INDEX IF NOT EXISTS idx_group_invitations_host ON group_date_invitations(host_relationship_id);
CREATE INDEX IF NOT EXISTS idx_group_invitations_invited ON group_date_invitations(invited_relationship_id);
