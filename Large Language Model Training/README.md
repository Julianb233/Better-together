# Large Language Model Training

**Purpose:** Training data collection, curation, and management for Better Together's relationship intelligence LLM

**Version:** 1.0  
**Last Updated:** November 12, 2025

---

## Folder Structure

### 📁 `raw_data/`
**Purpose:** Unprocessed data extracted directly from the database

**Contents:**
- `conversations/` - User-AI interactions, check-in reflections
- `activities/` - Date experiences, satisfaction ratings, feedback
- `quizzes/` - Assessment responses, personality insights
- `analytics/` - Relationship health metrics, engagement patterns
- `feedback/` - User ratings, helpfulness votes, outcome reports

**Format:** JSONL (JSON Lines) - one JSON object per line

**Privacy:** All PII must be removed before storage

**Retention:** 90 days, then moved to archive or processed

---

### 📁 `processed_data/`
**Purpose:** Cleaned, formatted, and quality-filtered training data ready for model training

**Contents:**
- `instruction_following/` - Q&A pairs, advice requests (40% of dataset)
- `contextual_understanding/` - Personality-aware, stage-sensitive responses (25%)
- `empathetic_dialogue/` - Emotional validation, supportive conversations (20%)
- `personalization/` - Love language adaptation, preference learning (10%)
- `safety_ethics/` - Boundary recognition, crisis handling (5%)

**Format:** JSONL with standardized schema:
```json
{
  "instruction": "User query or task description",
  "input": "Context (relationship stage, preferences, constraints)",
  "output": "Ideal AI response",
  "metadata": {
    "category": "advice|suggestion|coaching|diagnostic",
    "quality_score": 7.0-10.0,
    "relationship_stage": "early|established|long_term",
    "complexity": 1-5,
    "created_at": "ISO 8601 timestamp",
    "source": "user_generated|synthetic|expert_curated"
  }
}
```

**Quality Threshold:** Minimum score of 7.0 for inclusion

**Versioning:** `v1_YYYYMMDD.jsonl` format

---

### 📁 `synthetic_data/`
**Purpose:** AI-generated training examples for diversity, edge cases, and augmentation

**Contents:**
- `diverse_scenarios/` - Underrepresented relationship types, cultures, challenges
- `edge_cases/` - Crisis situations, complex conflicts, ethical dilemmas
- `safety_training/` - Abuse detection, boundary violations, professional referrals
- `personalization_examples/` - Love language variations, personality adaptations
- `multilingual/` - Non-English relationship coaching (future expansion)

**Generation Method:** 
- GPT-4 or Claude with specialized prompts
- Human review for quality and safety
- Blended with real data (max 30% synthetic in any batch)

**Quality Control:** 
- All synthetic data reviewed by relationship experts
- Safety scenarios validated by licensed therapists
- Bias checked for cultural sensitivity

---

### 📁 `evaluation/`
**Purpose:** Test sets, benchmarks, and evaluation results

**Contents:**
- `test_sets/` - Held-out data for model evaluation
  - `test_general.jsonl` - General relationship advice (500 examples)
  - `test_personalization.jsonl` - Personality adaptation (200 examples)
  - `test_safety.jsonl` - Ethical boundaries, crisis handling (100 examples)
  - `test_empathy.jsonl` - Emotional intelligence (200 examples)
- `benchmarks/` - Standard evaluation metrics
  - `perplexity_scores.json`
  - `bleu_rouge_scores.json`
  - `human_evaluation_results.json`
- `results/` - Model performance over time
  - `model_v1_results.json`
  - `model_v2_results.json`
  - `ab_test_results.json`

**Update Frequency:** After each training run

**Retention:** Permanent (version controlled)

---

### 📁 `models/`
**Purpose:** Trained model checkpoints, configurations, and metadata

**Contents:**
- `checkpoints/` - Model weights at various training stages
- `configs/` - Training hyperparameters, LoRA configurations
- `tokenizers/` - Custom tokenizers if needed
- `adapters/` - LoRA adapters for efficient fine-tuning
- `metadata/` - Training logs, performance metrics, version info

**Naming Convention:** `better-together-llm-v{version}-{date}-{base_model}`

Example: `better-together-llm-v1.2-20251112-llama3.1-70b`

**Storage:** Local for development, cloud (S3/R2) for production

---

### 📁 `scripts/`
**Purpose:** Automated data collection, processing, and training scripts

**Contents:**
- `data_extraction/` - Database queries, API connectors
- `data_processing/` - Cleaning, formatting, quality scoring
- `data_generation/` - Synthetic data creation
- `training/` - Model fine-tuning scripts
- `evaluation/` - Automated testing and benchmarking
- `deployment/` - Model serving, A/B testing
- `monitoring/` - Data quality dashboards, alerts

**Language:** Python 3.11+ (compatible with sandbox environment)

**Dependencies:** Listed in `requirements.txt`

---

### 📁 `prompts/`
**Purpose:** System prompts for data management and quality control

**Contents:**
- `quality_evaluator.txt` - Assess data point suitability
- `synthetic_generator.txt` - Generate diverse training examples
- `bias_detector.txt` - Identify fairness issues
- `data_cleaner.txt` - Automated cleaning decisions
- `feedback_integrator.txt` - Learn from user responses
- `safety_validator.txt` - Check for harmful content

**Usage:** Load these prompts in automated pipelines for consistency

**Versioning:** Track changes to prompts as they affect data quality

---

