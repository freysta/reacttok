import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useConcepts, Level } from '@/context/ConceptsContext';
import { useToast } from '@/hooks/useToast';
import { useMyContent } from '@/hooks/useMyContent';
import BottomTabBar from '@/components/BottomTabBar';
import Toast from '@/components/Toast';

export default function CreateScreen() {
  const router = useRouter();
  const { addConcept } = useConcepts();
  const { addMyContent } = useMyContent();
  const { toast, showToast, hideToast } = useToast();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState<Level>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = async () => {
    if (!title || !desc || !code) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setIsLoading(true);

    try {
      // Salva localmente primeiro
      const myContent = await addMyContent({
        title,
        desc,
        shortCode: code,
        fullExplanation: desc,
        fullCode: code,
        level
      });

      if (myContent) {
        // Adiciona ao feed global
        addConcept({
          id: myContent.id,
          title,
          desc,
          shortCode: code,
          fullExplanation: desc,
          fullCode: code,
          level,
          tags: ['meu-conteudo']
        });

        showToast('Conceito criado! 🎉', 'success');
        setShowSuccess(true);
        setTimeout(() => router.back(), 1500);
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      showToast('Não foi possível criar', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isPublishDisabled = isLoading || !title || !desc || !code;

  if (showSuccess) {
    return (
      <View style={styles.successOverlay}>
        <Ionicons name="checkmark-circle" size={80} color="#4cd964" />
        <Text style={styles.successText}>Publicado com Sucesso!</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => !isLoading && router.back()}>
          <Text style={[styles.cancelText, isLoading && styles.disabledText]}>Cancelar</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Criar Slide</Text>
        
        <TouchableOpacity onPress={handlePublish} disabled={isPublishDisabled}>
          {isLoading ? (
            <ActivityIndicator color={Colors.tiktok.accent} size="small" />
          ) : (
            <Text style={[styles.publishText, isPublishDisabled && styles.disabledText]}>Publicar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título do Conceito</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: useContext"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
            maxLength={30}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição Curta</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Explique em poucas palavras..."
            placeholderTextColor="#666"
            value={desc}
            onChangeText={setDesc}
            multiline
            maxLength={100}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nível de Dificuldade</Text>
          <View style={styles.levelSelector}>
            {(['basic', 'intermediate', 'advanced'] as Level[]).map((l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.levelOption, 
                  level === l && styles.levelOptionSelected,
                  level === l && { borderColor: l === 'basic' ? '#2ca02c' : l === 'intermediate' ? '#ff9500' : '#ff2d55' }
                ]}
                onPress={() => setLevel(l)}
              >
                <Text style={[styles.levelText, level === l && { color: 'white' }]}>
                  {l === 'basic' ? 'Básico' : l === 'intermediate' ? 'Médio' : 'Avançado'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código Exemplo</Text>
          <View style={styles.codeEditor}>
            <TextInput
              style={styles.codeInput}
              placeholder="// Cole seu código aqui..."
              placeholderTextColor="#666"
              value={code}
              onChangeText={setCode}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={20} color="#ffd700" />
          <Text style={styles.tipText}>
            Dica: Use códigos curtos para caber na tela do feed!
          </Text>
        </View>
      </ScrollView>
      
      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      
      <BottomTabBar />
    </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
  publishText: {
    color: Colors.tiktok.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.5,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  codeEditor: {
    backgroundColor: '#0d1117',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    height: 200,
  },
  codeInput: {
    color: '#e6edf3',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    flex: 1,
    textAlignVertical: 'top',
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  tipText: {
    color: '#ffd700',
    fontSize: 14,
    flex: 1,
  },
  levelSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  levelOption: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  levelOptionSelected: {
    backgroundColor: '#333',
    borderWidth: 2,
  },
  levelText: {
    color: '#888',
    fontWeight: '600',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  }
});
