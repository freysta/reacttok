import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/react-logo.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        React<Text style={styles.accent}>Tok</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  accent: {
    color: Colors.tiktok.accent,
  }
});