### 📁 `logs/`
**Purpose:** Operational logs for debugging and monitoring

**Contents:**
- `data_extraction_YYYYMMDD.log` - Database query logs
- `processing_YYYYMMDD.log` - Cleaning and formatting logs
- `quality_scores_YYYYMMDD.log` - Quality assessment results
- `training_YYYYMMDD.log` - Model training progress
- `errors_YYYYMMDD.log` - Error tracking and resolution

**Retention:** 90 days, then archived

**Monitoring:** Check daily for errors, weekly for patterns

---

### 📁 `archive/`
**Purpose:** Long-term storage of outdated or low-quality data

**Contents:**
- `old_versions/` - Previous dataset versions
- `removed_data/` - Data cleaned from active set (with reasons)
- `deprecated_models/` - Old model checkpoints

**Retention Policy:**
- Keep for 24 months for audit purposes
- Delete after 24 months unless flagged for retention
- Compress to save storage space

**Access:** Read-only, requires justification for retrieval

---

## Quick Start Guide

### 1. Extract Data from Database
```bash
cd scripts/data_extraction
python extract_conversations.py --days 30 --min-quality 7.0
python extract_activities.py --min-satisfaction 8.0
python extract_quizzes.py --completed-only
```

### 2. Process and Clean Data
```bash
cd scripts/data_processing
python clean_data.py --input ../../raw_data/conversations/ --output ../../processed_data/
python quality_score.py --input ../../processed_data/ --threshold 7.0
python remove_duplicates.py --similarity 0.85
```

### 3. Generate Synthetic Data (Optional)
```bash
cd scripts/data_generation
python generate_synthetic.py --count 5000 --categories diverse_scenarios,edge_cases
python validate_synthetic.py --input ../../synthetic_data/ --human-review-sample 100
```

### 4. Prepare Training Dataset
```bash
cd scripts/training
python prepare_dataset.py --train-split 0.9 --val-split 0.05 --test-split 0.05
python create_jsonl.py --output ../../processed_data/train_v1_20251112.jsonl
```

### 5. Train Model
```bash
cd scripts/training
python train_lora.py --base-model meta-llama/Llama-3.1-70b --config ../../models/configs/lora_config.json
```

### 6. Evaluate Model
```bash
cd scripts/evaluation
python run_evaluation.py --model ../../models/checkpoints/better-together-llm-v1.0
python human_eval.py --sample-size 100
```

---

## Data Quality Standards

### Inclusion Criteria
✅ Quality score >= 7.0  
✅ All PII removed  
✅ Relevant to relationship coaching  
✅ Empathetic and helpful  
✅ Safe and ethical  
✅ Sufficient context provided  

### Exclusion Criteria
❌ Quality score < 7.0  
❌ Contains PII (names, emails, addresses)  
❌ Harmful or unethical advice  
❌ Duplicate content (>85% similarity)  
❌ Incomplete or missing context  
❌ Outdated (>2 years old with low quality)  

### Quality Score Calculation
```
Score = Engagement (3.0) + Outcome (3.0) + Content (2.0) + Diversity (2.0)

Engagement:
- Response length > 50 chars: +1.0
- Conversation turns >= 3: +1.0
- User satisfaction >= 8: +1.0

Outcome:
- Action taken: +1.5
- Positive outcome reported: +1.5

Content:
- Response coherence >= 0.8: +1.0
- Empathy score >= 0.7: +1.0

Diversity:
- Underrepresented scenario: +1.0
- Unique context: +1.0

Total: 0-10 scale
```

---

## Privacy & Security

### PII Removal Checklist
- [ ] Names replaced with [User], [Partner]
- [ ] Email addresses removed
- [ ] Phone numbers removed
- [ ] Physical addresses removed
- [ ] Specific workplace names generalized
- [ ] Unique identifying details anonymized
- [ ] User IDs replaced with random tokens

### Data Access Control
- **Raw Data**: Engineering team only
- **Processed Data**: ML team + approved researchers
- **Models**: Production deployment team
- **Logs**: DevOps + security team

### Compliance
- GDPR: Right to deletion, data portability
- CCPA: Opt-out of data usage
- HIPAA: No health information stored
- SOC 2: Audit trail for all data access

---

## Maintenance Schedule

### Daily
- [ ] Monitor data extraction logs
- [ ] Check for PII leaks (automated scan)
- [ ] Remove flagged low-quality data
- [ ] Update quality scores based on feedback

### Weekly
- [ ] Run duplicate detection
- [ ] Retrain model with new data (if >= 1000 new examples)
- [ ] Review human evaluation results
- [ ] Update documentation

### Monthly
- [ ] Bias audit and distribution check
- [ ] Archive old raw data
- [ ] Review and update system prompts
- [ ] Generate monthly quality report

### Quarterly
- [ ] Full dataset review
- [ ] Model architecture evaluation
- [ ] Security audit
- [ ] Stakeholder presentation

---

## Contact & Support

**Data Team Lead:** [To be assigned]  
**ML Engineer:** [To be assigned]  
**Ethics Review:** [To be assigned]  

**Documentation:** See `LLM_TRAINING_ARCHITECTURE.md` for full technical details  
**Issues:** Report via GitHub Issues with label `llm-training`  
**Slack Channel:** #llm-training-data  

---

## Version History

**v1.0** (2025-11-12)
- Initial folder structure
- Core data extraction scripts
- Quality scoring system
- System prompts for automation
- Documentation and guidelines
