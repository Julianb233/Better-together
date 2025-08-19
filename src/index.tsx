import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import type { Env } from './types'
import {
  generateId, 
  getCurrentDate, 
  getCurrentDateTime,
  isValidEmail,
  getUserByEmail,
  getUserById,
  getRelationshipByUserId,
  getPartnerId,
  hasTodayCheckin,
  calculateCheckinStreak,
  getUpcomingDates,
  checkAchievements,
  sendNotification,
  calculateAnalytics
} from './utils'

const app = new Hono<{ Bindings: Env }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use JSX renderer for HTML pages
app.use(renderer)

// =============================================================================
// AUTHENTICATION & USER MANAGEMENT
// =============================================================================

// Database availability check helper
const checkDatabase = (c: any) => {
  if (!c.env?.DB) {
    return c.json({ 
      message: 'Database functionality is currently unavailable in this demo deployment.',
      demo: true,
      note: 'Full functionality available in development environment with D1 database'
    }, 503)
  }
  return null
}

// Create new user account
app.post('/api/users', async (c) => {
  const dbCheck = checkDatabase(c)
  if (dbCheck) return dbCheck
  
  try {
    const { email, name, nickname, phone_number, timezone, love_language_primary, love_language_secondary } = await c.req.json()
    
    if (!email || !name) {
      return c.json({ error: 'Email and name are required' }, 400)
    }
    
    if (!isValidEmail(email)) {
      return c.json({ error: 'Invalid email format' }, 400)
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(c.env, email)
    if (existingUser) {
      return c.json({ error: 'User already exists with this email' }, 409)
    }
    
    const userId = generateId()
    const now = getCurrentDateTime()
    
    await c.env.DB.prepare(`
      INSERT INTO users (id, email, name, nickname, phone_number, timezone, love_language_primary, love_language_secondary, created_at, updated_at, last_active_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(userId, email, name, nickname || null, phone_number || null, timezone || 'UTC', love_language_primary || null, love_language_secondary || null, now, now, now).run()
    
    const user = await getUserById(c.env, userId)
    return c.json({ user }, 201)
  } catch (error) {
    console.error('Create user error:', error)
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

// Get user profile
app.get('/api/users/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const user = await getUserById(c.env, userId)
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    return c.json({ error: 'Failed to get user' }, 500)
  }
})

// Update user profile
app.put('/api/users/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const updates = await c.req.json()
    
    const user = await getUserById(c.env, userId)
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    const now = getCurrentDateTime()
    const allowedFields = ['name', 'nickname', 'phone_number', 'timezone', 'love_language_primary', 'love_language_secondary', 'profile_photo_url']
    
    const updateFields = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .map(key => `${key} = ?`)
      .join(', ')
    
    if (updateFields.length === 0) {
      return c.json({ error: 'No valid fields to update' }, 400)
    }
    
    const values = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .map(key => updates[key])
    
    await c.env.DB.prepare(`
      UPDATE users SET ${updateFields}, updated_at = ? WHERE id = ?
    `).bind(...values, now, userId).run()
    
    const updatedUser = await getUserById(c.env, userId)
    return c.json({ user: updatedUser })
  } catch (error) {
    console.error('Update user error:', error)
    return c.json({ error: 'Failed to update user' }, 500)
  }
})

// =============================================================================
// RELATIONSHIP MANAGEMENT
// =============================================================================

// Invite partner to join relationship
app.post('/api/invite-partner', async (c) => {
  try {
    const { user_id, partner_email, relationship_type, start_date } = await c.req.json()
    
    if (!user_id || !partner_email) {
      return c.json({ error: 'User ID and partner email are required' }, 400)
    }
    
    if (!isValidEmail(partner_email)) {
      return c.json({ error: 'Invalid partner email format' }, 400)
    }
    
    // Check if user exists
    const user = await getUserById(c.env, user_id)
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Check if user already has an active relationship
    const existingRelationship = await getRelationshipByUserId(c.env, user_id)
    if (existingRelationship) {
      return c.json({ error: 'User already has an active relationship' }, 409)
    }
    
    // Check if partner exists, if not create invitation
    let partner = await getUserByEmail(c.env, partner_email)
    
    if (partner) {
      // Partner exists, create relationship immediately
      const relationshipId = generateId()
      const now = getCurrentDateTime()
      
      await c.env.DB.prepare(`
        INSERT INTO relationships (id, user_1_id, user_2_id, relationship_type, start_date, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'active', ?, ?)
      `).bind(relationshipId, user_id, partner.id, relationship_type || 'dating', start_date || getCurrentDate(), now, now).run()
      
      // Send notification to partner
      await sendNotification(
        c.env,
        partner.id,
        'partner_activity',
        'New Relationship Created!',
        `${user.name} has added you as their partner on Better Together`,
        relationshipId
      )
      
      return c.json({ 
        message: 'Relationship created successfully',
        relationship_id: relationshipId
      })
    } else {
      // Partner doesn't exist, create invitation (in real app, send email)
      // For demo, we'll just return success message
      return c.json({ 
        message: 'Invitation sent! Partner will need to create an account first.',
        action: 'invitation_sent'
      })
    }
  } catch (error) {
    console.error('Invite partner error:', error)
    return c.json({ error: 'Failed to invite partner' }, 500)
  }
})

// Get relationship details
app.get('/api/relationships/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const relationship = await getRelationshipByUserId(c.env, userId)
    
    if (!relationship) {
      return c.json({ error: 'No active relationship found' }, 404)
    }
    
    // Get partner details
    const partnerId = getPartnerId(relationship, userId)
    const partner = await getUserById(c.env, partnerId)
    
    return c.json({ 
      relationship,
      partner
    })
  } catch (error) {
    console.error('Get relationship error:', error)
    return c.json({ error: 'Failed to get relationship' }, 500)
  }
})

// =============================================================================
// DAILY CHECK-INS
// =============================================================================

// Submit daily check-in
app.post('/api/checkins', async (c) => {
  try {
    const {
      relationship_id, 
      user_id,
      connection_score,
      mood_score,
      relationship_satisfaction,
      gratitude_note,
      support_needed,
      highlight_of_day
    } = await c.req.json()
    
    if (!relationship_id || !user_id) {
      return c.json({ error: 'Relationship ID and User ID are required' }, 400)
    }
    
    // Check if already checked in today
    const hasCheckin = await hasTodayCheckin(c.env, relationship_id, user_id)
    if (hasCheckin) {
      return c.json({ error: 'Already checked in today' }, 409)
    }
    
    const checkinId = generateId()
    const today = getCurrentDate()
    const now = getCurrentDateTime()
    
    await c.env.DB.prepare(`
      INSERT INTO daily_checkins (
        id, relationship_id, user_id, checkin_date, connection_score, mood_score,
        relationship_satisfaction, gratitude_note, support_needed, highlight_of_day, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      checkinId, relationship_id, user_id, today, connection_score || null,
      mood_score || null, relationship_satisfaction || null, gratitude_note || null,
      support_needed || null, highlight_of_day || null, now
    ).run()
    
    // Check for achievements
    const newAchievements = await checkAchievements(c.env, relationship_id, user_id)
    
    return c.json({ 
      message: 'Check-in completed successfully',
      checkin_id: checkinId,
      achievements_earned: newAchievements
    })
  } catch (error) {
    console.error('Create checkin error:', error)
    return c.json({ error: 'Failed to create check-in' }, 500)
  }
})

// Get recent check-ins for relationship
app.get('/api/checkins/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const limit = c.req.query('limit') || '30'
    
    const results = await c.env.DB.prepare(`
      SELECT c.*, u.name as user_name 
      FROM daily_checkins c
      JOIN users u ON c.user_id = u.id
      WHERE c.relationship_id = ?
      ORDER BY c.checkin_date DESC, c.created_at DESC
      LIMIT ?
    `).bind(relationshipId, parseInt(limit)).all()
    
    return c.json({ checkins: results.results || [] })
  } catch (error) {
    console.error('Get checkins error:', error)
    return c.json({ error: 'Failed to get check-ins' }, 500)
  }
})

