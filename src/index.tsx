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

// Create new user account
app.post('/api/users', async (c) => {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="text-pink-600">💕</span> Better Together
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your relationship into your greatest success story through intelligent connection tracking and shared goal achievement.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Relationship Analytics</h3>
            <p className="text-gray-600">Track connection scores, satisfaction levels, and relationship health with data-driven insights.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Shared Goals</h3>
            <p className="text-gray-600">Set and achieve relationship goals together, from weekly date nights to major milestones.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Gamified Growth</h3>
            <p className="text-gray-600">Earn achievements, complete challenges, and unlock new levels of intimacy together.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💝</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Love Language Integration</h4>
                  <p className="text-gray-600">Store and display each partner's love language for better communication.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📅</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Important Dates Manager</h4>
                  <p className="text-gray-600">Never miss anniversaries, birthdays, or special moments again.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Daily Check-ins</h4>
                  <p className="text-gray-600">Track relationship wellness with quick daily connection assessments.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Challenge System</h4>
                  <p className="text-gray-600">Complete relationship-building challenges like "7-Day Gratitude" or "Weekly Date Nights."</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Activity Tracking</h4>
                  <p className="text-gray-600">Plan, track, and rate your shared activities and date nights.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🏅</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Achievement System</h4>
                  <p className="text-gray-600">Unlock badges and celebrate relationship milestones together.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-pink-100 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Grow Together?</h2>
          <p className="text-lg text-gray-600 mb-6">Start building your stronger relationship today with Better Together.</p>
          <div className="space-x-4">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Start Free Trial
            </button>
            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold border-2 border-pink-600 hover:bg-pink-50 transition-colors">
              View Demo
            </button>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Better Together - Built with 💕 for couples who want to thrive</p>
        </footer>
      </div>
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
