# Partner Calendar Matching & Intelligent Date Suggestions

## Overview

The Partner Calendar Matching system is the flagship feature of Better Together that automatically finds available time slots when both partners are free, then suggests personalized date experiences based on their interests, budget, and schedule.

## Key Features

### 🗓️ Smart Calendar Matching
- **Mutual Free Time Detection**: Analyzes both partners' calendars to find overlapping free time
- **Conflict Avoidance**: Automatically detects and avoids scheduled activities
- **Timezone Support**: Handles different timezones for long-distance relationships
- **Recurring Availability**: Set weekly availability patterns (e.g., "free Friday evenings")
- **One-time Overrides**: Block specific dates or add one-time availability

### 💡 Intelligent Suggestions
- **Interest-Based Matching**: Suggests experiences based on shared interests
- **Budget-Aware**: Filters suggestions within your budget preferences
- **Match Scoring**: Ranks suggestions by how well they match both partners' preferences
- **Time Optimization**: Matches experiences to ideal time of day (morning/afternoon/evening)
- **Dual Approval**: Both partners must accept a suggestion before it's scheduled

### 🎯 Experience Catalog
- **30+ Curated Experiences**: Pre-loaded with diverse date ideas
- **Multiple Categories**: Dining, adventure, relaxation, arts & culture, entertainment, learning, wellness, outdoors, music, and travel
- **Detailed Information**: Includes cost ranges, duration, ratings, booking requirements
- **Weather & Season Aware**: Factors in weather dependency and best seasons

## Architecture

### Database Schema

**New Tables Added:**
1. **user_interests** - Tracks individual interests with preference levels (1-10)
2. **budget_preferences** - Stores budget preferences per relationship
3. **calendar_availability** - Recurring and one-time availability patterns
4. **experience_catalog** - Curated date experiences with rich metadata
5. **date_suggestions** - AI-generated suggestions with match scores
6. **calendar_sync_settings** - External calendar integration settings (future)
7. **mutual_free_time** - Pre-computed mutual availability cache

### API Endpoints

All endpoints are mounted at `/api/calendar`:

#### Calendar Availability Management

**POST /api/calendar/availability**
```json
{
  "user_id": "user-123",
  "day_of_week": 5,  // 0-6 (Sunday-Saturday)
  "start_time": "18:00",
  "end_time": "23:00",
  "is_recurring": true,
  "availability_type": "preferred"  // "free", "busy", "preferred"
}
```

**GET /api/calendar/availability/:userId**
Returns all availability patterns for a user.

#### Interest Management

**POST /api/calendar/interests**
```json
{
  "user_id": "user-123",
  "category": "dining",  // See InterestCategory type
  "subcategory": "Italian cuisine",
  "preference_level": 9  // 1-10 scale
}
```

**GET /api/calendar/interests/:userId**
Returns all interests for a user.

#### Budget Preferences

**POST /api/calendar/budget-preferences**
```json
{
  "relationship_id": "rel-123",
  "budget_type": "per_date",  // "per_date", "weekly", "monthly", "special_occasion"
  "min_amount": 50,
  "max_amount": 150,
  "preferences_note": "Prefer mid-range experiences"
}
```

**GET /api/calendar/budget-preferences/:relationshipId**
Returns budget preferences for a relationship.

#### Finding Mutual Free Time

**POST /api/calendar/find-mutual-slots**
```json
{
  "relationship_id": "rel-123",
  "start_date": "2025-11-10",
  "end_date": "2025-11-17",
  "min_duration_minutes": 120
}
```

**Response:**
```json
{
  "relationship_id": "rel-123",
  "date_range": {
    "start": "2025-11-10",
    "end": "2025-11-17"
  },
  "mutual_free_slots": [
    {
      "date": "2025-11-10",
      "startTime": "19:00",
      "endTime": "22:00",
      "durationMinutes": 180,
      "startDatetime": "2025-11-10T19:00:00Z",
      "endDatetime": "2025-11-10T22:00:00Z"
    }
  ],
  "total_slots": 5
}
```

#### Generating Date Suggestions

