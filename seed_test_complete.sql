-- Complete Test Seed Data for End-to-End Testing
-- This file creates users, relationship, and calendar matching test data

-- Step 1: Create test users
INSERT OR IGNORE INTO users (id, email, name, nickname, timezone, love_language_primary, created_at, updated_at, last_active_at) VALUES
('user-1', 'alex@example.com', 'Alex', 'Al', 'America/Los_Angeles', 'quality_time', datetime('now'), datetime('now'), datetime('now')),
('user-2', 'sam@example.com', 'Sam', 'Sammy', 'America/Los_Angeles', 'words_of_affirmation', datetime('now'), datetime('now'), datetime('now'));

-- Step 2: Create test relationship
INSERT OR IGNORE INTO relationships (id, user_1_id, user_2_id, relationship_type, start_date, status, created_at, updated_at) VALUES
('relationship-1', 'user-1', 'user-2', 'dating', date('now', '-180 days'), 'active', datetime('now'), datetime('now'));

-- Step 3: Create user interests
INSERT OR IGNORE INTO user_interests (id, user_id, category, subcategory, preference_level, created_at, updated_at) VALUES
('int-001', 'user-1', 'dining', 'Italian cuisine', 9, datetime('now'), datetime('now')),
('int-002', 'user-1', 'adventure', 'Water sports', 8, datetime('now'), datetime('now')),
('int-003', 'user-1', 'arts_culture', 'Live music', 7, datetime('now'), datetime('now')),
('int-004', 'user-1', 'relaxation', 'Spa treatments', 8, datetime('now'), datetime('now')),
('int-005', 'user-1', 'outdoors', 'Hiking', 6, datetime('now'), datetime('now')),
('int-006', 'user-2', 'dining', 'Wine tasting', 9, datetime('now'), datetime('now')),
('int-007', 'user-2', 'adventure', 'Escape rooms', 7, datetime('now'), datetime('now')),
('int-008', 'user-2', 'arts_culture', 'Museums', 8, datetime('now'), datetime('now')),
('int-009', 'user-2', 'learning', 'Cooking classes', 9, datetime('now'), datetime('now')),
('int-010', 'user-2', 'relaxation', 'Beach activities', 7, datetime('now'), datetime('now'));

-- Step 4: Create budget preferences
INSERT OR IGNORE INTO budget_preferences (id, relationship_id, budget_type, min_amount, max_amount, currency, preferences_note, created_at, updated_at) VALUES
('budget-001', 'relationship-1', 'per_date', 50, 150, 'USD', 'Prefer mid-range experiences, save more for special occasions', datetime('now'), datetime('now')),
('budget-002', 'relationship-1', 'monthly', 200, 600, 'USD', 'Monthly date night budget', datetime('now'), datetime('now'));

-- Step 5: Create calendar availability
-- User 1 availability (typical work schedule - free evenings and weekends)
INSERT OR IGNORE INTO calendar_availability (id, user_id, day_of_week, start_time, end_time, is_recurring, availability_type, notes, created_at, updated_at) VALUES
-- Weekday evenings
('avail-001', 'user-1', 1, '18:00', '22:00', TRUE, 'free', 'Monday evenings', datetime('now'), datetime('now')),
('avail-002', 'user-1', 2, '18:00', '22:00', TRUE, 'free', 'Tuesday evenings', datetime('now'), datetime('now')),
('avail-003', 'user-1', 3, '18:00', '22:00', TRUE, 'free', 'Wednesday evenings', datetime('now'), datetime('now')),
('avail-004', 'user-1', 4, '18:00', '22:00', TRUE, 'free', 'Thursday evenings', datetime('now'), datetime('now')),
('avail-005', 'user-1', 5, '18:00', '23:00', TRUE, 'preferred', 'Friday night date night', datetime('now'), datetime('now')),
-- Weekends
('avail-006', 'user-1', 6, '10:00', '23:00', TRUE, 'free', 'Saturday all day', datetime('now'), datetime('now')),
('avail-007', 'user-1', 0, '10:00', '20:00', TRUE, 'free', 'Sunday (prefer to end earlier)', datetime('now'), datetime('now'));

