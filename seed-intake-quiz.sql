-- Seed Data: Intake Quiz - "Discover Your Relationship Journey"
-- Description: Populates the intake quiz with all 12 questions and options
-- Run after: 0002_quiz_systems.sql migration

-- ============================================================================
-- INSERT INTAKE QUIZ TEMPLATE
-- ============================================================================
INSERT INTO quizzes (id, title, slug, description, quiz_type, estimated_time_minutes, icon, is_active, requires_partner, display_order)
VALUES (
    'intake-quiz-001',
    'Discover Your Relationship Journey',
    'intake-quiz',
    'A progressive, conversational assessment to understand where you are and where you want to go in your relationship.',
    'intake',
    8,
    '🌱',
    1,
    0,
    1
);

-- ============================================================================
-- QUESTION 1: Relationship Status
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q1',
    'intake-quiz-001',
    'Let''s start with where you are in your journey together...',
    'Relationship Status',
    'single',
    'Getting to Know You',
    1,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q1-o1', 'iq-q1', 'Just started dating (0-6 months)', '🌱', 1, '{"stage": "early_dating", "months": 3}'),
    ('iq-q1-o2', 'iq-q1', 'Dating (6+ months)', '🌿', 2, '{"stage": "dating", "months": 9}'),
    ('iq-q1-o3', 'iq-q1', 'In a committed relationship', '💑', 3, '{"stage": "committed", "months": 18}'),
    ('iq-q1-o4', 'iq-q1', 'Engaged', '💍', 4, '{"stage": "engaged", "months": 24}'),
    ('iq-q1-o5', 'iq-q1', 'Newlyweds (married <2 years)', '👰‍♀️', 5, '{"stage": "newlywed", "months": 18}'),
    ('iq-q1-o6', 'iq-q1', 'Married (2-10 years)', '💏', 6, '{"stage": "married_mid", "months": 72}'),
    ('iq-q1-o7', 'iq-q1', 'Married (10+ years)', '❤️', 7, '{"stage": "married_long", "months": 144}'),
    ('iq-q1-o8', 'iq-q1', 'Starting fresh (reconciling/renewed commitment)', '🔄', 8, '{"stage": "renewed", "months": 6}');

-- ============================================================================
-- QUESTION 2: Connection Goals
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, max_selections)
VALUES (
    'iq-q2',
    'intake-quiz-001',
    'What would make your relationship feel even stronger?',
    'Select up to 3',
    'multiple',
    'Getting to Know You',
    2,
    1,
    3
);

INSERT INTO quiz_options (id, question_id, option_text, order_num, metadata)
VALUES
    ('iq-q2-o1', 'iq-q2', 'Deeper emotional intimacy', 1, '{"goal_type": "intimacy"}'),
    ('iq-q2-o2', 'iq-q2', 'Better communication during conflicts', 2, '{"goal_type": "conflict_resolution"}'),
    ('iq-q2-o3', 'iq-q2', 'More quality time together', 3, '{"goal_type": "quality_time"}'),
    ('iq-q2-o4', 'iq-q2', 'Reigniting romance and passion', 4, '{"goal_type": "romance"}'),
    ('iq-q2-o5', 'iq-q2', 'Building shared experiences', 5, '{"goal_type": "experiences"}'),
    ('iq-q2-o6', 'iq-q2', 'Aligning on future goals', 6, '{"goal_type": "future_planning"}'),
    ('iq-q2-o7', 'iq-q2', 'Managing daily stress together', 7, '{"goal_type": "stress_management"}'),
    ('iq-q2-o8', 'iq-q2', 'Having more fun and playfulness', 8, '{"goal_type": "playfulness"}');

