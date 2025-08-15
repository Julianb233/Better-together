// Better Together - Frontend JavaScript
// Handles user interactions, API calls, and dynamic content

// API Base URL - automatically detects current host
const API_BASE = window.location.origin + '/api'

// Global state management
const AppState = {
  currentUser: null,
  relationship: null,
  partner: null,
  isLoggedIn: false
}

// Utility functions
const Utils = {
  // Format date for display
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  // Calculate days between dates
  daysBetween: (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  },

  // Show notification
  showNotification: (message, type = 'info') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-black' :
      'bg-blue-500 text-white'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 5000)
  },

  // Show loading state
  showLoading: () => {
    const loader = document.createElement('div')
    loader.id = 'loader'
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    loader.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    `
    document.body.appendChild(loader)
  },

  // Hide loading state
  hideLoading: () => {
    const loader = document.getElementById('loader')
    if (loader) loader.remove()
  }
}

// API calls
const API = {
  // Generic API call with error handling
  call: async (endpoint, options = {}) => {
    try {
      const response = await axios({
        url: `${API_BASE}${endpoint}`,
        ...options
      })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error.response?.data || error
    }
  },

  // User management
  createUser: (userData) => API.call('/users', {
    method: 'POST',
    data: userData
  }),

  getUser: (userId) => API.call(`/users/${userId}`),

  updateUser: (userId, updates) => API.call(`/users/${userId}`, {
    method: 'PUT',
    data: updates
  }),

  // Relationship management
  invitePartner: (userId, partnerEmail, relationshipType, startDate) => API.call('/invite-partner', {
    method: 'POST',
    data: {
      user_id: userId,
      partner_email: partnerEmail,
      relationship_type: relationshipType,
      start_date: startDate
    }
  }),

  getRelationship: (userId) => API.call(`/relationships/${userId}`),

  // Check-ins
  submitCheckin: (checkinData) => API.call('/checkins', {
    method: 'POST',
    data: checkinData
  }),

  getCheckins: (relationshipId, limit = 30) => API.call(`/checkins/${relationshipId}?limit=${limit}`),

  // Goals
  createGoal: (goalData) => API.call('/goals', {
    method: 'POST',
    data: goalData
  }),

  getGoals: (relationshipId, status = 'all') => API.call(`/goals/${relationshipId}?status=${status}`),

  updateGoalProgress: (goalId, progressIncrement) => API.call(`/goals/${goalId}/progress`, {
    method: 'PUT',
    data: { progress_increment: progressIncrement }
  }),

  // Activities
  createActivity: (activityData) => API.call('/activities', {
    method: 'POST',
    data: activityData
  }),

  getActivities: (relationshipId, status = 'all', limit = 50) => 
    API.call(`/activities/${relationshipId}?status=${status}&limit=${limit}`),

  completeActivity: (activityId, completionData) => API.call(`/activities/${activityId}/complete`, {
    method: 'PUT',
    data: completionData
  }),

  // Important dates
  addImportantDate: (dateData) => API.call('/important-dates', {
    method: 'POST',
    data: dateData
  }),

  getImportantDates: (relationshipId, upcoming = false) => 
    API.call(`/important-dates/${relationshipId}?upcoming=${upcoming}`),

  // Challenges
  getChallenges: (category = null, difficulty = null) => {
    let url = '/challenges'
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (difficulty) params.append('difficulty', difficulty)
    if (params.toString()) url += '?' + params.toString()
    return API.call(url)
  },

  startChallenge: (challengeId, relationshipId) => API.call(`/challenges/${challengeId}/start`, {
    method: 'POST',
    data: { relationship_id: relationshipId }
  }),

  getChallengeParticipation: (relationshipId, status = 'all') => 
    API.call(`/challenges/participation/${relationshipId}?status=${status}`),

  // Dashboard
  getDashboard: (userId) => API.call(`/dashboard/${userId}`),

  getAnalytics: (relationshipId) => API.call(`/analytics/${relationshipId}`),

  // Notifications
  getNotifications: (userId, unreadOnly = false, limit = 20) => 
    API.call(`/notifications/${userId}?unread_only=${unreadOnly}&limit=${limit}`),

  markNotificationRead: (notificationId) => API.call(`/notifications/${notificationId}/read`, {
    method: 'PUT'
  })
}

// UI Components and Interactions
const UI = {
  // Initialize the application
  init: () => {
    console.log('Better Together App Initialized')
    
    // Check if we're on the homepage
    if (window.location.pathname === '/') {
      UI.initHomepage()
    }
    
    // Initialize demo functionality
    UI.initDemo()
  },

  // Initialize homepage interactions
  initHomepage: () => {
    // Add click handlers for demo buttons
    const demoButton = document.querySelector('button:contains(\"View Demo\")')
    if (demoButton) {
      demoButton.addEventListener('click', () => {
        UI.showDemo()
      })
    }

    const startButton = document.querySelector('button:contains(\"Start Free Trial\")')
    if (startButton) {
      startButton.addEventListener('click', () => {
        UI.showSignupForm()
      })
    }
  },

  // Show demo modal
  showDemo: () => {
    const modal = UI.createModal('Better Together Demo', `
      <div class=\"space-y-6\">
        <div class=\"text-center\">
          <h3 class=\"text-2xl font-bold mb-4 text-gray-800\">🚀 Demo Features</h3>
          <p class=\"text-gray-600 mb-6\">Explore what Better Together can do for your relationship</p>
        </div>

        <div class=\"grid md:grid-cols-2 gap-4\">
          <button onclick=\"UI.testAPI()\" class=\"bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors\">
            🔧 Test API Connection
          </button>
          <button onclick=\"UI.showSampleData()\" class=\"bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors\">
            📊 View Sample Data
          </button>
          <button onclick=\"UI.showChallenges()\" class=\"bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors\">
            🎯 Browse Challenges
          </button>
          <button onclick=\"UI.showAnalytics()\" class=\"bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors\">
            📈 Sample Analytics
          </button>
        </div>

        <div class=\"bg-yellow-50 border border-yellow-200 rounded-lg p-4\">
          <p class=\"text-yellow-800 text-sm\">
            <strong>Note:</strong> This is a live demo of the Better Together platform. 
            All features are functional and backed by a real database.
          </p>
        </div>
      </div>
    `)
    
    document.body.appendChild(modal)
  },

  // Test API connection
  testAPI: async () => {
    Utils.showLoading()
    try {
      // Test basic API endpoints
      const challengesResponse = await API.getChallenges()
      Utils.hideLoading()
      
      Utils.showNotification(`✅ API Connected! Found ${challengesResponse.challenges.length} available challenges`, 'success')
      
      // Show challenge data
      const challengesList = challengesResponse.challenges.map(challenge => 
        `<li class=\"mb-2\"><strong>${challenge.challenge_name}</strong> - ${challenge.category} (${challenge.difficulty_level})</li>`
      ).join('')
      
      UI.createModal('Available Challenges', `
        <ul class=\"space-y-2 max-h-64 overflow-y-auto\">
          ${challengesList}
        </ul>
      `)
    } catch (error) {
      Utils.hideLoading()
      Utils.showNotification('❌ API Connection Failed: ' + (error.error || error.message), 'error')
    }
  },

  // Show sample relationship data
  showSampleData: () => {
    const sampleData = {\n      relationship: {\n        days_together: 547,\n        relationship_type: 'married',\n        anniversary_date: '2023-03-15'\n      },\n      analytics: {\n        average_connection_score: 8.4,\n        average_satisfaction_score: 9.1,\n        checkin_streak: 12,\n        overall_health_score: 87\n      },\n      recent_goals: [\n        { goal_name: 'Weekly Date Nights', current_progress: 3, target_count: 4 },\n        { goal_name: 'Daily Gratitude Practice', current_progress: 12, target_count: 30 }\n      ]\n    }\n\n    UI.createModal('Sample Relationship Data', `\n      <div class=\"space-y-4\">\n        <div class=\"bg-pink-50 p-4 rounded-lg\">\n          <h4 class=\"font-bold text-pink-800 mb-2\">💕 Relationship Overview</h4>\n          <p><strong>Days Together:</strong> ${sampleData.relationship.days_together}</p>\n          <p><strong>Status:</strong> ${sampleData.relationship.relationship_type}</p>\n          <p><strong>Anniversary:</strong> ${Utils.formatDate(sampleData.relationship.anniversary_date)}</p>\n        </div>\n\n        <div class=\"bg-blue-50 p-4 rounded-lg\">\n          <h4 class=\"font-bold text-blue-800 mb-2\">📊 Analytics</h4>\n          <p><strong>Connection Score:</strong> ${sampleData.analytics.average_connection_score}/10</p>\n          <p><strong>Satisfaction Score:</strong> ${sampleData.analytics.average_satisfaction_score}/10</p>\n          <p><strong>Check-in Streak:</strong> ${sampleData.analytics.checkin_streak} days</p>\n          <p><strong>Overall Health:</strong> ${sampleData.analytics.overall_health_score}%</p>\n        </div>\n\n        <div class=\"bg-green-50 p-4 rounded-lg\">\n          <h4 class=\"font-bold text-green-800 mb-2\">🎯 Current Goals</h4>\n          ${sampleData.recent_goals.map(goal => \n            `<div class=\"mb-2\">\n              <p><strong>${goal.goal_name}</strong></p>\n              <div class=\"bg-gray-200 rounded-full h-2 mt-1\">\n                <div class=\"bg-green-500 h-2 rounded-full\" style=\"width: ${(goal.current_progress / goal.target_count) * 100}%\"></div>\n              </div>\n              <p class=\"text-sm text-gray-600\">${goal.current_progress}/${goal.target_count}</p>\n            </div>`\n          ).join('')}\n        </div>\n      </div>\n    `)\n  },

  // Show challenges\n  showChallenges: async () => {\n    Utils.showLoading()\n    try {\n      const response = await API.getChallenges()\n      Utils.hideLoading()\n      \n      const challengesList = response.challenges.map(challenge => \n        `<div class=\"bg-white border rounded-lg p-4 mb-4\">\n          <div class=\"flex justify-between items-start mb-2\">\n            <h4 class=\"font-bold text-gray-800\">${challenge.challenge_name}</h4>\n            <span class=\"text-xs px-2 py-1 rounded-full ${\n              challenge.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :\n              challenge.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :\n              'bg-red-100 text-red-800'\n            }\">${challenge.difficulty_level}</span>\n          </div>\n          <p class=\"text-gray-600 text-sm mb-2\">${challenge.challenge_description || 'No description available'}</p>\n          <div class=\"flex justify-between items-center\">\n            <span class=\"text-xs text-gray-500\">${challenge.category} • ${challenge.duration_days || 'Flexible'} days</span>\n            <button class=\"bg-pink-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-pink-600\">\n              Start Challenge\n            </button>\n          </div>\n        </div>`\n      ).join('')\n      \n      UI.createModal('Available Challenges', `\n        <div class=\"max-h-96 overflow-y-auto\">\n          ${challengesList || '<p class=\"text-gray-500\">No challenges available</p>'}\n        </div>\n      `)\n    } catch (error) {\n      Utils.hideLoading()\n      Utils.showNotification('Failed to load challenges: ' + (error.error || error.message), 'error')\n    }\n  },

  // Show analytics demo
  showAnalytics: () => {
    UI.createModal('Sample Analytics Dashboard', `
      <div class=\"space-y-6\">
        <div class=\"grid grid-cols-2 gap-4\">\n          <div class=\"text-center p-4 bg-pink-50 rounded-lg\">\n            <div class=\"text-3xl font-bold text-pink-600\">87%</div>\n            <div class=\"text-sm text-gray-600\">Relationship Health</div>\n          </div>\n          <div class=\"text-center p-4 bg-blue-50 rounded-lg\">\n            <div class=\"text-3xl font-bold text-blue-600\">12</div>\n            <div class=\"text-sm text-gray-600\">Day Streak</div>\n          </div>\n        </div>\n\n        <div class=\"bg-gray-50 p-4 rounded-lg\">\n          <h4 class=\"font-bold mb-3\">📈 Trend Analysis</h4>\n          <div class=\"space-y-2\">\n            <div class=\"flex justify-between\">\n              <span>Connection Score Trend</span>\n              <span class=\"text-green-600\">↗️ +0.3 this week</span>\n            </div>\n            <div class=\"flex justify-between\">\n              <span>Date Night Frequency</span>\n              <span class=\"text-green-600\">↗️ +1 this month</span>\n            </div>\n            <div class=\"flex justify-between\">\n              <span>Communication Quality</span>\n              <span class=\"text-blue-600\">→ Stable</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"bg-yellow-50 border border-yellow-200 rounded-lg p-4\">\n          <h4 class=\"font-bold text-yellow-800 mb-2\">💡 Insights</h4>\n          <ul class=\"text-sm text-yellow-700 space-y-1\">\n            <li>• Your check-in consistency has improved 40% this month</li>\n            <li>• Quality time activities show highest satisfaction ratings</li>\n            <li>• Consider trying a gratitude challenge to boost connection scores</li>\n          </ul>\n        </div>\n      </div>\n    `)\n  },

  // Show signup form
  showSignupForm: () => {
    const modal = UI.createModal('Start Your Journey Together', `
      <form id=\"signupForm\" class=\"space-y-4\">\n        <div>\n          <label class=\"block text-sm font-medium text-gray-700 mb-1\">Your Name</label>\n          <input type=\"text\" name=\"name\" required class=\"w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500\">\n        </div>\n        \n        <div>\n          <label class=\"block text-sm font-medium text-gray-700 mb-1\">Email Address</label>\n          <input type=\"email\" name=\"email\" required class=\"w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500\">\n        </div>\n        \n        <div>\n          <label class=\"block text-sm font-medium text-gray-700 mb-1\">Partner's Email</label>\n          <input type=\"email\" name=\"partner_email\" required class=\"w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500\">\n        </div>\n        \n        <div>\n          <label class=\"block text-sm font-medium text-gray-700 mb-1\">Relationship Type</label>\n          <select name=\"relationship_type\" class=\"w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500\">\n            <option value=\"dating\">Dating</option>\n            <option value=\"engaged\">Engaged</option>\n            <option value=\"married\">Married</option>\n            <option value=\"partnership\">Partnership</option>\n          </select>\n        </div>\n        \n        <div>\n          <label class=\"block text-sm font-medium text-gray-700 mb-1\">When did you start dating?</label>\n          <input type=\"date\" name=\"start_date\" class=\"w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500\">\n        </div>\n        \n        <button type=\"submit\" class=\"w-full bg-pink-600 text-white p-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors\">\n          🚀 Start Building Together\n        </button>\n      </form>\n    `)\n    \n    // Add form submission handler\n    const form = modal.querySelector('#signupForm')\n    form.addEventListener('submit', UI.handleSignup)\n    \n    document.body.appendChild(modal)\n  },

  // Handle signup form submission
  handleSignup: async (e) => {\n    e.preventDefault()\n    const formData = new FormData(e.target)\n    const data = Object.fromEntries(formData.entries())\n    \n    Utils.showLoading()\n    \n    try {\n      // Create user account\n      const userResponse = await API.createUser({\n        email: data.email,\n        name: data.name\n      })\n      \n      // Invite partner\n      const inviteResponse = await API.invitePartner(\n        userResponse.user.id,\n        data.partner_email,\n        data.relationship_type,\n        data.start_date\n      )\n      \n      Utils.hideLoading()\n      \n      // Close signup modal\n      const modal = document.querySelector('.modal')\n      if (modal) modal.remove()\n      \n      Utils.showNotification('🎉 Account created successfully! Welcome to Better Together!', 'success')\n      \n      // Show next steps\n      UI.createModal('Welcome to Better Together! 🎉', `\n        <div class=\"text-center space-y-4\">\n          <div class=\"text-6xl mb-4\">💕</div>\n          <h3 class=\"text-2xl font-bold text-gray-800\">Your Journey Begins!</h3>\n          <p class=\"text-gray-600\">Your account has been created and your partner has been invited.</p>\n          \n          <div class=\"bg-green-50 border border-green-200 rounded-lg p-4 text-left\">\n            <h4 class=\"font-bold text-green-800 mb-2\">What's Next?</h4>\n            <ul class=\"text-green-700 space-y-1 text-sm\">\n              <li>✅ Your account is ready</li>\n              <li>📧 ${data.partner_email} will receive an invitation</li>\n              <li>🚀 Once they join, you can start tracking your relationship</li>\n              <li>💝 Begin with daily check-ins and shared goals</li>\n            </ul>\n          </div>\n          \n          <p class=\"text-sm text-gray-500\">User ID: ${userResponse.user.id}</p>\n        </div>\n      `)\n      \n    } catch (error) {\n      Utils.hideLoading()\n      Utils.showNotification('❌ Signup failed: ' + (error.error || error.message), 'error')\n    }\n  },

  // Create modal component
  createModal: (title, content) => {\n    const modal = document.createElement('div')\n    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'\n    modal.innerHTML = `\n      <div class=\"bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto\">\n        <div class=\"p-6 border-b border-gray-200\">\n          <div class=\"flex justify-between items-center\">\n            <h2 class=\"text-2xl font-bold text-gray-800\">${title}</h2>\n            <button onclick=\"this.closest('.modal').remove()\" class=\"text-gray-500 hover:text-gray-700 text-2xl\">&times;</button>\n          </div>\n        </div>\n        <div class=\"p-6\">\n          ${content}\n        </div>\n      </div>\n    `\n    \n    // Close modal when clicking outside\n    modal.addEventListener('click', (e) => {\n      if (e.target === modal) {\n        modal.remove()\n      }\n    })\n    \n    return modal\n  },

  // Initialize demo functionality
  initDemo: () => {\n    // Make API and UI functions globally available for demo\n    window.API = API\n    window.UI = UI\n    window.Utils = Utils\n    \n    console.log('💕 Better Together Demo Ready!')\n    console.log('Try: UI.showDemo(), API.getChallenges(), Utils.showNotification(\"Hello!\", \"success\")')\n  }\n}\n\n// Initialize the app when DOM is loaded\nif (document.readyState === 'loading') {\n  document.addEventListener('DOMContentLoaded', UI.init)\n} else {\n  UI.init()\n}\n\n// Global error handling\nwindow.addEventListener('error', (e) => {\n  console.error('Application Error:', e.error)\n  Utils.showNotification('An unexpected error occurred', 'error')\n})\n\n// Handle unhandled promise rejections\nwindow.addEventListener('unhandledrejection', (e) => {\n  console.error('Unhandled Promise Rejection:', e.reason)\n  Utils.showNotification('An unexpected error occurred', 'error')\n})\n\nconsole.log('🚀 Better Together Frontend Loaded Successfully!')