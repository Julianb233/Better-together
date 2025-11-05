# Better Together - Codebase Comprehensive Overview

## 1. PROJECT STRUCTURE & ARCHITECTURE

### Frontend/Backend Architecture
- **Type**: Full-stack Hono application running on Cloudflare Workers
- **Frontend Framework**: Hono JSX with TypeScript
- **Build Tool**: Vite with Hono plugins (@hono/vite-build, @hono/vite-dev-server)
- **Styling**: Tailwind CSS + Font Awesome icons
- **Deployment**: Cloudflare Pages + Workers
- **Module System**: ES modules (type: "module")

### Directory Structure
```
better-together/
├── src/
│   ├── index.tsx                 # Main app entry point with all API routes
│   ├── types.ts                  # TypeScript interfaces and types
│   ├── utils.ts                  # Utility functions (300+ lines)
│   ├── renderer.tsx              # JSX renderer with layouts
│   ├── api/
│   │   └── analytics.ts          # Analytics API endpoints (mock data)
│   ├── components/
│   │   └── navigation.ts         # Navigation component
│   └── pages/                    # Feature pages (16 files, 600KB+ total)
│       ├── dashboard.ts
│       ├── login.ts
│       ├── login-system.ts
│       ├── user-portal.ts
│       ├── paywall.ts
│       ├── ai-coach.ts
│       ├── smart-scheduling.ts   # ← Calendar/Scheduling UI
│       ├── intelligent-suggestions.ts
│       ├── mobile-ui.ts
│       ├── iphone-examples.ts
│       ├── premium-pricing.ts
│       ├── subscription-boxes.ts
│       ├── in-app-purchases.ts
│       ├── intimacy-challenges.ts
│       ├── member-rewards.ts
│       └── become-sponsor.ts
├── public/
│   └── static/
│       └── app.js
├── migrations/
│   └── 0001_initial_relationship_schema.sql
├── seed.sql
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.jsonc                # Cloudflare configuration
└── ecosystem.config.cjs           # PM2 config
```

---

## 2. DATABASE MODELS & SCHEMA

### Database Type
- **SQLite** via Cloudflare D1
- **14 Tables** with comprehensive indexing
- **Migrations**: Single migration file (0001_initial_relationship_schema.sql)

### Core Tables & Relationships

#### Users (users)
```sql
- id (PK): TEXT
- email (UNIQUE): TEXT
- name: TEXT
- nickname: TEXT
- profile_photo_url: TEXT
- phone_number: TEXT
- timezone: TEXT (default: UTC)
- love_language_primary: TEXT (enum: words_of_affirmation, quality_time, physical_touch, acts_of_service, receiving_gifts)
- love_language_secondary: TEXT
- relationship_preferences: TEXT (JSON)
- created_at, updated_at, last_active_at: DATETIME
```

#### Relationships (relationships)
```sql
- id (PK): TEXT
- user_1_id, user_2_id (FK): TEXT (UNIQUE constraint on pair)
- relationship_type: TEXT (dating, engaged, married, partnership)
- start_date, anniversary_date: DATE
- status: TEXT (active, paused, ended)
- privacy_level: TEXT (private, friends, public)
- created_at, updated_at: DATETIME
```

#### Activities (activities) ← For Calendar Events
```sql
- id (PK): TEXT
- relationship_id (FK): TEXT
- activity_name: TEXT
- activity_type: TEXT (date_night, quality_time, adventure, relaxation, learning, exercise, social, custom)
- description, location: TEXT
- planned_date: DATETIME (← Activity scheduling)
- completed_date: DATETIME
- duration_minutes: INTEGER
- cost_amount: DECIMAL
- satisfaction_rating_user1, satisfaction_rating_user2: INTEGER (1-10)
- notes: TEXT
- photos: TEXT (JSON array)
- status: TEXT (planned, completed, cancelled)
- created_by_user_id (FK): TEXT
- created_at, updated_at: DATETIME
```

#### Important Dates (important_dates) ← Recurring Events
```sql
- id (PK): TEXT
- relationship_id (FK): TEXT
- date_value: DATE
- event_name, description: TEXT
- event_type: TEXT (anniversary, milestone, birthday, holiday, custom)
- is_recurring: BOOLEAN
- recurrence_pattern: TEXT (yearly, monthly, etc.)
- reminder_days_before: INTEGER (default: 7)
- created_by_user_id (FK): TEXT
- created_at: DATETIME
```

