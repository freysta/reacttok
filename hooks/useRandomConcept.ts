import { useState } from 'react';
import { useConcepts } from '@/context/ConceptsContext';
import { Vibration } from 'react-native';

export function useRandomConcept() {
  const { concepts } = useConcepts();
  const [lastRandomId, setLastRandomId] = useState<string | null>(null);

  const getRandomConcept = () => {
    if (concepts.length === 0) return null;
    
    // Evita repetir o mesmo conceito
    const availableConcepts = concepts.filter(c => c.id !== lastRandomId);
    const conceptsToUse = availableConcepts.length > 0 ? availableConcepts : concepts;
    
    const randomIndex = Math.floor(Math.random() * conceptsToUse.length);
    const randomConcept = conceptsToUse[randomIndex];
    
    setLastRandomId(randomConcept.id);
    Vibration.vibrate([100, 50, 100]);
    
    return randomConcept;
  };

  const getTodaysConcept = () => {
    if (concepts.length === 0) return null;
    
    // Usa a data como seed para sempre retornar o mesmo conceito no dia
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % concepts.length;
    
    return concepts[index];
  };

  return { getRandomConcept, getTodaysConcept };
}