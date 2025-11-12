# LLM Training Architecture for Better Together

**Version:** 1.0  
**Date:** November 12, 2025  
**Purpose:** Design document for training a world-class relationship intelligence LLM

---

## Executive Summary

This document outlines the comprehensive architecture for training a large language model (LLaMA-based or similar) specifically optimized for relationship intelligence, coaching, and personalized recommendations within the Better Together platform.

The training system is designed to:
- **Collect** high-quality relationship data from multiple sources
- **Curate** data with quality filters and privacy protections
- **Scale** automatically as user feedback and database grow
- **Clean** outdated or low-quality data systematically
- **Optimize** for relationship coaching, empathy, and personalized advice

---

## Data Architecture Overview

### Core Data Categories

#### 1. **Conversational Data** (Primary Training Source)
- User-AI coach interactions
- Relationship advice conversations
- Quiz responses with context
- Daily check-in reflections
- Goal-setting dialogues
- Challenge participation narratives

#### 2. **Behavioral Data** (Context Enhancement)
- Activity patterns and preferences
- Calendar matching decisions
- Date satisfaction ratings
- Relationship milestone tracking
- Communication frequency patterns
- Feature usage analytics

#### 3. **Structured Knowledge** (Domain Expertise)
- Relationship psychology principles
- Communication frameworks
- Love language theory
- Attachment styles
- Conflict resolution strategies
- Intimacy building techniques

#### 4. **User Feedback Data** (Quality Signals)
- Satisfaction ratings (1-10 scales)
- Feature helpfulness votes
- AI response quality ratings
- Suggestion acceptance/rejection
- Long-term outcome tracking
- Partner alignment scores

#### 5. **Synthetic Training Data** (Augmentation)
- Generated conversation scenarios
- Edge case handling examples
- Diverse relationship contexts
- Cultural sensitivity training
- Crisis intervention patterns
- Ethical boundary examples

---

## Data Collection Strategy

### Database Sources

#### Primary Tables for Training
```
Core Relationship Data:
- users (demographics, preferences, love languages)
- relationships (status, duration, type)
- daily_checkins (emotional states, gratitude, needs)
- activities (date experiences, satisfaction)
- shared_goals (aspirations, progress, completion)
- communication_log (interaction patterns)

Quiz & Assessment Data:
- quiz_responses (personality insights)
- connection_compass_results (connection styles)
- intake_profiles (relationship stage, challenges)
- compatibility_reports (partner dynamics)

Behavioral Intelligence:
- activity_feedback (learning signals)
- experience_learning_scores (preference evolution)
- scheduling_patterns (lifestyle insights)
- relationship_context (situational awareness)

Engagement Metrics:
- feature_usage (interaction patterns)
- couple_reviews (outcome validation)
- review_helpfulness (quality signals)
- relationship_analytics (health tracking)
```

#### Data Extraction Queries
```sql
-- High-quality conversation pairs
SELECT 
  dc.gratitude_note,
  dc.support_needed,
  dc.highlight_of_day,
  dc.connection_score,
  u.love_language_primary,
  r.relationship_type,
  ra.overall_health_score
FROM daily_checkins dc
JOIN users u ON dc.user_id = u.id
JOIN relationships r ON dc.relationship_id = r.id
LEFT JOIN relationship_analytics ra ON r.id = ra.relationship_id
WHERE dc.connection_score >= 7
  AND LENGTH(dc.gratitude_note) > 20
ORDER BY dc.created_at DESC;

-- Successful activity patterns
SELECT 
  a.activity_name,
  a.activity_type,
  a.description,
  a.satisfaction_rating_user1,
  a.satisfaction_rating_user2,
  af.feedback_text,
  af.would_repeat
FROM activities a
JOIN activity_feedback af ON a.id = af.activity_id
WHERE (a.satisfaction_rating_user1 + a.satisfaction_rating_user2) / 2 >= 8
  AND af.would_repeat = TRUE;

-- Relationship growth trajectories
SELECT 
  r.id,
  r.relationship_type,
  COUNT(DISTINCT dc.id) as checkin_count,
  AVG(dc.connection_score) as avg_connection,
  COUNT(DISTINCT sg.id) as goals_completed,
  COUNT(DISTINCT cp.id) as challenges_completed
FROM relationships r
LEFT JOIN daily_checkins dc ON r.id = dc.relationship_id
LEFT JOIN shared_goals sg ON r.id = sg.relationship_id AND sg.status = 'completed'
LEFT JOIN challenge_participation cp ON r.id = cp.relationship_id AND cp.status = 'completed'
GROUP BY r.id
HAVING checkin_count >= 30;
```

