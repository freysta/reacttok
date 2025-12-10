import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { useReactions, ReactionType } from '@/hooks/useReactions';
import { useToast } from '@/hooks/useToast';
import Toast from './Toast';

interface ReactionsBarProps {
  conceptId: string;
}

const REACTION_EMOJIS = {
  mind_blown: '🤯',
  got_it: '💡',
  confused: '😵',
  love_it: '❤️',
};

const REACTION_LABELS = {
  mind_blown: 'Mente explodida',
  got_it: 'Entendi',
  confused: 'Confuso',
  love_it: 'Amei',
};

export default function ReactionsBar({ conceptId }: ReactionsBarProps) {
  const { addReaction, getConceptReactions } = useReactions();
  const { toast, showToast, hideToast } = useToast();
  const conceptReactions = getConceptReactions(conceptId);

  const handleReaction = (reactionType: ReactionType) => {
    addReaction(conceptId, reactionType);
    const messages = {
      mind_blown: 'Mente explodida! 🤯',
      got_it: 'Entendido! 💡',
      confused: 'Ficou confuso 😵',
      love_it: 'Amou! ❤️'
    };
    showToast(messages[reactionType], 'success');
    Vibration.vibrate(50);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você se sente sobre este conceito?</Text>
      <View style={styles.reactionsContainer}>
        {(Object.keys(REACTION_EMOJIS) as ReactionType[]).map((reactionType) => {
          const count = conceptReactions.reactions[reactionType];
          const isSelected = conceptReactions.userReaction === reactionType;
          
          return (
            <TouchableOpacity
              key={reactionType}
              style={[styles.reactionButton, isSelected && styles.selectedReaction]}
              onPress={() => handleReaction(reactionType)}
            >
              <Text style={styles.emoji}>{REACTION_EMOJIS[reactionType]}</Text>
              <Text style={styles.count}>{count > 0 ? count : ''}</Text>
              <Text style={styles.label}>{REACTION_LABELS[reactionType]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reactionButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    minWidth: 60,
  },
  selectedReaction: {
    backgroundColor: 'rgba(255, 45, 85, 0.2)',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  count: {
    color: '#ff2d55',
    fontSize: 12,
    fontWeight: 'bold',
    minHeight: 14,
  },
  label: {
    color: '#888',
    fontSize: 10,
    textAlign: 'center',
  },
});