import { useState, useMemo } from 'react';

interface Concept {
  id: string;
  title: string;
  desc: string;
  shortCode: string;
  fullExplanation: string;
  fullCode: string;
}

export function useInfiniteScroll(originalConcepts: Concept[]) {
  const [loadedItems, setLoadedItems] = useState(20); // Começa com 20 itens

  const infiniteConcepts = useMemo(() => {
    if (originalConcepts.length === 0) return [];
    
    const repeatedConcepts: Concept[] = [];
    
    for (let i = 0; i < loadedItems; i++) {
      const conceptIndex = i % originalConcepts.length;
      const concept = originalConcepts[conceptIndex];
      
      // Cria ID único para cada repetição
      repeatedConcepts.push({
        ...concept,
        id: `${concept.id}-repeat-${i}`,
      });
    }
    
    return repeatedConcepts;
  }, [originalConcepts, loadedItems]);

  const handleEndReached = () => {
    // Carrega mais 10 itens quando chega no fim
    setLoadedItems(prev => prev + 10);
  };

  return {
    infiniteConcepts,
    handleEndReached,
  };
}