// =============================================================================
// SHARED GOALS
// =============================================================================

// Create shared goal
app.post('/api/goals', async (c) => {
  try {
    const {
      relationship_id,
      goal_name,
      goal_description,
      goal_type,
      target_count,
      target_date,
      created_by_user_id
    } = await c.req.json()
    
    if (!relationship_id || !goal_name || !created_by_user_id) {
      return c.json({ error: 'Relationship ID, goal name, and creator ID are required' }, 400)
    }
    
    const goalId = generateId()
    const now = getCurrentDateTime()
    const today = getCurrentDate()
    
    await c.env.DB.prepare(`
      INSERT INTO shared_goals (
        id, relationship_id, goal_name, goal_description, goal_type,
        target_count, current_progress, status, start_date, target_date,
        created_by_user_id, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, 0, 'active', ?, ?, ?, ?, ?)
    `).bind(
      goalId, relationship_id, goal_name, goal_description || null,
      goal_type || 'custom', target_count || null, today,
      target_date || null, created_by_user_id, now, now
    ).run()
    
    return c.json({ 
      message: 'Goal created successfully',
      goal_id: goalId
    })
  } catch (error) {
    console.error('Create goal error:', error)
    return c.json({ error: 'Failed to create goal' }, 500)
  }
})

// Get shared goals for relationship
app.get('/api/goals/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const status = c.req.query('status') || 'all'
    
    let query = `
      SELECT g.*, u.name as created_by_name
      FROM shared_goals g
      JOIN users u ON g.created_by_user_id = u.id
      WHERE g.relationship_id = ?
    `
    
    const params = [relationshipId]
    
    if (status !== 'all') {
      query += ' AND g.status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY g.created_at DESC'
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ goals: results.results || [] })
  } catch (error) {
    console.error('Get goals error:', error)
    return c.json({ error: 'Failed to get goals' }, 500)
  }
})

