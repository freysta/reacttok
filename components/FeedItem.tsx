import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Vibration,
  useWindowDimensions,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from '@/constants/theme';
import { api } from '@/services/api';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useToast } from '@/hooks/useToast';
import { Concept } from '@/types';
import CodeBlock from './CodeBlock';
import Toast from './Toast';

interface FeedItemProps {
  item: Concept;
}

export default function FeedItem({ item }: FeedItemProps) {
  const { height } = useWindowDimensions();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast, showToast, hideToast } = useToast();
  const bookmarked = isBookmarked(item.id);
  

  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateLike = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLike = async () => {
    try {
      await api.toggleLike(item.id);
      if (liked) {
        setLikeCount(prev => prev - 1);
        showToast('Curtida removida', 'info');
      } else {
        setLikeCount(prev => prev + 1);
        showToast('Curtido! ❤️', 'success');
        animateLike();
      }
      setLiked(!liked);
      Vibration.vibrate(50);
    } catch (error) {
      showToast('Erro ao curtir', 'error');
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.codeContainer}>
          <CodeBlock code={item.shortCode} />
        </View>
      </View>

      <View style={styles.sidebar}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons 
                name={liked ? "heart" : "heart-outline"} 
                size={35} 
                color={liked ? Colors.tiktok.accent : "white"} 
              />
            </Animated.View>
          </View>
          <Text style={styles.actionLabel}>{likeCount > 0 ? likeCount : 'Curtir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            toggleBookmark(item.id);
            showToast(
              bookmarked ? 'Removido dos salvos' : 'Salvo! 📚', 
              bookmarked ? 'info' : 'success'
            );
          }}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={bookmarked ? "bookmark" : "bookmark-outline"} 
              size={35} 
              color={bookmarked ? "#ffd700" : "white"} 
            />
          </View>
          <Text style={styles.actionLabel}>Salvar</Text>
        </TouchableOpacity>

        <Link href={`/details/${item.id}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="ellipsis-horizontal-circle" size={35} color="white" />
            </View>
            <Text style={styles.actionLabel}>Detalhes</Text>
          </TouchableOpacity>
        </Link>
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
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  contentContainer: {
    paddingHorizontal: 20,
    width: '85%',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadow: '-1px 1px 10px rgba(0, 0, 0, 0.75)'
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  codeContainer: {
    maxHeight: 200,
    width: '100%',
  },
  sidebar: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  }
});