-- Seed Data for Calendar Matching Features
-- Sample experiences, interests, and budget preferences for testing

-- =============================================================================
-- Experience Catalog - Sample Date Ideas
-- =============================================================================

INSERT INTO experience_catalog (id, experience_name, experience_type, description, location, venue_name, estimated_duration_minutes, cost_min, cost_max, currency, rating, best_time_of_day, best_season, requires_booking, booking_lead_time_days, weather_dependent, outdoor_activity, physical_intensity, is_active, created_at, updated_at) VALUES
-- Dining Experiences
('exp-001', 'Romantic Italian Dinner', 'dining', 'Intimate candlelit dinner with authentic Italian cuisine and wine pairing', 'Downtown', 'Bella Vista Ristorante', 120, 80, 150, 'USD', 4.8, 'evening', 'any', true, 2, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-002', 'Rooftop Brunch', 'dining', 'Scenic rooftop brunch with mimosas and city views', 'Midtown', 'Sky Terrace', 90, 40, 70, 'USD', 4.6, 'morning', 'any', true, 1, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-003', 'Sushi Making Class & Dinner', 'dining', 'Learn to make sushi together then enjoy your creations', 'Arts District', 'Sushi Academy', 180, 100, 120, 'USD', 4.9, 'evening', 'any', true, 3, false, false, 'medium', true, datetime('now'), datetime('now')),
('exp-004', 'Wine Tasting & Tapas', 'dining', 'Sample 5 wines with Spanish tapas in cozy wine bar', 'Old Town', 'Vino & Tapas', 120, 60, 90, 'USD', 4.7, 'evening', 'any', true, 1, false, false, 'low', true, datetime('now'), datetime('now')),

-- Adventure Experiences
('exp-005', 'Sunset Kayaking', 'adventure', 'Paddle together at sunset with stunning water views', 'Lakeside Park', 'Adventure Rentals', 90, 40, 60, 'USD', 4.7, 'evening', 'summer', true, 1, true, true, 'medium', true, datetime('now'), datetime('now')),
('exp-006', 'Indoor Rock Climbing', 'adventure', 'Learn to belay and climb together in safe indoor environment', 'Sports Complex', 'Vertical Adventures', 120, 30, 50, 'USD', 4.5, 'any', 'any', false, 0, false, false, 'high', true, datetime('now'), datetime('now')),
('exp-007', 'Hot Air Balloon Ride', 'adventure', 'Breathtaking sunrise hot air balloon experience', 'Valley View', 'Sky High Balloons', 180, 250, 350, 'USD', 5.0, 'morning', 'any', true, 7, true, true, 'low', true, datetime('now'), datetime('now')),
('exp-008', 'Escape Room Challenge', 'adventure', 'Work together to solve puzzles and escape in 60 minutes', 'Entertainment District', 'Mystery Rooms', 75, 25, 40, 'USD', 4.6, 'any', 'any', true, 1, false, false, 'low', true, datetime('now'), datetime('now')),

