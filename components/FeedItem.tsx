import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Vibration,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from '@/constants/theme';
import CodeBlock from './CodeBlock';
import { Concept, Level } from '@/data/concepts';
import { useBookmarks } from '@/hooks/useBookmarks';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

interface FeedItemProps {
  item: Concept;
}

const LEVEL_COLORS: Record<Level, string> = {
  basic: '#2ca02c', // Green
  intermediate: '#ff9500', // Orange
  advanced: '#ff2d55', // Red
};

const LEVEL_LABELS: Record<Level, string> = {
  basic: 'Básico',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export default function FeedItem({ item }: FeedItemProps) {
  const [liked, setLiked] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);
  
  const levelColor = LEVEL_COLORS[item.level] || LEVEL_COLORS.basic;

  const handleLike = () => {
    setLiked(!liked);
    Vibration.vibrate(50);
  };

  const handleBookmark = () => {
    toggleBookmark(item.id);
    Vibration.vibrate(20);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Aprenda sobre ${item.title} no ReactTok! \n\n${item.shortCode}`,
      });
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        
        <View style={styles.tagsRow}>
          <View style={[styles.badge, { backgroundColor: levelColor }]}>
            <Text style={styles.badgeText}>{LEVEL_LABELS[item.level] || 'Básico'}</Text>
          </View>
          {item.tags?.map((tag, index) => (
             <View key={index} style={styles.tagBadge}>
               <Text style={styles.tagText}>#{tag}</Text>
             </View>
          ))}
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.desc}</Text>
        
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
            <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={35} 
              color={liked ? Colors.tiktok.accent : "white"} 
            />
          </View>
          <Text style={styles.actionLabel}>{liked ? '1' : 'Curtir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleBookmark}
          activeOpacity={0.8}
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

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onShare}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="share-social" size={35} color="white" />
          </View>
          <Text style={styles.actionLabel}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: WINDOW_HEIGHT, 
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 90, // Deixa espaço seguro para a sidebar (ícones)
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tagText: {
    color: '#ccc',
    fontSize: 12,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'left', // Mantém alinhado à esquerda para leitura natural
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'left',
  },
  codeContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1e1e1e', // Garante fundo no container
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