### Real-Time Data Pipeline

```
User Interaction → Database → Quality Filter → Anonymization → Training Queue
                                     ↓
                              Privacy Check → Format Conversion → Storage
```

#### Quality Filters
- **Minimum Length**: Text responses > 15 characters
- **Sentiment Threshold**: Connection scores >= 6 (exclude negative outliers)
- **Completeness**: Required fields populated
- **Recency**: Prioritize data from last 12 months
- **Engagement**: Users with 10+ interactions
- **Consent**: Explicit opt-in for data usage

#### Privacy Protection
- **PII Removal**: Strip names, emails, phone numbers, addresses
- **Anonymization**: Replace user IDs with random tokens
- **Aggregation**: Combine similar patterns across users
- **Differential Privacy**: Add noise to sensitive metrics
- **Retention Limits**: Auto-delete data after 24 months

---

## Training Data Format

### JSONL Structure (LLaMA Compatible)

```jsonl
{"instruction": "A couple has been together for 6 months and struggles with finding quality time. The user prefers quality time as their love language. What advice would you give?", "input": "Relationship context: Dating, 6 months, busy professionals, love language: quality time", "output": "I understand how challenging it can be to carve out quality time when you're both busy professionals. Since quality time is your primary love language, let's focus on strategies that honor that need...", "metadata": {"category": "time_management", "relationship_stage": "early", "quality_score": 9.2}}

{"instruction": "Generate a date night suggestion for a couple who enjoys outdoor activities, has a moderate budget ($50-100), and prefers evening activities.", "input": "Interests: outdoors, adventure; Budget: $50-100; Time: evening; Season: summer", "output": "Based on your love for outdoor adventures, I recommend a sunset hiking experience followed by a picnic dinner. Here's the plan: Start with a scenic 2-hour trail hike at [local park], timing it to reach a viewpoint for sunset...", "metadata": {"category": "date_suggestion", "budget_tier": "moderate", "quality_score": 8.7}}

{"instruction": "A user reports feeling disconnected from their partner despite living together. Their connection score has dropped from 8 to 5 over the past month. What questions should I ask to understand the situation better?", "input": "Context: Married, 3 years, connection score declining, living together", "output": "I notice your connection score has decreased recently, and I want to help you understand what might be happening. Let me ask a few questions to get a clearer picture: 1) Have there been any significant life changes recently (new job, stress, health issues)? 2) When was the last time you had a meaningful conversation that lasted more than 15 minutes?...", "metadata": {"category": "diagnostic_conversation", "intervention_type": "early_warning", "quality_score": 9.5}}
```

### Training Data Categories

#### 1. **Instruction-Following** (40% of dataset)
- Relationship advice requests
- Date planning queries
- Communication coaching
- Conflict resolution guidance
- Goal-setting assistance

#### 2. **Contextual Understanding** (25% of dataset)
- Personality-aware responses
- Relationship stage sensitivity
- Cultural considerations
- Budget-conscious suggestions
- Time constraint awareness

#### 3. **Empathetic Dialogue** (20% of dataset)
- Emotional validation
- Active listening patterns
- Supportive language
- Non-judgmental responses
- Crisis de-escalation

#### 4. **Personalization** (10% of dataset)
- Love language adaptation
- Interest-based recommendations
- Learning from feedback
- Pattern recognition
- Preference evolution

#### 5. **Safety & Ethics** (5% of dataset)
- Boundary recognition
- Abuse detection
- Professional referrals
- Privacy protection
- Consent emphasis

---

## Quality Scoring System

### Automated Quality Metrics

```python
def calculate_quality_score(data_point):
    """
    Score: 0-10 scale
    Threshold for inclusion: >= 7.0
    """
    score = 0.0
    
    # User engagement (max 3.0)
    if data_point['user_response_length'] > 50:
        score += 1.0
    if data_point['conversation_turns'] >= 3:
        score += 1.0
    if data_point['user_satisfaction_rating'] >= 8:
        score += 1.0
    
    # Outcome validation (max 3.0)
    if data_point['action_taken']:
        score += 1.5
    if data_point['positive_outcome_reported']:
        score += 1.5
    
    # Content quality (max 2.0)
    if data_point['response_coherence'] >= 0.8:
        score += 1.0
    if data_point['empathy_score'] >= 0.7:
        score += 1.0
    
    # Diversity bonus (max 2.0)
    if data_point['underrepresented_scenario']:
        score += 1.0
    if data_point['unique_context']:
        score += 1.0
    
    return min(score, 10.0)
```