-- User 2 availability (similar schedule but slightly different)
INSERT OR IGNORE INTO calendar_availability (id, user_id, day_of_week, start_time, end_time, is_recurring, availability_type, notes, created_at, updated_at) VALUES
-- Weekday evenings (works slightly later)
('avail-008', 'user-2', 1, '19:00', '22:00', TRUE, 'free', 'Monday evenings', datetime('now'), datetime('now')),
('avail-009', 'user-2', 2, '19:00', '22:00', TRUE, 'free', 'Tuesday evenings', datetime('now'), datetime('now')),
('avail-010', 'user-2', 3, '19:00', '22:00', TRUE, 'free', 'Wednesday evenings', datetime('now'), datetime('now')),
('avail-011', 'user-2', 4, '18:30', '22:00', TRUE, 'free', 'Thursday evenings', datetime('now'), datetime('now')),
('avail-012', 'user-2', 5, '18:00', '23:00', TRUE, 'preferred', 'Friday night preferred', datetime('now'), datetime('now')),
-- Weekends
('avail-013', 'user-2', 6, '09:00', '23:00', TRUE, 'free', 'Saturday all day', datetime('now'), datetime('now')),
('avail-014', 'user-2', 0, '11:00', '21:00', TRUE, 'free', 'Sunday brunch and activities', datetime('now'), datetime('now'));

-- Step 6: Experience catalog (30 experiences)
-- IMPORTANT: Generate valid IDs that won't conflict

