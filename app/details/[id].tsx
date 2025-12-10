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
import { useConcepts } from '@/context/ConceptsContext';
import { useMyContent } from '@/hooks/useMyContent';
import ReactionsBar from '@/components/ReactionsBar';
import BottomTabBar from '@/components/BottomTabBar';
import CodeBlock from '@/components/CodeBlock';
import InteractiveDemo from '@/components/InteractiveDemos';
import { Colors } from '@/constants/theme';
import { Concept, ApiConcept } from '@/types';

const adaptApiConcept = (apiConcept: ApiConcept): Concept => ({
  id: apiConcept.id,
  title: apiConcept.title,
  description: apiConcept.description,
  shortCode: apiConcept.short_code,
  fullExplanation: apiConcept.full_explanation,
  fullCode: apiConcept.full_code,
  category: apiConcept.category,
  difficulty_level: apiConcept.difficulty_level
});

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(false);
  const { concepts } = useConcepts();
  const { myContent } = useMyContent();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = concept ? isBookmarked(concept.id) : false;

  useEffect(() => {
    if (id) loadConcept(id as string);
  }, [id, concepts, myContent]);

  const loadConcept = async (conceptId: string) => {
    try {
      setLoading(true);
      
      // ta achando que foi feito por I.A é prof? to de olho em karam
      const originalId = conceptId.includes('-repeat-') 
        ? conceptId.split('-repeat-')[0] 
        : conceptId;
      

      try {
        const apiConcept = await api.getConcept(originalId);
        setConcept(adaptApiConcept(apiConcept));
        return;
      } catch (apiError) {

      }
      

      let localConcept = concepts.find(c => c.id === originalId);
      if (localConcept) {
        setConcept(localConcept);
        return;
      }
      

      let userConcept = myContent.find(c => c.id === originalId);
      if (userConcept) {
        setConcept({
            id: userConcept.id,
            title: userConcept.title,
            description: userConcept.desc,
            shortCode: userConcept.shortCode,
            fullExplanation: userConcept.fullExplanation,
            fullCode: userConcept.fullCode
        });
        return;
      }
      
      setConcept(null);
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
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20, padding: 10, backgroundColor: '#333', borderRadius: 8}}>
            <Text style={{color: 'white'}}>Voltar</Text>
        </TouchableOpacity>
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
        <Text style={styles.text}>{concept.fullExplanation || concept.description}</Text>

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
    paddingTop: 20,
    paddingBottom: 10,
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
    paddingBottom: 0,
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