-- Seed Data: Connection Compass Assessment
-- Description: Populates the Connection Compass quiz with all questions and scoring logic
-- Run after: 0002_quiz_systems.sql migration

-- ============================================================================
-- INSERT CONNECTION COMPASS QUIZ TEMPLATE
-- ============================================================================
INSERT INTO quizzes (id, title, slug, description, quiz_type, estimated_time_minutes, icon, is_active, requires_partner, display_order)
VALUES (
    'connection-compass-001',
    'The Connection Compass',
    'connection-compass',
    'Discover your unique ways of giving and receiving appreciation. This 5-minute assessment reveals your personal map for meaningful connection.',
    'assessment',
    5,
    '🧭',
    1,
    1,
    2
);

-- ============================================================================
-- ROUND 1: INITIAL PREFERENCES (Forced Choice A vs B)
-- ============================================================================

-- Question 1
INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, section_name, order_num, is_required)
VALUES ('cc-q1', 'connection-compass-001', 'Choose the scenario that resonates more with you:', 'single', 'Round 1: Initial Preferences', 1, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q1-a', 'cc-q1', 'When my partner remembers something specific I mentioned wanting and surprises me with it', 1, 'thoughtful_gestures', 1),
    ('cc-q1-b', 'cc-q1', 'When my partner puts away their phone and gives me their complete attention', 2, 'focused_presence', 1);

-- Question 2
INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, section_name, order_num, is_required)
VALUES ('cc-q2', 'connection-compass-001', 'Choose the scenario that resonates more with you:', 'single', 'Round 1: Initial Preferences', 2, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q2-a', 'cc-q2', 'When my partner handles a task I usually do, giving me time to relax', 1, 'supportive_partnership', 1),
    ('cc-q2-b', 'cc-q2', 'When my partner tells me specifically what they appreciate about me', 2, 'verbal_appreciation', 1);

-- Question 3
INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, section_name, order_num, is_required)
VALUES ('cc-q3', 'connection-compass-001', 'Choose the scenario that resonates more with you:', 'single', 'Round 1: Initial Preferences', 3, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q3-a', 'cc-q3', 'When my partner holds my hand or puts their arm around me in public', 1, 'physical_connection', 1),
    ('cc-q3-b', 'cc-q3', 'When my partner actively encourages me to pursue my personal goals', 2, 'growth_championing', 1);

-- Question 4
INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, section_name, order_num, is_required)
VALUES ('cc-q4', 'connection-compass-001', 'Choose the scenario that resonates more with you:', 'single', 'Round 1: Initial Preferences', 4, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q4-a', 'cc-q4', 'When my partner plans a special activity based on my interests', 1, 'thoughtful_gestures', 1),
    ('cc-q4-b', 'cc-q4', 'When my partner helps me solve a problem I''m struggling with', 2, 'supportive_partnership', 1);

-- Question 5
INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, section_name, order_num, is_required)
VALUES ('cc-q5', 'connection-compass-001', 'Choose the scenario that resonates more with you:', 'single', 'Round 1: Initial Preferences', 5, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q5-a', 'cc-q5', 'When my partner sends me a thoughtful message during the day', 1, 'verbal_appreciation', 1),
    ('cc-q5-b', 'cc-q5', 'When my partner initiates physical closeness while watching TV', 2, 'physical_connection', 1);

-- ============================================================================
-- ROUND 2: SCENARIO PREFERENCES
-- ============================================================================

-- Question 6
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q6', 'connection-compass-001', 'After a stressful day, what would help you feel most supported?', NULL, 'single', 'Round 2: Scenario Preferences', 6, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q6-a', 'cc-q6', 'Your partner listening without judgment while you vent', 1, 'focused_presence', 1),
    ('cc-q6-b', 'cc-q6', 'Your partner taking care of dinner and evening chores', 2, 'supportive_partnership', 1);

-- Question 7
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q7', 'connection-compass-001', 'For your birthday, what would mean the most?', NULL, 'single', 'Round 2: Scenario Preferences', 7, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q7-a', 'cc-q7', 'A heartfelt letter describing your impact on their life', 1, 'verbal_appreciation', 1),
    ('cc-q7-b', 'cc-q7', 'A carefully planned day doing your favorite activities together', 2, 'focused_presence', 1);

