// Mobile UI/UX Design Mockup Page
export const mobileUIHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iPhone App Design - Better Together Mobile Experience</title>
    <meta name="description" content="See how Better Together looks and feels on iPhone with these realistic mobile UI/UX mockups showing the complete user journey.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    },
                    fontFamily: {
                        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'system-ui', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        .iphone-frame {
            width: 280px;
            height: 580px;
            background: #1c1c1e;
            border-radius: 45px;
            padding: 10px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .iphone-screen {
            width: 100%;
            height: 100%;
            background: #000;
            border-radius: 35px;
            position: relative;
            overflow: hidden;
        }
        .iphone-notch {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 130px;
            height: 25px;
            background: #000;
            border-radius: 0 0 15px 15px;
            z-index: 20;
        }
        .screen-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f8fafc;
            padding-top: 30px;
            overflow: hidden;
        }
        .status-bar {
            position: absolute;
            top: 8px;
            left: 20px;
            right: 20px;
            height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            font-weight: 600;
            color: #000;
            z-index: 21;
        }
        .app-interface {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .mock-input {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px 16px;
            font-size: 14px;
        }
        .chat-bubble-user {
            background: #007AFF;
            color: white;
            margin-left: auto;
            margin-right: 0;
            border-radius: 18px 18px 4px 18px;
        }
        .chat-bubble-ai {
            background: #e5e7eb;
            color: #1f2937;
            margin-right: auto;
            margin-left: 0;
            border-radius: 18px 18px 18px 4px;
        }
        .tab-active {
            color: #007AFF;
        }
        .heart-beat {
            animation: heartbeat 2s ease-in-out infinite;
        }
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    </style>
</head>
<body class="bg-gray-50 font-sf">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="/" class="flex items-center">
                    <span class="text-2xl">💕</span>
                    <span class="ml-2 text-xl font-bold text-gray-900">Better Together</span>
                </a>
                <div class="flex items-center space-x-6">
                    <a href="/ai-coach.html" class="text-gray-600 hover:text-gray-900">AI Coach</a>
                    <a href="/smart-scheduling.html" class="text-gray-600 hover:text-gray-900">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="text-gray-600 hover:text-gray-900">Suggestions</a>
                    <a href="/mobile-ui.html" class="text-primary-600 font-medium">Mobile Design</a>
                    <a href="/" class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-primary-50 to-purple-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-primary-100 p-4 rounded-full">
                    <i class="fas fa-mobile-alt text-4xl text-primary-600"></i>
                </div>
            </div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
                iPhone App Design Preview
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience how Better Together feels in your pocket. Beautifully designed for iOS with 
                intuitive navigation and seamless AI coaching conversations.
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    <i class="fas fa-download mr-2"></i>Download for iOS
                </button>
                <button class="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                    <i class="fas fa-eye mr-2"></i>View Design System
                </button>
            </div>
        </div>
    </div>

    <!-- Main App Screens -->
    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Complete User Journey</h2>
                <p class="text-xl text-gray-600">From onboarding to daily coaching - every interaction designed with care</p>
            </div>

            <!-- Onboarding Flow -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Onboarding & Setup</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Welcome Screen -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gradient-to-br from-primary-500 to-purple-600 text-white relative">
                                    <div class="absolute inset-0 bg-black opacity-10"></div>
                                    <div class="relative z-10 flex flex-col items-center justify-center h-full px-8">
                                        <div class="text-6xl mb-6 heart-beat">💕</div>
                                        <h1 class="text-2xl font-bold mb-4 text-center">Welcome to Better Together</h1>
                                        <p class="text-lg text-center text-white opacity-90 mb-12">
                                            Your AI relationship coach that grows with your love story
                                        </p>
                                        <div class="w-full space-y-4">
                                            <button class="w-full bg-white text-primary-600 py-4 rounded-full font-semibold text-lg">
                                                Start Your Journey
                                            </button>
                                            <button class="w-full border-2 border-white text-white py-4 rounded-full font-semibold text-lg">
                                                I Have an Account
                                            </button>
                                        </div>
                                        <div class="flex space-x-2 mt-8">
                                            <div class="w-2 h-2 bg-white rounded-full"></div>
                                            <div class="w-2 h-2 bg-white opacity-50 rounded-full"></div>
                                            <div class="w-2 h-2 bg-white opacity-50 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Setup -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <div class="px-6 py-4 border-b border-gray-100">
                                        <div class="flex items-center justify-between">
                                            <button class="text-primary-600 font-medium">Back</button>
                                            <h1 class="text-lg font-semibold">Tell us about you</h1>
                                            <span class="text-primary-600 font-medium">2/4</span>
                                        </div>
                                    </div>
                                    <div class="flex-1 px-6 py-8">
                                        <div class="text-center mb-8">
                                            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <i class="fas fa-camera text-gray-500 text-xl"></i>
                                            </div>
                                            <button class="text-primary-600 font-medium">Add Photo</button>
                                        </div>
                                        <div class="space-y-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                                <input type="text" class="mock-input w-full" placeholder="Enter your name" value="Sarah">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                                                <input type="text" class="mock-input w-full" placeholder="Enter your age" value="28">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">Love Language</label>
                                                <select class="mock-input w-full">
                                                    <option>Words of Affirmation</option>
                                                    <option>Quality Time</option>
                                                    <option>Physical Touch</option>
                                                    <option>Acts of Service</option>
                                                    <option>Receiving Gifts</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-6 py-4">
                                        <button class="w-full bg-primary-600 text-white py-4 rounded-full font-semibold">
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Partner Connection -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <div class="px-6 py-4 border-b border-gray-100">
                                        <div class="flex items-center justify-between">
                                            <button class="text-primary-600 font-medium">Back</button>
                                            <h1 class="text-lg font-semibold">Connect with Partner</h1>
                                            <span class="text-primary-600 font-medium">4/4</span>
                                        </div>
                                    </div>
                                    <div class="flex-1 px-6 py-8 text-center">
                                        <div class="mb-8">
                                            <div class="flex justify-center items-center mb-6">
                                                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <span class="text-2xl">👩‍🦰</span>
                                                </div>
                                                <div class="mx-4">
                                                    <div class="w-8 h-1 bg-primary-300 rounded-full"></div>
                                                </div>
                                                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <i class="fas fa-user text-gray-400 text-xl"></i>
                                                </div>
                                            </div>
                                            <h2 class="text-xl font-bold text-gray-900 mb-2">Almost Ready!</h2>
                                            <p class="text-gray-600">Send an invitation to your partner to complete your setup</p>
                                        </div>
                                        <div class="space-y-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2 text-left">Partner's Email</label>
                                                <input type="email" class="mock-input w-full" placeholder="partner@email.com" value="mike@email.com">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2 text-left">Personal Message (Optional)</label>
                                                <textarea class="mock-input w-full h-20 resize-none" placeholder="Hey babe, let's try this relationship app together!">Hey babe, let's try this relationship app together! 💕</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-6 py-4">
                                        <button class="w-full bg-primary-600 text-white py-4 rounded-full font-semibold mb-3">
                                            <i class="fas fa-paper-plane mr-2"></i>Send Invitation
                                        </button>
                                        <button class="w-full text-gray-600 py-3 font-medium">
                                            Skip for now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main App Interface -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Daily App Experience</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Home Dashboard -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4 bg-white">
                                        <div class="flex items-center justify-between mb-4">
                                            <div>
                                                <h1 class="text-xl font-bold text-gray-900">Good Morning, Sarah!</h1>
                                                <p class="text-sm text-gray-600">Tuesday, Aug 19, 2025</p>
                                            </div>
                                            <div class="flex items-center space-x-3">
                                                <button class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <i class="fas fa-bell text-gray-600 text-xs"></i>
                                                </button>
                                                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <span class="text-sm">👩‍🦰</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Connection Status -->
                                        <div class="flex items-center justify-between bg-primary-50 p-4 rounded-xl">
                                            <div class="flex items-center">
                                                <div class="flex -space-x-2 mr-3">
                                                    <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                                                        <span class="text-white text-xs">👩‍🦰</span>
                                                    </div>
                                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                                        <span class="text-white text-xs">👨</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p class="text-sm font-semibold text-gray-900">Connected with Mike</p>
                                                    <p class="text-xs text-gray-600">12 day streak</p>
                                                </div>
                                            </div>
                                            <div class="text-2xl">💕</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Quick Actions -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Focus</h2>
                                        <div class="grid grid-cols-2 gap-3">
                                            <button class="bg-white p-4 rounded-xl text-left">
                                                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                                    <i class="fas fa-comments text-blue-600 text-sm"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 text-sm">AI Coach</p>
                                                <p class="text-xs text-gray-600">Get guidance</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-xl text-left">
                                                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                                    <i class="fas fa-calendar text-green-600 text-sm"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 text-sm">Plan Date</p>
                                                <p class="text-xs text-gray-600">Schedule time</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-xl text-left">
                                                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                                                    <i class="fas fa-heart text-purple-600 text-sm"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 text-sm">Check-in</p>
                                                <p class="text-xs text-gray-600">Share feelings</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-xl text-left">
                                                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                                                    <i class="fas fa-lightbulb text-yellow-600 text-sm"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 text-sm">Suggestions</p>
                                                <p class="text-xs text-gray-600">New ideas</p>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Recent Activity -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent</h2>
                                        <div class="space-y-3">
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <i class="fas fa-robot text-primary-600 text-sm"></i>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900">AI Coaching Session</p>
                                                        <p class="text-xs text-gray-600 truncate">Discussed communication patterns...</p>
                                                        <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span class="text-sm">👨</span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900">Mike completed check-in</p>
                                                        <p class="text-xs text-gray-600 truncate">Feeling grateful and excited about weekend</p>
                                                        <p class="text-xs text-gray-500 mt-1">Yesterday</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 safe-area-padding">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- AI Chat Interface -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <!-- Chat Header -->
                                    <div class="px-4 py-3 border-b border-gray-200 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-arrow-left"></i>
                                            </button>
                                            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                <i class="fas fa-robot text-primary-600 text-sm"></i>
                                            </div>
                                            <div class="flex-1">
                                                <h1 class="font-semibold text-gray-900">AI Coach</h1>
                                                <p class="text-xs text-green-600">Online • Always here for you</p>
                                            </div>
                                            <button class="text-gray-600">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Chat Messages -->
                                    <div class="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">Hi Sarah! I noticed you and Mike had a great check-in yesterday. How are you both feeling about your communication lately?</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2 justify-end">
                                            <div class="chat-bubble-user max-w-xs px-4 py-3">
                                                <p class="text-sm">Actually, we've been struggling a bit. We had a small argument about planning our weekend and it felt like we weren't really hearing each other.</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">I understand that feeling. Those planning disagreements often reflect different needs underneath. Can you tell me what felt most important to you about the weekend plans?</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2 justify-end">
                                            <div class="chat-bubble-user max-w-xs px-4 py-3">
                                                <p class="text-sm">I guess I really wanted us to have some quality time together, but I felt like he was more focused on being productive and getting errands done.</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">That makes perfect sense! Your love language is Quality Time, so connection feels essential to you. Mike might not have realized how important that togetherness was to you.</p>
                                                <div class="mt-2 p-2 bg-white bg-opacity-50 rounded-lg">
                                                    <p class="text-xs text-gray-700"><strong>💡 Coaching tip:</strong> Try sharing the feeling behind your request next time: "I'd love some quality time with you this weekend - it helps me feel connected to you."</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Typing indicator -->
                                        <div class="flex items-center space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="bg-gray-200 px-4 py-3 rounded-2xl">
                                                <div class="flex space-x-1">
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Message Input -->
                                    <div class="px-4 py-3 border-t border-gray-200 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                            <div class="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                                                <input type="text" placeholder="Type a message..." class="flex-1 bg-transparent border-none outline-none text-sm" value="That's really helpful advice...">
                                                <button class="text-gray-500 ml-2">
                                                    <i class="fas fa-microphone"></i>
                                                </button>
                                            </div>
                                            <button class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                                <i class="fas fa-arrow-up text-white text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calendar/Planning View -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4 bg-white">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h1 class="text-xl font-bold text-gray-900">Your Plans</h1>
                                                <p class="text-sm text-gray-600">Couple time & activities</p>
                                            </div>
                                            <button class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                                                <i class="fas fa-plus text-white"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- This Week -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">This Week</h2>
                                        <div class="space-y-3">
                                            <!-- Today -->
                                            <div class="bg-primary-50 border border-primary-200 p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-white font-bold text-sm">19</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Coffee Date</p>
                                                            <span class="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded-full">Today</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Blue Bottle Coffee • 3:00 PM</p>
                                                        <div class="flex items-center text-xs text-gray-500">
                                                            <i class="fas fa-robot mr-1"></i>
                                                            <span>AI suggested based on your schedules</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Tomorrow -->
                                            <div class="bg-white p-4 rounded-xl border border-gray-200">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-gray-700 font-bold text-sm">20</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Cooking Together</p>
                                                            <span class="text-xs text-gray-500">Tomorrow</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Home • 7:00 PM</p>
                                                        <div class="flex items-center text-xs text-green-600">
                                                            <i class="fas fa-dollar-sign mr-1"></i>
                                                            <span>Budget-friendly • $15</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Weekend -->
                                            <div class="bg-white p-4 rounded-xl border border-gray-200">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-blue-600 font-bold text-sm">23</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Hiking Adventure</p>
                                                            <span class="text-xs text-blue-600">Saturday</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Marin Headlands • 9:00 AM</p>
                                                        <div class="flex items-center justify-between">
                                                            <div class="flex items-center text-xs text-gray-500">
                                                                <i class="fas fa-sun mr-1"></i>
                                                                <span>Perfect weather: 72°F, sunny</span>
                                                            </div>
                                                            <button class="text-xs text-primary-600 font-medium">View details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- AI Suggestions -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h2>
                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                                            <div class="flex items-start space-x-3">
                                                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <i class="fas fa-lightbulb text-purple-600 text-sm"></i>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="font-semibold text-gray-900 mb-1">Museum Date Night</p>
                                                    <p class="text-sm text-gray-600 mb-2">SFMOMA has free evening hours this Thursday. Perfect for your Quality Time love language!</p>
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex items-center text-xs text-gray-500">
                                                            <i class="fas fa-clock mr-1"></i>
                                                            <span>2 hours • Thu 6-8 PM</span>
                                                        </div>
                                                        <button class="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">Add to calendar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detailed Feature Screens -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Advanced Features</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Relationship Analytics -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-arrow-left"></i>
                                            </button>
                                            <div>
                                                <h1 class="text-xl font-bold text-gray-900">Growth Analytics</h1>
                                                <p class="text-sm text-gray-600">Your relationship journey</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Progress Overview -->
                                    <div class="px-6 py-6">
                                        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl mb-6">
                                            <div class="text-center mb-4">
                                                <div class="text-4xl mb-2">📈</div>
                                                <h2 class="text-2xl font-bold text-gray-900">Relationship Health</h2>
                                                <p class="text-sm text-gray-600">Based on check-ins and AI analysis</p>
                                            </div>
                                            <div class="flex justify-center">
                                                <div class="relative w-32 h-32">
                                                    <svg class="transform -rotate-90 w-32 h-32">
                                                        <circle cx="64" cy="64" r="56" stroke="#e5e7eb" stroke-width="8" fill="transparent"></circle>
                                                        <circle cx="64" cy="64" r="56" stroke="#10b981" stroke-width="8" fill="transparent" stroke-dasharray="351.86" stroke-dashoffset="70.37" stroke-linecap="round"></circle>
                                                    </svg>
                                                    <div class="absolute inset-0 flex items-center justify-center">
                                                        <div class="text-center">
                                                            <div class="text-2xl font-bold text-gray-900">85%</div>
                                                            <div class="text-xs text-gray-600">Thriving</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Key Metrics -->
                                        <div class="grid grid-cols-2 gap-4 mb-6">
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Communication</span>
                                                    <i class="fas fa-comments text-blue-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">92%</div>
                                                <div class="text-xs text-green-600">↑ 8% this month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Connection</span>
                                                    <i class="fas fa-heart text-red-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">88%</div>
                                                <div class="text-xs text-green-600">↑ 12% this month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Quality Time</span>
                                                    <i class="fas fa-clock text-purple-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">76%</div>
                                                <div class="text-xs text-yellow-600">→ Same as last month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Conflict Resolution</span>
                                                    <i class="fas fa-handshake text-green-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">84%</div>
                                                <div class="text-xs text-green-600">↑ 15% this month</div>
                                            </div>
                                        </div>

                                        <!-- AI Insights -->
                                        <div class="bg-white p-4 rounded-xl">
                                            <div class="flex items-center mb-3">
                                                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                                    <i class="fas fa-robot text-primary-600 text-sm"></i>
                                                </div>
                                                <h3 class="font-semibold text-gray-900">AI Insights</h3>
                                            </div>
                                            <div class="space-y-3 text-sm">
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Strength:</strong> You both excel at expressing appreciation and gratitude</p>
                                                </div>
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Growth Area:</strong> Consider scheduling more regular quality time together</p>
                                                </div>
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Trend:</strong> Your conflict resolution skills are rapidly improving</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Check-in Flow -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gradient-to-br from-purple-50 to-pink-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4">
                                        <div class="flex items-center justify-between mb-6">
                                            <button class="text-gray-600">
                                                <i class="fas fa-times"></i>
                                            </button>
                                            <span class="text-sm font-medium text-gray-600">Daily Check-in</span>
                                            <span class="text-sm font-medium text-primary-600">2/3</span>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-4xl mb-4">💫</div>
                                            <h1 class="text-2xl font-bold text-gray-900 mb-2">How are you feeling today?</h1>
                                            <p class="text-gray-600">Your emotional check-in helps us understand your relationship journey</p>
                                        </div>
                                    </div>

                                    <!-- Emotion Selection -->
                                    <div class="px-6 py-8">
                                        <div class="grid grid-cols-3 gap-4 mb-8">
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm border border-primary-200 bg-primary-50">
                                                <div class="text-3xl mb-2">😊</div>
                                                <p class="text-sm font-medium text-gray-900">Happy</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">🥰</div>
                                                <p class="text-sm font-medium text-gray-600">Loved</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😌</div>
                                                <p class="text-sm font-medium text-gray-600">Peaceful</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😔</div>
                                                <p class="text-sm font-medium text-gray-600">Sad</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😟</div>
                                                <p class="text-sm font-medium text-gray-600">Anxious</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😤</div>
                                                <p class="text-sm font-medium text-gray-600">Frustrated</p>
                                            </button>
                                        </div>

                                        <!-- Follow-up Question -->
                                        <div class="bg-white p-6 rounded-2xl shadow-sm">
                                            <h3 class="font-semibold text-gray-900 mb-3">What's contributing to this feeling?</h3>
                                            <textarea class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm resize-none h-20" placeholder="Share what's on your mind... (optional)">Had a great conversation with Mike this morning about our weekend plans. Feeling really connected and excited!</textarea>
                                        </div>
                                    </div>

                                    <!-- Continue Button -->
                                    <div class="px-6 py-6">
                                        <button class="w-full bg-primary-600 text-white py-4 rounded-full font-semibold text-lg mb-4">
                                            Continue
                                        </button>
                                        <button class="w-full text-gray-600 py-2 font-medium">
                                            Skip for now
                                        </button>
                                    </div>

                                    <!-- Progress Indicator -->
                                    <div class="px-6 pb-6">
                                        <div class="flex space-x-2">
                                            <div class="flex-1 h-1 bg-primary-600 rounded-full"></div>
                                            <div class="flex-1 h-1 bg-primary-600 rounded-full"></div>
                                            <div class="flex-1 h-1 bg-gray-300 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings & Profile -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-6 bg-white">
                                        <div class="text-center">
                                            <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span class="text-white text-2xl">👩‍🦰</span>
                                            </div>
                                            <h1 class="text-xl font-bold text-gray-900">Sarah Johnson</h1>
                                            <p class="text-sm text-gray-600">Connected with Mike • 47 days</p>
                                        </div>
                                    </div>

                                    <!-- Profile Stats -->
                                    <div class="px-6 py-4">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-primary-600 mb-1">12</div>
                                                <div class="text-xs text-gray-600">Day Streak</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-green-600 mb-1">8</div>
                                                <div class="text-xs text-gray-600">Dates Planned</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-blue-600 mb-1">92%</div>
                                                <div class="text-xs text-gray-600">Happiness</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Menu Items -->
                                    <div class="px-6 py-4">
                                        <div class="bg-white rounded-xl overflow-hidden">
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-user text-blue-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Edit Profile</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-heart text-purple-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Relationship Settings</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-bell text-green-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Notifications</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-shield-alt text-yellow-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Privacy & Security</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="px-6 py-4">
                                        <div class="bg-white rounded-xl overflow-hidden">
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-question-circle text-gray-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Help & Support</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-info-circle text-gray-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">About</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between text-red-600">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-sign-out-alt text-red-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium">Sign Out</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Design System -->
    <div class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">iOS Design System</h2>
                <p class="text-xl text-gray-300">Built following Apple's Human Interface Guidelines</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Typography</h3>
                    <div class="space-y-2">
                        <div class="text-lg font-bold">San Francisco Pro</div>
                        <div class="text-base font-semibold">Semibold Headings</div>
                        <div class="text-sm font-medium">Medium Labels</div>
                        <div class="text-sm text-gray-300">Regular Body Text</div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Color Palette</h3>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-blue-500 rounded"></div>
                            <span class="text-sm">Primary Blue (#007AFF)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-primary-600 rounded"></div>
                            <span class="text-sm">Brand Pink (#DB2777)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-green-500 rounded"></div>
                            <span class="text-sm">Success Green (#10B981)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-gray-100 rounded border"></div>
                            <span class="text-sm">Light Gray (#F8FAFC)</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Components</h3>
                    <div class="space-y-2 text-sm">
                        <div>• iOS-native navigation bars</div>
                        <div>• Rounded corner cards (12px)</div>
                        <div>• Tab bar with 5 main sections</div>
                        <div>• Chat bubbles with proper styling</div>
                        <div>• Form inputs with iOS styling</div>
                        <div>• Progress indicators</div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Interaction</h3>
                    <div class="space-y-2 text-sm">
                        <div>• Haptic feedback integration</div>
                        <div>• Swipe gestures for navigation</div>
                        <div>• Pull-to-refresh functionality</div>
                        <div>• Smooth animations (0.3s)</div>
                        <div>• Contextual action sheets</div>
                        <div>• Smart keyboard integration</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="py-20 bg-primary-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl font-bold text-white mb-6">
                Ready to Experience Better Together?
            </h2>
            <p class="text-xl text-primary-100 mb-8">
                Join the waitlist to be first to download when we launch on the App Store
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    <i class="fas fa-mobile-alt mr-2"></i>Join iOS Waitlist
                </button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg">
                    <i class="fas fa-android mr-2"></i>Android Coming Soon
                </button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">Building stronger relationships through beautiful mobile experiences</p>
                <div class="flex justify-center space-x-6">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/mobile-ui.html" class="text-primary-400 hover:text-primary-300">Mobile Design</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Add interactive hover effects for iPhone mockups
            const iframes = document.querySelectorAll('.iphone-frame');
            iframes.forEach(frame => {
                frame.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02) translateY(-5px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                frame.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) translateY(0)';
                });
            });
        });
    </script>
</body>
</html>`;