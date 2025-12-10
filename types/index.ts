export type Level = 'basic' | 'intermediate' | 'advanced';

export interface Concept {
  id: string;
  title: string;
  description: string; // Unified: api uses description, UI sometimes used desc
  short_code: string; // Unified to match API snake_case or camelCase? Let's map API to camelCase in service for cleaner frontend code?
  // Actually, keeping snake_case from DB/API might be easier, but camelCase is standard JS.
  // Let's stick to a clean interface.
  shortCode: string;
  fullExplanation: string;
  fullCode: string;
  level?: Level;
  tags?: string[];
  category?: string;
  difficulty_level?: number;
}

export interface ApiConcept {
  id: string;
  title: string;
  description: string;
  short_code: string;
  full_explanation: string;
  full_code: string;
  category: string;
  difficulty_level: number;
}

export interface Question {
  id: number;
  concept_id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
}