-- Question 8
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q8', 'connection-compass-001', 'When you achieve something important, how would you want your partner to celebrate?', NULL, 'single', 'Round 2: Scenario Preferences', 8, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q8-a', 'cc-q8', 'Bragging about you to friends and family', 1, 'verbal_appreciation', 1),
    ('cc-q8-b', 'cc-q8', 'Planning a special experience to mark the achievement', 2, 'thoughtful_gestures', 1);

-- Question 9
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q9', 'connection-compass-001', 'During a regular weekday, what would make you smile most?', NULL, 'single', 'Round 2: Scenario Preferences', 9, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q9-a', 'cc-q9', 'An unexpected hug from behind while you''re doing dishes', 1, 'physical_connection', 1),
    ('cc-q9-b', 'cc-q9', 'Your partner handling an errand you were dreading', 2, 'supportive_partnership', 1);

-- Question 10
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q10', 'connection-compass-001', 'When you''re doubting yourself, what helps most?', NULL, 'single', 'Round 2: Scenario Preferences', 10, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q10-a', 'cc-q10', 'Your partner reminding you of your strengths and past successes', 1, 'verbal_appreciation', 1),
    ('cc-q10-b', 'cc-q10', 'Your partner researching solutions and resources to help you', 2, 'growth_championing', 1);

-- ============================================================================
-- ROUND 3: DEPTH QUESTIONS (Likert Scale 1-5)
-- Scoring: 4-5 = 2 points, 3 = 1 point, 1-2 = 0 points
-- ============================================================================

