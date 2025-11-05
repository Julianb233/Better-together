// Calendar Sync Service - External calendar integration with configurable frequency
import type { Env } from '../types'

export interface CalendarSyncConfig {
  user_id: string
  provider: 'google' | 'outlook' | 'apple' | 'other'
  sync_enabled: boolean
  sync_frequency_minutes: number // User-configurable: 30, 60, 360 (6h), 720 (12h), 1440 (24h)
  auto_block_events: boolean
}

export interface CalendarEvent {
  external_event_id: string
  provider: string
  event_title: string
  start_datetime: Date
  end_datetime: Date
  is_flexible: boolean
  is_all_day: boolean
  location?: string
}

export interface SyncResult {
  events_imported: number
  events_updated: number
  events_removed: number
  last_sync: Date
  next_sync: Date
  status: 'success' | 'failed'
  error?: string
}

/**
 * Update calendar sync settings with user-configurable frequency
 */
export async function updateCalendarSyncSettings(
  env: Env,
  config: CalendarSyncConfig
): Promise<void> {
  const now = new Date().toISOString()

  // Validate frequency (must be reasonable to avoid excessive API calls)
  const validFrequencies = [30, 60, 360, 720, 1440] // 30min, 1h, 6h, 12h, 24h
  if (!validFrequencies.includes(config.sync_frequency_minutes)) {
    throw new Error(
      'Invalid sync frequency. Must be one of: 30, 60, 360, 720, 1440 minutes'
    )
  }

  await env.DB.prepare(`
    INSERT INTO calendar_sync_settings (
      id, user_id, provider, sync_enabled, sync_frequency_minutes,
      auto_block_events, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, provider) DO UPDATE SET
      sync_enabled = excluded.sync_enabled,
      sync_frequency_minutes = excluded.sync_frequency_minutes,
      auto_block_events = excluded.auto_block_events,
      updated_at = excluded.updated_at
  `).bind(
    generateId(),
    config.user_id,
    config.provider,
    config.sync_enabled,
    config.sync_frequency_minutes,
    config.auto_block_events,
    now,
    now
  ).run()

  // If enabling sync, trigger immediate sync
  if (config.sync_enabled) {
    await queueCalendarSync(env, config.user_id, config.provider, 'auto')
  }
}

/**
 * Get calendar sync settings for a user
 */
export async function getCalendarSyncSettings(
  env: Env,
  userId: string
): Promise<any[]> {
  const settings = await env.DB.prepare(`
    SELECT * FROM calendar_sync_settings
    WHERE user_id = ?
    ORDER BY provider
  `).bind(userId).all()

  return settings.results
}

/**
 * Queue a calendar sync job
 */
export async function queueCalendarSync(
  env: Env,
  userId: string,
  provider: string,
  syncType: 'manual' | 'auto' | 'background' = 'manual'
): Promise<string> {
  const jobId = generateId()
  const now = new Date().toISOString()

  await env.DB.prepare(`
    INSERT INTO calendar_sync_jobs (
      id, user_id, provider, sync_type, status, created_at
    ) VALUES (?, ?, ?, ?, 'pending', ?)
  `).bind(jobId, userId, provider, syncType, now).run()

  // In production, this would trigger a background worker
  // For now, we'll process immediately if manual
  if (syncType === 'manual') {
    await processCalendarSync(env, jobId)
  }

  return jobId
}

/**
 * Process calendar sync job
 * This is a mock implementation - in production would integrate with:
 * - Google Calendar API (OAuth 2.0)
 * - Microsoft Graph API (for Outlook)
 * - iCloud Calendar API
 */