// Update goal progress
app.put('/api/goals/:goalId/progress', async (c) => {
  try {
    const goalId = c.req.param('goalId')
    const { progress_increment } = await c.req.json()
    
    if (progress_increment === undefined) {
      return c.json({ error: 'Progress increment is required' }, 400)
    }
    
    const goal = await c.env.DB.prepare(
      'SELECT * FROM shared_goals WHERE id = ?'
    ).bind(goalId).first()
    
    if (!goal) {
      return c.json({ error: 'Goal not found' }, 404)
    }
    
    const newProgress = (goal.current_progress || 0) + progress_increment
    const now = getCurrentDateTime()
    let status = goal.status
    let completionDate = null
    
    // Check if goal is completed
    if (goal.target_count && newProgress >= goal.target_count) {
      status = 'completed'
      completionDate = now
    }
    
    await c.env.DB.prepare(`
      UPDATE shared_goals 
      SET current_progress = ?, status = ?, completion_date = ?, updated_at = ?
      WHERE id = ?
    `).bind(newProgress, status, completionDate, now, goalId).run()
    
    return c.json({ 
      message: 'Goal progress updated',
      new_progress: newProgress,
      status,
      completed: status === 'completed'
    })
  } catch (error) {
    console.error('Update goal progress error:', error)
    return c.json({ error: 'Failed to update goal progress' }, 500)
  }
})

// =============================================================================
// ACTIVITIES & DATE NIGHTS
// =============================================================================

// Create activity
app.post('/api/activities', async (c) => {
  try {
    const {
      relationship_id,
      activity_name,
      activity_type,
      description,
      location,
      planned_date,
      cost_amount,
      created_by_user_id
    } = await c.req.json()
    
    if (!relationship_id || !activity_name || !created_by_user_id) {
      return c.json({ error: 'Relationship ID, activity name, and creator ID are required' }, 400)
    }
    
    const activityId = generateId()
    const now = getCurrentDateTime()
    
    await c.env.DB.prepare(`
      INSERT INTO activities (
        id, relationship_id, activity_name, activity_type, description,
        location, planned_date, cost_amount, status, created_by_user_id,
        created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'planned', ?, ?, ?)
    `).bind(
      activityId, relationship_id, activity_name, activity_type || 'custom',
      description || null, location || null, planned_date || null,
      cost_amount || null, created_by_user_id, now, now
    ).run()
    
    return c.json({ 
      message: 'Activity created successfully',
      activity_id: activityId
    })
  } catch (error) {
    console.error('Create activity error:', error)
    return c.json({ error: 'Failed to create activity' }, 500)
  }
})