-- Question 11
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, scale_min, scale_max, scale_labels)
VALUES ('cc-q11', 'connection-compass-001', 'I feel most connected when we''re doing separate activities in the same room', 'Rate your agreement', 'scale', 'Round 3: Depth Questions', 11, 1, 1, 5, '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value, metadata)
VALUES
    ('cc-q11-1', 'cc-q11', '1 - Strongly Disagree', 1, 'focused_presence', 0, '{"likert_value": 1, "opposite_score": true}'),
    ('cc-q11-2', 'cc-q11', '2 - Disagree', 2, 'focused_presence', 0, '{"likert_value": 2, "opposite_score": true}'),
    ('cc-q11-3', 'cc-q11', '3 - Neutral', 3, 'focused_presence', 1, '{"likert_value": 3}'),
    ('cc-q11-4', 'cc-q11', '4 - Agree', 4, 'focused_presence', 2, '{"likert_value": 4}'),
    ('cc-q11-5', 'cc-q11', '5 - Strongly Agree', 5, 'focused_presence', 2, '{"likert_value": 5}');

-- Question 12
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, scale_min, scale_max, scale_labels)
VALUES ('cc-q12', 'connection-compass-001', 'Small daily gestures mean more to me than grand occasional ones', 'Rate your agreement', 'scale', 'Round 3: Depth Questions', 12, 1, 1, 5, '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value, metadata)
VALUES
    ('cc-q12-1', 'cc-q12', '1 - Strongly Disagree', 1, 'thoughtful_gestures', 0, '{"likert_value": 1}'),
    ('cc-q12-2', 'cc-q12', '2 - Disagree', 2, 'thoughtful_gestures', 0, '{"likert_value": 2}'),
    ('cc-q12-3', 'cc-q12', '3 - Neutral', 3, 'thoughtful_gestures', 1, '{"likert_value": 3}'),
    ('cc-q12-4', 'cc-q12', '4 - Agree', 4, 'thoughtful_gestures', 2, '{"likert_value": 4}'),
    ('cc-q12-5', 'cc-q12', '5 - Strongly Agree', 5, 'thoughtful_gestures', 2, '{"likert_value": 5}');

-- Question 13
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, scale_min, scale_max, scale_labels)
VALUES ('cc-q13', 'connection-compass-001', 'I need physical touch to feel emotionally connected', 'Rate your agreement', 'scale', 'Round 3: Depth Questions', 13, 1, 1, 5, '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value, metadata)
VALUES
    ('cc-q13-1', 'cc-q13', '1 - Strongly Disagree', 1, 'physical_connection', 0, '{"likert_value": 1}'),
    ('cc-q13-2', 'cc-q13', '2 - Disagree', 2, 'physical_connection', 0, '{"likert_value": 2}'),
    ('cc-q13-3', 'cc-q13', '3 - Neutral', 3, 'physical_connection', 1, '{"likert_value": 3}'),
    ('cc-q13-4', 'cc-q13', '4 - Agree', 4, 'physical_connection', 2, '{"likert_value": 4}'),
    ('cc-q13-5', 'cc-q13', '5 - Strongly Agree', 5, 'physical_connection', 2, '{"likert_value": 5}');

-- Question 14
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, scale_min, scale_max, scale_labels)
VALUES ('cc-q14', 'connection-compass-001', 'I feel loved when my partner takes interest in my hobbies', 'Rate your agreement', 'scale', 'Round 3: Depth Questions', 14, 1, 1, 5, '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value, metadata)
VALUES
    ('cc-q14-1', 'cc-q14', '1 - Strongly Disagree', 1, 'growth_championing', 0, '{"likert_value": 1}'),
    ('cc-q14-2', 'cc-q14', '2 - Disagree', 2, 'growth_championing', 0, '{"likert_value": 2}'),
    ('cc-q14-3', 'cc-q14', '3 - Neutral', 3, 'growth_championing', 1, '{"likert_value": 3}'),
    ('cc-q14-4', 'cc-q14', '4 - Agree', 4, 'growth_championing', 2, '{"likert_value": 4}'),
    ('cc-q14-5', 'cc-q14', '5 - Strongly Agree', 5, 'growth_championing', 2, '{"likert_value": 5}');

-- Question 15
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, scale_min, scale_max, scale_labels)
VALUES ('cc-q15', 'connection-compass-001', 'Actions speak louder than words in relationships', 'Rate your agreement', 'scale', 'Round 3: Depth Questions', 15, 1, 1, 5, '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value, metadata)
VALUES
    ('cc-q15-1', 'cc-q15', '1 - Strongly Disagree', 1, 'supportive_partnership', 0, '{"likert_value": 1}'),
    ('cc-q15-2', 'cc-q15', '2 - Disagree', 2, 'supportive_partnership', 0, '{"likert_value": 2}'),
    ('cc-q15-3', 'cc-q15', '3 - Neutral', 3, 'supportive_partnership', 1, '{"likert_value": 3}'),
    ('cc-q15-4', 'cc-q15', '4 - Agree', 4, 'supportive_partnership', 2, '{"likert_value": 4}'),
    ('cc-q15-5', 'cc-q15', '5 - Strongly Agree', 5, 'supportive_partnership', 2, '{"likert_value": 5}');

-- ============================================================================
-- ROUND 4: EXPRESSION PREFERENCES (Ranking 1-6)
-- Scoring: 1st = 6 points, 2nd = 5 points, 3rd = 4 points, etc.
-- ============================================================================

-- Question 16 (Ranking how you express love)
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required, metadata)
VALUES ('cc-q16', 'connection-compass-001', 'How do you most naturally express love?', 'Rank these from 1 (most natural) to 6 (least natural)', 'ranking', 'Round 4: Expression Preferences', 16, 1, '{"ranking_items": 6}');

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, metadata)
VALUES
    ('cc-q16-o1', 'cc-q16', 'Saying encouraging and appreciative things', 1, 'verbal_appreciation', '{"ranking_option": true}'),
    ('cc-q16-o2', 'cc-q16', 'Planning special experiences together', 2, 'focused_presence', '{"ranking_option": true}'),
    ('cc-q16-o3', 'cc-q16', 'Buying or making meaningful gifts', 3, 'thoughtful_gestures', '{"ranking_option": true}'),
    ('cc-q16-o4', 'cc-q16', 'Taking care of practical needs', 4, 'supportive_partnership', '{"ranking_option": true}'),
    ('cc-q16-o5', 'cc-q16', 'Being physically affectionate', 5, 'physical_connection', '{"ranking_option": true}'),
    ('cc-q16-o6', 'cc-q16', 'Supporting their independence and growth', 6, 'growth_championing', '{"ranking_option": true}');