### Human Review Triggers
- Quality score < 7.0 but high user engagement
- Sensitive topics (abuse, mental health, infidelity)
- Novel scenarios not in training set
- Contradictory feedback signals
- Edge cases for safety validation

---

## Data Cleaning & Maintenance

### Automated Cleaning Rules

#### 1. **Staleness Detection**
```python
def is_stale(data_point, current_date):
    """Remove data that's no longer relevant"""
    age_days = (current_date - data_point['created_at']).days
    
    # Remove if:
    if age_days > 730:  # Older than 2 years
        return True
    if data_point['quality_score'] < 6.0 and age_days > 180:
        return True
    if data_point['user_feedback'] == 'not_helpful' and age_days > 90:
        return True
    
    return False
```

#### 2. **Duplicate Detection**
```python
def is_duplicate(new_data, existing_dataset, threshold=0.85):
    """Detect near-duplicate training examples"""
    from sentence_transformers import util
    
    new_embedding = encode(new_data['instruction'] + new_data['output'])
    
    for existing in existing_dataset:
        existing_embedding = encode(existing['instruction'] + existing['output'])
        similarity = util.cos_sim(new_embedding, existing_embedding)
        
        if similarity > threshold:
            # Keep the higher quality version
            if new_data['quality_score'] > existing['quality_score']:
                return False, existing['id']  # Replace existing
            else:
                return True, None  # Skip new data
    
    return False, None
```

#### 3. **Bias Detection**
```python
def detect_bias(dataset):
    """Identify and flag potential biases"""
    biases = {
        'gender_imbalance': check_gender_distribution(dataset),
        'age_skew': check_age_representation(dataset),
        'relationship_type_bias': check_relationship_diversity(dataset),
        'cultural_homogeneity': check_cultural_diversity(dataset),
        'socioeconomic_bias': check_budget_distribution(dataset)
    }
    
    return {k: v for k, v in biases.items() if v['severity'] > 0.3}
```

### Cleaning Schedule
- **Daily**: Remove flagged low-quality data, check for PII leaks
- **Weekly**: Duplicate detection, quality score recalculation
- **Monthly**: Bias audit, distribution rebalancing
- **Quarterly**: Full dataset review, schema updates
- **Annually**: Archive old data, major version update

---

## Scaling Strategy

### Growth Phases

#### Phase 1: Bootstrap (0-1,000 users)
- **Focus**: Manual curation, high-quality seed data
- **Sources**: Expert-written examples, curated conversations
- **Size**: 10,000-50,000 training examples
- **Quality Threshold**: 8.5+

#### Phase 2: Early Growth (1,000-10,000 users)
- **Focus**: User-generated data with human review
- **Sources**: 70% user data, 30% synthetic
- **Size**: 50,000-200,000 examples
- **Quality Threshold**: 8.0+

#### Phase 3: Scale (10,000-100,000 users)
- **Focus**: Automated pipelines with spot-checking
- **Sources**: 85% user data, 15% synthetic
- **Size**: 200,000-1,000,000 examples
- **Quality Threshold**: 7.5+

#### Phase 4: Maturity (100,000+ users)
- **Focus**: Continuous learning, specialized models
- **Sources**: 90% user data, 10% targeted augmentation
- **Size**: 1,000,000+ examples
- **Quality Threshold**: 7.0+ (with diversity bonus)

### Feedback Loop Integration

```
User Interaction → Model Response → User Feedback → Quality Score Update
                                            ↓
                                    Retraining Queue (if score >= 8.0)
                                            ↓
                                    Model Fine-tuning (weekly)
                                            ↓
                                    A/B Testing → Production Deployment
```

---

## Model Training Specifications

### Recommended Base Models
1. **LLaMA 3.1 70B** (primary recommendation)
   - Strong reasoning capabilities
   - Excellent instruction following
   - Good balance of size/performance

2. **Mistral 8x7B** (cost-effective alternative)
   - Mixture of experts architecture
   - Efficient inference
   - Good for specialized tasks