// Get activities for relationship
app.get('/api/activities/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const status = c.req.query('status') || 'all'
    const limit = c.req.query('limit') || '50'
    
    let query = `
      SELECT a.*, u.name as created_by_name
      FROM activities a
      JOIN users u ON a.created_by_user_id = u.id
      WHERE a.relationship_id = ?
    `
    
    const params = [relationshipId]
    
    if (status !== 'all') {
      query += ' AND a.status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY a.planned_date DESC, a.created_at DESC LIMIT ?'
    params.push(parseInt(limit))
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ activities: results.results || [] })
  } catch (error) {
    console.error('Get activities error:', error)
    return c.json({ error: 'Failed to get activities' }, 500)
  }
})

// Mark activity as completed
app.put('/api/activities/:activityId/complete', async (c) => {
  try {
    const activityId = c.req.param('activityId')
    const { satisfaction_rating_user1, satisfaction_rating_user2, notes } = await c.req.json()
    
    const now = getCurrentDateTime()
    
    await c.env.DB.prepare(`
      UPDATE activities 
      SET status = 'completed', completed_date = ?, satisfaction_rating_user1 = ?,
          satisfaction_rating_user2 = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      now, satisfaction_rating_user1 || null, satisfaction_rating_user2 || null,
      notes || null, now, activityId
    ).run()
    
    return c.json({ message: 'Activity marked as completed' })
  } catch (error) {
    console.error('Complete activity error:', error)
    return c.json({ error: 'Failed to complete activity' }, 500)
  }
})

// =============================================================================
// IMPORTANT DATES
// =============================================================================

// Add important date
app.post('/api/important-dates', async (c) => {
  try {
    const {
      relationship_id,
      date_value,
      event_name,
      event_type,
      description,
      is_recurring,
      recurrence_pattern,
      reminder_days_before,
      created_by_user_id
    } = await c.req.json()
    
    if (!relationship_id || !date_value || !event_name || !created_by_user_id) {
      return c.json({ error: 'Relationship ID, date, event name, and creator ID are required' }, 400)
    }
    
    const dateId = generateId()
    const now = getCurrentDateTime()
    
    await c.env.DB.prepare(`
      INSERT INTO important_dates (
        id, relationship_id, date_value, event_name, event_type, description,
        is_recurring, recurrence_pattern, reminder_days_before, created_by_user_id, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      dateId, relationship_id, date_value, event_name, event_type || 'custom',
      description || null, is_recurring || false, recurrence_pattern || null,
      reminder_days_before || 7, created_by_user_id, now
    ).run()
    
    return c.json({ 
      message: 'Important date added successfully',
      date_id: dateId
    })
  } catch (error) {
    console.error('Add important date error:', error)
    return c.json({ error: 'Failed to add important date' }, 500)
  }
})

// Get important dates for relationship
app.get('/api/important-dates/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const upcoming = c.req.query('upcoming') === 'true'
    
    let query = `
      SELECT d.*, u.name as created_by_name
      FROM important_dates d
      JOIN users u ON d.created_by_user_id = u.id
      WHERE d.relationship_id = ?
    `
    
    const params = [relationshipId]
    
    if (upcoming) {
      const today = getCurrentDate()
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 60)
      const future = futureDate.toISOString().split('T')[0]
      
      query += ' AND d.date_value BETWEEN ? AND ?'
      params.push(today, future)
    }
    
    query += ' ORDER BY d.date_value ASC'
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ dates: results.results || [] })
  } catch (error) {
    console.error('Get important dates error:', error)
    return c.json({ error: 'Failed to get important dates' }, 500)
  }
})

// =============================================================================
// CHALLENGES
// =============================================================================

// Get available challenges
app.get('/api/challenges', async (c) => {
  try {
    const category = c.req.query('category')
    const difficulty = c.req.query('difficulty')
    
    let query = 'SELECT * FROM challenges WHERE is_template = true'
    const params: string[] = []
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    
    if (difficulty) {
      query += ' AND difficulty_level = ?'
      params.push(difficulty)
    }
    
    query += ' ORDER BY created_at DESC'
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ challenges: results.results || [] })
  } catch (error) {
    console.error('Get challenges error:', error)
    return c.json({ error: 'Failed to get challenges' }, 500)
  }
})