-- ============================================================================
-- QUESTION 17: DISCONNECTION TRIGGERS (Single Choice)
-- ============================================================================

-- Question 17
INSERT INTO quiz_questions (id, quiz_id, question_text, question_subtitle, question_type, section_name, order_num, is_required)
VALUES ('cc-q17', 'connection-compass-001', 'What makes you feel most disconnected?', 'Select the one that bothers you most', 'single', 'Round 4: Expression Preferences', 17, 1);

INSERT INTO quiz_options (id, question_id, option_text, order_num, score_key, score_value)
VALUES
    ('cc-q17-o1', 'cc-q17', 'Lack of meaningful conversation', 1, 'verbal_appreciation', 2),
    ('cc-q17-o2', 'cc-q17', 'No quality time together', 2, 'focused_presence', 2),
    ('cc-q17-o3', 'cc-q17', 'Absence of thoughtful gestures', 3, 'thoughtful_gestures', 2),
    ('cc-q17-o4', 'cc-q17', 'Unshared responsibilities', 4, 'supportive_partnership', 2),
    ('cc-q17-o5', 'cc-q17', 'Limited physical affection', 5, 'physical_connection', 2),
    ('cc-q17-o6', 'cc-q17', 'Feeling unsupported in personal goals', 6, 'growth_championing', 2);

-- ============================================================================
-- CONNECTION STYLE DESCRIPTIONS (for results display)
-- ============================================================================

-- This metadata can be stored in a separate table or embedded in the quiz metadata
-- For simplicity, we'll add it as a comment here for reference in the application code

/*
CONNECTION STYLE DESCRIPTIONS:

1. 🗣️ VERBAL APPRECIATION
Primary Description: "You feel most valued when your partner expresses appreciation, affection, and encouragement through words—whether spoken or written. Compliments, heartfelt conversations, and verbal affirmations fill your emotional tank."
Action Steps:
- Schedule regular check-ins for sharing appreciations
- Leave love notes or send thoughtful texts during the day
- Practice giving specific compliments (not generic "you're great")

2. 🎯 FOCUSED PRESENCE
Primary Description: "You feel most connected through undivided attention and meaningful shared experiences. When your partner puts away distractions and is fully present with you, that's when you feel truly valued."
Action Steps:
- Establish phone-free times for connection
- Plan activities where you're both actively engaged
- Practice active listening without multitasking

3. 🎁 THOUGHTFUL GESTURES
Primary Description: "You feel loved through intentional actions that show your partner remembers and considers what matters to you. It's not about the cost—it's about the thought and meaning behind the gesture."
Action Steps:
- Keep a running list of things your partner mentions wanting
- Surprise them with their favorite snack or coffee order
- Plan experiences based on their interests, not just yours

4. 🤲 SUPPORTIVE PARTNERSHIP
Primary Description: "You feel most cared for when your partner shares life's practical responsibilities and helps lighten your load. Actions that make your life easier demonstrate love to you."
Action Steps:
- Divide household tasks fairly and follow through
- Offer help before being asked
- Notice what your partner does and reciprocate

5. 🫂 PHYSICAL CONNECTION
Primary Description: "You feel close and valued through appropriate physical touch, affection, and proximity. Physical connection is how you most naturally give and receive emotional reassurance."
Action Steps:
- Increase casual touch (hand-holding, hugs, shoulder touches)
- Make physical affection part of daily routines
- Respect boundaries while staying connected

6. 🌟 GROWTH CHAMPIONING
Primary Description: "You feel most valued when your partner actively supports your personal dreams, interests, and development. Encouragement to be your best self demonstrates their love."
Action Steps:
- Ask about your partner's goals and dreams regularly
- Create space and time for their personal pursuits
- Celebrate their individual achievements enthusiastically
*/