#### Shared Goals (shared_goals)
```sql
- id (PK): TEXT
- relationship_id (FK): TEXT
- goal_name, goal_description: TEXT
- goal_type: TEXT (weekly, monthly, milestone, custom)
- target_count, current_progress: INTEGER
- status: TEXT (active, completed, paused, cancelled)
- start_date, target_date, completion_date: DATE
- created_by_user_id (FK): TEXT
- created_at, updated_at: DATETIME
```

#### Daily Check-ins (daily_checkins)
```sql
- id (PK): TEXT
- relationship_id, user_id (FK): TEXT
- checkin_date: DATE (UNIQUE constraint: relationship_id, user_id, checkin_date)
- connection_score: INTEGER (1-10)
- mood_score: INTEGER (1-10)
- relationship_satisfaction: INTEGER (1-10)
- gratitude_note, support_needed, highlight_of_day: TEXT
- created_at: DATETIME
```

#### Additional Tables
- **communication_log**: Deep talks, conflict resolution, planning conversations
- **challenges**: Relationship building challenge templates
- **challenge_participation**: Track couples' challenge engagement
- **challenge_entries**: Daily/weekly entries for progress tracking
- **achievements**: Gamification badges and milestones
- **user_achievements**: Earned achievements by couple
- **notifications**: User notifications and reminders
- **relationship_analytics**: Computed analytics per day

### Database Indexes
- 16 strategic indexes for performance
- Composite indexes on frequently queried combinations (relationship_id + date, user_id + date, etc.)

---

## 3. API STRUCTURE & ROUTING

### Base Configuration
- **Framework**: Hono v4.9.2
- **CORS**: Enabled for `/api/*` routes
- **Static Files**: Served from `/public`
- **Base Path**: `/api/`

### API Endpoints (25+)

#### Authentication & User Management
```
POST   /api/users                           # Create user account
GET    /api/users/:userId                   # Get user profile
PUT    /api/users/:userId                   # Update user profile
POST   /api/invite-partner                  # Invite partner to relationship
GET    /api/relationships/:userId           # Get relationship details
```

#### Daily Check-ins
```
POST   /api/checkins                        # Submit daily check-in
GET    /api/checkins/:relationshipId        # Get recent check-ins
```

#### Shared Goals
```
POST   /api/goals                           # Create shared goal
GET    /api/goals/:relationshipId           # Get goals (with status filter)
PUT    /api/goals/:goalId/progress          # Update goal progress
```

#### Activities & Date Nights ← Calendar Events
```
POST   /api/activities                      # Create activity (with planned_date)
GET    /api/activities/:relationshipId      # Get activities (with status filter)
PUT    /api/activities/:activityId/complete # Mark activity completed with ratings
```

#### Important Dates
```
POST   /api/important-dates                 # Add anniversary/milestone/birthday
GET    /api/important-dates/:relationshipId # Get dates (with upcoming filter)
```

#### Challenges
```
GET    /api/challenges                      # Get available challenges (filterable)
POST   /api/challenges/:challengeId/start   # Start challenge participation
GET    /api/challenges/participation/:relationshipId # Get couple's challenges
```

#### Analytics & Dashboard
```
GET    /api/dashboard/:userId               # Get full dashboard data
GET    /api/analytics/:relationshipId       # Get relationship analytics
```

#### Notifications
```
GET    /api/notifications/:userId           # Get user notifications
PUT    /api/notifications/:notificationId/read # Mark notification read
```

#### Analytics Routes
```
GET    /api/analytics/overview              # Overview metrics (mock data)
GET    /api/analytics/users                 # User growth data
GET    /api/analytics/revenue               # Revenue analytics
GET    /api/analytics/features              # Feature usage analytics
GET    /api/analytics/partners              # Partner analytics
GET    /api/analytics/activity              # Real-time activity feed
GET    /api/analytics/system                # System health metrics
GET    /api/analytics/export                # Export analytics data
```

### HTML Pages (16 Feature Pages)
```
GET    /                                    # Homepage
GET    /login.html                          # Login page
GET    /dashboard.html                      # Analytics dashboard
GET    /portal                              # User portal/dashboard
GET    /login                               # Login system
GET    /paywall                             # Paywall with pricing
GET    /ai-coach.html                       # AI relationship coach
GET    /smart-scheduling.html               # Smart scheduling feature (UI only)
GET    /intelligent-suggestions.html        # Personalized suggestions
GET    /mobile-ui.html                      # Mobile UI design examples
GET    /iphone-examples.html                # iPhone user examples
GET    /member-rewards.html                 # Member rewards system
GET    /partner-portal.html (/become-sponsor.html)  # Business partnership
GET    /premium-pricing.html                # Premium pricing strategy
GET    /subscription-boxes.html             # Subscription boxes
GET    /in-app-purchases.html               # In-app purchases
GET    /intimacy-challenges.html            # Intimacy challenges (adult content)
```