**POST /api/calendar/generate-suggestions**
```json
{
  "relationship_id": "rel-123",
  "start_date": "2025-11-10",
  "end_date": "2025-11-17",
  "min_duration_minutes": 120,
  "budget_min": 50,
  "budget_max": 150,
  "max_suggestions": 5
}
```

**Response:**
```json
{
  "relationship_id": "rel-123",
  "suggestions": [
    {
      "suggestionId": "sug-456",
      "experienceId": "exp-001",
      "experienceName": "Romantic Italian Dinner",
      "experienceType": "dining",
      "description": "Intimate candlelit dinner with authentic Italian cuisine",
      "location": "Downtown",
      "venueName": "Bella Vista Ristorante",
      "suggestedDate": "2025-11-10T19:30:00Z",
      "suggestedDuration": 120,
      "estimatedCost": 115,
      "rating": 4.8,
      "matchScore": 0.85,
      "suggestionReason": "Both of you love dining activities • Highly rated (4.8⭐) • Perfect match for your interests",
      "requiresBooking": true,
      "bookingLeadTime": 2
    }
  ],
  "total_suggestions": 5,
  "mutual_slots_found": 8
}
```

#### Managing Suggestions

**GET /api/calendar/suggestions/:relationshipId**
Returns all suggestions for a relationship (filtered by status).

**PUT /api/calendar/suggestions/:suggestionId**
```json
{
  "user_id": "user-123",
  "status": "accepted"  // "accepted" or "rejected"
}
```

When both partners accept, the suggestion is automatically converted to a scheduled activity.

## Backend Logic Algorithms

### 1. Mutual Free Time Detection

**Algorithm:** `findMutualFreeTime()`

1. Retrieve both partners' user IDs from relationship
2. Get timezones for timezone conversion
3. Query scheduled activities to find busy times
4. Query recurring and one-time availability for both users
5. For each day in the date range:
   - Get availability slots for both users
   - Find overlapping time ranges
   - Remove conflicts with scheduled activities
   - Add to mutual slots if duration meets minimum
6. Return sorted list of mutual free time slots

**Time Complexity:** O(d × a₁ × a₂) where d = days, a = availability slots per user

### 2. Interest Matching & Scoring

**Algorithm:** `generateDateSuggestions()`

1. Find mutual free time slots
2. Retrieve interests for both partners
3. Calculate shared interests with average preference scores
4. Get budget preferences
5. Query experience catalog:
   - Filter by budget range
   - Prefer categories matching shared interests
   - Limit to top 50 by rating
6. For each experience:
   - Find suitable time slots (duration + time of day match)
   - Calculate match score (0-1):
     - Base score: 0.5
     - +0.3 for shared interest match (weighted by preference)
     - +0.15 for individual interest match
     - +0.05 for high rating (>4.5 stars)
   - Generate human-readable reason
7. Sort by match score, return top N suggestions
8. Save suggestions to database

**Match Score Formula:**
```
score = 0.5
      + (shared_preference / 10) * 0.3
      + (max_individual_preference / 10) * 0.15
      + (rating / 5) * 0.05
```

### 3. Time Overlap Detection

**Algorithm:** `findTimeOverlap()`

1. Convert time strings to minutes since midnight
2. Calculate overlap start = max(start1, start2)
3. Calculate overlap end = min(end1, end2)
4. If overlap_start >= overlap_end, no overlap
5. Return overlapping time range and duration

## Usage Example Flow

### Setup Phase

1. **Partners set their interests:**
```bash
POST /api/calendar/interests
{
  "user_id": "user-1",
  "category": "dining",
  "preference_level": 9
}
```

2. **Partners set availability:**
```bash
POST /api/calendar/availability
{
  "user_id": "user-1",
  "day_of_week": 5,  // Friday
  "start_time": "18:00",
  "end_time": "23:00",
  "is_recurring": true,
  "availability_type": "preferred"
}
```

3. **Set budget preferences:**
```bash
POST /api/calendar/budget-preferences
{
  "relationship_id": "rel-1",
  "budget_type": "per_date",
  "min_amount": 50,
  "max_amount": 150
}
```

