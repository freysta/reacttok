import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, ActivityIndicator } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import BottomTabBar from '@/components/BottomTabBar';
import { api } from '@/services/api';
import { Question } from '@/types';

export default function QuizScreen() {
  const router = useRouter();
  const { topic = 'all' } = useLocalSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const topicName = {
    'all': 'Geral',
    'react-hooks': 'React Hooks',
    'react-native': 'React Native',
    'react-core': 'React Core'
  }[topic as string] || 'Quiz';

  useEffect(() => {
    loadQuestions();
  }, [topic]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await api.getQuizQuestions(topic as string);
      setQuestions(data);
    } catch (error) {
      console.error(error);
      // Fallback or error handling could go here
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    setSelectedOptionIndex(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correct_option_index;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      Vibration.vibrate([50, 100, 50]);
    } else {
      Vibration.vibrate(200);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
      } else {
        setShowResult(true);
      }
    }, 2000); // Give user time to read explanation
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOptionIndex(null);
    loadQuestions(); // Fetch new random questions
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.tiktok.accent} />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Não foi possível carregar as perguntas.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz {topicName} Finalizado! 🎉</Text>
          <Text style={styles.scoreText}>{score}/{questions.length}</Text>
          <Text style={styles.percentageText}>{percentage}%</Text>
          
          <Text style={styles.resultMessage}>
            {percentage >= 80 ? "Excelente! 🔥" : 
             percentage >= 60 ? "Bom trabalho! 👍" : "Continue estudando! 📚"}
          </Text>

          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/quiz-select')}>
            <Text style={[styles.buttonText, styles.secondaryText]}>Escolher Outro Tópico</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.tertiaryButton]} onPress={() => router.push('/')}>
            <Text style={[styles.buttonText, styles.secondaryText]}>Voltar ao Feed</Text>
          </TouchableOpacity>
        </View>
        
        <BottomTabBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.progress}>{currentQuestionIndex + 1}/{questions.length}</Text>
        <Text style={styles.score}>🏆 {score}</Text>
      </View>

      <View style={styles.questionContainer}>
        {currentQuestion.concept_id && (
           <Text style={styles.conceptTag}>{currentQuestion.concept_id.toUpperCase()}</Text>
        )}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.answersContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            const isCorrect = index === currentQuestion.correct_option_index;
            // Reveal correct answer if an option is selected
            const showCorrect = selectedOptionIndex !== null && isCorrect;
            const showIncorrect = isSelected && !isCorrect;

            let buttonStyle = styles.answerButton;
            if (showCorrect) buttonStyle = {...styles.answerButton, ...styles.correctButton};
            if (showIncorrect) buttonStyle = {...styles.answerButton, ...styles.incorrectButton};

            return (
              <TouchableOpacity 
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(index)}
                disabled={selectedOptionIndex !== null}
              >
                <Text style={styles.answerText}>{option}</Text>
                {showCorrect && <Ionicons name="checkmark-circle" size={24} color="white" />}
                {showIncorrect && <Ionicons name="close-circle" size={24} color="white" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOptionIndex !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.explanationTitle}>Explicação:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </View>
      
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    marginTop: 10,
  },
  errorText: {
    color: '#f44336',
    fontSize: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progress: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    color: Colors.tiktok.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  conceptTag: {
    color: Colors.tiktok.accent,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.8,
  },
  questionText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 30,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  correctButton: {
    backgroundColor: '#2d5a2d',
    borderColor: '#4caf50',
  },
  incorrectButton: {
    backgroundColor: '#5a2d2d',
    borderColor: '#f44336',
  },
  answerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
  },
  explanationTitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  explanationText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    color: Colors.tiktok.accent,
    fontSize: 48,
    fontWeight: 'bold',
  },
  percentageText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  resultMessage: {
    color: '#888',
    fontSize: 18,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.tiktok.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    color: '#888',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
  },
});