export async function processCalendarSync(
  env: Env,
  jobId: string
): Promise<SyncResult> {
  const now = new Date().toISOString()

  // Get job details
  const job = await env.DB.prepare(`
    SELECT * FROM calendar_sync_jobs WHERE id = ?
  `).bind(jobId).first()

  if (!job) {
    throw new Error('Sync job not found')
  }

  const userId = job.user_id as string
  const provider = job.provider as string

  // Update job status to running
  await env.DB.prepare(`
    UPDATE calendar_sync_jobs
    SET status = 'running', started_at = ?
    WHERE id = ?
  `).bind(now, jobId).run()

  try {
    // Get sync settings
    const settings = await env.DB.prepare(`
      SELECT * FROM calendar_sync_settings
      WHERE user_id = ? AND provider = ?
    `).bind(userId, provider).first()

    if (!settings || !settings.sync_enabled) {
      throw new Error('Sync not enabled for this provider')
    }

    // Fetch events from external calendar
    // This is where you'd call the actual API
    const externalEvents = await fetchExternalCalendarEvents(
      provider,
      settings.access_token_encrypted as string,
      userId
    )

    // Import/update events
    let eventsImported = 0
    let eventsUpdated = 0

    for (const event of externalEvents) {
      const existingEvent = await env.DB.prepare(`
        SELECT id FROM synced_calendar_events
        WHERE user_id = ? AND external_event_id = ? AND provider = ?
      `).bind(userId, event.external_event_id, provider).first()

      if (existingEvent) {
        // Update existing event
        await env.DB.prepare(`
          UPDATE synced_calendar_events
          SET event_title = ?, start_datetime = ?, end_datetime = ?,
              is_flexible = ?, is_all_day = ?, location = ?,
              last_synced = ?
          WHERE id = ?
        `).bind(
          event.event_title,
          event.start_datetime.toISOString(),
          event.end_datetime.toISOString(),
          event.is_flexible,
          event.is_all_day,
          event.location || null,
          now,
          existingEvent.id
        ).run()
        eventsUpdated++
      } else {
        // Insert new event
        await env.DB.prepare(`
          INSERT INTO synced_calendar_events (
            id, user_id, external_event_id, provider, event_title,
            start_datetime, end_datetime, is_flexible, is_all_day,
            location, last_synced
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          generateId(),
          userId,
          event.external_event_id,
          provider,
          event.event_title,
          event.start_datetime.toISOString(),
          event.end_datetime.toISOString(),
          event.is_flexible,
          event.is_all_day,
          event.location || null,
          now
        ).run()
        eventsImported++
      }

      // Auto-block in availability if enabled
      if (settings.auto_block_events && !event.is_flexible) {
        await autoBlockCalendarEvent(env, userId, event)
      }
    }

    // Remove old events that are no longer in external calendar
    const externalEventIds = externalEvents.map(e => e.external_event_id)
    let eventsRemoved = 0

    if (externalEventIds.length > 0) {
      const placeholders = externalEventIds.map(() => '?').join(',')
      const deleteResult = await env.DB.prepare(`
        DELETE FROM synced_calendar_events
        WHERE user_id = ?
          AND provider = ?
          AND external_event_id NOT IN (${placeholders})
          AND last_synced < ?
      `).bind(userId, provider, ...externalEventIds, now).run()

      eventsRemoved = deleteResult.meta.changes || 0
    }

    // Update job as completed
    const completedAt = new Date().toISOString()
    await env.DB.prepare(`
      UPDATE calendar_sync_jobs
      SET status = 'completed', events_imported = ?, events_updated = ?,
          completed_at = ?
      WHERE id = ?
    `).bind(eventsImported, eventsUpdated, completedAt, jobId).run()

    // Update last sync time in settings
    await env.DB.prepare(`
      UPDATE calendar_sync_settings
      SET last_sync_at = ?
      WHERE user_id = ? AND provider = ?
    `).bind(completedAt, userId, provider).run()

    const syncFrequency = settings.sync_frequency_minutes as number
    const nextSync = new Date(Date.now() + syncFrequency * 60 * 1000)

    return {
      events_imported: eventsImported,
      events_updated: eventsUpdated,
      events_removed: eventsRemoved,
      last_sync: new Date(completedAt),
      next_sync: nextSync,
      status: 'success',
    }
  } catch (error: any) {
    // Update job as failed
    await env.DB.prepare(`
      UPDATE calendar_sync_jobs
      SET status = 'failed', error_message = ?, completed_at = ?
      WHERE id = ?
    `).bind(error.message, now, jobId).run()

    return {
      events_imported: 0,
      events_updated: 0,
      events_removed: 0,
      last_sync: new Date(),
      next_sync: new Date(),
      status: 'failed',
      error: error.message,
    }
  }
}

/**
 * Check if sync is due for a user
 */
export async function checkSyncDue(env: Env, userId: string): Promise<boolean> {
  const settings = await env.DB.prepare(`
    SELECT
      sync_frequency_minutes,
      last_sync_at,
      sync_enabled
    FROM calendar_sync_settings
    WHERE user_id = ? AND sync_enabled = TRUE
  `).bind(userId).all()

  for (const setting of settings.results) {
    if (!setting.last_sync_at) {
      return true // Never synced, due for sync
    }

    const lastSync = new Date(setting.last_sync_at as string)
    const frequencyMs = (setting.sync_frequency_minutes as number) * 60 * 1000
    const nextSyncDue = new Date(lastSync.getTime() + frequencyMs)

    if (new Date() >= nextSyncDue) {
      return true
    }
  }

  return false
}

/**
 * Get synced events for availability calculation
 */
export async function getSyncedBusyTimes(
  env: Env,
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> {
  const events = await env.DB.prepare(`
    SELECT * FROM synced_calendar_events
    WHERE user_id = ?
      AND start_datetime >= ?
      AND start_datetime <= ?
      AND is_flexible = FALSE
    ORDER BY start_datetime
  `).bind(userId, startDate.toISOString(), endDate.toISOString()).all()

  return events.results.map((e: any) => ({
    external_event_id: e.external_event_id,
    provider: e.provider,
    event_title: e.event_title,
    start_datetime: new Date(e.start_datetime),
    end_datetime: new Date(e.end_datetime),
    is_flexible: e.is_flexible,
    is_all_day: e.is_all_day,
    location: e.location,
  }))
}

/**
 * Auto-block calendar event in user's availability
 * This creates a "busy" block in calendar_availability
 */
async function autoBlockCalendarEvent(
  env: Env,
  userId: string,
  event: CalendarEvent
): Promise<void> {
  const eventDate = event.start_datetime.toISOString().split('T')[0]
  const startTime = event.start_datetime.toTimeString().slice(0, 5)
  const endTime = event.end_datetime.toTimeString().slice(0, 5)

  await env.DB.prepare(`
    INSERT OR IGNORE INTO calendar_availability (
      id, user_id, day_of_week, start_time, end_time,
      is_recurring, specific_date, availability_type,
      notes, created_at, updated_at
    ) VALUES (?, ?, 0, ?, ?, FALSE, ?, 'busy', ?, ?, ?)
  `).bind(
    generateId(),
    userId,
    startTime,
    endTime,
    eventDate,
    `Auto-blocked: ${event.event_title}`,
    new Date().toISOString(),
    new Date().toISOString()
  ).run()
}

/**
 * Mock function to fetch external calendar events
 * In production, this would integrate with actual calendar APIs
 */
async function fetchExternalCalendarEvents(
  provider: string,
  accessToken: string,
  userId: string
): Promise<CalendarEvent[]> {
  // This is a mock implementation
  // In production, you would:
  // 1. Decrypt accessToken
  // 2. Make API calls to Google Calendar / Microsoft Graph / iCloud
  // 3. Parse and return events

  // For now, return empty array
  // When implementing, use OAuth 2.0 for authentication

  console.log(`[Mock] Fetching ${provider} calendar for user ${userId}`)

  // Example Google Calendar API call:
  // const response = await fetch(
  //   'https://www.googleapis.com/calendar/v3/calendars/primary/events',
  //   {
  //     headers: { Authorization: `Bearer ${decryptedToken}` }
  //   }
  // )

  return []
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
