import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/services/api';
import { useBookmarks } from '@/hooks/useBookmarks';
import ReactionsBar from '@/components/ReactionsBar';
import BottomTabBar from '@/components/BottomTabBar';

interface Concept {
  id: string;
  title: string;
  desc: string;
  shortCode: string;
  fullExplanation: string;
  fullCode: string;
}

const adaptApiConcept = (apiConcept: any): Concept => ({
  id: apiConcept.id,
  title: apiConcept.title,
  desc: apiConcept.description,
  shortCode: apiConcept.short_code,
  fullExplanation: apiConcept.full_explanation,
  fullCode: apiConcept.full_code
});
import CodeBlock from '@/components/CodeBlock';
import InteractiveDemo from '@/components/InteractiveDemos';
import { Colors } from '@/constants/theme';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = concept ? isBookmarked(concept.id) : false;

  useEffect(() => {
    if (id) loadConcept(id as string);
  }, [id]);

  const loadConcept = async (conceptId: string) => {
    try {
      setLoading(true);
      const apiConcept = await api.getConcept(conceptId);
      setConcept(adaptApiConcept(apiConcept));
    } catch (error) {
      console.log('Usando dados locais:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: 'white', marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

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
        <TouchableOpacity onPress={() => concept && toggleBookmark(concept.id)} style={styles.backButton}>
          <Ionicons 
            name={bookmarked ? "bookmark" : "bookmark-outline"} 
            size={28} 
            color={bookmarked ? "#ffd700" : "white"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{concept.title}</Text>
        
        <Text style={styles.sectionTitle}>Explicação</Text>
        <Text style={styles.text}>{concept.fullExplanation}</Text>

        <View style={styles.divider} />

        <InteractiveDemo id={concept.id} />

        <View style={styles.divider} />

        <ReactionsBar conceptId={concept.id} />

        <Text style={styles.sectionTitle}>Código Completo</Text>
        <CodeBlock code={concept.fullCode} />
      </ScrollView>
      
      <BottomTabBar />
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