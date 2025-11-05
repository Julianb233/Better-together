// Intake Quiz: "Discover Your Relationship Journey"
export const intakeQuizHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover Your Relationship Journey - Better Together</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 50%, #3B82F6 100%);
            min-height: 100vh;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-bar {
            transition: width 0.3s ease;
        }

        .question-card {
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .option-card {
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .option-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .option-card.selected {
            background: linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%);
            color: white;
            border-color: transparent;
        }

        .option-card.selected .emoji {
            filter: brightness(1.2);
        }

        .fade-out {
            animation: fadeOut 0.2s ease-out;
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(-20px);
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="p-6">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
            <div class="flex items-center text-white">
                <span class="text-2xl mr-3">🌱</span>
                <span class="text-xl font-semibold">Better Together</span>
            </div>
            <a href="/portal" class="text-white/80 hover:text-white transition-colors">
                <i class="fas fa-times mr-2"></i>Exit Quiz
            </a>
        </div>
    </nav>

    <!-- Progress Bar -->
    <div class="max-w-4xl mx-auto px-6 mb-6">
        <div class="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
            <div id="progressBar" class="progress-bar bg-gradient-to-r from-pink-500 to-purple-500 h-full" style="width: 8.33%"></div>
        </div>
        <div class="text-white text-sm mt-2 text-center">
            <span id="progressText">Question 1 of 12</span>
        </div>
    </div>

    <!-- Quiz Container -->
    <div class="max-w-4xl mx-auto px-6 pb-12">
        <div id="quizContainer" class="glass-card rounded-3xl shadow-2xl p-8">
            <!-- Start Screen -->
            <div id="startScreen">
                <div class="text-center">
                    <div class="text-6xl mb-6">🌱</div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">Discover Your Relationship Journey</h1>
                    <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        A progressive, conversational quiz to understand where you are and where you want to go in your relationship.
                    </p>
                    <div class="bg-purple-50 rounded-2xl p-6 mb-8 max-w-xl mx-auto">
                        <div class="flex items-center justify-center gap-4 mb-4">
                            <i class="fas fa-clock text-purple-500 text-2xl"></i>
                            <span class="text-gray-700 font-medium">Takes about 8 minutes</span>
                        </div>
                        <p class="text-sm text-gray-600">12 questions about your relationship goals, preferences, and style</p>
                    </div>

                    <div class="max-w-md mx-auto space-y-4 mb-8">
                        <input type="text" id="userId" placeholder="Your User ID" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500">
                        <input type="text" id="relationshipId" placeholder="Relationship ID (optional)"
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500">
                    </div>

                    <button onclick="startQuiz()" class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
                        <i class="fas fa-play mr-2"></i>Start Quiz
                    </button>
                </div>
            </div>

            <!-- Question Screen (will be populated dynamically) -->
            <div id="questionScreen" class="hidden"></div>

            <!-- Completion Screen -->
            <div id="completionScreen" class="hidden text-center">
                <div class="text-6xl mb-6">✨</div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
                <p class="text-lg text-gray-600 mb-8">Processing your responses and generating your personalized profile...</p>
                <div class="flex justify-center">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>

            <!-- Results Screen -->
            <div id="resultsScreen" class="hidden"></div>
        </div>
    </div>

    <script>
        // Quiz state
        let quizData = null;
        let currentQuestion = 0;
        let responseId = null;
        let answers = {};
        let startTime = null;

        // Start quiz
        async function startQuiz() {
            const userId = document.getElementById('userId').value;
            const relationshipId = document.getElementById('relationshipId').value;

            if (!userId) {
                alert('Please enter your User ID');
                return;
            }

            try {
                // Fetch quiz data
                const quizResponse = await fetch('/api/quizzes/intake-quiz');
                quizData = await quizResponse.json();

                // Start quiz response
                const startResponse = await fetch('/api/quizzes/intake-quiz/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: userId,
                        relationship_id: relationshipId || null
                    })
                });

                const startData = await startResponse.json();
                responseId = startData.response_id;
                startTime = Date.now();

                // Show first question
                document.getElementById('startScreen').classList.add('hidden');
                document.getElementById('questionScreen').classList.remove('hidden');
                showQuestion(0);
            } catch (error) {
                console.error('Error starting quiz:', error);
                alert('Failed to start quiz. Please try again.');
            }
        }

        // Show question
        function showQuestion(index) {
            currentQuestion = index;
            const question = quizData.questions[index];
            const progress = ((index + 1) / quizData.questions.length) * 100;

            // Update progress
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressText').textContent = \`Question \${index + 1} of \${quizData.questions.length}\`;

            // Build question HTML
            let questionHtml = \`
                <div class="question-card">
                    <div class="mb-6">
                        <p class="text-sm font-medium text-purple-600 mb-2">\${question.section_name || 'Question ' + (index + 1)}</p>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">\${question.question_text}</h2>
                        \${question.question_subtitle ? \`<p class="text-gray-600">\${question.question_subtitle}</p>\` : ''}
                    </div>
                    <div class="space-y-3" id="optionsContainer">
            \`;

            question.options.forEach((option, optIndex) => {
                const isMultiple = question.question_type === 'multiple';
                questionHtml += \`
                    <div class="option-card border-2 border-gray-200 rounded-xl p-4 \${isMultiple ? 'multiple' : ''}"
                         data-option-id="\${option.id}"
                         onclick="selectOption('\${option.id}', \${isMultiple})">
                        <div class="flex items-center gap-4">
                            \${option.icon ? \`<span class="emoji text-3xl">\${option.icon}</span>\` : ''}
                            <div class="flex-1">
                                <div class="font-semibold text-gray-800">\${option.option_text}</div>
                                \${option.option_subtitle ? \`<div class="text-sm text-gray-600 mt-1">\${option.option_subtitle}</div>\` : ''}
                            </div>
                            <div class="check-mark hidden">
                                <i class="fas fa-check-circle text-2xl"></i>
                            </div>
                        </div>
                    </div>
                \`;
            });

            questionHtml += \`
                    </div>
                    <div class="mt-8 flex justify-between">
                        <button onclick="previousQuestion()"
                                class="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all \${index === 0 ? 'invisible' : ''}"
                                \${index === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left mr-2"></i>Previous
                        </button>
                        <button id="nextButton" onclick="nextQuestion()"
                                class="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                                disabled>
                            Next<i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            \`;

            document.getElementById('questionScreen').innerHTML = questionHtml;

            // Restore previous answers if any
            const questionAnswers = answers[question.id];
            if (questionAnswers) {
                if (Array.isArray(questionAnswers)) {
                    questionAnswers.forEach(optionId => {
                        const card = document.querySelector(\`[data-option-id="\${optionId}"]\`);
                        if (card) {
                            card.classList.add('selected');
                            card.querySelector('.check-mark').classList.remove('hidden');
                        }
                    });
                }
                document.getElementById('nextButton').disabled = false;
            }
        }

        // Select option
        function selectOption(optionId, isMultiple) {
            const question = quizData.questions[currentQuestion];
            const card = document.querySelector(\`[data-option-id="\${optionId}"]\`);

            if (isMultiple) {
                // Multiple choice - toggle selection
                card.classList.toggle('selected');
                card.querySelector('.check-mark').classList.toggle('hidden');

                // Track answers
                if (!answers[question.id]) answers[question.id] = [];
                const index = answers[question.id].indexOf(optionId);
                if (index > -1) {
                    answers[question.id].splice(index, 1);
                } else {
                    // Check max selections
                    if (question.max_selections && answers[question.id].length >= question.max_selections) {
                        alert(\`You can select up to \${question.max_selections} options\`);
                        card.classList.remove('selected');
                        card.querySelector('.check-mark').classList.add('hidden');
                        return;
                    }
                    answers[question.id].push(optionId);
                }

                // Enable next if at least one selected
                document.getElementById('nextButton').disabled = answers[question.id].length === 0;
            } else {
                // Single choice - deselect others
                document.querySelectorAll('.option-card').forEach(c => {
                    c.classList.remove('selected');
                    c.querySelector('.check-mark').classList.add('hidden');
                });

                card.classList.add('selected');
                card.querySelector('.check-mark').classList.remove('hidden');

                // Track answer
                answers[question.id] = [optionId];
                document.getElementById('nextButton').disabled = false;
            }
        }

        // Next question
        async function nextQuestion() {
            const question = quizData.questions[currentQuestion];

            // Submit answer
            try {
                await fetch('/api/quizzes/answers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        response_id: responseId,
                        question_id: question.id,
                        option_ids: answers[question.id]
                    })
                });

                // Move to next question or complete
                if (currentQuestion < quizData.questions.length - 1) {
                    document.getElementById('questionScreen').classList.add('fade-out');
                    setTimeout(() => {
                        document.getElementById('questionScreen').classList.remove('fade-out');
                        showQuestion(currentQuestion + 1);
                    }, 200);
                } else {
                    completeQuiz();
                }
            } catch (error) {
                console.error('Error submitting answer:', error);
                alert('Failed to submit answer. Please try again.');
            }
        }

        // Previous question
        function previousQuestion() {
            if (currentQuestion > 0) {
                document.getElementById('questionScreen').classList.add('fade-out');
                setTimeout(() => {
                    document.getElementById('questionScreen').classList.remove('fade-out');
                    showQuestion(currentQuestion - 1);
                }, 200);
            }
        }

        // Complete quiz
        async function completeQuiz() {
            document.getElementById('questionScreen').classList.add('hidden');
            document.getElementById('completionScreen').classList.remove('hidden');

            const timeSpent = Math.floor((Date.now() - startTime) / 1000);

            try {
                await fetch(\`/api/quizzes/\${responseId}/complete\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ time_spent_seconds: timeSpent })
                });

                // Get results
                const resultsResponse = await fetch(\`/api/quizzes/\${responseId}/results\`);
                const results = await resultsResponse.json();

                showResults(results);
            } catch (error) {
                console.error('Error completing quiz:', error);
                alert('Failed to complete quiz. Please try again.');
            }
        }

        // Show results
        function showResults(results) {
            document.getElementById('completionScreen').classList.add('hidden');
            document.getElementById('resultsScreen').classList.remove('hidden');

            const profile = results.intake_profile;

            let resultsHtml = \`
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Your Relationship Profile</h2>
                    <p class="text-gray-600">Here's what we learned about your journey</p>
                </div>

                <div class="space-y-6">
                    <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
                        <h3 class="font-bold text-lg text-gray-800 mb-3">
                            <i class="fas fa-heart text-pink-500 mr-2"></i>Recommended Experiences
                        </h3>
                        <ul class="space-y-2">
                            \${profile.recommended_experiences?.map(exp => \`
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                    <span class="text-gray-700">\${exp}</span>
                                </li>
                            \`).join('')}
                        </ul>
                    </div>

                    <div class="flex gap-4">
                        <button onclick="window.location.href='/connection-compass.html'"
                                class="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                            <i class="fas fa-compass mr-2"></i>Take Connection Compass
                        </button>
                        <button onclick="window.location.href='/portal'"
                                class="flex-1 border-2 border-purple-500 text-purple-500 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                            <i class="fas fa-home mr-2"></i>Go to Portal
                        </button>
                    </div>
                </div>
            \`;

            document.getElementById('resultsScreen').innerHTML = resultsHtml;
        }
    </script>
</body>
</html>
`
