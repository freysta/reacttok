import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { CONCEPTS } from '@/data/concepts';
import FeedItem from '@/components/FeedItem';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerOverlay}>
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
// ... imports

// ... component code

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
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  activeIndicator: {
    width: 30,
    height: 2,
    backgroundColor: 'white',
    marginTop: 4,
  },
  savedButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
  }
});