---

## 4. EXISTING CALENDAR & SCHEDULING FUNCTIONALITY

### Current Calendar Implementation

#### Activities Table Fields (for scheduling)
- `planned_date`: DATETIME - when the activity is scheduled
- `completed_date`: DATETIME - when it was actually done
- `status`: planned, completed, cancelled
- `duration_minutes`: How long the activity takes

#### Activities API Endpoints
```typescript
POST /api/activities
  Body: {
    relationship_id: string
    activity_name: string
    activity_type: 'date_night' | 'quality_time' | 'adventure' | etc.
    planned_date?: string  // Can schedule activities
    location?: string
    cost_amount?: number
    created_by_user_id: string
  }

GET /api/activities/:relationshipId?status=planned|completed
  Returns: Activities sorted by planned_date DESC

PUT /api/activities/:activityId/complete
  Body: {
    satisfaction_rating_user1?: number
    satisfaction_rating_user2?: number
    notes?: string
  }
```

#### Important Dates for Calendar
- Anniversaries, birthdays, milestones
- Recurring events support (yearly, monthly patterns)
- Reminder settings (days_before)

#### Smart Scheduling Page (`/smart-scheduling.html`)
- **Current Status**: UI/Marketing page only
- **Features Shown**: Calendar integration concepts, booking demos
- **No Backend**: No actual calendar synchronization logic exists
- **No External Integration**: No Google Calendar, Outlook, or iCal integration

#### Utility Functions for Scheduling
```typescript
- getCurrentDate()          // YYYY-MM-DD format
- getCurrentDateTime()      // ISO datetime
- daysBetween()            // Calculate days between dates
- getUpcomingDates()       // Get next 30 days of important dates
```

### What's Missing for Partner Calendar Matching
1. **No calendar sync**: Can't read partner's calendars
2. **No availability matching**: Can't automatically find mutual free time
3. **No smart suggestions**: Doesn't suggest optimal times based on both schedules
4. **No timezone handling**: No automatic timezone conversion for long-distance couples
5. **No conflict detection**: Can't warn about overlapping bookings
6. **No integration**: No Google Calendar, Outlook, or external calendar integration
7. **No notifications**: No calendar invite notifications or reminders

---

## 5. TECHNOLOGY STACK

### Runtime & Core
- **Node.js**: Via Cloudflare Workers (nodejs_compat flag)
- **Edge Computing**: Cloudflare Workers for serverless execution
- **Framework**: Hono 4.9.2 (lightweight TypeScript framework)

### Frontend
- **Language**: TypeScript
- **Rendering**: Hono JSX (React-like JSX on Cloudflare Workers)
- **Styling**: Tailwind CSS 2.2.19
- **Icons**: Font Awesome 6.4.0
- **Build**: Vite 6.3.5

### Database
- **Type**: SQLite
- **Platform**: Cloudflare D1 (distributed SQLite)
- **Migrations**: Custom SQL migration system
- **Local Dev**: Wrangler D1 local mode

### DevTools & Deployment
- **Build Tool**: Vite
- **Deployment**: 
  - Cloudflare Pages (frontend)
  - Cloudflare Workers (backend)
  - Wrangler CLI 4.4.0
- **Testing**: Mock curl via npm test script
- **Package Manager**: npm

### Development Stack
```json
{
  "dependencies": {
    "hono": "^4.9.2"
  },
  "devDependencies": {
    "@hono/vite-build": "^1.2.0",
    "@hono/vite-dev-server": "^0.18.2",
    "vite": "^6.3.5",
    "wrangler": "^4.4.0"
  }
}
```

### TypeScript Configuration
- Target: ESNext
- Module: ESNext
- JSX: react-jsx with hono/jsx source
- Strict mode enabled
- Module resolution: Bundler

---

## 6. CONFIGURATION FILES

### package.json Scripts
```bash
npm run dev                    # Start Vite dev server
npm run dev:sandbox           # Run with local D1 database
npm run build                 # Build for production
npm run deploy                # Deploy to Cloudflare Pages
npm run deploy:prod           # Deploy to production project
npm run db:migrate:local      # Apply migrations locally
npm run db:migrate:prod       # Apply migrations to production
npm run db:seed              # Seed database with initial data
npm run db:reset             # Reset local database
npm run db:console:local     # Access D1 console locally
npm run cf-typegen           # Generate Cloudflare types
```

