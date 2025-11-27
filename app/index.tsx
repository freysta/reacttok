import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { CONCEPTS } from '@/data/concepts';
import FeedItem from '@/components/FeedItem';
import Logo from '@/components/Logo';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerOverlay}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.tabContainer}>
          <Text style={styles.tabText}>Para Você</Text>
          <View style={styles.activeIndicator} />
        </View>
        
        <Link href="/saved" asChild>
          <TouchableOpacity style={styles.savedButton}>
            <Ionicons name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={CONCEPTS}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        style={styles.list}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 50, // Safe margin from top (Status Bar)
    left: 0,
    right: 0,
    height: 50, // Fixed height for the navbar area
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center', // Centers the "Para Você" text
    alignItems: 'center', // Vertically centers all items
  },
  logoContainer: {
    position: 'absolute',
    left: 20, // Standard spacing
    // Removed 'top' to let alignItems handle vertical centering
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17, // Slightly larger for legibility
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  activeIndicator: {
    width: 30,
    height: 3, // Slightly thicker
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 2,
  },
  savedButton: {
    position: 'absolute',
    right: 20, // Matches logo left spacing
    padding: 4,
    // Removed internal padding that might throw off alignment
  }
});