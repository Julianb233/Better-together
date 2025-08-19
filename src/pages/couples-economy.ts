// Couples Economy - Exclusive Discounts & Relationship Rewards
export const couplesEconomyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Couples Economy - Exclusive Discounts & Rewards | Better Together</title>
    <meta name="description" content="Unlock exclusive couples discounts on restaurants, gifts, trips, and experiences. Join the relationship economy where love saves money and creates lasting memories together.">
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
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'bounce-soft': 'bounce 2s infinite',
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .gradient-text {
            background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .floating {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .discount-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .discount-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .savings-counter {
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="bg-gray-50 overflow-x-hidden">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-14 sm:h-16">
                <a href="/" class="flex items-center">
                    <span class="text-xl sm:text-2xl">💕</span>
                    <span class="ml-2 text-lg sm:text-xl font-bold text-gray-900">Better Together</span>
                </a>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/ai-coach.html" class="text-gray-600 hover:text-gray-900">AI Coach</a>
                    <a href="/smart-scheduling.html" class="text-gray-600 hover:text-gray-900">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="text-gray-600 hover:text-gray-900">Suggestions</a>
                    <a href="/couples-economy.html" class="text-primary-600 font-medium">Couples Economy</a>
                    <a href="/mobile-ui.html" class="text-gray-600 hover:text-gray-900">Mobile Design</a>
                    <a href="/" class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Get Started
                    </a>
                </div>
                <div class="md:hidden">
                    <button class="text-gray-600 hover:text-gray-900 p-2" id="mobileMenuButton">
                        <i class="fas fa-bars text-lg"></i>
                    </button>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden pb-4">
                <div class="flex flex-col space-y-3">
                    <a href="/ai-coach.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">AI Coach</a>
                    <a href="/smart-scheduling.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">Suggestions</a>
                    <a href="/couples-economy.html" class="text-primary-600 font-medium py-2">Couples Economy</a>
                    <a href="/mobile-ui.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">Mobile Design</a>
                    <a href="/" class="bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors w-full text-center">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section - Reciprocity & Exclusivity Bias -->
    <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <!-- Floating Elements -->
        <div class="absolute top-10 left-4 sm:left-10 text-emerald-200 text-4xl sm:text-6xl opacity-30 floating">💎</div>
        <div class="absolute bottom-10 right-4 sm:right-10 text-blue-200 text-3xl sm:text-4xl opacity-30 floating" style="animation-delay: 2s;">🎁</div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <!-- Exclusivity Badge - Social Proof + Scarcity -->
            <div class="mb-6 sm:mb-8">
                <div class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-800 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-pulse-slow border border-emerald-200">
                    <i class="fas fa-crown mr-2 text-yellow-600"></i>
                    <span class="mr-2">EXCLUSIVE MEMBERS ONLY</span>
                    <span class="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs">INVITED ACCESS</span>
                </div>
            </div>
            
            <!-- Main Headlines - Loss Aversion + Social Status -->
            <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Welcome to the
                <span class="gradient-text block sm:inline">Couples Economy</span>
            </h1>
            
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
                Where Love Unlocks Extraordinary Savings & Once-in-a-Lifetime Experiences
            </h2>
            
            <!-- Value Proposition - Anchoring + Loss Aversion -->
            <p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                While single people pay full price, <strong class="text-emerald-600">committed couples save 15-60% on everything</strong> that matters for your relationship. 
                From intimate dinners to dream vacations, your love story deserves VIP treatment—and VIP pricing.
            </p>
            
            <!-- Emotional Triggers - Fear of Missing Out + Social Proof -->
            <div class="bg-white bg-opacity-80 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 max-w-5xl mx-auto border border-emerald-200 shadow-lg backdrop-blur-sm">
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div class="space-y-2">
                        <div class="text-2xl sm:text-3xl font-bold savings-counter">$2,847</div>
                        <div class="text-sm sm:text-base text-gray-600">Average Annual Savings</div>
                        <div class="text-xs text-emerald-600 font-medium">Per Couple</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-2xl sm:text-3xl font-bold text-blue-600">847+</div>
                        <div class="text-sm sm:text-base text-gray-600">Exclusive Partners</div>
                        <div class="text-xs text-blue-600 font-medium">Premium Brands</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-2xl sm:text-3xl font-bold text-purple-600">127K+</div>
                        <div class="text-sm sm:text-base text-gray-600">Couples Saving Daily</div>
                        <div class="text-xs text-purple-600 font-medium">Growing Fast</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-2xl sm:text-3xl font-bold text-pink-600">98.4%</div>
                        <div class="text-sm sm:text-base text-gray-600">Would Recommend</div>
                        <div class="text-xs text-pink-600 font-medium">Satisfaction Rate</div>
                    </div>
                </div>
            </div>
            
            <!-- CTAs - Urgency + Social Proof -->
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 px-4">
                <button class="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base group">
                    <i class="fas fa-unlock mr-2 group-hover:animate-bounce"></i>
                    Unlock Exclusive Access Now
                </button>
                <button class="w-full sm:w-auto border-2 border-emerald-600 text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-md text-sm sm:text-base">
                    <i class="fas fa-calculator mr-2"></i>
                    Calculate Your Savings
                </button>
            </div>
            
            <!-- Limited Time Offer - Scarcity + Urgency -->
            <div class="mb-6 px-4">
                <div class="inline-flex items-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-xs sm:text-sm font-medium animate-pulse">
                    <i class="fas fa-fire mr-2 text-red-500 animate-bounce"></i>
                    <span class="mr-2">FOUNDING MEMBERS:</span>
                    <span class="bg-red-600 text-white px-2 py-1 rounded text-xs mr-2">LIFETIME 40% OFF</span>
                    <span class="text-red-800">Next 72 hours only</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Trust Signals - Authority + Social Proof -->
    <div class="py-8 bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-gray-500 text-sm mb-6">Trusted by couples at these leading companies:</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                <div class="text-center">
                    <i class="fab fa-google text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">Google</p>
                </div>
                <div class="text-center">
                    <i class="fab fa-apple text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">Apple</p>
                </div>
                <div class="text-center">
                    <i class="fab fa-microsoft text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">Microsoft</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-building text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">Goldman</p>
                </div>
                <div class="text-center">
                    <i class="fab fa-amazon text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">Amazon</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-plus text-2xl text-gray-400"></i>
                    <p class="text-xs mt-1 text-gray-400">+500 More</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Exclusive Categories - Status + Reciprocity -->
    <div class="py-16 sm:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 text-sm font-semibold mb-6">
                    <i class="fas fa-gem mr-2"></i>
                    CURATED EXCLUSIVELY FOR COUPLES
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Your Love Story Deserves the Best
                </h2>
                <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                    Every partnership is precious. That's why we've negotiated exclusive rates with premium brands who understand that love should be celebrated, not overcharged.
                </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                <!-- Fine Dining -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-red-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-utensils text-2xl text-red-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Fine Dining</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span class="font-medium text-gray-900">Michelin Star Restaurants</span>
                            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">-25%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span class="font-medium text-gray-900">Wine Tastings</span>
                            <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">-30%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                            <span class="font-medium text-gray-900">Chef's Table Experiences</span>
                            <span class="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">-40%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$187</span>/month</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Every meal becomes a celebration when you know you're getting the VIP treatment—at VIP prices."
                    </p>
                </div>

                <!-- Romantic Getaways -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-plane-departure text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Dream Destinations</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span class="font-medium text-gray-900">Luxury Hotels & Resorts</span>
                            <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">-35%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                            <span class="font-medium text-gray-900">Couples Spa Packages</span>
                            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">-45%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span class="font-medium text-gray-900">Private Island Retreats</span>
                            <span class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">-60%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$1,247</span>/trip</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Turn your dream destinations into reality—without the nightmare price tags."
                    </p>
                </div>

                <!-- Thoughtful Gifts -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-pink-100 to-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-gift text-2xl text-pink-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Meaningful Gifts</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                            <span class="font-medium text-gray-900">Fine Jewelry & Watches</span>
                            <span class="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">-20%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                            <span class="font-medium text-gray-900">Custom Art & Portraits</span>
                            <span class="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-bold">-35%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span class="font-medium text-gray-900">Luxury Subscription Boxes</span>
                            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">-50%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$342</span>/occasion</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Show your love with gifts that touch the heart—not drain the wallet."
                    </p>
                </div>

                <!-- Adventure Experiences -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-green-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-mountain text-2xl text-green-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Adventure Together</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span class="font-medium text-gray-900">Hot Air Balloon Rides</span>
                            <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">-30%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                            <span class="font-medium text-gray-900">Helicopter Tours</span>
                            <span class="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">-25%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                            <span class="font-medium text-gray-900">Sailing & Yacht Charters</span>
                            <span class="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">-40%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$428</span>/adventure</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Create unforgettable memories together—at prices you'll both love."
                    </p>
                </div>

                <!-- Home & Lifestyle -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-home-heart text-2xl text-amber-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Nest Together</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                            <span class="font-medium text-gray-900">Premium Home Decor</span>
                            <span class="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">-30%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span class="font-medium text-gray-900">Luxury Linens & Bedding</span>
                            <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">-25%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span class="font-medium text-gray-900">Smart Home Technology</span>
                            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">-35%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$567</span>/year</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Build your dream home together—with savings that make it possible sooner."
                    </p>
                </div>

                <!-- Special Occasions -->
                <div class="discount-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100">
                    <div class="bg-gradient-to-br from-violet-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-crown text-2xl text-violet-600"></i>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Milestone Moments</h3>
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                            <span class="font-medium text-gray-900">Engagement Rings</span>
                            <span class="bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-bold">-15%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span class="font-medium text-gray-900">Wedding Planning Services</span>
                            <span class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">-20%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-fuchsia-50 rounded-lg">
                            <span class="font-medium text-gray-900">Anniversary Celebrations</span>
                            <span class="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-bold">-45%</span>
                        </div>
                    </div>
                    <div class="text-center mb-4">
                        <p class="text-emerald-600 font-semibold">Average Savings: <span class="text-2xl">$2,147</span>/milestone</p>
                    </div>
                    <p class="text-sm text-gray-600 text-center italic">
                        "Your biggest moments deserve the grandest celebrations—at prices that won't break the bank."
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Real Success Stories - Social Proof + Emotional Connection -->
    <div class="py-16 sm:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Real Couples, Real Savings, Real Joy</h2>
                <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    See how the Couples Economy has transformed love stories around the world
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <!-- Success Story 1 -->
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border border-emerald-200">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="flex -space-x-2">
                            <div class="w-12 h-12 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">M</span>
                            </div>
                            <div class="w-12 h-12 bg-pink-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">S</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">Michael & Sarah</h4>
                            <p class="text-sm text-gray-600">Seattle, WA • Together 3 years</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "We saved $3,200 on our anniversary trip to Italy. The exclusive couples rate at that Tuscan villa made our dream honeymoon possible a full year earlier than planned!"
                    </blockquote>
                    <div class="bg-white p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-emerald-600">$3,200</div>
                                <div class="text-xs text-gray-600">Saved on Trip</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-blue-600">7 Days</div>
                                <div class="text-xs text-gray-600">Extra Vacation</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 2 -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border border-blue-200">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="flex -space-x-2">
                            <div class="w-12 h-12 bg-purple-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">A</span>
                            </div>
                            <div class="w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">J</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">Alex & Jordan</h4>
                            <p class="text-sm text-gray-600">Austin, TX • Engaged</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "The couples discount on our engagement ring was incredible—25% off at Tiffany & Co! We used the savings for a photographer to capture the proposal. Priceless memories at an amazing price."
                    </blockquote>
                    <div class="bg-white p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-blue-600">$4,750</div>
                                <div class="text-xs text-gray-600">Ring Savings</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-purple-600">Perfect</div>
                                <div class="text-xs text-gray-600">Proposal</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 3 -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 p-6 sm:p-8 rounded-2xl border border-pink-200">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="flex -space-x-2">
                            <div class="w-12 h-12 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">D</span>
                            </div>
                            <div class="w-12 h-12 bg-yellow-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span class="text-white font-bold">L</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">David & Lisa</h4>
                            <p class="text-sm text-gray-600">Miami, FL • Married 5 years</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "Our monthly date nights went from $200 to $120 with the couples dining program. That's $960 saved per year—enough for an extra weekend getaway every few months!"
                    </blockquote>
                    <div class="bg-white p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-pink-600">$960</div>
                                <div class="text-xs text-gray-600">Annual Dining</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-rose-600">4x More</div>
                                <div class="text-xs text-gray-600">Date Nights</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Aggregate Impact -->
            <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 sm:p-12 text-white text-center">
                <h3 class="text-2xl sm:text-3xl font-bold mb-6">The Couples Economy Impact</h3>
                <div class="grid sm:grid-cols-4 gap-6 sm:gap-8">
                    <div class="space-y-2">
                        <div class="text-3xl sm:text-4xl font-bold">$47M+</div>
                        <div class="text-emerald-100">Total Saved by Couples</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl sm:text-4xl font-bold">127K+</div>
                        <div class="text-emerald-100">Active Couples</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl sm:text-4xl font-bold">847</div>
                        <div class="text-emerald-100">Partner Businesses</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-3xl sm:text-4xl font-bold">94%</div>
                        <div class="text-emerald-100">Relationship Satisfaction</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- How It Works - Simplicity + Trust -->
    <div class="py-16 sm:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple. Secure. Savings.</h2>
                <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                    Three easy steps to unlock exclusive couples pricing on everything you love
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 sm:gap-12">
                <!-- Step 1 -->
                <div class="text-center">
                    <div class="bg-gradient-to-br from-emerald-100 to-teal-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span class="text-2xl font-bold text-emerald-700">1</span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Verify Your Love</h3>
                    <p class="text-gray-600 mb-6">
                        Simple verification process proves you're in a committed relationship. Takes 2 minutes, protects everyone, ensures authentic couples community.
                    </p>
                    <div class="bg-white p-4 rounded-lg border border-emerald-200">
                        <div class="flex items-center justify-center space-x-2 text-emerald-600">
                            <i class="fas fa-shield-check"></i>
                            <span class="text-sm font-medium">100% Private & Secure</span>
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="text-center">
                    <div class="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span class="text-2xl font-bold text-blue-700">2</span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Browse & Save</h3>
                    <p class="text-gray-600 mb-6">
                        Access our exclusive marketplace with 847+ premium partners offering couples-only pricing. Every purchase automatically applies your discount.
                    </p>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                        <div class="flex items-center justify-center space-x-2 text-blue-600">
                            <i class="fas fa-magic"></i>
                            <span class="text-sm font-medium">Automatic Discounts Applied</span>
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="text-center">
                    <div class="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span class="text-2xl font-bold text-purple-700">3</span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Enjoy Together</h3>
                    <p class="text-gray-600 mb-6">
                        Create beautiful memories knowing you're getting the best possible value. Share your experiences and inspire other couples in our community.
                    </p>
                    <div class="bg-white p-4 rounded-lg border border-purple-200">
                        <div class="flex items-center justify-center space-x-2 text-purple-600">
                            <i class="fas fa-heart"></i>
                            <span class="text-sm font-medium">Memories Made Affordable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Exclusive Partners Showcase - Authority + Social Proof -->
    <div class="py-16 sm:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by the Best Brands</h2>
                <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                    Premium partners who believe couples deserve special treatment—and special pricing
                </p>
            </div>

            <!-- Partner Categories -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <!-- Dining Partners -->
                <div class="text-center group">
                    <div class="bg-gradient-to-br from-red-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-utensils text-2xl text-red-600"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Fine Dining</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p>• 127+ Michelin Star Restaurants</p>
                        <p>• Exclusive Wine Collections</p>
                        <p>• Private Chef Experiences</p>
                        <p>• Celebrity Chef Partnerships</p>
                    </div>
                </div>

                <!-- Travel Partners -->
                <div class="text-center group">
                    <div class="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-plane text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Luxury Travel</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p>• 5-Star Hotels Worldwide</p>
                        <p>• Private Island Resorts</p>
                        <p>• Couples-Only Cruises</p>
                        <p>• Boutique Travel Experiences</p>
                    </div>
                </div>

                <!-- Gift Partners -->
                <div class="text-center group">
                    <div class="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-gift text-2xl text-purple-600"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Luxury Gifts</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p>• Premium Jewelry Brands</p>
                        <p>• Artisan Craft Collections</p>
                        <p>• Personalized Keepsakes</p>
                        <p>• Luxury Subscription Boxes</p>
                    </div>
                </div>

                <!-- Experience Partners -->
                <div class="text-center group">
                    <div class="bg-gradient-to-br from-green-100 to-teal-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-magic text-2xl text-green-600"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Unique Experiences</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p>• Hot Air Balloon Adventures</p>
                        <p>• Private Concert Access</p>
                        <p>• Exclusive Event Invitations</p>
                        <p>• Once-in-a-Lifetime Moments</p>
                    </div>
                </div>
            </div>

            <!-- Featured Partners Logos -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12">
                <p class="text-center text-gray-500 mb-8">Some of our exclusive partners:</p>
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center opacity-60">
                    <div class="text-center">
                        <i class="fab fa-airbnb text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">Airbnb Luxe</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-gem text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">Tiffany & Co.</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-wine-glass text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">Napa Valley</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-spa text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">Four Seasons</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-mountain text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">Adventure Co.</p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-plus text-3xl text-gray-400 mb-2"></i>
                        <p class="text-xs text-gray-400">+842 More</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Final CTA - Urgency + Exclusivity -->
    <div class="py-16 sm:py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 relative overflow-hidden">
        <!-- Decorative Elements -->
        <div class="absolute top-10 left-4 sm:left-10 text-emerald-300 text-6xl opacity-20 floating">💰</div>
        <div class="absolute bottom-10 right-4 sm:right-10 text-blue-300 text-4xl opacity-20 floating" style="animation-delay: 3s;">✨</div>
        
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div class="mb-8">
                <div class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                    <i class="fas fa-clock mr-2 text-yellow-300"></i>
                    LIMITED TIME: FOUNDING MEMBERS ONLY
                </div>
            </div>
            
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Love Story Deserves VIP Treatment
            </h2>
            
            <p class="text-lg sm:text-xl text-emerald-100 mb-8 leading-relaxed">
                Join 127,000+ couples who save an average of <strong class="text-yellow-300">$2,847 per year</strong> on the experiences that matter most. 
                Because when you're building a life together, every dollar saved is a dollar invested in your shared future.
            </p>
            
            <!-- Founding Member Offer -->
            <div class="bg-white bg-opacity-10 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm border border-white border-opacity-20">
                <h3 class="text-2xl font-bold text-white mb-4">Founding Member Benefits</h3>
                <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div class="text-left">
                        <div class="flex items-center text-emerald-200 mb-2">
                            <i class="fas fa-crown mr-3 text-yellow-300"></i>
                            <span>Lifetime 40% off premium partnerships</span>
                        </div>
                        <div class="flex items-center text-emerald-200 mb-2">
                            <i class="fas fa-star mr-3 text-yellow-300"></i>
                            <span>VIP access to exclusive events</span>
                        </div>
                        <div class="flex items-center text-emerald-200">
                            <i class="fas fa-gift mr-3 text-yellow-300"></i>
                            <span>$500 welcome credit applied immediately</span>
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="flex items-center text-emerald-200 mb-2">
                            <i class="fas fa-lock mr-3 text-yellow-300"></i>
                            <span>Price protection guarantee forever</span>
                        </div>
                        <div class="flex items-center text-emerald-200 mb-2">
                            <i class="fas fa-heart mr-3 text-yellow-300"></i>
                            <span>Couples concierge service</span>
                        </div>
                        <div class="flex items-center text-emerald-200">
                            <i class="fas fa-infinity mr-3 text-yellow-300"></i>
                            <span>Unlimited savings potential</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-emerald-600 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-2xl text-lg">
                    <i class="fas fa-unlock-alt mr-2"></i>
                    Claim Founding Member Status
                </button>
                <button class="w-full sm:w-auto border-2 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold hover:bg-white hover:text-emerald-600 transition-all text-lg backdrop-blur-sm">
                    <i class="fas fa-calculator mr-2"></i>
                    Calculate My Savings
                </button>
            </div>
            
            <!-- Countdown Timer -->
            <div class="bg-red-600 bg-opacity-90 rounded-lg px-6 py-4 inline-block backdrop-blur-sm">
                <p class="text-white font-semibold text-sm sm:text-base">
                    <i class="fas fa-fire mr-2 text-yellow-300"></i>
                    FOUNDING MEMBER PRICING ENDS IN: 
                    <span class="text-yellow-300 font-bold ml-2">71:23:47</span>
                </p>
            </div>
            
            <div class="mt-6">
                <p class="text-emerald-100 text-sm">
                    ✅ No commitment required ✅ Cancel anytime ✅ 30-day money-back guarantee
                </p>
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
                    <span class="text-sm ml-3 bg-emerald-600 text-white px-2 py-1 rounded">Couples Economy</span>
                </div>
                <p class="mb-6">Where love meets luxury at prices that make sense</p>
                <div class="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/couples-economy.html" class="text-emerald-400 hover:text-emerald-300">Couples Economy</a>
                    <a href="/mobile-ui.html" class="hover:text-white">Mobile Design</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
                <div class="mt-8 pt-8 border-t border-gray-800">
                    <p class="text-gray-400 text-sm">
                        The Couples Economy is a revolutionary approach to relationship spending—where your commitment to each other unlocks a world of exclusive benefits and savings.
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu?.querySelectorAll('a');
            if (mobileLinks) {
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            // Responsive behavior
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768 && mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Touch-friendly buttons on mobile
            if (window.innerWidth <= 768) {
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minHeight = '44px';
                });
            }

            // Countdown timer animation
            function updateCountdown() {
                const countdownElement = document.querySelector('.bg-red-600 .text-yellow-300');
                if (countdownElement) {
                    const hours = Math.floor(Math.random() * 24) + 48; // 48-72 hours
                    const minutes = Math.floor(Math.random() * 60);
                    const seconds = Math.floor(Math.random() * 60);
                    
                    const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                    countdownElement.textContent = formattedTime;
                }
            }

            // Update countdown every 10 seconds for demo purposes
            updateCountdown();
            setInterval(updateCountdown, 10000);

            // Discount card hover effects
            const discountCards = document.querySelectorAll('.discount-card');
            discountCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.classList.add('shadow-2xl');
                });
                
                card.addEventListener('mouseleave', function() {
                    this.classList.remove('shadow-2xl');
                });
            });

            // Smooth scroll for anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });
    </script>
</body>
</html>`;