// Start challenge participation
app.post('/api/challenges/:challengeId/start', async (c) => {
  try {
    const challengeId = c.req.param('challengeId')
    const { relationship_id } = await c.req.json()
    
    if (!relationship_id) {
      return c.json({ error: 'Relationship ID is required' }, 400)
    }
    
    // Get challenge details
    const challenge = await c.env.DB.prepare(
      'SELECT * FROM challenges WHERE id = ?'
    ).bind(challengeId).first()
    
    if (!challenge) {
      return c.json({ error: 'Challenge not found' }, 404)
    }
    
    const participationId = generateId()
    const today = getCurrentDate()
    const now = getCurrentDateTime()
    
    // Calculate target end date
    let targetEndDate = null
    if (challenge.duration_days) {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + challenge.duration_days)
      targetEndDate = endDate.toISOString().split('T')[0]
    }
    
    await c.env.DB.prepare(`
      INSERT INTO challenge_participation (
        id, relationship_id, challenge_id, start_date, target_end_date,
        status, progress_percentage, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'active', 0, ?, ?)
    `).bind(participationId, relationship_id, challengeId, today, targetEndDate, now, now).run()
    
    return c.json({ 
      message: 'Challenge started successfully',
      participation_id: participationId
    })
  } catch (error) {
    console.error('Start challenge error:', error)
    return c.json({ error: 'Failed to start challenge' }, 500)
  }
})

// Get challenge participation for relationship
app.get('/api/challenges/participation/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const status = c.req.query('status') || 'all'
    
    let query = `
      SELECT cp.*, c.challenge_name, c.challenge_description, c.category, c.difficulty_level
      FROM challenge_participation cp
      JOIN challenges c ON cp.challenge_id = c.id
      WHERE cp.relationship_id = ?
    `
    
    const params = [relationshipId]
    
    if (status !== 'all') {
      query += ' AND cp.status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY cp.created_at DESC'
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ participations: results.results || [] })
  } catch (error) {
    console.error('Get challenge participation error:', error)
    return c.json({ error: 'Failed to get challenge participation' }, 500)
  }
})

// =============================================================================
// ANALYTICS & DASHBOARD
// =============================================================================

// Get dashboard data for user
app.get('/api/dashboard/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    
    // Get user's relationship
    const relationship = await getRelationshipByUserId(c.env, userId)
    if (!relationship) {
      return c.json({ error: 'No active relationship found' }, 404)
    }
    
    // Get partner details
    const partnerId = getPartnerId(relationship, userId)
    const partner = await getUserById(c.env, partnerId)
    
    // Get recent checkins
    const recentCheckins = await c.env.DB.prepare(`
      SELECT c.*, u.name as user_name 
      FROM daily_checkins c
      JOIN users u ON c.user_id = u.id
      WHERE c.relationship_id = ?
      ORDER BY c.checkin_date DESC
      LIMIT 10
    `).bind(relationship.id).all()
    
    // Get upcoming dates
    const upcomingDates = await getUpcomingDates(c.env, relationship.id)
    
    // Get active goals
    const activeGoals = await c.env.DB.prepare(`
      SELECT g.*, u.name as created_by_name
      FROM shared_goals g
      JOIN users u ON g.created_by_user_id = u.id
      WHERE g.relationship_id = ? AND g.status = 'active'
      ORDER BY g.created_at DESC
      LIMIT 5
    `).bind(relationship.id).all()
    
    // Get recent activities
    const recentActivities = await c.env.DB.prepare(`
      SELECT a.*, u.name as created_by_name
      FROM activities a
      JOIN users u ON a.created_by_user_id = u.id
      WHERE a.relationship_id = ?
      ORDER BY COALESCE(a.completed_date, a.planned_date) DESC
      LIMIT 5
    `).bind(relationship.id).all()
    
    // Get current challenges
    const currentChallenges = await c.env.DB.prepare(`
      SELECT cp.*, c.challenge_name, c.challenge_description, c.category
      FROM challenge_participation cp
      JOIN challenges c ON cp.challenge_id = c.id
      WHERE cp.relationship_id = ? AND cp.status = 'active'
      ORDER BY cp.created_at DESC
      LIMIT 3
    `).bind(relationship.id).all()
    
    // Get earned achievements
    const achievements = await c.env.DB.prepare(`
      SELECT ua.*, a.achievement_name, a.achievement_description, a.icon_url, a.point_value
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.relationship_id = ?
      ORDER BY ua.earned_date DESC
      LIMIT 10
    `).bind(relationship.id).all()
    
    // Calculate analytics
    const analytics = await calculateAnalytics(c.env, relationship.id)
    
    // Calculate checkin streak
    const checkinStreak = await calculateCheckinStreak(c.env, relationship.id)
    
    return c.json({
      relationship: {
        ...relationship,
        partner,
        days_together: analytics.days_together
      },
      recent_checkins: recentCheckins.results || [],
      upcoming_dates: upcomingDates,
      active_goals: activeGoals.results || [],
      recent_activities: recentActivities.results || [],
      current_challenges: currentChallenges.results || [],
      analytics,
      achievements_earned: achievements.results || [],
      checkin_streak: checkinStreak
    })
  } catch (error) {
    console.error('Get dashboard error:', error)
    return c.json({ error: 'Failed to get dashboard data' }, 500)
  }
})