-- Dining Experiences
INSERT OR IGNORE INTO experience_catalog (id, experience_name, experience_type, description, location, venue_name, estimated_duration_minutes, cost_min, cost_max, currency, rating, best_time_of_day, best_season, requires_booking, booking_lead_time_days, weather_dependent, outdoor_activity, physical_intensity, is_active, created_at, updated_at) VALUES
('exp-001', 'Romantic Italian Dinner', 'dining', 'Intimate candlelit dinner with authentic Italian cuisine and wine pairing', 'Downtown', 'Bella Vista Ristorante', 120, 80, 150, 'USD', 4.8, 'evening', 'any', TRUE, 2, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now')),
('exp-002', 'Rooftop Brunch', 'dining', 'Scenic rooftop brunch with mimosas and city views', 'Midtown', 'Sky Terrace', 90, 40, 70, 'USD', 4.6, 'morning', 'any', TRUE, 1, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now')),
('exp-003', 'Sushi Making Class & Dinner', 'dining', 'Learn to make sushi together then enjoy your creations', 'Arts District', 'Sushi Academy', 180, 100, 120, 'USD', 4.9, 'evening', 'any', TRUE, 3, FALSE, FALSE, 'medium', TRUE, datetime('now'), datetime('now'));

-- Adventure Experiences
INSERT OR IGNORE INTO experience_catalog (id, experience_name, experience_type, description, location, venue_name, estimated_duration_minutes, cost_min, cost_max, currency, rating, best_time_of_day, best_season, requires_booking, booking_lead_time_days, weather_dependent, outdoor_activity, physical_intensity, is_active, created_at, updated_at) VALUES
('exp-004', 'Sunset Kayaking', 'adventure', 'Paddle together at sunset with stunning water views', 'Lakeside Park', 'Adventure Rentals', 90, 40, 60, 'USD', 4.7, 'evening', 'summer', TRUE, 1, TRUE, TRUE, 'medium', TRUE, datetime('now'), datetime('now')),
('exp-005', 'Indoor Rock Climbing', 'adventure', 'Learn to belay and climb together in safe indoor environment', 'Sports Complex', 'Vertical Adventures', 120, 30, 50, 'USD', 4.5, 'any', 'any', FALSE, 0, FALSE, FALSE, 'high', TRUE, datetime('now'), datetime('now')),
('exp-006', 'Escape Room Challenge', 'adventure', 'Work together to solve puzzles and escape in 60 minutes', 'Entertainment District', 'Mystery Rooms', 75, 25, 40, 'USD', 4.6, 'any', 'any', TRUE, 1, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now'));

-- Relaxation Experiences
INSERT OR IGNORE INTO experience_catalog (id, experience_name, experience_type, description, location, venue_name, estimated_duration_minutes, cost_min, cost_max, currency, rating, best_time_of_day, best_season, requires_booking, booking_lead_time_days, weather_dependent, outdoor_activity, physical_intensity, is_active, created_at, updated_at) VALUES
('exp-007', 'Couples Spa Day', 'relaxation', 'Side-by-side massage, sauna, and relaxation lounge', 'Resort Area', 'Serenity Spa', 150, 200, 300, 'USD', 4.9, 'afternoon', 'any', TRUE, 3, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now')),
('exp-008', 'Beach Sunset Picnic', 'relaxation', 'Curated picnic basket with blanket, perfect for sunset watching', 'Coastal Beach', 'Sunset Picnics Co', 120, 60, 90, 'USD', 4.8, 'evening', 'summer', TRUE, 1, TRUE, TRUE, 'low', TRUE, datetime('now'), datetime('now'));

-- Arts & Culture
INSERT OR IGNORE INTO experience_catalog (id, experience_name, experience_type, description, location, venue_name, estimated_duration_minutes, cost_min, cost_max, currency, rating, best_time_of_day, best_season, requires_booking, booking_lead_time_days, weather_dependent, outdoor_activity, physical_intensity, is_active, created_at, updated_at) VALUES
('exp-009', 'Paint & Sip Night', 'arts_culture', 'Create art together while enjoying wine and music', 'Arts District', 'Canvas & Cocktails', 150, 50, 75, 'USD', 4.7, 'evening', 'any', TRUE, 2, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now')),
('exp-010', 'Live Jazz Concert', 'arts_culture', 'Intimate jazz performance with cocktails', 'Downtown', 'Blue Note Club', 120, 40, 80, 'USD', 4.8, 'evening', 'any', TRUE, 3, FALSE, FALSE, 'low', TRUE, datetime('now'), datetime('now'));

-- Step 7: Create some important dates for context testing
INSERT OR IGNORE INTO important_dates (id, relationship_id, date_value, event_name, event_type, is_recurring, recurrence_pattern, reminder_days_before, created_by_user_id, created_at) VALUES
('date-001', 'relationship-1', date('now', '+30 days'), '6 Month Anniversary', 'anniversary', FALSE, NULL, 7, 'user-1', datetime('now'));

-- Step 8: Create some sample daily check-ins for context (some showing high stress)
INSERT OR IGNORE INTO daily_checkins (id, relationship_id, user_id, checkin_date, connection_score, mood_score, relationship_satisfaction, gratitude_note, created_at) VALUES
('checkin-001', 'relationship-1', 'user-1', date('now', '-1 day'), 8, 6, 8, 'Love spending time together', datetime('now', '-1 day')),
('checkin-002', 'relationship-1', 'user-2', date('now', '-1 day'), 7, 5, 7, 'Grateful for support during busy work week', datetime('now', '-1 day')),
('checkin-003', 'relationship-1', 'user-1', date('now', '-2 days'), 7, 4, 7, NULL, datetime('now', '-2 days')),
('checkin-004', 'relationship-1', 'user-2', date('now', '-2 days'), 6, 4, 6, NULL, datetime('now', '-2 days'));

-- Step 9: Create a past completed activity for pattern learning
INSERT OR IGNORE INTO activities (id, relationship_id, activity_name, activity_type, location, planned_date, completed_date, duration_minutes, cost_amount, satisfaction_rating_user1, satisfaction_rating_user2, status, created_by_user_id, created_at, updated_at) VALUES
('activity-001', 'relationship-1', 'Italian Restaurant Date', 'date_night', 'Downtown', datetime('now', '-14 days', '+19 hours'), datetime('now', '-14 days', '+21 hours'), 120, 95, 5, 5, 'completed', 'user-1', datetime('now', '-16 days'), datetime('now', '-14 days'));

-- Step 10: Add sample subscription (free tier for testing limits)
INSERT OR IGNORE INTO subscriptions (id, relationship_id, tier, status, trial_ends_at, created_at, updated_at) VALUES
('sub-001', 'relationship-1', 'free', 'active', datetime('now', '+7 days'), datetime('now'), datetime('now'));
