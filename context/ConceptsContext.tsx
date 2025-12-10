import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { Concept, ApiConcept, Level } from '@/types';

interface ConceptsContextType {
  concepts: Concept[];
  addConcept: (newConcept: Concept) => void;
  loading: boolean;
  refreshConcepts: () => Promise<void>;
}

const ConceptsContext = createContext<ConceptsContextType | undefined>(undefined);

const LEVEL_WEIGHT: Record<Level, number> = {
  basic: 0,
  intermediate: 1,
  advanced: 2,
};

const adaptApiConcept = (apiConcept: ApiConcept): Concept => ({
  id: apiConcept.id,
  title: apiConcept.title,
  description: apiConcept.description,
  shortCode: apiConcept.short_code,
  fullExplanation: apiConcept.full_explanation,
  fullCode: apiConcept.full_code,
  level: (apiConcept.difficulty_level === 1 ? 'basic' : apiConcept.difficulty_level === 2 ? 'intermediate' : 'advanced'),
  tags: [apiConcept.category],
  category: apiConcept.category,
  difficulty_level: apiConcept.difficulty_level
});

export function ConceptsProvider({ children }: { children: ReactNode }) {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConcepts();
  }, []);

  const loadConcepts = async () => {
    try {
      setLoading(true);
      const data = await api.getConcepts();
      const adaptedConcepts = data.map(adaptApiConcept);
      
      setConcepts(adaptedConcepts.sort((a, b) => 
        LEVEL_WEIGHT[a.level || 'basic'] - LEVEL_WEIGHT[b.level || 'basic']
      ));
    } catch (error) {
      console.error('Failed to load concepts:', error);
      setConcepts([]);
    } finally {
      setLoading(false);
    }
  };

  const addConcept = (newConcept: Concept) => {
    setConcepts(prev => {
      const updated = [newConcept, ...prev];
      return updated.sort((a: Concept, b: Concept) => 
        LEVEL_WEIGHT[a.level || 'basic'] - LEVEL_WEIGHT[b.level || 'basic']
      );
    });
  };

  return (
    <ConceptsContext.Provider value={{ concepts, addConcept, loading, refreshConcepts: loadConcepts }}>
      {children}
    </ConceptsContext.Provider>
  );
}

export function useConcepts() {
  const context = useContext(ConceptsContext);
  if (context === undefined) {
    throw new Error('useConcepts must be used within a ConceptsProvider');
  }
  return context;
}
