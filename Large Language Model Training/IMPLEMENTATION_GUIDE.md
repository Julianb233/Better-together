# LLM Training Implementation Guide

**Better Together - Relationship Intelligence Platform**  
**Version:** 1.0  
**Last Updated:** November 12, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Data Pipeline](#data-pipeline)
5. [Training Process](#training-process)
6. [Evaluation and Testing](#evaluation-and-testing)
7. [Deployment](#deployment)
8. [Maintenance](#maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

This guide provides step-by-step instructions for implementing the LLM training system for Better Together's relationship intelligence platform. The system is designed to:

- Extract high-quality training data from the production database
- Process and curate data with automated quality checks
- Train a specialized relationship coaching LLM
- Continuously improve through user feedback
- Scale as the user base grows

**Expected Outcomes:**
- World-class relationship coaching AI
- Personalized, empathetic, and actionable advice
- Safe, ethical, and bias-aware responses
- Continuous improvement through feedback loops

---

## Prerequisites

### Technical Requirements

**Hardware:**
- **For Training:**
  - GPU: NVIDIA A100 (80GB) or H100 (recommended)
  - Alternative: 4x A6000 (48GB each) or cloud GPU (AWS p4d, GCP A2)
  - RAM: 128GB+ system memory
  - Storage: 500GB+ SSD for datasets and checkpoints

- **For Development/Testing:**
  - GPU: NVIDIA RTX 4090 or A6000
  - RAM: 64GB+
  - Storage: 200GB+ SSD

**Software:**
- Python 3.11+
- CUDA 12.1+ (for GPU training)
- PostgreSQL client (for Neon database access)
- Git

### Access Requirements

- **Database Access:**
  - Neon database credentials (via MCP or direct connection)
  - Read access to all relevant tables
  - Ability to run analytical queries

- **API Keys:**
  - OpenAI API key (for quality evaluation with GPT-4)
  - Hugging Face token (for model access)
  - Weights & Biases account (optional, for experiment tracking)

- **Permissions:**
  - Access to Better Together GitHub repository
  - Ability to deploy models to production (for final deployment)

### Knowledge Requirements

- Python programming
- Basic understanding of machine learning
- Familiarity with LLMs and fine-tuning
- SQL for database queries
- Command-line proficiency

---

## Setup Instructions

### 1. Clone the Repository

```bash
cd /path/to/your/workspace
git clone https://github.com/Julianb233/Better-together.git
cd Better-together
```

### 2. Navigate to LLM Training Directory

```bash
cd "Large Language Model Training"
```

### 3. Set Up Python Environment

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate environment
source venv/bin/activate  # On Linux/Mac
# or
venv\Scripts\activate  # On Windows

# Install dependencies
cd scripts
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `scripts/` directory:

```bash
# Database Configuration
NEON_DATABASE_URL=postgresql://user:password@host/database
NEON_PROJECT_ID=your-project-id

# API Keys
OPENAI_API_KEY=your-openai-api-key
HUGGINGFACE_TOKEN=your-hf-token

# Weights & Biases (optional)
WANDB_API_KEY=your-wandb-key
WANDB_PROJECT=better-together-llm

# Training Configuration
TRAINING_OUTPUT_DIR=../models/checkpoints
TRAINING_LOGS_DIR=../logs
```

### 5. Verify Database Connection

Test connection to Neon database:

```bash
# Using Neon MCP
manus-mcp-cli tool call execute_query --server neon --input '{"query": "SELECT COUNT(*) FROM users;"}'

# Or using direct connection
python3 -c "
import os
from sqlalchemy import create_engine
engine = create_engine(os.getenv('NEON_DATABASE_URL'))
with engine.connect() as conn:
    result = conn.execute('SELECT COUNT(*) FROM users;')
    print(f'Total users: {result.fetchone()[0]}')
"
```

### 6. Initialize Directories

```bash
# Run from the "Large Language Model Training" directory
mkdir -p raw_data/{conversations,activities,quizzes,analytics,feedback}
mkdir -p processed_data/{instruction_following,contextual_understanding,empathetic_dialogue,personalization,safety_ethics}
mkdir -p synthetic_data
mkdir -p evaluation/{test_sets,benchmarks,results}
mkdir -p models/{checkpoints,configs,adapters,metadata}
mkdir -p logs
mkdir -p archive
```

---

## Data Pipeline

### Phase 1: Data Extraction

Extract data from the production database:

```bash
cd scripts/data_extraction

# Extract last 30 days of high-quality data
python3 extract_conversations.py --days 30 --min-quality 7.0

# Check output
ls -lh ../../raw_data/conversations/
```

**Expected Output:**
- `checkins_YYYYMMDD.jsonl` - Daily check-in reflections
- `activities_YYYYMMDD.jsonl` - Date activity feedback
- `quizzes_YYYYMMDD.jsonl` - Quiz insights and results

**Verification:**
```bash
# Count extracted examples
wc -l ../../raw_data/conversations/*.jsonl

# Sample a few examples
head -n 3 ../../raw_data/conversations/checkins_*.jsonl | jq .
```

### Phase 2: Data Processing and Quality Scoring

Process raw data and apply quality filters:

```bash
cd ../data_processing

# Process and score data
python3 process_and_score.py \
  --input ../../raw_data/conversations \
  --output ../../processed_data \
  --threshold 7.0

# Review processing report
cat ../../processed_data/processing_report_*.json | jq .
```

**Expected Output:**
- Categorized data in `processed_data/` subdirectories
- Quality scores added to metadata
- Processing report with statistics
- Flagged data in `processed_data/flagged_for_review/`

**Action Items:**
- Review flagged data manually
- Adjust quality threshold if inclusion rate is too low/high
- Check category distribution for balance

### Phase 3: Duplicate Detection

Remove near-duplicate examples:

```bash
# Detect and remove duplicates
python3 remove_duplicates.py \
  --input ../../processed_data \
  --similarity 0.85

# Review duplicate report
cat ../../processed_data/duplicate_report_*.json | jq .
```

**Expected Output:**
- Duplicates removed (keeping higher quality versions)
- Report showing duplicate pairs and decisions
- Updated dataset without redundancy

### Phase 4: Bias Detection

Audit dataset for fairness:

```bash
cd ../evaluation

# Run bias detection
python3 detect_bias.py --input ../../processed_data

# Review bias report
cat ../../evaluation/bias_report_*.json | jq .
```

**Expected Output:**
- Bias analysis across dimensions (gender, culture, age, etc.)
- Fairness score (target: 85+)
- Recommendations for improving representation

**Action Items:**
- If fairness score < 85, generate synthetic data to fill gaps
- Review and address high-severity biases
- Rebalance dataset if needed

### Phase 5: Synthetic Data Generation (Optional)

Generate synthetic examples to improve diversity:

```bash
cd ../data_generation

# Generate synthetic data for underrepresented scenarios
python3 generate_synthetic.py \
  --count 5000 \
  --categories diverse_scenarios,edge_cases \
  --output ../../synthetic_data

# Validate synthetic data
python3 validate_synthetic.py \
  --input ../../synthetic_data \
  --human-review-sample 100
```

**Action Items:**
- Human review of sample synthetic data
- Ensure synthetic data quality matches real data
- Blend synthetic data (max 30%) with real data

### Phase 6: Prepare Training Dataset

Combine and split data for training:

```bash
cd ../training

# Prepare final training dataset
python3 prepare_dataset.py \
  --input ../../processed_data \
  --output-train ../../processed_data/train_$(date +%Y%m%d).jsonl \
  --output-val ../../processed_data/val_$(date +%Y%m%d).jsonl \
  --output-test ../../processed_data/test_$(date +%Y%m%d).jsonl \
  --train-split 0.90 \
  --val-split 0.05 \
  --test-split 0.05

# Verify splits
wc -l ../../processed_data/{train,val,test}_*.jsonl
```

**Expected Output:**
- `train_YYYYMMDD.jsonl` - 90% of data
- `val_YYYYMMDD.jsonl` - 5% of data
- `test_YYYYMMDD.jsonl` - 5% of data

---

## Training Process

### Phase 1: Configure Training

Edit `models/configs/training_config.yaml`:

```yaml
model:
  base_model: "meta-llama/Llama-3.1-70b-hf"

training:
  num_train_epochs: 3
  per_device_train_batch_size: 4
  learning_rate: 2.0e-5

dataset:
  train_file: "../../processed_data/train_20251112.jsonl"
  validation_file: "../../processed_data/val_20251112.jsonl"
```

### Phase 2: Start Training

```bash
cd scripts/training

# Start training with LoRA
python3 train_lora.py \
  --config ../../models/configs/training_config.yaml \
  --output-dir ../../models/checkpoints/better-together-llm-v1

# Monitor training (in another terminal)
tensorboard --logdir ../../logs/tensorboard
```

**Training Time Estimates:**
- **LLaMA 3.1 70B on A100 (80GB):** ~24-48 hours for 3 epochs
- **LLaMA 3.1 70B on 4x A6000:** ~48-72 hours for 3 epochs
- **Smaller models (7B-13B):** ~4-12 hours for 3 epochs

**Monitoring:**
- Watch loss curves (should decrease steadily)
- Check validation metrics every 500 steps
- Monitor GPU memory usage
- Track learning rate schedule

### Phase 3: Checkpoint Management

```bash
# List checkpoints
ls -lh ../../models/checkpoints/better-together-llm-v1/

# Load best checkpoint based on validation loss
# (automatically selected by training script)
```

---

## Evaluation and Testing

### Phase 1: Automated Evaluation

```bash
cd scripts/evaluation

# Run automated metrics
python3 run_evaluation.py \
  --model ../../models/checkpoints/better-together-llm-v1 \
  --test-file ../../processed_data/test_20251112.jsonl \
  --output ../../evaluation/results/

# View results
cat ../../evaluation/results/evaluation_results_*.json | jq .
```

**Target Metrics:**
- Perplexity: < 15
- BLEU Score: > 0.35
- ROUGE-L: > 0.45
- BERTScore: > 0.85

### Phase 2: Human Evaluation

```bash
# Generate sample responses for human review
python3 human_eval.py \
  --model ../../models/checkpoints/better-together-llm-v1 \
  --sample-size 100 \
  --output ../../evaluation/human_eval_samples.jsonl

# Review samples manually or distribute to reviewers
```

**Evaluation Criteria:**
- Empathy: 1-5 scale (target: 4.2+)
- Helpfulness: 1-5 scale (target: 4.0+)
- Accuracy: 1-5 scale (target: 4.3+)
- Safety: Pass/Fail (target: 100% pass)
- Personalization: 1-5 scale (target: 3.8+)

### Phase 3: Safety Testing

```bash
# Run safety tests
python3 safety_tests.py \
  --model ../../models/checkpoints/better-together-llm-v1 \
  --test-cases ../../evaluation/test_sets/test_safety.jsonl

# Review safety report
cat ../../evaluation/results/safety_report_*.json | jq .
```

**Critical Safety Checks:**
- Abuse recognition and appropriate response
- Crisis intervention (suicide, harm)
- Boundary violations (none allowed)
- Harmful advice (none allowed)
- Privacy protection (no PII leakage)

---

## Deployment

### Phase 1: A/B Testing Setup

```bash
# Deploy model to staging
python3 deploy_model.py \
  --model ../../models/checkpoints/better-together-llm-v1 \
  --environment staging \
  --ab-test-enabled \
  --traffic-split 0.1  # 10% to new model

# Monitor A/B test
python3 monitor_ab_test.py --duration 14  # 14 days
```

**A/B Test Metrics:**
- User satisfaction ratings
- Conversation completion rate
- Advice acceptance rate
- Time spent in app
- Return visit rate

### Phase 2: Gradual Rollout

If A/B test is successful:

```bash
# Gradual rollout to production
python3 deploy_model.py \
  --model ../../models/checkpoints/better-together-llm-v1 \
  --environment production \
  --rollout-strategy gradual \
  --stages "10,25,50,100" \
  --stage-duration 3  # days per stage
```

**Rollback Criteria:**
- Satisfaction drop > 0.5 points
- Error rate increase > 5%
- Any safety incidents

### Phase 3: Production Monitoring

```bash
# Set up monitoring
python3 setup_monitoring.py \
  --model better-together-llm-v1 \
  --alerts-enabled \
  --dashboard-url https://monitoring.bettertogetherapp.com
```

**Monitor:**
- Response quality metrics
- Latency and throughput
- Error rates
- User feedback
- Safety incidents

---

## Maintenance

### Daily Tasks

```bash
# Run automated pipeline
cd scripts
./run_pipeline.sh

# Check logs
tail -f ../logs/pipeline_*.log

# Review flagged data
ls -lh ../processed_data/flagged_for_review/
```

### Weekly Tasks

```bash
# Retrain model with new data (if >= 1000 new examples)
cd scripts/training
python3 train_lora.py --incremental

# Run bias audit
cd ../evaluation
python3 detect_bias.py --input ../../processed_data

# Review human evaluation results
cat ../../evaluation/human_eval_results_*.json | jq .
```

### Monthly Tasks

```bash
# Full dataset review
cd scripts/data_processing
python3 full_dataset_review.py

# Update system prompts if needed
# (based on learnings from the month)

# Generate monthly report
cd ../reporting
python3 generate_monthly_report.py --month $(date +%Y-%m)
```

### Quarterly Tasks

```bash
# Major model evaluation
cd scripts/evaluation
python3 comprehensive_evaluation.py

# Security audit
python3 security_audit.py

# Stakeholder presentation
python3 generate_presentation.py --quarter Q$(date +%q)
```

---

## Troubleshooting

### Issue: Low Data Quality Scores

**Symptoms:** Most data points score < 7.0

**Solutions:**
1. Review quality scoring criteria in `prompts/quality_evaluator.txt`
2. Check if data extraction queries are too broad
3. Increase minimum thresholds in extraction (e.g., connection_score >= 8)
4. Manually review a sample to understand quality issues

### Issue: High Duplicate Rate

**Symptoms:** > 20% of data flagged as duplicates

**Solutions:**
1. Lower similarity threshold (e.g., 0.90 instead of 0.85)
2. Check if extraction is pulling same data multiple times
3. Review duplicate detection algorithm for false positives

### Issue: Training Loss Not Decreasing

**Symptoms:** Loss plateaus or increases during training

**Solutions:**
1. Reduce learning rate (try 1e-5 instead of 2e-5)
2. Increase warmup steps (try 500 instead of 100)
3. Check for data quality issues (corrupted examples)
4. Verify dataset format matches expected structure
5. Try gradient clipping (max_grad_norm: 0.5)

### Issue: Out of Memory (OOM) Errors

**Symptoms:** Training crashes with CUDA OOM

**Solutions:**
1. Reduce batch size (try 2 or 1 instead of 4)
2. Increase gradient accumulation steps (maintain effective batch size)
3. Enable gradient checkpointing in config
4. Use 8-bit or 4-bit quantization (QLoRA)
5. Reduce max sequence length (try 1024 instead of 2048)

### Issue: Model Responses Are Generic

**Symptoms:** Model doesn't personalize or use context

**Solutions:**
1. Check if context is properly formatted in training data
2. Increase weight of personalization examples in training
3. Add more diverse contextual examples
4. Review prompt template structure
5. Fine-tune for more epochs (try 5 instead of 3)

### Issue: Safety Failures

**Symptoms:** Model gives inappropriate advice or misses red flags

**Solutions:**
1. Immediately remove model from production
2. Review safety training examples
3. Add more safety-critical scenarios to training data
4. Increase weight of safety examples (e.g., 10% instead of 5%)
5. Implement additional safety filters in production
6. Consult with licensed therapists for safety review

---

## Best Practices

### Data Quality

✅ **Do:**
- Prioritize quality over quantity
- Manually review flagged data
- Regularly audit for bias
- Update quality criteria based on learnings
- Maintain diverse representation

❌ **Don't:**
- Include data below quality threshold
- Ignore safety concerns
- Over-rely on synthetic data (max 30%)
- Skip human review of sensitive topics
- Neglect privacy protection

### Training

✅ **Do:**
- Start with smaller learning rates
- Monitor validation metrics closely
- Save multiple checkpoints
- Use gradient checkpointing for memory efficiency
- Track experiments with W&B or MLflow

❌ **Don't:**
- Train without validation set
- Ignore overfitting signs
- Skip evaluation before deployment
- Use outdated base models
- Forget to version control configs

### Deployment

✅ **Do:**
- Always A/B test before full rollout
- Set clear rollback criteria
- Monitor production metrics continuously
- Collect user feedback
- Have a rollback plan ready

❌ **Don't:**
- Deploy without safety testing
- Roll out to 100% immediately
- Ignore negative user feedback
- Skip gradual rollout stages
- Deploy without monitoring

### Continuous Improvement

✅ **Do:**
- Integrate user feedback regularly
- Retrain weekly with new data
- Update system prompts based on learnings
- Conduct regular bias audits
- Share learnings with the team

❌ **Don't:**
- Let data pipeline stagnate
- Ignore user complaints
- Skip scheduled maintenance
- Neglect documentation updates
- Forget to celebrate wins!

---

## Next Steps

After completing this implementation:

1. **Week 1-2:** Set up infrastructure and run initial data extraction
2. **Week 3-4:** Process data and train first model version
3. **Week 5-6:** Evaluate and iterate on model quality
4. **Week 7-8:** Deploy to staging and run A/B test
5. **Week 9+:** Gradual production rollout and continuous improvement

**Success Metrics to Track:**
- User satisfaction: >= 4.2/5.0
- Advice acceptance rate: >= 65%
- Conversation completion: >= 80%
- Safety pass rate: 100%
- Relationship health improvement: +15%

---

## Support and Resources

**Documentation:**
- Full architecture: `LLM_TRAINING_ARCHITECTURE.md`
- Folder structure: `README.md`
- System prompts: `prompts/` directory

**Community:**
- GitHub Issues: https://github.com/Julianb233/Better-together/issues
- Team Slack: #llm-training-data
- Weekly sync: Fridays 2pm PST

**External Resources:**
- Hugging Face Transformers: https://huggingface.co/docs/transformers
- LoRA Paper: https://arxiv.org/abs/2106.09685
- LLaMA 3.1: https://ai.meta.com/llama/

---

**Good luck building a world-class relationship intelligence LLM! 🚀💕**
