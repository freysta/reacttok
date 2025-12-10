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
  const [loadedItems, setLoadedItems] = useState(20);

  const infiniteConcepts = useMemo(() => {
    if (originalConcepts.length === 0) return [];
    
    const repeatedConcepts: Concept[] = [];
    
    for (let i = 0; i < loadedItems; i++) {
      const conceptIndex = i % originalConcepts.length;
      const concept = originalConcepts[conceptIndex];
      

      repeatedConcepts.push({
        ...concept,
        id: `${concept.id}-repeat-${i}`,
      });
    }
    
    return repeatedConcepts;
  }, [originalConcepts, loadedItems]);

  const handleEndReached = () => {

    setLoadedItems(prev => prev + 10);
  };

  return {
    infiniteConcepts,
    handleEndReached,
  };
}