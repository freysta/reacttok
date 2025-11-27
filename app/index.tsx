import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { CONCEPTS } from '@/data/concepts';
import FeedItem from '@/components/FeedItem';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
  }
});