// Get relationship analytics
app.get('/api/analytics/:relationshipId', async (c) => {
  try {
    const relationshipId = c.req.param('relationshipId')
    const analytics = await calculateAnalytics(c.env, relationshipId)
    
    return c.json({ analytics })
  } catch (error) {
    console.error('Get analytics error:', error)
    return c.json({ error: 'Failed to get analytics' }, 500)
  }
})

// =============================================================================
// NOTIFICATIONS
// =============================================================================

// Get notifications for user
app.get('/api/notifications/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const limit = c.req.query('limit') || '20'
    const unread_only = c.req.query('unread_only') === 'true'
    
    let query = 'SELECT * FROM notifications WHERE user_id = ?'
    const params = [userId]
    
    if (unread_only) {
      query += ' AND is_read = false'
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(parseInt(limit))
    
    const results = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ notifications: results.results || [] })
  } catch (error) {
    console.error('Get notifications error:', error)
    return c.json({ error: 'Failed to get notifications' }, 500)
  }
})

// Mark notification as read
app.put('/api/notifications/:notificationId/read', async (c) => {
  try {
    const notificationId = c.req.param('notificationId')
    
    await c.env.DB.prepare(
      'UPDATE notifications SET is_read = true WHERE id = ?'
    ).bind(notificationId).run()
    
    return c.json({ message: 'Notification marked as read' })
  } catch (error) {
    console.error('Mark notification read error:', error)
    return c.json({ error: 'Failed to mark notification as read' }, 500)
  }
})

// =============================================================================
// HOME PAGE
// =============================================================================

