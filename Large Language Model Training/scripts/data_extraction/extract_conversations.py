#!/usr/bin/env python3
"""
Data Extraction Script: Conversations and Check-ins
Extracts high-quality conversation data from Better Together database for LLM training
"""

import os
import json
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import re

# Database connection would use Neon MCP or direct PostgreSQL connection
# For this template, we'll show the structure

class ConversationExtractor:
    """Extract conversation data from Better Together database"""
    
    def __init__(self, min_quality_score: float = 7.0, days_back: int = 30):
        """
        Initialize extractor
        
        Args:
            min_quality_score: Minimum quality threshold for inclusion
            days_back: Number of days to look back for data
        """
        self.min_quality_score = min_quality_score
        self.days_back = days_back
        self.output_dir = "../../raw_data/conversations"
        os.makedirs(self.output_dir, exist_ok=True)
    
    def anonymize_text(self, text: str) -> str:
        """
        Remove PII from text
        
        Args:
            text: Original text
            
        Returns:
            Anonymized text
        """
        if not text:
            return text
        
        # Replace email addresses
        text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL]', text)
        
        # Replace phone numbers (various formats)
        text = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE]', text)
        text = re.sub(r'\(\d{3}\)\s*\d{3}[-.]?\d{4}', '[PHONE]', text)
        
        # Replace URLs
        text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '[URL]', text)
        
        # Replace specific addresses (simplified - would need more robust solution)
        text = re.sub(r'\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b', '[ADDRESS]', text, flags=re.IGNORECASE)
        
        # Note: Names are harder to detect automatically - would need NER model
        # For now, we'll rely on database-level anonymization
        
        return text
    
    def generate_anonymous_id(self, user_id: str) -> str:
        """
        Generate anonymous but consistent ID for a user
        
        Args:
            user_id: Original user ID
            
        Returns:
            Anonymous hash ID
        """
        return hashlib.sha256(f"user_{user_id}".encode()).hexdigest()[:16]
    
    def calculate_quality_score(self, data: Dict[str, Any]) -> float:
        """
        Calculate quality score for a data point
        
        Args:
            data: Data point dictionary
            
        Returns:
            Quality score (0-10)
        """
        score = 0.0
        
        # Engagement scoring (max 3.0)
        if data.get('response_length', 0) > 50:
            score += 1.0
        if data.get('conversation_turns', 0) >= 3:
            score += 1.0
        if data.get('user_satisfaction_rating', 0) >= 8:
            score += 1.0
        
        # Outcome validation (max 3.0)
        if data.get('action_taken', False):
            score += 1.5
        if data.get('positive_outcome_reported', False):
            score += 1.5
        
        # Content quality (max 2.0)
        if data.get('response_coherence', 0) >= 0.8:
            score += 1.0
        if data.get('empathy_score', 0) >= 0.7:
            score += 1.0
        
        # Diversity bonus (max 2.0)
        if data.get('underrepresented_scenario', False):
            score += 1.0
        if data.get('unique_context', False):
            score += 1.0
        
        return min(score, 10.0)
    
    def extract_daily_checkins(self) -> List[Dict[str, Any]]:
        """
        Extract high-quality daily check-in data
        
        Returns:
            List of anonymized check-in data points
        """
        # SQL query to extract check-ins
        query = """
        SELECT 
            dc.id,
            dc.gratitude_note,
            dc.support_needed,
            dc.highlight_of_day,
            dc.connection_score,
            dc.mood_score,
            dc.relationship_satisfaction,
            dc.checkin_date,
            u.love_language_primary,
            u.love_language_secondary,
            r.relationship_type,
            r.start_date,
            ra.overall_health_score,
            ra.average_connection_score
        FROM daily_checkins dc
        JOIN users u ON dc.user_id = u.id
        JOIN relationships r ON dc.relationship_id = r.id
        LEFT JOIN relationship_analytics ra ON r.id = ra.relationship_id
        WHERE dc.connection_score >= 7
          AND LENGTH(dc.gratitude_note) > 20
          AND dc.checkin_date >= CURRENT_DATE - INTERVAL '{} days'
        ORDER BY dc.created_at DESC;
        """.format(self.days_back)
        
        # This would execute against the database
        # For template purposes, showing the structure
        
        results = []
        # results = execute_query(query)  # Placeholder
        
        return results
    
    def extract_activity_feedback(self) -> List[Dict[str, Any]]:
        """
        Extract successful activity patterns
        
        Returns:
            List of anonymized activity data
        """
        query = """
        SELECT 
            a.id,
            a.activity_name,
            a.activity_type,
            a.description,
            a.location,
            a.duration_minutes,
            a.cost_amount,
            a.satisfaction_rating_user1,
            a.satisfaction_rating_user2,
            a.notes,
            af.feedback_text,
            af.would_repeat,
            af.energy_level,
            r.relationship_type,
            u1.love_language_primary as user1_love_language,
            u2.love_language_primary as user2_love_language
        FROM activities a
        JOIN activity_feedback af ON a.id = af.activity_id
        JOIN relationships r ON a.relationship_id = r.id
        JOIN users u1 ON r.user_1_id = u1.id
        JOIN users u2 ON r.user_2_id = u2.id
        WHERE (a.satisfaction_rating_user1 + a.satisfaction_rating_user2) / 2 >= 8
          AND af.would_repeat = TRUE
          AND a.completed_date >= CURRENT_DATE - INTERVAL '{} days'
        ORDER BY a.completed_date DESC;
        """.format(self.days_back)
        
        results = []
        # results = execute_query(query)  # Placeholder
        
        return results
    
    def extract_quiz_insights(self) -> List[Dict[str, Any]]:
        """
        Extract quiz responses and insights
        
        Returns:
            List of anonymized quiz data
        """
        query = """
        SELECT 
            qr.id,
            q.title as quiz_title,
            q.quiz_type,
            ccr.primary_style,
            ccr.secondary_style,
            ccr.insights_text,
            ccr.action_steps,
            ip.connection_goals,
            ip.primary_challenge,
            ip.communication_quality,
            ip.growth_mindset,
            r.relationship_type,
            r.start_date
        FROM quiz_responses qr
        JOIN quizzes q ON qr.quiz_id = q.id
        LEFT JOIN connection_compass_results ccr ON qr.id = ccr.response_id
        LEFT JOIN intake_profiles ip ON qr.id = ip.response_id
        LEFT JOIN relationships r ON qr.relationship_id = r.id
        WHERE qr.is_completed = TRUE
          AND qr.completed_at >= CURRENT_DATE - INTERVAL '{} days'
        ORDER BY qr.completed_at DESC;
        """.format(self.days_back)
        
        results = []
        # results = execute_query(query)  # Placeholder
        
        return results
    
    def format_as_training_data(self, raw_data: Dict[str, Any], data_type: str) -> Optional[Dict[str, Any]]:
        """
        Format raw database data into training data structure
        
        Args:
            raw_data: Raw data from database
            data_type: Type of data (checkin, activity, quiz)
            
        Returns:
            Formatted training data point or None if quality too low
        """
        # Calculate quality score
        quality_score = self.calculate_quality_score(raw_data)
        
        if quality_score < self.min_quality_score:
            return None
        
        # Anonymize text fields
        anonymized_data = {}
        for key, value in raw_data.items():
            if isinstance(value, str):
                anonymized_data[key] = self.anonymize_text(value)
            else:
                anonymized_data[key] = value
        
        # Format based on data type
        if data_type == "checkin":
            return self._format_checkin(anonymized_data, quality_score)
        elif data_type == "activity":
            return self._format_activity(anonymized_data, quality_score)
        elif data_type == "quiz":
            return self._format_quiz(anonymized_data, quality_score)
        
        return None
    
    def _format_checkin(self, data: Dict[str, Any], quality_score: float) -> Dict[str, Any]:
        """Format check-in data for training"""
        
        # Create instruction based on the check-in content
        instruction = f"A user in a {data.get('relationship_type', 'relationship')} is reflecting on their day. "
        instruction += f"Their connection score is {data.get('connection_score', 'unknown')}/10. "
        instruction += "Provide supportive coaching based on their reflection."
        
        # Context
        context = f"Relationship type: {data.get('relationship_type', 'unknown')}; "
        context += f"Love language: {data.get('love_language_primary', 'unknown')}; "
        context += f"Connection score: {data.get('connection_score', 0)}/10; "
        context += f"Mood: {data.get('mood_score', 0)}/10"
        
        # Input (user's reflection)
        user_input = f"Gratitude: {data.get('gratitude_note', '')}\\n"
        user_input += f"Support needed: {data.get('support_needed', '')}\\n"
        user_input += f"Highlight: {data.get('highlight_of_day', '')}"
        
        # Output (ideal AI response - would need to generate or have from actual AI interactions)
        output = "This would be the ideal AI coaching response based on the check-in."
        
        return {
            "instruction": instruction,
            "input": context,
            "user_reflection": user_input,
            "output": output,
            "metadata": {
                "category": "daily_reflection",
                "quality_score": quality_score,
                "relationship_stage": self._determine_relationship_stage(data),
                "complexity": 2,
                "created_at": datetime.now().isoformat(),
                "source": "user_generated",
                "data_type": "checkin"
            }
        }
    
    def _format_activity(self, data: Dict[str, Any], quality_score: float) -> Dict[str, Any]:
        """Format activity data for training"""
        
        avg_satisfaction = (data.get('satisfaction_rating_user1', 0) + 
                          data.get('satisfaction_rating_user2', 0)) / 2
        
        instruction = f"Suggest a date activity similar to one that received {avg_satisfaction}/10 satisfaction."
        
        context = f"Activity type: {data.get('activity_type', 'unknown')}; "
        context += f"Budget: ${data.get('cost_amount', 0)}; "
        context += f"Duration: {data.get('duration_minutes', 0)} minutes; "
        context += f"Relationship type: {data.get('relationship_type', 'unknown')}"
        
        successful_activity = f"Activity: {data.get('activity_name', '')}\\n"
        successful_activity += f"Description: {data.get('description', '')}\\n"
        successful_activity += f"Feedback: {data.get('feedback_text', '')}"
        
        output = f"Based on the success of this activity, here's a similar suggestion..."
        
        return {
            "instruction": instruction,
            "input": context,
            "successful_example": successful_activity,
            "output": output,
            "metadata": {
                "category": "date_suggestion",
                "quality_score": quality_score,
                "budget_tier": self._determine_budget_tier(data.get('cost_amount', 0)),
                "complexity": 2,
                "created_at": datetime.now().isoformat(),
                "source": "user_generated",
                "data_type": "activity"
            }
        }
    
    def _format_quiz(self, data: Dict[str, Any], quality_score: float) -> Dict[str, Any]:
        """Format quiz data for training"""
        
        instruction = "Provide personalized relationship insights based on quiz results."
        
        context = f"Primary connection style: {data.get('primary_style', 'unknown')}; "
        context += f"Secondary style: {data.get('secondary_style', 'unknown')}; "
        context += f"Primary challenge: {data.get('primary_challenge', 'unknown')}; "
        context += f"Communication quality: {data.get('communication_quality', 'unknown')}"
        
        output = data.get('insights_text', '') + "\\n\\n" + data.get('action_steps', '')
        
        return {
            "instruction": instruction,
            "input": context,
            "output": output,
            "metadata": {
                "category": "personalization",
                "quality_score": quality_score,
                "relationship_stage": self._determine_relationship_stage(data),
                "complexity": 3,
                "created_at": datetime.now().isoformat(),
                "source": "user_generated",
                "data_type": "quiz"
            }
        }
    
    def _determine_relationship_stage(self, data: Dict[str, Any]) -> str:
        """Determine relationship stage from data"""
        start_date = data.get('start_date')
        if not start_date:
            return "unknown"
        
        # Calculate months together
        # This is simplified - would need proper date parsing
        return "established"  # Placeholder
    
    def _determine_budget_tier(self, cost: float) -> str:
        """Determine budget tier from cost"""
        if cost == 0:
            return "free"
        elif cost < 30:
            return "budget"
        elif cost < 100:
            return "moderate"
        else:
            return "premium"
    
    def save_to_jsonl(self, data_points: List[Dict[str, Any]], filename: str):
        """
        Save data points to JSONL file
        
        Args:
            data_points: List of training data points
            filename: Output filename
        """
        filepath = os.path.join(self.output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            for point in data_points:
                f.write(json.dumps(point, ensure_ascii=False) + '\\n')
        
        print(f"Saved {len(data_points)} data points to {filepath}")
    
    def run_extraction(self):
        """Run full extraction pipeline"""
        print(f"Starting data extraction (last {self.days_back} days, min quality {self.min_quality_score})...")
        
        # Extract check-ins
        print("Extracting daily check-ins...")
        checkins = self.extract_daily_checkins()
        formatted_checkins = [
            self.format_as_training_data(c, "checkin") 
            for c in checkins
        ]
        formatted_checkins = [c for c in formatted_checkins if c is not None]
        self.save_to_jsonl(formatted_checkins, f"checkins_{datetime.now().strftime('%Y%m%d')}.jsonl")
        
        # Extract activities
        print("Extracting activity feedback...")
        activities = self.extract_activity_feedback()
        formatted_activities = [
            self.format_as_training_data(a, "activity") 
            for a in activities
        ]
        formatted_activities = [a for a in formatted_activities if a is not None]
        self.save_to_jsonl(formatted_activities, f"activities_{datetime.now().strftime('%Y%m%d')}.jsonl")
        
        # Extract quizzes
        print("Extracting quiz insights...")
        quizzes = self.extract_quiz_insights()
        formatted_quizzes = [
            self.format_as_training_data(q, "quiz") 
            for q in quizzes
        ]
        formatted_quizzes = [q for q in formatted_quizzes if q is not None]
        self.save_to_jsonl(formatted_quizzes, f"quizzes_{datetime.now().strftime('%Y%m%d')}.jsonl")
        
        total = len(formatted_checkins) + len(formatted_activities) + len(formatted_quizzes)
        print(f"\\nExtraction complete! Total data points: {total}")
        print(f"  - Check-ins: {len(formatted_checkins)}")
        print(f"  - Activities: {len(formatted_activities)}")
        print(f"  - Quizzes: {len(formatted_quizzes)}")


def main():
    """Main execution"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Extract conversation data for LLM training')
    parser.add_argument('--days', type=int, default=30, help='Number of days to look back')
    parser.add_argument('--min-quality', type=float, default=7.0, help='Minimum quality score')
    
    args = parser.parse_args()
    
    extractor = ConversationExtractor(
        min_quality_score=args.min_quality,
        days_back=args.days
    )
    
    extractor.run_extraction()


if __name__ == "__main__":
    main()
