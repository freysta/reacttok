import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Vibration 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from '@/constants/theme';
import CodeBlock from './CodeBlock';
import { Concept } from '@/data/concepts';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

interface FeedItemProps {
  item: Concept;
}

export default function FeedItem({ item }: FeedItemProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    Vibration.vibrate(50);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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

        <Link href={`/details/${item.id}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="ellipsis-horizontal-circle" size={35} color="white" />
            </View>
            <Text style={styles.actionLabel}>Detalhes</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: WINDOW_HEIGHT, // Ensure it takes full window height including safe areas if needed, or adjust in parent
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingBottom: 80, // Space for bottom navigation if it existed, or just visual balance
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
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