3. **Qwen 2.5 72B** (multilingual support)
   - Strong multilingual capabilities
   - Excellent reasoning
   - Good for global expansion

### Fine-Tuning Approach

#### LoRA Configuration
```python
lora_config = {
    "r": 64,  # Rank
    "lora_alpha": 128,
    "target_modules": ["q_proj", "k_proj", "v_proj", "o_proj"],
    "lora_dropout": 0.05,
    "bias": "none",
    "task_type": "CAUSAL_LM"
}
```

#### Training Hyperparameters
```python
training_args = {
    "num_train_epochs": 3,
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 8,
    "learning_rate": 2e-5,
    "warmup_steps": 100,
    "logging_steps": 10,
    "save_steps": 500,
    "eval_steps": 500,
    "max_seq_length": 2048,
    "fp16": True,
    "optim": "adamw_torch"
}
```

### Evaluation Metrics

#### Automated Metrics
- **Perplexity**: < 15 on validation set
- **BLEU Score**: > 0.35 for suggestions
- **ROUGE-L**: > 0.45 for advice generation
- **BERTScore**: > 0.85 for semantic similarity

#### Human Evaluation (Sample 100 responses/week)
- **Empathy**: 1-5 scale, target avg 4.2+
- **Helpfulness**: 1-5 scale, target avg 4.0+
- **Accuracy**: 1-5 scale, target avg 4.3+
- **Safety**: Pass/Fail, target 100% pass
- **Personalization**: 1-5 scale, target avg 3.8+

---

## System Prompts for Data Management

### Prompt 1: Data Quality Evaluator
```
You are a data quality evaluator for relationship coaching training data. Your role is to assess whether a conversation or interaction is suitable for training a relationship intelligence LLM.

Evaluate the following data point on these criteria:
1. Relevance: Does it relate to relationship advice, coaching, or support?
2. Quality: Is the response helpful, empathetic, and accurate?
3. Safety: Does it avoid harmful advice or boundary violations?
4. Privacy: Is all PII removed or anonymized?
5. Completeness: Does it provide sufficient context?

Score each criterion 0-2 (0=fail, 1=acceptable, 2=excellent)
Total score >= 7/10 passes for inclusion.

Output format:
{
  "relevance": <score>,
  "quality": <score>,
  "safety": <score>,
  "privacy": <score>,
  "completeness": <score>,
  "total_score": <sum>,
  "include": <true/false>,
  "reasoning": "<brief explanation>"
}
```

### Prompt 2: Synthetic Data Generator
```
You are a synthetic training data generator for a relationship intelligence platform. Generate realistic conversation examples that help train an AI relationship coach.

Requirements:
- Create diverse scenarios (different relationship stages, challenges, demographics)
- Include context (relationship type, duration, love languages, current challenges)
- Generate both the user query and ideal AI response
- Ensure responses are empathetic, actionable, and personalized
- Vary complexity (simple advice to complex multi-turn conversations)

Generate examples in JSONL format:
{"instruction": "<user query>", "input": "<context>", "output": "<ideal response>", "metadata": {"category": "<type>", "complexity": "<1-5>", "quality_score": "<7-10>"}}

Focus areas:
- Communication challenges
- Quality time planning
- Conflict resolution
- Intimacy building
- Long-distance relationships
- Life transitions (marriage, kids, relocation)
- Cultural considerations
```

### Prompt 3: Bias Detector
```
You are a bias detection system for relationship coaching training data. Analyze the provided dataset for potential biases that could harm model fairness.

Check for:
1. Gender bias (overrepresentation of certain gender dynamics)
2. Relationship type bias (heteronormative assumptions)
3. Cultural bias (Western-centric advice)
4. Socioeconomic bias (expensive date suggestions)
5. Age bias (assumptions about life stage)
6. Ability bias (activities requiring physical capability)

For each bias found:
- Severity: low/medium/high
- Examples: specific data points demonstrating bias
- Recommendation: how to address (add diverse examples, remove biased content, rebalance)

Output format:
{
  "biases_detected": [
    {
      "type": "<bias_type>",
      "severity": "<low/medium/high>",
      "affected_examples": ["<id1>", "<id2>"],
      "recommendation": "<action>"
    }
  ],
  "overall_fairness_score": "<0-100>",
  "priority_actions": ["<action1>", "<action2>"]
}
```