-- ============================================================================
-- QUESTION 3: Current Challenge
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q3',
    'intake-quiz-001',
    'Every relationship has growth areas. What feels most challenging right now?',
    'Current Challenge',
    'single',
    'Getting to Know You',
    3,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q3-o1', 'iq-q3', 'We get distracted by technology/work', '📱', 1, '{"challenge": "distraction"}'),
    ('iq-q3-o2', 'iq-q3', 'Finding time for just us', '⏰', 2, '{"challenge": "time_scarcity"}'),
    ('iq-q3-o3', 'iq-q3', 'Expressing feelings openly', '💬', 3, '{"challenge": "emotional_expression"}'),
    ('iq-q3-o4', 'iq-q3', 'Stuck in routine/feeling bored', '🔄', 4, '{"challenge": "routine"}'),
    ('iq-q3-o5', 'iq-q3', 'Financial stress affecting us', '💰', 5, '{"challenge": "financial"}'),
    ('iq-q3-o6', 'iq-q3', 'Balancing household responsibilities', '🏠', 6, '{"challenge": "household"}'),
    ('iq-q3-o7', 'iq-q3', 'Parenting taking all our energy', '👨‍👩‍👧', 7, '{"challenge": "parenting"}'),
    ('iq-q3-o8', 'iq-q3', 'Different life goals or priorities', '🎯', 8, '{"challenge": "goal_alignment"}');

-- ============================================================================
-- QUESTION 4: Ideal Date Vibe
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q4',
    'intake-quiz-001',
    'Picture your perfect time together. What does it look like?',
    'Ideal Date Vibe',
    'single',
    'Your Preferences',
    4,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, option_subtitle, icon, order_num, metadata)
VALUES
    ('iq-q4-o1', 'iq-q4', 'Adventure Seekers', 'Trying something new and exciting', '🏔️', 1, '{"vibe": "adventure"}'),
    ('iq-q4-o2', 'iq-q4', 'Intimate Connectors', 'Deep conversation over wine', '🍷', 2, '{"vibe": "intimate"}'),
    ('iq-q4-o3', 'iq-q4', 'Playful Partners', 'Games, laughs, and friendly competition', '🎮', 3, '{"vibe": "playful"}'),
    ('iq-q4-o4', 'iq-q4', 'Zen Duo', 'Peaceful, relaxing, recharging together', '🧘', 4, '{"vibe": "zen"}'),
    ('iq-q4-o5', 'iq-q4', 'Creative Souls', 'Making, building, or learning something', '🎨', 5, '{"vibe": "creative"}'),
    ('iq-q4-o6', 'iq-q4', 'Social Butterflies', 'Out with friends or meeting new people', '🌃', 6, '{"vibe": "social"}'),
    ('iq-q4-o7', 'iq-q4', 'Homebodies', 'Cozy night in, just us', '🏡', 7, '{"vibe": "homebody"}'),
    ('iq-q4-o8', 'iq-q4', 'Culture Enthusiasts', 'Museums, theater, concerts', '🎭', 8, '{"vibe": "culture"}');

-- ============================================================================
-- QUESTION 5: Energy & Activity Level
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q5',
    'intake-quiz-001',
    'How do you both typically feel at the end of a workday?',
    'Energy & Activity Level',
    'single',
    'Your Preferences',
    5,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q5-o1', 'iq-q5', 'Ready to go out and do something active', '🚀', 1, '{"energy": "high"}'),
    ('iq-q5-o2', 'iq-q5', 'Up for something low-key but engaging', '😊', 2, '{"energy": "medium"}'),
    ('iq-q5-o3', 'iq-q5', 'Need to relax and decompress first', '😴', 3, '{"energy": "low"}'),
    ('iq-q5-o4', 'iq-q5', 'It varies wildly day to day', '🎲', 4, '{"energy": "variable"}'),
    ('iq-q5-o5', 'iq-q5', 'One of us has energy, the other doesn''t', '💪', 5, '{"energy": "mismatched"}'),
    ('iq-q5-o6', 'iq-q5', 'We''re night owls - energy comes later', '🌙', 6, '{"energy": "night_owl"}');

-- ============================================================================
-- QUESTION 6: Budget Comfort
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q6',
    'intake-quiz-001',
    'When it comes to experiences and dates, what feels comfortable?',
    'Budget Comfort',
    'single',
    'Your Preferences',
    6,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, option_subtitle, icon, order_num, metadata)
