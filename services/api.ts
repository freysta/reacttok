// Para Expo, use o IP da máquina ao invés de localhost
const API_BASE_URL = __DEV__ 
  ? 'http://10.48.217.137:3000/api'  // IP local da máquina
  : 'http://localhost:3000/api';

// Função para testar conexão
const testConnection = async () => {
  const healthUrl = __DEV__ ? 'http://10.48.217.137:3000/health' : 'http://localhost:3000/health';
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

export interface ApiConcept {
  id: string;
  title: string;
  description: string;
  short_code: string;
  full_explanation: string;
  full_code: string;
  category: string;
  difficulty_level: number;
}

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
  }
};