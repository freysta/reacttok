import Constants from 'expo-constants';
import { ApiConcept, Question } from '@/types';


const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(':')[0] || 'localhost';

const API_BASE_URL = `http://${localhost}:3000/api`;


const testConnection = async () => {
  const healthUrl = `http://${localhost}:3000/health`;
  try {
    const response = await fetch(healthUrl);
    const data = await response.json();
    console.log('✅ API conectada:', data);
    return true;
  } catch (error) {
    console.log('❌ API não conectada:', error instanceof Error ? error.message : 'Erro desconhecido');
    return false;
  }
};

export const api = {
  async getConcepts(): Promise<ApiConcept[]> {
    console.log('🔄 Tentando conectar com:', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/concepts`);
    console.log('📡 Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('📦 Dados recebidos:', data.count, 'conceitos');
    return data.data || [];
  },

  async getConcept(id: string): Promise<ApiConcept> {
    const response = await fetch(`${API_BASE_URL}/concepts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },

  async toggleLike(conceptId: string, userId: number = 1) {
    const response = await fetch(`${API_BASE_URL}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, concept_id: conceptId })
    });
    return response.json();
  },

  async getQuizQuestions(topic: string): Promise<Question[]> {
    const endpoint = topic === 'all' 
      ? '/quizzes/random' 
      : `/quizzes/category/${topic}`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    return data.data || [];
  }
};