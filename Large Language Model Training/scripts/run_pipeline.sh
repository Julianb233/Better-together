#!/bin/bash
# Automated LLM Training Data Pipeline
# Better Together - Relationship Intelligence Platform

set -e  # Exit on error

echo "=========================================="
echo "LLM Training Data Pipeline"
echo "Better Together - Relationship Intelligence"
echo "=========================================="
echo ""

# Configuration
DAYS_BACK=${DAYS_BACK:-30}
MIN_QUALITY=${MIN_QUALITY:-7.0}
SIMILARITY_THRESHOLD=${SIMILARITY_THRESHOLD:-0.85}

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RAW_DATA_DIR="$PROJECT_ROOT/raw_data"
PROCESSED_DATA_DIR="$PROJECT_ROOT/processed_data"
LOGS_DIR="$PROJECT_ROOT/logs"

# Create directories
mkdir -p "$RAW_DATA_DIR/conversations"
mkdir -p "$RAW_DATA_DIR/activities"
mkdir -p "$RAW_DATA_DIR/quizzes"
mkdir -p "$PROCESSED_DATA_DIR"
mkdir -p "$LOGS_DIR"

# Log file
LOG_FILE="$LOGS_DIR/pipeline_$(date +%Y%m%d_%H%M%S).log"

# Function to log messages
log() {
    echo "[$(date +%Y-%m-%d\ %H:%M:%S)] $1" | tee -a "$LOG_FILE"
}

log "Pipeline started"
log "Configuration:"
log "  - Days back: $DAYS_BACK"
log "  - Min quality: $MIN_QUALITY"
log "  - Similarity threshold: $SIMILARITY_THRESHOLD"
log ""

# Step 1: Data Extraction
log "Step 1: Extracting data from database..."
cd "$SCRIPT_DIR/data_extraction"

if python3 extract_conversations.py --days "$DAYS_BACK" --min-quality "$MIN_QUALITY" >> "$LOG_FILE" 2>&1; then
    log "✓ Data extraction completed successfully"
else
    log "✗ Data extraction failed"
    exit 1
fi

# Step 2: Data Processing and Quality Scoring
log ""
log "Step 2: Processing and scoring data..."
cd "$SCRIPT_DIR/data_processing"

if python3 process_and_score.py --input "$RAW_DATA_DIR/conversations" --output "$PROCESSED_DATA_DIR" --threshold "$MIN_QUALITY" >> "$LOG_FILE" 2>&1; then
    log "✓ Data processing completed successfully"
else
    log "✗ Data processing failed"
    exit 1
fi

# Step 3: Duplicate Detection
log ""
log "Step 3: Detecting and removing duplicates..."
cd "$SCRIPT_DIR/data_processing"

if python3 remove_duplicates.py --input "$PROCESSED_DATA_DIR" --similarity "$SIMILARITY_THRESHOLD" >> "$LOG_FILE" 2>&1; then
    log "✓ Duplicate detection completed successfully"
else
    log "✗ Duplicate detection failed"
    exit 1
fi

# Step 4: Bias Detection
log ""
log "Step 4: Running bias detection audit..."
cd "$SCRIPT_DIR/evaluation"

if python3 detect_bias.py --input "$PROCESSED_DATA_DIR" >> "$LOG_FILE" 2>&1; then
    log "✓ Bias detection completed successfully"
else
    log "⚠ Bias detection completed with warnings (check logs)"
fi

# Step 5: Generate Statistics
log ""
log "Step 5: Generating dataset statistics..."

TOTAL_FILES=$(find "$PROCESSED_DATA_DIR" -name "*.jsonl" | wc -l)
TOTAL_EXAMPLES=$(cat "$PROCESSED_DATA_DIR"/*/*.jsonl 2>/dev/null | wc -l)

log "Dataset Statistics:"
log "  - Total files: $TOTAL_FILES"
log "  - Total examples: $TOTAL_EXAMPLES"

# Category breakdown
for category in instruction_following contextual_understanding empathetic_dialogue personalization safety_ethics; do
    if [ -d "$PROCESSED_DATA_DIR/$category" ]; then
        COUNT=$(cat "$PROCESSED_DATA_DIR/$category"/*.jsonl 2>/dev/null | wc -l)
        log "  - $category: $COUNT examples"
    fi
done

# Step 6: Prepare Training Dataset
log ""
log "Step 6: Preparing combined training dataset..."
cd "$SCRIPT_DIR/training"

TRAIN_FILE="$PROCESSED_DATA_DIR/train_$(date +%Y%m%d).jsonl"
VAL_FILE="$PROCESSED_DATA_DIR/val_$(date +%Y%m%d).jsonl"
TEST_FILE="$PROCESSED_DATA_DIR/test_$(date +%Y%m%d).jsonl"

if python3 prepare_dataset.py --input "$PROCESSED_DATA_DIR" --output-train "$TRAIN_FILE" --output-val "$VAL_FILE" --output-test "$TEST_FILE" >> "$LOG_FILE" 2>&1; then
    log "✓ Training dataset prepared successfully"
    log "  - Training set: $(cat "$TRAIN_FILE" | wc -l) examples"
    log "  - Validation set: $(cat "$VAL_FILE" | wc -l) examples"
    log "  - Test set: $(cat "$TEST_FILE" | wc -l) examples"
else
    log "✗ Dataset preparation failed"
    exit 1
fi

# Step 7: Archive Raw Data
log ""
log "Step 7: Archiving raw data..."

ARCHIVE_DIR="$PROJECT_ROOT/archive/$(date +%Y%m%d)"
mkdir -p "$ARCHIVE_DIR"

if cp -r "$RAW_DATA_DIR"/* "$ARCHIVE_DIR/" 2>/dev/null; then
    log "✓ Raw data archived to $ARCHIVE_DIR"
    # Clean up raw data older than 90 days
    find "$PROJECT_ROOT/archive" -type d -mtime +90 -exec rm -rf {} + 2>/dev/null || true
    log "✓ Cleaned up archives older than 90 days"
else
    log "⚠ No raw data to archive"
fi

# Summary
log ""
log "=========================================="
log "Pipeline completed successfully!"
log "=========================================="
log "Summary:"
log "  - Extracted data from last $DAYS_BACK days"
log "  - Processed $TOTAL_EXAMPLES training examples"
log "  - Quality threshold: $MIN_QUALITY"
log "  - Training data ready at: $TRAIN_FILE"
log "  - Full log available at: $LOG_FILE"
log ""
log "Next steps:"
log "  1. Review flagged data in: $PROCESSED_DATA_DIR/flagged_for_review/"
log "  2. Check bias report in: $PROJECT_ROOT/evaluation/"
log "  3. Run training with: cd scripts/training && python3 train_lora.py"
log "=========================================="

# Optional: Send notification (email, Slack, etc.)
# Uncomment and configure as needed
# curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"LLM training pipeline completed: $TOTAL_EXAMPLES examples processed\"}" YOUR_SLACK_WEBHOOK_URL

exit 0