VALUES
    ('iq-q6-o1', 'iq-q6', 'Free & Creative', 'Parks, home activities, free events', '💚', 1, '{"budget_range": "0-0", "budget_label": "free"}'),
    ('iq-q6-o2', 'iq-q6', 'Budget-Friendly', 'Coffee dates, casual outings', '💙', 2, '{"budget_range": "25-50", "budget_label": "budget"}'),
    ('iq-q6-o3', 'iq-q6', 'Moderate', 'Dinner out, local activities', '💜', 3, '{"budget_range": "50-100", "budget_label": "moderate"}'),
    ('iq-q6-o4', 'iq-q6', 'Flexible', 'Special experiences when worth it', '💛', 4, '{"budget_range": "100-200", "budget_label": "flexible"}'),
    ('iq-q6-o5', 'iq-q6', 'Generous', 'Premium experiences, no restrictions', '❤️', 5, '{"budget_range": "200+", "budget_label": "generous"}'),
    ('iq-q6-o6', 'iq-q6', 'Varies', 'Depends on the occasion', '🎯', 6, '{"budget_range": "varies", "budget_label": "varies"}');

-- ============================================================================
-- QUESTION 7: Planning Style
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q7',
    'intake-quiz-001',
    'How do you prefer to plan your time together?',
    'Planning Style',
    'single',
    'Your Preferences',
    7,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q7-o1', 'iq-q7', 'We love planning ahead and anticipating', '📅', 1, '{"planning": "planner"}'),
    ('iq-q7-o2', 'iq-q7', 'Spontaneous - best moments are unplanned', '⚡', 2, '{"planning": "spontaneous"}'),
    ('iq-q7-o3', 'iq-q7', 'Mix of both - some planned, some surprises', '🎲', 3, '{"planning": "mixed"}'),
    ('iq-q7-o4', 'iq-q7', 'We struggle with this and need help', '🤷', 4, '{"planning": "need_help"}'),
    ('iq-q7-o5', 'iq-q7', 'One plans, the other goes along', '📱', 5, '{"planning": "one_sided"}'),
    ('iq-q7-o6', 'iq-q7', 'We take turns surprising each other', '🔄', 6, '{"planning": "alternating"}');

-- ============================================================================
-- QUESTION 8: Social Preferences
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q8',
    'intake-quiz-001',
    'How do you prefer to spend couple time?',
    'Social Preferences',
    'single',
    'Your Style',
    8,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, option_subtitle, icon, order_num, metadata)
VALUES
    ('iq-q8-o1', 'iq-q8', 'Just Us', 'Alone time is sacred', '👥', 1, '{"social": "private"}'),
    ('iq-q8-o2', 'iq-q8', 'Double Dates', 'Love other couple friends', '👫', 2, '{"social": "double_dates"}'),
    ('iq-q8-o3', 'iq-q8', 'Family Included', 'Kids/family often involved', '👨‍👩‍👧‍👦', 3, '{"social": "family"}'),
    ('iq-q8-o4', 'iq-q8', 'Group Settings', 'The more the merrier', '🎉', 4, '{"social": "group"}'),
    ('iq-q8-o5', 'iq-q8', 'Balanced Mix', 'Variety is key', '🔄', 5, '{"social": "balanced"}'),
    ('iq-q8-o6', 'iq-q8', 'Parallel Play', 'Together but doing own things', '🏠', 6, '{"social": "parallel"}');

-- ============================================================================
-- QUESTION 9: Growth Mindset
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q9',
    'intake-quiz-001',
    'What''s your attitude toward relationship development?',
    'Growth Mindset',
    'single',
    'Your Style',
    9,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q9-o1', 'iq-q9', 'We actively read/learn about relationships', '📚', 1, '{"growth": "proactive_learner"}'),
    ('iq-q9-o2', 'iq-q9', 'We''re open to coaching or guidance', '💬', 2, '{"growth": "coaching_open"}'),
    ('iq-q9-o3', 'iq-q9', 'We want to grow but don''t know how', '🌱', 3, '{"growth": "seeking_guidance"}'),
    ('iq-q9-o4', 'iq-q9', 'We figure things out ourselves', '💪', 4, '{"growth": "self_sufficient"}'),
    ('iq-q9-o5', 'iq-q9', 'We address issues as they come up', '🎯', 5, '{"growth": "reactive"}'),
    ('iq-q9-o6', 'iq-q9', 'We''re good - just want fun ideas', '❤️', 6, '{"growth": "maintenance_mode"}');