### Suggestion Generation

4. **Request suggestions:**
```bash
POST /api/calendar/generate-suggestions
{
  "relationship_id": "rel-1",
  "start_date": "2025-11-10",
  "end_date": "2025-11-17",
  "max_suggestions": 5
}
```

5. **System automatically:**
   - Finds mutual free time (8 slots found)
   - Matches experiences to interests and budget
   - Calculates match scores
   - Returns top 5 suggestions

### Approval & Scheduling

6. **Partner 1 accepts suggestion:**
```bash
PUT /api/calendar/suggestions/sug-456
{
  "user_id": "user-1",
  "status": "accepted"
}
```

7. **Partner 2 accepts suggestion:**
```bash
PUT /api/calendar/suggestions/sug-456
{
  "user_id": "user-2",
  "status": "accepted"
}
```

8. **System automatically:**
   - Creates activity in activities table
   - Updates suggestion status to "scheduled"
   - Links suggestion to activity

## Database Migration

Apply the migration to add new tables:

```bash
# Local development
npm run db:migrate:local

# Production
npm run db:migrate:prod
```

Seed the experience catalog:

```bash
# Local
wrangler d1 execute better-together-production --local --file=./seed_calendar_data.sql

# Production
wrangler d1 execute better-together-production --file=./seed_calendar_data.sql
```

## Interest Categories

Available categories for interests and experiences:
- `dining` - Restaurants, food experiences
- `adventure` - Active, exciting activities
- `relaxation` - Spa, beach, peaceful activities
- `arts_culture` - Museums, art, theater
- `sports` - Athletic activities
- `entertainment` - Movies, comedy, games
- `learning` - Classes, workshops
- `travel` - Day trips, getaways
- `wellness` - Yoga, meditation, health
- `outdoors` - Hiking, nature activities
- `gaming` - Video games, board games
- `music` - Concerts, karaoke
- `other` - Miscellaneous

## Future Enhancements

### Phase 2: External Calendar Integration
- Google Calendar OAuth integration
- Outlook/Microsoft 365 sync
- Apple Calendar sync via iCloud
- Auto-import busy times from external calendars

### Phase 3: AI Enhancements
- Learn from past activity ratings to improve suggestions
- Predict preferred times based on historical patterns
- Seasonal suggestions (holidays, anniversaries)
- Weather-based suggestion adjustments

### Phase 4: Social Features
- Share experiences with other couples
- Group date suggestions
- Couple reviews and ratings for experiences
- Local partner business integrations

## Technical Stack

- **Backend**: Hono.js on Cloudflare Workers
- **Database**: SQLite with Cloudflare D1
- **TypeScript**: Full type safety
- **Edge Computing**: Global low-latency access

## Performance Considerations

- **Indexes**: All query-heavy tables have appropriate indexes
- **Caching**: Mutual free time can be pre-computed and cached
- **Pagination**: Implement for large result sets (future)
- **Rate Limiting**: Apply to suggestion generation (future)

## Security & Privacy

- All data scoped to authenticated users/relationships
- Budget information kept private within relationship
- Calendar data never shared outside relationship
- External calendar tokens encrypted at rest (when implemented)

## Testing

Test the API endpoints:

```bash
# Start development server
npm run dev:sandbox

# Test finding mutual slots
curl -X POST http://localhost:3000/api/calendar/find-mutual-slots \
  -H "Content-Type: application/json" \
  -d '{
    "relationship_id": "relationship-1",
    "start_date": "2025-11-10",
    "end_date": "2025-11-17"
  }'

# Test generating suggestions
curl -X POST http://localhost:3000/api/calendar/generate-suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "relationship_id": "relationship-1",
    "start_date": "2025-11-10",
    "end_date": "2025-11-17",
    "budget_max": 150
  }'
```

## Support & Documentation

- **API Reference**: See type definitions in `src/types.ts`
- **Database Schema**: `migrations/0002_calendar_matching_features.sql`
- **Backend Logic**: `src/api/calendar-matching.ts`
- **Sample Data**: `seed_calendar_data.sql`

---

**Built with ❤️ to help couples spend more quality time together**
