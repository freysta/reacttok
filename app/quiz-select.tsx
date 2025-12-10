import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Vibration } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useConcepts } from '@/context/ConceptsContext';
import { Colors } from '@/constants/theme';
import BottomTabBar from '@/components/BottomTabBar';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';

export default function QuizSelectScreen() {
  const router = useRouter();
  const { concepts } = useConcepts();
  const { toast, showToast, hideToast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const quizTopics = [
    { id: 'all', title: 'Quiz Geral', desc: 'Perguntas sobre todos os conceitos', icon: 'help-circle' },
    { id: 'react-hooks', title: 'React Hooks', desc: 'useState, useEffect, useContext...', icon: 'refresh' },
    { id: 'react-native', title: 'React Native', desc: 'Componentes, StyleSheet, FlatList...', icon: 'phone-portrait' },
    { id: 'react-core', title: 'React Core', desc: 'JSX, Props, Componentes...', icon: 'code-slash' },
  ];

  const handleQuizStart = (topicId: string) => {
    setSelectedTopic(topicId);
    Vibration.vibrate(50);
    
    const topicNames = {
      'all': 'Quiz Geral',
      'react-hooks': 'React Hooks',
      'react-native': 'React Native', 
      'react-core': 'React Core'
    };
    
    showToast(`Iniciando ${topicNames[topicId as keyof typeof topicNames]}! 🎯`, 'info');
    
    setTimeout(() => {
      router.push(`/quiz?topic=${topicId}`);
    }, 1000);
  };

  const renderTopic = ({ item }: { item: any }) => {
    const isSelected = selectedTopic === item.id;
    const conceptCount = item.id === 'all' 
      ? concepts.length 
      : concepts.filter(c => c.category === item.id).length;
    
    return (
      <TouchableOpacity 
        style={[styles.topicCard, isSelected && styles.selectedCard]}
        onPress={() => handleQuizStart(item.id)}
        disabled={selectedTopic !== null}
      >
        <View style={[styles.topicIcon, isSelected && styles.selectedIcon]}>
          <Ionicons 
            name={isSelected ? 'checkmark-circle' : item.icon} 
            size={32} 
            color={isSelected ? '#4caf50' : Colors.tiktok.accent} 
          />
        </View>
        <View style={styles.topicContent}>
          <Text style={[styles.topicTitle, isSelected && styles.selectedText]}>
            {item.title}
          </Text>
          <Text style={styles.topicDesc}>{item.desc}</Text>
          <Text style={styles.topicCount}>
            {conceptCount} conceitos • {getQuestionCount(item.id)} perguntas
          </Text>
          {isSelected && (
            <Text style={styles.loadingText}>Preparando quiz...</Text>
          )}
        </View>
        <Ionicons 
          name={isSelected ? 'hourglass' : 'chevron-forward'} 
          size={24} 
          color={isSelected ? Colors.tiktok.accent : '#666'} 
        />
      </TouchableOpacity>
    );
  };
  
  const getQuestionCount = (topicId: string) => {
    const counts = {
      'all': 10,
      'react-hooks': 10, 
      'react-native': 10,
      'react-core': 8
    };
    return counts[topicId as keyof typeof counts] || 5;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escolher Quiz</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Sobre qual tópico você quer ser testado?</Text>
        
        <FlatList
          data={quizTopics}
          renderItem={renderTopic}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 20,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  topicIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 45, 85, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  topicDesc: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  topicCount: {
    color: Colors.tiktok.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  selectedCard: {
    borderColor: Colors.tiktok.accent,
    backgroundColor: 'rgba(255, 45, 85, 0.1)',
  },
  selectedIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  selectedText: {
    color: Colors.tiktok.accent,
  },
  loadingText: {
    color: '#888',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
});