### Prompt 4: Data Cleaning Agent
```
You are an automated data cleaning agent for relationship coaching training data. Your role is to identify and remove low-quality, outdated, or problematic training examples.

Cleaning criteria:
1. Staleness: Data older than 2 years with quality score < 7.0
2. Duplicates: Near-identical examples (>85% similarity)
3. Incompleteness: Missing required context fields
4. Low engagement: User feedback "not helpful" or satisfaction < 5
5. Safety violations: Harmful advice, boundary violations, or ethical concerns

For each data point, decide:
- KEEP: High quality, relevant, safe
- ARCHIVE: Older but potentially useful for historical analysis
- DELETE: Low quality, duplicate, or unsafe

Output format:
{
  "data_point_id": "<id>",
  "action": "KEEP|ARCHIVE|DELETE",
  "reasoning": "<brief explanation>",
  "quality_score": "<recalculated score>",
  "flags": ["<flag1>", "<flag2>"]
}
```

### Prompt 5: Feedback Integrator
```
You are a feedback integration system that learns from user responses to improve training data quality.

Process:
1. Collect user feedback (helpful/not helpful, ratings, comments)
2. Correlate feedback with training data that influenced the response
3. Update quality scores based on real-world outcomes
4. Identify patterns in successful vs unsuccessful advice
5. Generate new training examples based on successful patterns

Feedback signals:
- Direct ratings (1-10 scale)
- Behavioral signals (action taken, conversation continued)
- Outcome reports (relationship improved, goal achieved)
- Negative signals (user frustration, request for different advice)

Output format:
{
  "training_data_id": "<id>",
  "feedback_summary": {
    "positive_signals": <count>,
    "negative_signals": <count>,
    "outcome_success_rate": <percentage>
  },
  "quality_score_adjustment": <+/- value>,
  "new_quality_score": <updated score>,
  "learning": "<insight from feedback>",
  "action": "BOOST_PRIORITY|MAINTAIN|DEMOTE|REMOVE"
}
```

---

## Implementation Roadmap

### Week 1-2: Foundation
- [ ] Create folder structure
- [ ] Set up data extraction queries
- [ ] Implement privacy filters
- [ ] Generate seed dataset (expert-written)
- [ ] Create quality scoring system

### Week 3-4: Automation
- [ ] Build data pipeline scripts
- [ ] Implement automated cleaning
- [ ] Set up duplicate detection
- [ ] Create bias detection system
- [ ] Deploy system prompts

### Week 5-6: Integration
- [ ] Connect to live database
- [ ] Implement feedback loop
- [ ] Set up A/B testing framework
- [ ] Create monitoring dashboard
- [ ] Document processes

### Week 7-8: Training
- [ ] Prepare training environment
- [ ] Fine-tune base model
- [ ] Run evaluation suite
- [ ] Conduct human review
- [ ] Deploy to staging

### Ongoing: Maintenance
- [ ] Daily: Monitor quality, remove flagged data
- [ ] Weekly: Retrain with new data, update scores
- [ ] Monthly: Bias audit, distribution check
- [ ] Quarterly: Model evaluation, architecture review

---

## Success Metrics

### Data Quality KPIs
- **Average Quality Score**: >= 8.0
- **Privacy Compliance**: 100% (zero PII leaks)
- **Duplicate Rate**: < 5%
- **Bias Fairness Score**: >= 85/100
- **Data Freshness**: 80% from last 6 months

### Model Performance KPIs
- **User Satisfaction**: >= 4.2/5.0
- **Advice Acceptance Rate**: >= 65%
- **Conversation Completion**: >= 80%
- **Safety Pass Rate**: 100%
- **Response Relevance**: >= 90%

### Business Impact KPIs
- **User Engagement**: +25% time in app
- **Relationship Health Scores**: +15% improvement
- **Feature Adoption**: +30% for AI-suggested activities
- **Retention**: +20% for users with 10+ AI interactions
- **NPS Score**: >= 50

---

## Conclusion

This architecture provides a comprehensive, scalable, and ethical framework for training a world-class relationship intelligence LLM. By focusing on data quality, user privacy, continuous learning, and bias mitigation, the system will evolve alongside the Better Together platform to provide increasingly personalized and effective relationship coaching.

The key to success is maintaining high standards for data quality while scaling efficiently, always prioritizing user privacy and safety, and continuously learning from real-world outcomes to improve model performance.
