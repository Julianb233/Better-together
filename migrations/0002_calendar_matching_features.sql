-- Calendar Matching & Experience Suggestions Migration
-- Adds tables for partner calendar matching, availability tracking, and intelligent suggestions

-- User Interests table - Track individual interests for recommendations
CREATE TABLE IF NOT EXISTS user_interests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('dining', 'adventure', 'relaxation', 'arts_culture', 'sports', 'entertainment', 'learning', 'travel', 'wellness', 'outdoors', 'gaming', 'music', 'other')),
  subcategory TEXT, -- e.g., "Italian cuisine", "rock climbing", "spa day"
  preference_level INTEGER DEFAULT 5 CHECK(preference_level BETWEEN 1 AND 10), -- How much they like it (1-10)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Budget Preferences table - Track budget preferences per relationship
CREATE TABLE IF NOT EXISTS budget_preferences (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  budget_type TEXT NOT NULL CHECK(budget_type IN ('per_date', 'weekly', 'monthly', 'special_occasion')),
  min_amount DECIMAL(10,2),
  max_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  preferences_note TEXT, -- Additional notes about budget preferences
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  UNIQUE(relationship_id, budget_type)
);

-- Calendar Availability table - Track when users are available
CREATE TABLE IF NOT EXISTS calendar_availability (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK(day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time TEXT NOT NULL, -- Format: "HH:MM" (24-hour)
  end_time TEXT NOT NULL, -- Format: "HH:MM" (24-hour)
  is_recurring BOOLEAN DEFAULT TRUE, -- If false, this is a one-time availability
  specific_date DATE, -- For one-time availability
  availability_type TEXT DEFAULT 'free' CHECK(availability_type IN ('free', 'busy', 'preferred')),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Experience Catalog table - Curated experiences for suggestions
CREATE TABLE IF NOT EXISTS experience_catalog (
  id TEXT PRIMARY KEY,
  experience_name TEXT NOT NULL,
  experience_type TEXT NOT NULL CHECK(experience_type IN ('dining', 'adventure', 'relaxation', 'arts_culture', 'sports', 'entertainment', 'learning', 'travel', 'wellness', 'outdoors', 'gaming', 'music', 'other')),
  description TEXT,
  location TEXT,
  venue_name TEXT,
  estimated_duration_minutes INTEGER,
  cost_min DECIMAL(10,2),
  cost_max DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  rating DECIMAL(2,1) CHECK(rating BETWEEN 0 AND 5.0),
  tags TEXT, -- JSON array of tags
  best_time_of_day TEXT CHECK(best_time_of_day IN ('morning', 'afternoon', 'evening', 'night', 'any')),
  best_season TEXT CHECK(best_season IN ('spring', 'summer', 'fall', 'winter', 'any')),
  requires_booking BOOLEAN DEFAULT FALSE,
  booking_url TEXT,
  booking_lead_time_days INTEGER DEFAULT 0,
  weather_dependent BOOLEAN DEFAULT FALSE,
  outdoor_activity BOOLEAN DEFAULT FALSE,
  physical_intensity TEXT CHECK(physical_intensity IN ('low', 'medium', 'high')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Date Suggestions table - AI-generated suggestions for couples
CREATE TABLE IF NOT EXISTS date_suggestions (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  experience_id TEXT, -- NULL for custom suggestions
  suggested_date DATETIME NOT NULL,
  suggested_duration_minutes INTEGER NOT NULL,
  estimated_cost DECIMAL(10,2),
  suggestion_reason TEXT, -- Why this was suggested
  match_score DECIMAL(3,2) CHECK(match_score BETWEEN 0 AND 1), -- 0-1 score of how well it matches preferences
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected', 'scheduled', 'completed')),
  accepted_by_user_1 BOOLEAN DEFAULT FALSE,
  accepted_by_user_2 BOOLEAN DEFAULT FALSE,
  activity_id TEXT, -- Links to activities table if accepted and scheduled
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME, -- When this suggestion expires
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (experience_id) REFERENCES experience_catalog(id) ON DELETE SET NULL,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL
);

-- Calendar Sync Settings table - External calendar integration settings
CREATE TABLE IF NOT EXISTS calendar_sync_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK(provider IN ('google', 'outlook', 'apple', 'other')),
  sync_enabled BOOLEAN DEFAULT TRUE,
  access_token_encrypted TEXT, -- Encrypted OAuth token
  refresh_token_encrypted TEXT,
  calendar_ids TEXT, -- JSON array of calendar IDs to sync
  last_sync_at DATETIME,
  sync_frequency_minutes INTEGER DEFAULT 30,
  auto_block_events BOOLEAN DEFAULT TRUE, -- Auto-mark calendar events as busy
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, provider)
);

-- Mutual Free Time Slots table - Pre-computed available slots for both partners
CREATE TABLE IF NOT EXISTS mutual_free_time (
  id TEXT PRIMARY KEY,
  relationship_id TEXT NOT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  confidence_score DECIMAL(3,2) CHECK(confidence_score BETWEEN 0 AND 1), -- How confident we are this time is free
  is_preferred_time BOOLEAN DEFAULT FALSE, -- Based on past activity patterns
  last_computed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_interests_user ON user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_category ON user_interests(category, preference_level);
CREATE INDEX IF NOT EXISTS idx_budget_preferences_relationship ON budget_preferences(relationship_id);
CREATE INDEX IF NOT EXISTS idx_calendar_availability_user ON calendar_availability(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_availability_day ON calendar_availability(day_of_week, availability_type);
CREATE INDEX IF NOT EXISTS idx_calendar_availability_date ON calendar_availability(specific_date);
CREATE INDEX IF NOT EXISTS idx_experience_catalog_type ON experience_catalog(experience_type, is_active);
CREATE INDEX IF NOT EXISTS idx_experience_catalog_cost ON experience_catalog(cost_min, cost_max);
CREATE INDEX IF NOT EXISTS idx_date_suggestions_relationship ON date_suggestions(relationship_id, status);
CREATE INDEX IF NOT EXISTS idx_date_suggestions_date ON date_suggestions(suggested_date);
CREATE INDEX IF NOT EXISTS idx_date_suggestions_score ON date_suggestions(match_score);
CREATE INDEX IF NOT EXISTS idx_calendar_sync_user ON calendar_sync_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_mutual_free_time_relationship ON mutual_free_time(relationship_id);
CREATE INDEX IF NOT EXISTS idx_mutual_free_time_datetime ON mutual_free_time(start_datetime, end_datetime);
