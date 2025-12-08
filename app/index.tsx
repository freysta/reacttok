import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  StatusBar,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';
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
import FeedItem from '@/components/FeedItem';

export default function FeedScreen() {
  const { height } = Dimensions.get('window');
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'local'>('local');

  useEffect(() => {
    loadConcepts();
  }, []);

  const loadConcepts = async () => {
    console.log('🔄 Iniciando carregamento...');
    try {
      setLoading(true);
      console.log('📡 Fazendo requisição para API...');
      const apiUrl = typeof window !== 'undefined' 
        ? 'http://localhost:3000/api/concepts'
        : 'http://10.48.217.137:3000/api/concepts';
      console.log('🌐 URL da API:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('📊 Status da resposta:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Dados brutos recebidos:', data);
      
      const adaptedConcepts = data.data.map(adaptApiConcept);
      console.log('🔄 Dados adaptados:', adaptedConcepts.length, 'conceitos');
      console.log('📝 Lista de IDs:', adaptedConcepts.map((c: Concept) => c.id));
      
      setConcepts(adaptedConcepts);
      setDataSource('api');
      console.log('✅ Estado atualizado com dados da API');
      console.log('📊 Estado final concepts.length:', adaptedConcepts.length);
    } catch (error) {
      console.log('❌ Erro na API:', error);
      setConcepts([]);
      setDataSource('local');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Indicador de fonte dos dados */}
      <View style={styles.dataSourceIndicator}>
        <Text style={[styles.dataSourceText, { color: dataSource === 'api' ? '#00ff00' : '#ffaa00' }]}>
          {dataSource === 'api' ? `✅ API: ${concepts.length} itens` : `⚠️ Local: ${concepts.length} itens`}
        </Text>
      </View>
      
      <FlatList
        data={concepts}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={false}
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  dataSourceIndicator: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  dataSourceText: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});