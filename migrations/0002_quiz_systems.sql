-- Migration: Quiz Systems
-- Description: Creates tables for Intake Quiz and Connection Compass Assessment
-- Date: 2025-11-05

-- ============================================================================
-- QUIZ TEMPLATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE, -- e.g., 'intake-quiz', 'connection-compass'
    description TEXT,
    quiz_type TEXT NOT NULL, -- 'intake', 'assessment', 'personality'
    estimated_time_minutes INTEGER DEFAULT 10,
    icon TEXT, -- Emoji or icon class
    is_active BOOLEAN DEFAULT 1,
    requires_partner BOOLEAN DEFAULT 0, -- If both partners need to complete
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- QUIZ QUESTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    question_subtitle TEXT, -- Additional context or instruction
    question_type TEXT NOT NULL, -- 'single', 'multiple', 'scale', 'ranking', 'text'
    section_name TEXT, -- For grouping questions (e.g., 'Round 1', 'Round 2')
    order_num INTEGER NOT NULL,
    is_required BOOLEAN DEFAULT 1,
    max_selections INTEGER, -- For multiple choice
    scale_min INTEGER, -- For scale questions
    scale_max INTEGER, -- For scale questions
    scale_labels TEXT, -- JSON array of labels for scale
    metadata TEXT, -- JSON for additional config
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- ============================================================================
-- QUIZ OPTIONS TABLE (for choice-based questions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_options (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL,
    option_text TEXT NOT NULL,
    option_subtitle TEXT, -- Additional description
    icon TEXT, -- Emoji or icon
    order_num INTEGER NOT NULL,
    score_key TEXT, -- For connection compass: 'verbal_appreciation', 'focused_presence', etc.
    score_value INTEGER DEFAULT 0,
    metadata TEXT, -- JSON for additional data
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

-- ============================================================================
-- USER QUIZ RESPONSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
    id TEXT PRIMARY KEY,
    relationship_id TEXT,
    user_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    current_question_index INTEGER DEFAULT 0,
    total_questions INTEGER,
    is_completed BOOLEAN DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    UNIQUE(relationship_id, user_id, quiz_id)
);

-- ============================================================================
-- QUIZ ANSWERS TABLE (individual question responses)
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_answers (
    id TEXT PRIMARY KEY,
    response_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    option_id TEXT, -- For choice questions (can be multiple for multi-select)
    answer_text TEXT, -- For text questions
    answer_numeric INTEGER, -- For scale/ranking questions
    answer_data TEXT, -- JSON for complex answers (rankings, etc.)
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (response_id) REFERENCES quiz_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES quiz_options(id) ON DELETE SET NULL
);

-- ============================================================================
-- CONNECTION COMPASS RESULTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS connection_compass_results (
    id TEXT PRIMARY KEY,
    response_id TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    relationship_id TEXT,

    -- The 6 Connection Styles (percentages)
    verbal_appreciation_score INTEGER DEFAULT 0,
    focused_presence_score INTEGER DEFAULT 0,
    thoughtful_gestures_score INTEGER DEFAULT 0,
    supportive_partnership_score INTEGER DEFAULT 0,
    physical_connection_score INTEGER DEFAULT 0,
    growth_championing_score INTEGER DEFAULT 0,

    -- Primary and Secondary Styles
    primary_style TEXT,
    secondary_style TEXT,

    -- Additional metrics
    total_points INTEGER DEFAULT 0,

    -- Visibility settings
    partner_visible BOOLEAN DEFAULT 1,

    -- Personalized insights (generated by AI or algorithm)
    insights_text TEXT,
    action_steps TEXT, -- JSON array of recommendations

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (response_id) REFERENCES quiz_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- ============================================================================
-- COMPATIBILITY REPORTS TABLE (when both partners complete)
-- ============================================================================
CREATE TABLE IF NOT EXISTS compatibility_reports (
    id TEXT PRIMARY KEY,
    relationship_id TEXT NOT NULL,
    user1_response_id TEXT NOT NULL,
    user2_response_id TEXT NOT NULL,

    -- Compatibility metrics
    overall_compatibility_score INTEGER, -- 0-100
    style_overlap_percentage INTEGER,
    complementary_styles TEXT, -- JSON describing complementary patterns

    -- Areas of alignment and growth
    strengths TEXT, -- JSON array
    growth_areas TEXT, -- JSON array
    communication_tips TEXT, -- JSON array
    recommended_activities TEXT, -- JSON array

    -- Report metadata
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME, -- For re-assessment prompts
    is_viewed BOOLEAN DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE,
    FOREIGN KEY (user1_response_id) REFERENCES quiz_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_response_id) REFERENCES quiz_responses(id) ON DELETE CASCADE,
    UNIQUE(relationship_id, user1_response_id, user2_response_id)
);

-- ============================================================================
-- INTAKE QUIZ PROFILES TABLE (AI-generated user profiles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS intake_profiles (
    id TEXT PRIMARY KEY,
    response_id TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    relationship_id TEXT,

    -- Profile data from intake quiz
    relationship_status TEXT,
    relationship_stage_months INTEGER,
    connection_goals TEXT, -- JSON array
    primary_challenge TEXT,
    ideal_date_vibe TEXT,
    energy_level TEXT,
    budget_comfort TEXT,
    planning_style TEXT,
    social_preference TEXT,
    growth_mindset TEXT,
    communication_quality TEXT,
    love_expression TEXT,
    availability TEXT, -- JSON array of time slots

    -- AI-generated recommendations
    recommended_experiences TEXT, -- JSON array of 3 initial recommendations
    communication_tips TEXT, -- JSON array
    potential_growth_areas TEXT, -- JSON array
    red_flags TEXT, -- JSON array of things to watch for

    -- Profile metadata
    profile_completeness INTEGER DEFAULT 0, -- 0-100%
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (response_id) REFERENCES quiz_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (relationship_id) REFERENCES relationships(id) ON DELETE CASCADE
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Quiz lookups
CREATE INDEX IF NOT EXISTS idx_quizzes_slug ON quizzes(slug);
CREATE INDEX IF NOT EXISTS idx_quizzes_type ON quizzes(quiz_type);
CREATE INDEX IF NOT EXISTS idx_quizzes_active ON quizzes(is_active);

-- Question lookups
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_order ON quiz_questions(quiz_id, order_num);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_section ON quiz_questions(quiz_id, section_name);

-- Option lookups
CREATE INDEX IF NOT EXISTS idx_quiz_options_question_order ON quiz_options(question_id, order_num);

-- Response lookups
CREATE INDEX IF NOT EXISTS idx_quiz_responses_user ON quiz_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_relationship ON quiz_responses(relationship_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_quiz ON quiz_responses(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_completed ON quiz_responses(is_completed);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_user_quiz ON quiz_responses(user_id, quiz_id);

-- Answer lookups
CREATE INDEX IF NOT EXISTS idx_quiz_answers_response ON quiz_answers(response_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_question ON quiz_answers(question_id);

-- Connection compass results
CREATE INDEX IF NOT EXISTS idx_connection_compass_user ON connection_compass_results(user_id);
CREATE INDEX IF NOT EXISTS idx_connection_compass_relationship ON connection_compass_results(relationship_id);
CREATE INDEX IF NOT EXISTS idx_connection_compass_response ON connection_compass_results(response_id);

-- Compatibility reports
CREATE INDEX IF NOT EXISTS idx_compatibility_relationship ON compatibility_reports(relationship_id);
CREATE INDEX IF NOT EXISTS idx_compatibility_viewed ON compatibility_reports(is_viewed);

-- Intake profiles
CREATE INDEX IF NOT EXISTS idx_intake_profiles_user ON intake_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_intake_profiles_relationship ON intake_profiles(relationship_id);
CREATE INDEX IF NOT EXISTS idx_intake_profiles_response ON intake_profiles(response_id);
