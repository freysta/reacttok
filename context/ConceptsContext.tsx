import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Concept, CONCEPTS as INITIAL_CONCEPTS } from '@/data/concepts';

interface ConceptsContextType {
  concepts: Concept[];
  addConcept: (newConcept: Concept) => void;
}

const ConceptsContext = createContext<ConceptsContextType | undefined>(undefined);

export function ConceptsProvider({ children }: { children: ReactNode }) {
  const [concepts, setConcepts] = useState<Concept[]>(INITIAL_CONCEPTS);

  const addConcept = (newConcept: Concept) => {
    // Adiciona o novo conceito no início da lista
    setConcepts(prev => [newConcept, ...prev]);
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