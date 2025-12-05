import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Colors } from '@/constants/theme';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  return (
    <View style={styles.container}>
      <SyntaxHighlighter 
        language={language} 
        style={tomorrow}
        highlighter={"prism"}
        fontSize={14}
        customStyle={styles.highlighter}
      >
        {code}
      </SyntaxHighlighter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.tiktok.darkGray,
    borderWidth: 1,
    borderColor: '#333',
  },
  highlighter: {
    padding: 16,
    backgroundColor: 'transparent', // Let container handle bg
  }
});