-- Relaxation Experiences
('exp-009', 'Couples Spa Day', 'relaxation', 'Side-by-side massage, sauna, and relaxation lounge', 'Resort Area', 'Serenity Spa', 150, 200, 300, 'USD', 4.9, 'afternoon', 'any', true, 3, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-010', 'Beach Sunset Picnic', 'relaxation', 'Curated picnic basket with blanket, perfect for sunset watching', 'Coastal Beach', 'Sunset Picnics Co', 120, 60, 90, 'USD', 4.8, 'evening', 'summer', true, 1, true, true, 'low', true, datetime('now'), datetime('now')),
('exp-011', 'Botanical Garden Stroll', 'relaxation', 'Peaceful walk through beautiful gardens with photo spots', 'Garden District', 'City Botanical Gardens', 90, 15, 25, 'USD', 4.6, 'afternoon', 'spring', false, 0, true, true, 'low', true, datetime('now'), datetime('now')),

-- Arts & Culture
('exp-012', 'Paint & Sip Night', 'arts_culture', 'Create art together while enjoying wine and music', 'Arts District', 'Canvas & Cocktails', 150, 50, 75, 'USD', 4.7, 'evening', 'any', true, 2, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-013', 'Live Jazz Concert', 'arts_culture', 'Intimate jazz performance with cocktails', 'Downtown', 'Blue Note Club', 120, 40, 80, 'USD', 4.8, 'evening', 'any', true, 3, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-014', 'Museum Date & Café', 'arts_culture', 'Explore art exhibits followed by café lunch', 'Museum Row', 'Modern Art Museum', 180, 30, 50, 'USD', 4.5, 'afternoon', 'any', false, 0, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-015', 'Pottery Workshop', 'arts_culture', 'Learn to throw pottery on the wheel together', 'Arts District', 'Clay Studio', 120, 70, 100, 'USD', 4.8, 'afternoon', 'any', true, 2, false, false, 'medium', true, datetime('now'), datetime('now')),

-- Entertainment
('exp-016', 'Movie Under the Stars', 'entertainment', 'Outdoor cinema with cozy seating and popcorn', 'City Park', 'Starlight Cinema', 150, 20, 35, 'USD', 4.6, 'evening', 'summer', false, 0, true, true, 'low', true, datetime('now'), datetime('now')),
('exp-017', 'Comedy Show & Dinner', 'entertainment', 'Stand-up comedy with dinner service', 'Entertainment District', 'Laugh Factory', 180, 60, 100, 'USD', 4.7, 'evening', 'any', true, 1, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-018', 'Arcade & Bar', 'entertainment', 'Classic arcade games with craft cocktails', 'Downtown', 'Retro Arcade Bar', 120, 30, 50, 'USD', 4.5, 'evening', 'any', false, 0, false, false, 'low', true, datetime('now'), datetime('now')),

-- Learning
('exp-019', 'Cooking Class - French Cuisine', 'learning', 'Learn to prepare a 3-course French meal together', 'Culinary Center', 'Chef Academy', 180, 90, 130, 'USD', 4.9, 'evening', 'any', true, 3, false, false, 'medium', true, datetime('now'), datetime('now')),
('exp-020', 'Dance Lessons - Salsa', 'learning', 'Beginner salsa dancing lessons for couples', 'Dance Studio', 'Latin Rhythms', 90, 30, 50, 'USD', 4.6, 'evening', 'any', true, 1, false, false, 'medium', true, datetime('now'), datetime('now')),
('exp-021', 'Photography Walk', 'learning', 'Learn photography basics during guided city walk', 'Historic District', 'Focus Photography', 120, 40, 60, 'USD', 4.7, 'afternoon', 'any', true, 2, true, true, 'low', true, datetime('now'), datetime('now')),

-- Wellness
('exp-022', 'Couples Yoga Class', 'wellness', 'Relaxing partner yoga session in peaceful studio', 'Wellness Center', 'Zen Yoga Studio', 75, 25, 40, 'USD', 4.7, 'morning', 'any', true, 1, false, false, 'medium', true, datetime('now'), datetime('now')),
('exp-023', 'Meditation & Sound Bath', 'wellness', 'Guided meditation with healing sound frequencies', 'Wellness Center', 'Inner Peace Studio', 90, 35, 55, 'USD', 4.8, 'evening', 'any', true, 2, false, false, 'low', true, datetime('now'), datetime('now')),

-- Outdoors
('exp-024', 'Scenic Hiking Trail', 'outdoors', 'Beautiful 5-mile hike with waterfall views', 'Mountain Park', 'Cascade Trail', 180, 0, 10, 'USD', 4.8, 'morning', 'spring', false, 0, true, true, 'high', true, datetime('now'), datetime('now')),
('exp-025', 'Bike & Picnic Tour', 'outdoors', 'Guided bike tour through parks with picnic stop', 'Riverside', 'Pedal Tours', 150, 50, 80, 'USD', 4.6, 'afternoon', 'summer', true, 1, true, true, 'medium', true, datetime('now'), datetime('now')),
('exp-026', 'Stargazing Night', 'outdoors', 'Telescope viewing session with astronomy guide', 'Observatory Hill', 'Sky Watchers', 120, 30, 50, 'USD', 4.9, 'night', 'any', true, 2, true, true, 'low', true, datetime('now'), datetime('now')),

-- Music
('exp-027', 'Karaoke Private Room', 'music', 'Private karaoke room with drinks and snacks', 'Entertainment District', 'Sing & Sip', 90, 35, 60, 'USD', 4.5, 'evening', 'any', true, 1, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-028', 'Concert in the Park', 'music', 'Live outdoor concert with lawn seating', 'Central Park', 'Summer Music Series', 120, 15, 30, 'USD', 4.7, 'evening', 'summer', false, 0, true, true, 'low', true, datetime('now'), datetime('now')),

-- Travel (Day Trips)
('exp-029', 'Wine Country Day Trip', 'travel', 'Guided tour of 3 wineries with tastings and lunch', 'Wine Country', 'Valley Tours', 480, 120, 180, 'USD', 4.9, 'afternoon', 'fall', true, 5, false, false, 'low', true, datetime('now'), datetime('now')),
('exp-030', 'Beach Town Getaway', 'travel', 'Day trip to coastal town with beach time and seafood', 'Coastal Route', 'Beach Express', 540, 80, 120, 'USD', 4.7, 'morning', 'summer', true, 3, true, true, 'low', true, datetime('now'), datetime('now'));

-- =============================================================================
-- Sample User Interests
-- (These would be set by actual users, but including samples for testing)
-- =============================================================================

-- Assuming user IDs from seed.sql exist
-- User 1 interests
INSERT INTO user_interests (id, user_id, category, subcategory, preference_level, created_at, updated_at) VALUES
('int-001', 'user-1', 'dining', 'Italian cuisine', 9, datetime('now'), datetime('now')),
('int-002', 'user-1', 'adventure', 'Water sports', 8, datetime('now'), datetime('now')),
('int-003', 'user-1', 'arts_culture', 'Live music', 7, datetime('now'), datetime('now')),
('int-004', 'user-1', 'relaxation', 'Spa treatments', 8, datetime('now'), datetime('now')),
('int-005', 'user-1', 'outdoors', 'Hiking', 6, datetime('now'), datetime('now'));

-- User 2 interests
INSERT INTO user_interests (id, user_id, category, subcategory, preference_level, created_at, updated_at) VALUES
('int-006', 'user-2', 'dining', 'Wine tasting', 9, datetime('now'), datetime('now')),
('int-007', 'user-2', 'adventure', 'Escape rooms', 7, datetime('now'), datetime('now')),
('int-008', 'user-2', 'arts_culture', 'Museums', 8, datetime('now'), datetime('now')),
('int-009', 'user-2', 'learning', 'Cooking classes', 9, datetime('now'), datetime('now')),
('int-010', 'user-2', 'relaxation', 'Beach activities', 7, datetime('now'), datetime('now'));

-- =============================================================================
-- Sample Budget Preferences
-- =============================================================================

-- Budget for relationship-1 (assuming from seed.sql)
INSERT INTO budget_preferences (id, relationship_id, budget_type, min_amount, max_amount, currency, preferences_note, created_at, updated_at) VALUES
('budget-001', 'relationship-1', 'per_date', 50, 150, 'USD', 'Prefer mid-range experiences, save more for special occasions', datetime('now'), datetime('now')),
('budget-002', 'relationship-1', 'monthly', 200, 600, 'USD', 'Monthly date night budget', datetime('now'), datetime('now')),
('budget-003', 'relationship-1', 'special_occasion', 200, 400, 'USD', 'For anniversaries and milestones', datetime('now'), datetime('now'));

-- =============================================================================
-- Sample Calendar Availability
-- =============================================================================

-- User 1 availability (typical work schedule - free evenings and weekends)
INSERT INTO calendar_availability (id, user_id, day_of_week, start_time, end_time, is_recurring, availability_type, notes, created_at, updated_at) VALUES
-- Weekday evenings
('avail-001', 'user-1', 1, '18:00', '22:00', true, 'free', 'Monday evenings', datetime('now'), datetime('now')),
('avail-002', 'user-1', 2, '18:00', '22:00', true, 'free', 'Tuesday evenings', datetime('now'), datetime('now')),
('avail-003', 'user-1', 3, '18:00', '22:00', true, 'free', 'Wednesday evenings', datetime('now'), datetime('now')),
('avail-004', 'user-1', 4, '18:00', '22:00', true, 'free', 'Thursday evenings', datetime('now'), datetime('now')),
('avail-005', 'user-1', 5, '18:00', '23:00', true, 'preferred', 'Friday night date night', datetime('now'), datetime('now')),
-- Weekends
('avail-006', 'user-1', 6, '10:00', '23:00', true, 'free', 'Saturday all day', datetime('now'), datetime('now')),
('avail-007', 'user-1', 0, '10:00', '20:00', true, 'free', 'Sunday (prefer to end earlier)', datetime('now'), datetime('now'));

-- User 2 availability (similar schedule but slightly different)
INSERT INTO calendar_availability (id, user_id, day_of_week, start_time, end_time, is_recurring, availability_type, notes, created_at, updated_at) VALUES
-- Weekday evenings (works slightly later)
('avail-008', 'user-2', 1, '19:00', '22:00', true, 'free', 'Monday evenings', datetime('now'), datetime('now')),
('avail-009', 'user-2', 2, '19:00', '22:00', true, 'free', 'Tuesday evenings', datetime('now'), datetime('now')),
('avail-010', 'user-2', 3, '19:00', '22:00', true, 'free', 'Wednesday evenings', datetime('now'), datetime('now')),
('avail-011', 'user-2', 4, '18:30', '22:00', true, 'free', 'Thursday evenings', datetime('now'), datetime('now')),
('avail-012', 'user-2', 5, '18:00', '23:00', true, 'preferred', 'Friday night preferred', datetime('now'), datetime('now')),
-- Weekends
('avail-013', 'user-2', 6, '09:00', '23:00', true, 'free', 'Saturday all day', datetime('now'), datetime('now')),
('avail-014', 'user-2', 0, '11:00', '21:00', true, 'free', 'Sunday brunch and activities', datetime('now'), datetime('now'));
