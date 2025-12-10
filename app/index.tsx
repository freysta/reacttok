import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View, 
  StatusBar,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FeedItem from '@/components/FeedItem';
import Logo from '@/components/Logo';
import BottomTabBar from '@/components/BottomTabBar';
import Toast from '@/components/Toast';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useConcepts } from '@/context/ConceptsContext';
import { useRandomConcept } from '@/hooks/useRandomConcept';
import { useToast } from '@/hooks/useToast';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function FeedScreen() {
  const { height } = Dimensions.get('window');
  const { concepts, loading, refreshConcepts } = useConcepts();
  const { infiniteConcepts, handleEndReached } = useInfiniteScroll(concepts);
  const { getRandomConcept, getTodaysConcept } = useRandomConcept();
  const { toast, showToast, hideToast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshConcepts();
    } catch (error) {
      showToast('Erro ao atualizar', 'error');
    } finally {
      setRefreshing(false);
    }
  }, [refreshConcepts]);

  const renderFooter = () => {
    if (concepts.length === 0) return null;
    return <LoadingIndicator />;
  };

  const handleRandomConcept = () => {
    const randomConcept = getRandomConcept();
    if (randomConcept) {
      router.push(`/details/${randomConcept.id}`);
    }
  };

  const handleTodaysConcept = () => {
    const todaysConcept = getTodaysConcept();
    if (todaysConcept) {
      showToast(`📅 Conceito do dia: ${todaysConcept.title}`, 'info');
      setTimeout(() => router.push(`/details/${todaysConcept.id}`), 1000);
    } else {
      showToast('Nenhum conceito disponível hoje', 'error');
    }
  };

  if (loading && !refreshing && infiniteConcepts.length === 0) {
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
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleTodaysConcept}>
          <Logo />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.loginButton}>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={infiniteConcepts}
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
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff" // iOS
            colors={['#fff']} // Android
            progressBackgroundColor="#000" // Android
          />
        }
      />
      
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
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loginButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  }
});