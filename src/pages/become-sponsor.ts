// Become a Sponsor - Partner with Better Together
export const becomeSponsorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Become a Partner | Better Together Business</title>
    <meta name="description" content="Partner with Better Together to reach engaged couples actively investing in their relationships. Join our network of trusted businesses offering exclusive member rewards.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg {
            background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #ede9fe 100%);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-gray-900">Better Together</span>
                        <span class="ml-2 text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">Business</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-gray-600 hover:text-gray-900 transition-colors">App Home</a>
                    <a href="/member-rewards.html" class="text-gray-600 hover:text-gray-900 transition-colors">Member Rewards</a>
                    <a href="#partnership-tiers" class="text-gray-600 hover:text-gray-900 transition-colors">Partnership Tiers</a>
                    <a href="#apply-now" class="text-gray-600 hover:text-gray-900 transition-colors">Apply Now</a>
                    <button class="bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                        Partner Portal Login
                    </button>
                </div>
                <div class="md:hidden">
                    <button class="text-gray-600 hover:text-gray-900 p-2" id="mobileMenuButton">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <!-- Business Badge -->
                <div class="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-800 text-sm font-medium mb-8">
                    <i class="fas fa-handshake mr-2"></i>
                    Trusted Business Partnership Program
                </div>
                
                <!-- Main Headlines -->
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Reach Couples Who
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Invest in Their Relationships
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    Partner with Better Together to connect with engaged, relationship-focused couples actively seeking meaningful experiences together
                </p>
                
                <!-- Key Statistics -->
                <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto mb-10">
                    <div class="grid md:grid-cols-4 gap-6 text-center">
                        <div class="space-y-2">
                            <div class="text-3xl font-bold text-pink-600">50,000+</div>
                            <div class="text-gray-600">Active Couples</div>
                        </div>
                        <div class="space-y-2">
                            <div class="text-3xl font-bold text-purple-600">$2,400</div>
                            <div class="text-gray-600">Avg Annual Spending</div>
                        </div>
                        <div class="space-y-2">
                            <div class="text-3xl font-bold text-blue-600">87%</div>
                            <div class="text-gray-600">Purchase Rate</div>
                        </div>
                        <div class="space-y-2">
                            <div class="text-3xl font-bold text-green-600">4.9/5</div>
                            <div class="text-gray-600">Partner Satisfaction</div>
                        </div>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button class="w-full sm:w-auto bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg" onclick="scrollToSection('apply-now')">
                        <i class="fas fa-rocket mr-2"></i>
                        Become a Partner Today
                    </button>
                    <button class="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-md" onclick="scrollToSection('partnership-benefits')">
                        <i class="fas fa-chart-line mr-2"></i>
                        View Partnership Benefits
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Partner With Us -->
    <section class="py-16 bg-white" id="partnership-benefits">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Why Partner With Better Together?
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our members aren't just app users - they're couples actively investing time and money in meaningful experiences together.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mb-16">
                <!-- High-Quality Audience -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 border border-pink-200">
                    <div class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-target text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-center text-gray-900">High-Intent Customers</h3>
                    <ul class="space-y-3 text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-pink-500 mr-3"></i>
                            Couples actively planning experiences together
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-pink-500 mr-3"></i>
                            Average relationship length: 2.8 years
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-pink-500 mr-3"></i>
                            Higher disposable income demographics
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-pink-500 mr-3"></i>
                            87% complete purchases within 7 days
                        </li>
                    </ul>
                </div>

                <!-- Engaged Community -->
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200">
                    <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-users text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-center text-gray-900">Engaged Community</h3>
                    <ul class="space-y-3 text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-3"></i>
                            Daily app engagement: 15+ minutes average
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-3"></i>
                            Strong word-of-mouth referral rates
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-3"></i>
                            Active in sharing experiences on social
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-3"></i>
                            Trust Better Together recommendations
                        </li>
                    </ul>
                </div>

                <!-- Growth Opportunity -->
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                    <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-chart-line text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-center text-gray-900">Growing Market</h3>
                    <ul class="space-y-3 text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-3"></i>
                            40% monthly user growth rate
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-3"></i>
                            Expanding to new geographic markets
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-3"></i>
                            Increasing per-user spending annually
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-3"></i>
                            Strong retention and loyalty metrics
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Partnership Tiers -->
    <section class="py-16 bg-gray-50" id="partnership-tiers">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Partnership Tiers
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Choose the partnership level that best fits your business goals and growth objectives
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Featured Partner -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-handshake text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-semibold mb-2 text-gray-900">Featured Partner</h3>
                        <p class="text-gray-600 mb-6">Perfect for local businesses and emerging brands</p>
                        
                        <div class="space-y-4 text-left mb-8">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Basic member reward discounts</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Partner directory listing</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Monthly performance reports</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Email support</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Standard payment terms (Net 30)</span>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg mb-6">
                            <p class="text-gray-700 text-sm font-medium">Commission: 8-12% per transaction</p>
                            <p class="text-gray-600 text-sm">Monthly minimum: $500</p>
                        </div>

                        <button class="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors" onclick="openApplicationModal('featured')">
                            Apply as Featured Partner
                        </button>
                    </div>
                </div>

                <!-- Premium Partner -->
                <div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white transform scale-105 relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div class="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                            Most Popular
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-crown text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-semibold mb-2">Premium Partner</h3>
                        <p class="text-pink-100 mb-6">Ideal for established brands and regional chains</p>
                        
                        <div class="space-y-4 text-left mb-8">
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Enhanced member discounts & promotions</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Featured placement in app</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Dedicated account manager</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Advanced analytics dashboard</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Priority customer support</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-300 mr-3"></i>
                                <span class="text-sm">Co-marketing opportunities</span>
                            </div>
                        </div>

                        <div class="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
                            <p class="text-white text-sm font-medium">Commission: 12-18% per transaction</p>
                            <p class="text-pink-100 text-sm">Monthly minimum: $2,000</p>
                        </div>

                        <button class="w-full bg-white text-pink-600 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors" onclick="openApplicationModal('premium')">
                            Apply as Premium Partner
                        </button>
                    </div>
                </div>

                <!-- Elite Partner -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-diamond text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-semibold mb-2 text-gray-900">Elite Partner</h3>
                        <p class="text-gray-600 mb-6">For national brands and enterprise companies</p>
                        
                        <div class="space-y-4 text-left mb-8">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Custom integration & API access</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Exclusive member campaigns</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">White-label partnership opportunities</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Real-time data integration</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Strategic partnership team</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Custom contract terms</span>
                            </div>
                        </div>

                        <div class="bg-purple-50 p-4 rounded-lg mb-6">
                            <p class="text-purple-800 text-sm font-medium">Custom pricing & revenue sharing</p>
                            <p class="text-purple-600 text-sm">Enterprise-level minimums</p>
                        </div>

                        <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors" onclick="openApplicationModal('elite')">
                            Schedule Elite Consultation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Application Form -->
    <section class="py-16 bg-white" id="apply-now">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ready to Partner With Us?
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Complete the application below and we'll review your business for partnership opportunities
                </p>
            </div>

            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <form id="partnerApplicationForm" class="space-y-6">
                    <!-- Business Information -->
                    <div class="border-b border-gray-200 pb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                                <input type="text" name="business_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Industry Category *</label>
                                <select name="industry" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                    <option value="">Select Industry</option>
                                    <option value="dining">Dining & Restaurants</option>
                                    <option value="travel">Travel & Hospitality</option>
                                    <option value="experiences">Activities & Experiences</option>
                                    <option value="retail">Retail & Gifts</option>
                                    <option value="wellness">Health & Wellness</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
                                <input type="url" name="website" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Business Size</label>
                                <select name="business_size" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                    <option value="">Select Size</option>
                                    <option value="single">Single Location</option>
                                    <option value="multi-local">2-10 Locations</option>
                                    <option value="regional">11-50 Locations</option>
                                    <option value="national">50+ Locations</option>
                                    <option value="enterprise">Enterprise/National Chain</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-6">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                            <textarea name="description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Briefly describe your business and what makes it special for couples..."></textarea>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="border-b border-gray-200 pb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                                <input type="text" name="contact_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                <input type="text" name="job_title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                        </div>
                    </div>

                    <!-- Partnership Details -->
                    <div class="border-b border-gray-200 pb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Partnership Details</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Partnership Tier</label>
                                <div class="space-y-2">
                                    <label class="flex items-center">
                                        <input type="radio" name="partnership_tier" value="featured" class="text-pink-600 focus:ring-pink-500">
                                        <span class="ml-2 text-sm text-gray-700">Featured Partner - Local/emerging businesses</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="radio" name="partnership_tier" value="premium" class="text-pink-600 focus:ring-pink-500">
                                        <span class="ml-2 text-sm text-gray-700">Premium Partner - Established brands</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="radio" name="partnership_tier" value="elite" class="text-pink-600 focus:ring-pink-500">
                                        <span class="ml-2 text-sm text-gray-700">Elite Partner - National/enterprise</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">What discount percentage can you offer to our members?</label>
                                <select name="discount_percentage" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                    <option value="">Select Range</option>
                                    <option value="10-15">10-15%</option>
                                    <option value="15-20">15-20%</option>
                                    <option value="20-25">20-25%</option>
                                    <option value="25-30">25-30%</option>
                                    <option value="30+">30% or more</option>
                                    <option value="custom">Custom/Variable</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Estimated monthly transaction volume</label>
                                <select name="monthly_volume" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                    <option value="">Select Range</option>
                                    <option value="under-1k">Under $1,000</option>
                                    <option value="1k-5k">$1,000 - $5,000</option>
                                    <option value="5k-10k">$5,000 - $10,000</option>
                                    <option value="10k-25k">$10,000 - $25,000</option>
                                    <option value="25k-50k">$25,000 - $50,000</option>
                                    <option value="50k+">$50,000+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Information -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Why do you want to partner with Better Together?</label>
                                <textarea name="why_partner" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Tell us about your goals and how this partnership aligns with your business objectives..."></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">What makes your business special for couples?</label>
                                <textarea name="couple_appeal" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Describe what makes your business particularly appealing or suitable for couples..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Terms and Submit -->
                    <div class="border-t border-gray-200 pt-6">
                        <div class="flex items-start space-x-3 mb-6">
                            <input type="checkbox" name="terms_agreement" required class="mt-1 text-pink-600 focus:ring-pink-500">
                            <label class="text-sm text-gray-700">
                                I agree to the <a href="#" class="text-pink-600 hover:underline">Partner Terms & Conditions</a> and understand that this application will be reviewed within 5-7 business days. *
                            </label>
                        </div>
                        
                        <div class="flex items-start space-x-3 mb-6">
                            <input type="checkbox" name="marketing_consent" class="mt-1 text-pink-600 focus:ring-pink-500">
                            <label class="text-sm text-gray-700">
                                I consent to receive marketing communications about partnership opportunities and platform updates.
                            </label>
                        </div>

                        <button type="submit" class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                            <i class="fas fa-paper-plane mr-2"></i>
                            Submit Partnership Application
                        </button>

                        <p class="text-sm text-gray-500 text-center mt-4">
                            Our partnership team will review your application and contact you within 5-7 business days.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Success Stories -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Partner Success Stories
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    See how businesses are thriving through their partnership with Better Together
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Success Story 1 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-utensils text-pink-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Romantic Bistro Chain</h4>
                            <p class="text-sm text-gray-600">Premium Partner • 8 months</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "Better Together members have become 30% of our weekend dinner reservations. The quality of customers is exceptional - they're engaged, spend more, and leave great reviews."
                    </blockquote>
                    <div class="bg-pink-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-pink-600">+47%</div>
                                <div class="text-sm text-gray-600">Revenue Growth</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-pink-600">4.8★</div>
                                <div class="text-sm text-gray-600">Avg Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 2 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-spa text-purple-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Couples Spa Resort</h4>
                            <p class="text-sm text-gray-600">Elite Partner • 1 year</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "The partnership integration was seamless. Better Together couples book longer stays and higher-value packages. It's been transformational for our business."
                    </blockquote>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-purple-600">+73%</div>
                                <div class="text-sm text-gray-600">Booking Value</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-purple-600">92%</div>
                                <div class="text-sm text-gray-600">Return Rate</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 3 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-gifts text-blue-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Custom Jewelry Studio</h4>
                            <p class="text-sm text-gray-600">Featured Partner • 3 months</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "As a small business, Better Together gave us access to couples actively looking for meaningful gifts. The member quality is incredible."
                    </blockquote>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-blue-600">+156%</div>
                                <div class="text-sm text-gray-600">New Customers</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-blue-600">$340</div>
                                <div class="text-sm text-gray-600">Avg Order</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="space-y-4">
                    <div class="flex items-center">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-white">Better Together</span>
                        <span class="ml-2 text-sm bg-pink-600 text-white px-2 py-1 rounded-full font-medium">Business</span>
                    </div>
                    <p class="text-gray-400 leading-relaxed">
                        Partnering with businesses to create meaningful experiences for couples investing in their relationships.
                    </p>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">For Partners</h5>
                    <ul class="space-y-2">
                        <li><a href="#partnership-tiers" class="text-gray-400 hover:text-white transition-colors">Partnership Tiers</a></li>
                        <li><a href="#apply-now" class="text-gray-400 hover:text-white transition-colors">Apply Now</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Partner Portal</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">For Members</h5>
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-400 hover:text-white transition-colors">Better Together App</a></li>
                        <li><a href="/member-rewards.html" class="text-gray-400 hover:text-white transition-colors">Member Rewards</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">Contact</h5>
                    <ul class="space-y-2">
                        <li class="text-gray-400">partnerships@bettertogether.com</li>
                        <li class="text-gray-400">1-800-COUPLES (268-7537)</li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Schedule a Call</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                <p class="text-gray-400">
                    &copy; 2025 Better Together. Building stronger relationships through better partnerships.
                </p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Form submission
        document.getElementById('partnerApplicationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in real app, this would submit to server)
            alert('Thank you for your partnership application! Our team will review your submission and contact you within 5-7 business days.');
            
            // Reset form
            this.reset();
        });

        // Partnership tier modal (placeholder)
        function openApplicationModal(tier) {
            // In real app, this would open a modal or scroll to form with pre-selected tier
            document.querySelector('input[name="partnership_tier"][value="' + tier + '"]').checked = true;
            scrollToSection('apply-now');
        }

        // Mobile menu toggle
        document.getElementById('mobileMenuButton').addEventListener('click', function() {
            console.log('Mobile menu clicked');
        });
    </script>
</body>
</html>
`