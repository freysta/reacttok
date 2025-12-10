import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.tiktok.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});