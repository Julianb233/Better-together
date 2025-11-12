#!/usr/bin/env python3
"""
Data Processing and Quality Scoring Script
Processes raw data, applies quality filters, and prepares for training
"""

import os
import json
import argparse
from typing import List, Dict, Any, Optional
from datetime import datetime
from pathlib import Path

# Would use OpenAI API for quality evaluation with system prompts
# For this template, showing the structure

class DataProcessor:
    """Process and score training data"""
    
    def __init__(self, input_dir: str, output_dir: str, quality_threshold: float = 7.0):
        """
        Initialize processor
        
        Args:
            input_dir: Directory containing raw data
            output_dir: Directory for processed data
            quality_threshold: Minimum quality score for inclusion
        """
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.quality_threshold = quality_threshold
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Load system prompts
        self.quality_evaluator_prompt = self._load_prompt("quality_evaluator.txt")
    
    def _load_prompt(self, filename: str) -> str:
        """Load system prompt from file"""
        prompt_path = Path("../../prompts") / filename
        if prompt_path.exists():
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        return ""
    
    def evaluate_quality(self, data_point: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluate quality of a data point using LLM
        
        Args:
            data_point: Training data point
            
        Returns:
            Quality evaluation result
        """
        # This would call OpenAI API with the quality evaluator prompt
        # For template, returning structure
        
        evaluation = {
            "relevance": 2,
            "quality": 2,
            "safety": 2,
            "privacy": 2,
            "completeness": 2,
            "total_score": 10,
            "include": True,
            "human_review_required": False,
            "reasoning": "High-quality relationship coaching data with good context",
            "improvement_suggestions": None
        }
        
        # Actual implementation would be:
        # response = call_llm(self.quality_evaluator_prompt, data_point)
        # evaluation = parse_json_response(response)
        
        return evaluation
    
    def process_file(self, input_file: Path) -> tuple[List[Dict], List[Dict], List[Dict]]:
        """
        Process a single JSONL file
        
        Args:
            input_file: Path to input file
            
        Returns:
            Tuple of (included, excluded, flagged) data points
        """
        included = []
        excluded = []
        flagged = []
        
        print(f"Processing {input_file.name}...")
        
        with open(input_file, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                try:
                    data_point = json.loads(line.strip())
                    
                    # Evaluate quality
                    evaluation = self.evaluate_quality(data_point)
                    
                    # Add evaluation to metadata
                    data_point['metadata']['quality_evaluation'] = evaluation
                    data_point['metadata']['evaluated_at'] = datetime.now().isoformat()
                    
                    # Categorize based on evaluation
                    if evaluation['human_review_required']:
                        flagged.append(data_point)
                    elif evaluation['include'] and evaluation['total_score'] >= self.quality_threshold:
                        included.append(data_point)
                    else:
                        excluded.append(data_point)
                
                except json.JSONDecodeError as e:
                    print(f"  Error parsing line {line_num}: {e}")
                except Exception as e:
                    print(f"  Error processing line {line_num}: {e}")
        
        return included, excluded, flagged
    
    def categorize_by_type(self, data_points: List[Dict]) -> Dict[str, List[Dict]]:
        """
        Categorize data points by training category
        
        Args:
            data_points: List of data points
            
        Returns:
            Dictionary of category -> data points
        """
        categories = {
            "instruction_following": [],
            "contextual_understanding": [],
            "empathetic_dialogue": [],
            "personalization": [],
            "safety_ethics": []
        }
        
        for point in data_points:
            category = point['metadata'].get('category', 'instruction_following')
            
            # Map to training categories
            if category in ['advice', 'coaching', 'conflict_resolution']:
                categories['instruction_following'].append(point)
            elif category in ['date_suggestion', 'personalization']:
                categories['contextual_understanding'].append(point)
            elif category in ['daily_reflection', 'emotional_support']:
                categories['empathetic_dialogue'].append(point)
            elif category in ['personalization', 'love_language_adaptation']:
                categories['personalization'].append(point)
            elif category in ['safety_ethics', 'crisis_intervention']:
                categories['safety_ethics'].append(point)
            else:
                categories['instruction_following'].append(point)
        
        return categories
    
    def save_categorized_data(self, categorized_data: Dict[str, List[Dict]], prefix: str):
        """
        Save categorized data to separate files
        
        Args:
            categorized_data: Dictionary of category -> data points
            prefix: Filename prefix
        """
        for category, data_points in categorized_data.items():
            if not data_points:
                continue
            
            output_file = self.output_dir / category / f"{prefix}_{category}_{datetime.now().strftime('%Y%m%d')}.jsonl"
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_file, 'w', encoding='utf-8') as f:
                for point in data_points:
                    f.write(json.dumps(point, ensure_ascii=False) + '\\n')
            
            print(f"  Saved {len(data_points)} points to {category}/")
    
    def save_flagged_data(self, flagged_data: List[Dict], prefix: str):
        """
        Save flagged data for human review
        
        Args:
            flagged_data: List of flagged data points
            prefix: Filename prefix
        """
        if not flagged_data:
            return
        
        output_file = self.output_dir / "flagged_for_review" / f"{prefix}_flagged_{datetime.now().strftime('%Y%m%d')}.jsonl"
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            for point in flagged_data:
                f.write(json.dumps(point, ensure_ascii=False) + '\\n')
        
        print(f"  Saved {len(flagged_data)} flagged points for human review")
    
    def generate_report(self, stats: Dict[str, Any], output_file: str):
        """
        Generate processing report
        
        Args:
            stats: Processing statistics
            output_file: Report output file
        """
        report = {
            "processing_date": datetime.now().isoformat(),
            "quality_threshold": self.quality_threshold,
            "statistics": stats,
            "summary": {
                "total_processed": stats['total'],
                "included": stats['included'],
                "excluded": stats['excluded'],
                "flagged": stats['flagged'],
                "inclusion_rate": f"{stats['included'] / stats['total'] * 100:.1f}%" if stats['total'] > 0 else "0%"
            }
        }
        
        report_path = self.output_dir / output_file
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"\\nReport saved to {report_path}")
    
    def process_all(self):
        """Process all files in input directory"""
        print(f"Processing data from {self.input_dir}")
        print(f"Quality threshold: {self.quality_threshold}")
        print(f"Output directory: {self.output_dir}\\n")
        
        all_included = []
        all_excluded = []
        all_flagged = []
        
        # Process all JSONL files
        for input_file in self.input_dir.glob("*.jsonl"):
            included, excluded, flagged = self.process_file(input_file)
            all_included.extend(included)
            all_excluded.extend(excluded)
            all_flagged.extend(flagged)
        
        # Categorize included data
        categorized = self.categorize_by_type(all_included)
        
        # Save data
        print("\\nSaving processed data...")
        self.save_categorized_data(categorized, "processed")
        self.save_flagged_data(all_flagged, "review")
        
        # Generate statistics
        stats = {
            "total": len(all_included) + len(all_excluded) + len(all_flagged),
            "included": len(all_included),
            "excluded": len(all_excluded),
            "flagged": len(all_flagged),
            "by_category": {
                category: len(points) 
                for category, points in categorized.items()
            }
        }
        
        # Print summary
        print("\\n" + "="*60)
        print("PROCESSING SUMMARY")
        print("="*60)
        print(f"Total data points processed: {stats['total']}")
        print(f"  ✓ Included: {stats['included']} ({stats['included']/stats['total']*100:.1f}%)")
        print(f"  ✗ Excluded: {stats['excluded']} ({stats['excluded']/stats['total']*100:.1f}%)")
        print(f"  ⚠ Flagged for review: {stats['flagged']} ({stats['flagged']/stats['total']*100:.1f}%)")
        print("\\nBy category:")
        for category, count in stats['by_category'].items():
            print(f"  - {category}: {count}")
        print("="*60)
        
        # Generate report
        self.generate_report(stats, f"processing_report_{datetime.now().strftime('%Y%m%d')}.json")


def main():
    """Main execution"""
    parser = argparse.ArgumentParser(description='Process and score training data')
    parser.add_argument('--input', default='../../raw_data/conversations', 
                       help='Input directory with raw data')
    parser.add_argument('--output', default='../../processed_data', 
                       help='Output directory for processed data')
    parser.add_argument('--threshold', type=float, default=7.0, 
                       help='Minimum quality score threshold')
    
    args = parser.parse_args()
    
    processor = DataProcessor(
        input_dir=args.input,
        output_dir=args.output,
        quality_threshold=args.threshold
    )
    
    processor.process_all()


if __name__ == "__main__":
    main()
