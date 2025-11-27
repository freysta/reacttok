import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CONCEPTS } from '@/data/concepts';
import CodeBlock from '@/components/CodeBlock';
import InteractiveDemo from '@/components/InteractiveDemos';
import { Colors } from '@/constants/theme';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const concept = CONCEPTS.find(c => c.id === id);

  if (!concept) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>Conceito não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{concept.title}</Text>
        
        <Text style={styles.sectionTitle}>Explicação</Text>
        <Text style={styles.text}>{concept.fullExplanation}</Text>

        <View style={styles.divider} />

        <InteractiveDemo id={concept.id} />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Código Completo</Text>
        <CodeBlock code={concept.fullCode} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  center: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: Colors.tiktok.accent,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 24,
  }
});