-- ============================================================================
-- QUESTION 10: Communication Check
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q10',
    'intake-quiz-001',
    'How would you describe your current communication?',
    'Communication Check',
    'single',
    'Your Style',
    10,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, option_subtitle, icon, order_num, metadata)
VALUES
    ('iq-q10-o1', 'iq-q10', 'Excellent', 'We talk about everything openly', '⭐', 1, '{"communication": "excellent"}'),
    ('iq-q10-o2', 'iq-q10', 'Good', 'Usually communicate well', '👍', 2, '{"communication": "good"}'),
    ('iq-q10-o3', 'iq-q10', 'Inconsistent', 'Sometimes great, sometimes not', '🔄', 3, '{"communication": "inconsistent"}'),
    ('iq-q10-o4', 'iq-q10', 'Challenging', 'Often misunderstand each other', '😕', 4, '{"communication": "challenging"}'),
    ('iq-q10-o5', 'iq-q10', 'Needs Work', 'Avoid difficult conversations', '🚧', 5, '{"communication": "needs_work"}'),
    ('iq-q10-o6', 'iq-q10', 'Digital Heavy', 'Text more than talk', '📱', 6, '{"communication": "digital"}');

-- ============================================================================
-- QUESTION 11: Love Expression
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES (
    'iq-q11',
    'intake-quiz-001',
    'How do you most naturally show love?',
    'We''ll explore this more later - just pick your top one for now',
    'single',
    'Final Questions',
    11,
    1
);

INSERT INTO quiz_options (id, question_id, option_text, icon, order_num, metadata)
VALUES
    ('iq-q11-o1', 'iq-q11', 'Thoughtful gestures and surprises', '💝', 1, '{"love_style": "gifts"}'),
    ('iq-q11-o2', 'iq-q11', 'Helping and supporting each other', '🤝', 2, '{"love_style": "acts_of_service"}'),
    ('iq-q11-o3', 'iq-q11', 'Words and verbal appreciation', '💬', 3, '{"love_style": "words"}'),
    ('iq-q11-o4', 'iq-q11', 'Focused quality time together', '⏰', 4, '{"love_style": "quality_time"}'),
    ('iq-q11-o5', 'iq-q11', 'Physical affection and closeness', '🤗', 5, '{"love_style": "physical"}'),
    ('iq-q11-o6', 'iq-q11', 'Supporting each other''s goals', '🎯', 6, '{"love_style": "growth"}');

-- ============================================================================
-- QUESTION 12: Availability
-- ============================================================================
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, max_selections)
VALUES (
    'iq-q12',
    'intake-quiz-001',
    'When are you typically free for couple time?',
    'Select all that apply',
    'multiple',
    'Final Questions',
    12,
    1,
    9
);

INSERT INTO quiz_options (id, question_id, option_text, order_num, metadata)
VALUES
    ('iq-q12-o1', 'iq-q12', 'Weekday mornings', 1, '{"time_slot": "weekday_morning"}'),
    ('iq-q12-o2', 'iq-q12', 'Weekday lunch breaks', 2, '{"time_slot": "weekday_lunch"}'),
    ('iq-q12-o3', 'iq-q12', 'Weekday evenings', 3, '{"time_slot": "weekday_evening"}'),
    ('iq-q12-o4', 'iq-q12', 'Friday nights', 4, '{"time_slot": "friday_night"}'),
    ('iq-q12-o5', 'iq-q12', 'Saturday days', 5, '{"time_slot": "saturday_day"}'),
    ('iq-q12-o6', 'iq-q12', 'Saturday nights', 6, '{"time_slot": "saturday_night"}'),
    ('iq-q12-o7', 'iq-q12', 'Sunday days', 7, '{"time_slot": "sunday_day"}'),
    ('iq-q12-o8', 'iq-q12', 'Sunday nights', 8, '{"time_slot": "sunday_night"}'),
    ('iq-q12-o9', 'iq-q12', 'It changes weekly', 9, '{"time_slot": "variable"}');
