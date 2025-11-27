import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Concept, CONCEPTS as INITIAL_CONCEPTS, Level } from '@/data/concepts';

interface ConceptsContextType {
  concepts: Concept[];
  addConcept: (newConcept: Concept) => void;
}

const ConceptsContext = createContext<ConceptsContextType | undefined>(undefined);

const LEVEL_WEIGHT: Record<Level, number> = {
  basic: 0,
  intermediate: 1,
  advanced: 2,
};

export function ConceptsProvider({ children }: { children: ReactNode }) {
  // Sort initial concepts
  const [concepts, setConcepts] = useState<Concept[]>(() => {
    return [...INITIAL_CONCEPTS].sort((a, b) => LEVEL_WEIGHT[a.level] - LEVEL_WEIGHT[b.level]);
  });

  const addConcept = (newConcept: Concept) => {
    setConcepts(prev => {
      const updated = [newConcept, ...prev];
      // Keep sorted
      return updated.sort((a, b) => LEVEL_WEIGHT[a.level] - LEVEL_WEIGHT[b.level]);
    });
  };

  return (
    <ConceptsContext.Provider value={{ concepts, addConcept }}>
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