### vite.config.ts
```typescript
- Hono vite build plugin
- Hono vite dev server with Cloudflare adapter
- Entry point: src/index.tsx
```

### wrangler.jsonc
```json
{
  "name": "better-together",
  "compatibility_date": "2025-08-15",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"]
}
```

### ecosystem.config.cjs
- PM2 configuration for process management

### Migration System
- Single migration file: `0001_initial_relationship_schema.sql`
- Seed data in `seed.sql` includes:
  - 8 pre-built challenges
  - 13 achievement templates
  - Sample data for relationship tracking

---

## 7. EXISTING USER & PARTNER FUNCTIONALITY

### User Profiles
- Email/password authentication (basic)
- Love language preferences (primary + secondary)
- Timezone settings
- Profile photos
- Relationship preferences (JSON field)
- Activity tracking (last_active_at)

### Relationship Management
- Invite partner via email
- Automatic relationship creation when both exist
- Relationship types: dating, engaged, married, partnership
- Relationship privacy levels: private, friends, public
- Status tracking: active, paused, ended

### Partner Integration Points
- Daily check-ins where both partners share feelings
- Shared goals created by either partner
- Activity planning (created by either partner)
- Challenge participation (both partners involved)
- Communications logged with initiator tracking
- Achievements earned by couple or individual

### Features Built on Partner Data
- Relationship health score calculation
- Compatibility via love languages
- Check-in streak tracking
- Activities completion with mutual ratings
- Challenge progress across both partners
- Notifications to partner about activities

---

## 8. KEY BUSINESS LOGIC

### Relationship Health Scoring
```typescript
calculateHealthScore(
  avgConnectionScore: 0-10,
  avgSatisfactionScore: 0-10,
  checkinFrequency: number,
  goalCompletionRate: 0-1
): number (0-100)

Weights:
- Connection: 30%
- Satisfaction: 30%
- Consistency (checkins): 20%
- Goal completion: 20%
```

### Analytics Calculation
- 30-day rolling window analysis
- Days together (from start_date)
- Streak calculations
- Monthly completion metrics
- Trend analysis (trends stored as JSON)

### Achievement System
- Streak achievements (7-day, 30-day check-ins)
- Completion achievements (first check-in, goal achieved, challenge completed)
- Special achievements (anniversary, perfect week)
- Point-based gamification

### Notification System
- Types: reminder, achievement, checkin, anniversary, goal_progress, partner_activity
- Priorities: low, normal, high, urgent
- Read/unread tracking
- Optional scheduled delivery

---

## 9. IMPORTANT NOTES FOR PARTNER CALENDAR MATCHING

### Current Limitations
1. **No external calendar integration**: Can only see activities created in-app
2. **Simple date scheduling**: Just a text field, no calendar UI for selection
3. **No timezone handling**: Activities are stored without timezone awareness
4. **No smart matching**: No algorithm to find optimal meeting times
5. **No conflict detection**: Can't see partner's other commitments
6. **No auto-sync**: No integration with Google Calendar, Outlook, or iCal

### Database Ready For Enhancement
- `activities.planned_date` can store detailed scheduling
- `users.timezone` exists for timezone conversion
- `important_dates` table for blocking busy times
- Existing relationship context for couple-specific logic

### API Ready For Extension
- Clear REST pattern established
- Error handling in place
- Request/response structure consistent
- Database utility functions available

---

## 10. RECOMMENDED AREAS FOR PARTNER CALENDAR MATCHING

### Tables to Leverage/Extend
- **activities**: Already tracks planned activities
- **important_dates**: Can be extended for busy/blocked times
- **users**: Has timezone field
- **relationships**: Core relationship context

### New Features Needed
1. Calendar sync endpoints (Google Calendar, Outlook API integration)
2. Availability matching algorithm
3. Conflict detection logic
4. Timezone-aware scheduling
5. Smart suggestion engine based on both partners' schedules
6. Calendar invitation system
7. Conflict resolution recommendations

### Utility Functions to Add
```typescript
- getPartnerAvailability()
- findMutualFreeSlots()
- suggestOptimalTimes()
- checkCalendarConflicts()
- convertTimezoneBetweenPartners()
- generateCalendarInvites()
```

