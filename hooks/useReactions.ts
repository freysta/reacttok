import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACTIONS_KEY = '@reacttok_reactions';

export type ReactionType = 'mind_blown' | 'got_it' | 'confused' | 'love_it';

export interface Reactions {
  mind_blown: number;
  got_it: number;
  confused: number;
  love_it: number;
}

interface ConceptReactions {
  [conceptId: string]: {
    reactions: Reactions;
    userReaction?: ReactionType;
  };
}

export function useReactions() {
  const [reactions, setReactions] = useState<ConceptReactions>({});

  useEffect(() => {
    loadReactions();
  }, []);

  const loadReactions = async () => {
    try {
      const stored = await AsyncStorage.getItem(REACTIONS_KEY);
      if (stored) {
        setReactions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load reactions', e);
    }
  };

  const addReaction = async (conceptId: string, reactionType: ReactionType) => {
    try {
      setReactions(prev => {
        const conceptReactions = prev[conceptId] || {
          reactions: { mind_blown: 0, got_it: 0, confused: 0, love_it: 0 },
        };

        // Remove previous user reaction
        if (conceptReactions.userReaction) {
          conceptReactions.reactions[conceptReactions.userReaction]--;
        }

        // Add new reaction
        conceptReactions.reactions[reactionType]++;
        conceptReactions.userReaction = reactionType;

        const updated = {
          ...prev,
          [conceptId]: conceptReactions,
        };

        AsyncStorage.setItem(REACTIONS_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to add reaction', e);
    }
  };

  const getConceptReactions = (conceptId: string) => {
    return reactions[conceptId] || {
      reactions: { mind_blown: 0, got_it: 0, confused: 0, love_it: 0 },
    };
  };

  return { addReaction, getConceptReactions };
}