app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl">💕</span>
              <span className="ml-2 text-xl font-bold text-gray-900">Better Together</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="/api" className="text-gray-600 hover:text-gray-900 transition-colors">API</a>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                Start Free Trial
              </button>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-800 text-sm font-medium mb-6">
                <i className="fas fa-heart mr-2"></i>
                Relationship Intelligence Platform
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Relationship Into Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"> Greatest Success Story</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The only platform that combines relationship psychology, intelligent tracking, and gamified challenges to help couples build stronger, more connected relationships through data-driven insights.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg">
                <i className="fas fa-rocket mr-2"></i>
                Start Your Journey Free
              </button>
              <button className="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-md">
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </button>
            </div>
            
            <div className="mt-10 flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                No Credit Card Required
              </div>
              <div className="flex items-center">
                <i className="fas fa-users text-blue-500 mr-2"></i>
                For All Couples
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-purple-500 mr-2"></i>
                Privacy Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-600">87%</div>
              <div className="text-gray-600">Improved Communication</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">94%</div>
              <div className="text-gray-600">Relationship Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600">Days Average Streak</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Relationship Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Science-backed features designed to strengthen your connection and build lasting love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Relationship Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track connection scores, satisfaction levels, and relationship health with comprehensive data-driven insights and trend analysis.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-target text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Shared Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Set and achieve meaningful relationship goals together, from daily habits to major milestones, with progress tracking and celebrations.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-trophy text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Gamified Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete challenges, earn achievements, and unlock new levels of intimacy with our psychology-based gamification system.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heart text-pink-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Love Language Integration</h4>
                  <p className="text-gray-600">Understand and speak each other's love language with personalized insights and recommendations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-check text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Reminders</h4>
                  <p className="text-gray-600">Never miss important dates, anniversaries, or special moments with intelligent notifications.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-comments text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Daily Check-ins</h4>
                  <p className="text-gray-600">Build consistency with quick daily assessments that track mood, connection, and relationship wellness.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-medal text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Achievement System</h4>
                  <p className="text-gray-600">Celebrate milestones together with meaningful badges and rewards that strengthen your bond.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-900">Relationship Health</h5>
                    <span className="text-2xl font-bold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Connection: 9.2/10</span>
                    <span>12-day streak</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-medium text-gray-900">Active Goals</div>
                    <div className="text-lg font-bold text-purple-600">3</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="text-sm font-medium text-gray-900">Achievements</div>
                    <div className="text-lg font-bold text-pink-600">8</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Better Together Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple 4-step process to transform your relationship into a thriving partnership
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Create Profiles</h3>
              <p className="text-gray-600">
                Set up detailed profiles with love languages, preferences, and relationship goals. Invite your partner to join your journey.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Daily Check-ins</h3>
              <p className="text-gray-600">
                Complete quick daily assessments tracking mood, connection levels, gratitude, and relationship satisfaction.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Set Goals & Activities</h3>
              <p className="text-gray-600">
                Create shared goals, plan date nights, take on challenges, and track your progress together as a team.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Grow Together</h3>
              <p className="text-gray-600">
                Watch your relationship health score improve, earn achievements, and build lasting intimacy through consistent actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Feature Set
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every tool you need to build a thriving, data-driven relationship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced User Profiles */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-user-circle text-pink-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Enhanced User Profiles</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Primary & secondary love languages</li>
                <li>• Relationship preferences & goals</li>
                <li>• Profile photos & nicknames</li>
                <li>• Timezone & contact information</li>
                <li>• Custom preference settings</li>
              </ul>
            </div>

            {/* Shared Calendar */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-heart text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Shared Calendar</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Important dates & anniversaries</li>
                <li>• Recurring celebrations</li>
                <li>• Custom milestones</li>
                <li>• Smart reminders</li>
                <li>• Birthday & holiday tracking</li>
              </ul>
            </div>

            {/* Goal Tracking */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-bullseye text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Goal Tracking</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Weekly, monthly & milestone goals</li>
                <li>• Progress tracking & visualization</li>
                <li>• Target dates & completion celebrations</li>
                <li>• Custom goal categories</li>
                <li>• Achievement notifications</li>
              </ul>
            </div>

            {/* Daily Check-ins */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-clipboard-check text-green-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Daily Check-ins</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Connection score (1-10 scale)</li>
                <li>• Mood & satisfaction tracking</li>
                <li>• Gratitude notes & highlights</li>
                <li>• Support needs communication</li>
                <li>• Streak tracking & rewards</li>
              </ul>
            </div>

            {/* Activity Logs */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-heart-circle-plus text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Activity Logs</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Date night planning & tracking</li>
                <li>• Activity satisfaction ratings</li>
                <li>• Location & cost tracking</li>
                <li>• Photo memories</li>
                <li>• Activity type categorization</li>
              </ul>
            </div>

            {/* Gamified System */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-gamepad text-indigo-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Gamified System</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Relationship challenges</li>
                <li>• Achievement badges & rewards</li>
                <li>• Streak counters</li>
                <li>• Progress celebrations</li>
                <li>• Motivation through gamification</li>
              </ul>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-chart-pie text-red-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Relationship health scoring</li>
                <li>• Trend analysis & insights</li>
                <li>• Communication frequency</li>
                <li>• Goal completion rates</li>
                <li>• Activity satisfaction trends</li>
              </ul>
            </div>

            {/* Smart Notifications */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-bell text-cyan-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Smart Notifications</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Daily check-in reminders</li>
                <li>• Important date alerts</li>
                <li>• Achievement notifications</li>
                <li>• Goal progress updates</li>
                <li>• Partner activity alerts</li>
              </ul>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-shield-halved text-gray-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• End-to-end data encryption</li>
                <li>• Private relationship data</li>
                <li>• Secure authentication</li>
                <li>• GDPR compliant</li>
                <li>• Data export options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Relationship Challenges & Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven challenges designed by relationship psychologists to strengthen your bond
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-seedling text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">7-Day Gratitude Challenge</h3>
              <p className="text-sm text-gray-600 mb-3">Express daily appreciation for your partner</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Beginner</span>
                <span className="text-green-600 font-medium">7 days</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-clock text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30-Day Quality Time</h3>
              <p className="text-sm text-gray-600 mb-3">Dedicated time together every day</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Intermediate</span>
                <span className="text-blue-600 font-medium">30 days</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-comments text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Deep Conversations</h3>
              <p className="text-sm text-gray-600 mb-3">Meaningful dialogue starters</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Advanced</span>
                <span className="text-purple-600 font-medium">Ongoing</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border border-pink-200">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-heart-pulse text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Weekly Date Nights</h3>
              <p className="text-sm text-gray-600 mb-3">Regular romantic connections</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">Intermediate</span>
                <span className="text-pink-600 font-medium">Weekly</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-trophy text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Achievement System</h3>
              <p className="text-gray-600">
                Earn badges for milestones like "Week Strong" (7-day streak), "Communication Champion", and "Goal Getter" to celebrate your progress.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-fire text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Streak Tracking</h3>
              <p className="text-gray-600">
                Build momentum with daily check-in streaks, goal completion chains, and activity consistency that strengthens your relationship habits.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-star text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Progress Rewards</h3>
              <p className="text-gray-600">
                Unlock new challenges, celebrate relationship milestones, and get personalized insights as you grow stronger together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Relationship Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you're ready to unlock the full potential of your relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">3 check-ins per week</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">2 active goals</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">1 challenge participation</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">Basic analytics</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 relative text-white transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$19.99</span>
                  <span className="text-pink-200">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <i className="fas fa-check text-pink-200 mr-3"></i>
                    <span>Unlimited check-ins</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-pink-200 mr-3"></i>
                    <span>Unlimited goals & activities</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-pink-200 mr-3"></i>
                    <span>All challenges & custom ones</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-pink-200 mr-3"></i>
                    <span>Advanced analytics & trends</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-pink-200 mr-3"></i>
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full bg-white text-pink-600 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
                  Start Premium Trial
                </button>
              </div>
            </div>

            {/* Annual Plan */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
              <div className="absolute -top-3 -right-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Save 17%
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Annual</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$199</span>
                  <span className="text-gray-600">/year</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">Exclusive annual challenges</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">1 coaching session/year</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    <span className="text-gray-600">Anniversary planning tools</span>
                  </li>
                </ul>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Choose Annual
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Relationship?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of couples who are building stronger, more connected relationships with Better Together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg">
              <i className="fas fa-heart mr-2"></i>
              Start Your Free Journey
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              <i className="fas fa-play mr-2"></i>
              Watch How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl">💕</span>
                <span className="ml-2 text-xl font-bold text-white">Better Together</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming relationships through intelligent connection tracking and shared growth experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Product</h5>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press Kit</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Better Together. Built with 💕 for couples who want to thrive together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
})

// API documentation page
app.get('/api', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Better Together API</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Endpoints</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Authentication & Users</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/users</code> - Create user account</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/users/:userId</code> - Get user profile</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">PUT /api/users/:userId</code> - Update user profile</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Relationships</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/invite-partner</code> - Invite partner to relationship</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/relationships/:userId</code> - Get relationship details</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Daily Check-ins</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/checkins</code> - Submit daily check-in</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/checkins/:relationshipId</code> - Get recent check-ins</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-orange-600">Goals & Activities</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/goals</code> - Create shared goal</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/goals/:relationshipId</code> - Get relationship goals</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/activities</code> - Create activity</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/activities/:relationshipId</code> - Get activities</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600">Dashboard & Analytics</h3>
              <ul className="space-y-2 text-gray-600">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/dashboard/:userId</code> - Get complete dashboard data</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/analytics/:relationshipId</code> - Get relationship analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default app
