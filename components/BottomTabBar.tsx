import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useRandomConcept } from '@/hooks/useRandomConcept';
import { useToast } from '@/hooks/useToast';
import Toast from './Toast';

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { getRandomConcept } = useRandomConcept();
  const { toast, showToast, hideToast } = useToast();

  const tabs = [
    { name: 'Início', icon: 'home', route: '/' },
    { name: 'Quiz', icon: 'help-circle', route: '/quiz-select' },
    { name: '', icon: 'add', route: '/create', isCreate: true },
    { name: 'Aleatório', icon: 'shuffle', route: '/random' },
    { name: 'Perfil', icon: 'person', route: '/profile' },
  ];

  const handleRandomPress = () => {
    const randomConcept = getRandomConcept();
    if (randomConcept) {
      showToast(`Conceito aleatório: ${randomConcept.title}`, 'info');
      router.push(`/details/${randomConcept.id}`);
    } else {
      showToast('Nenhum conceito disponível', 'error');
    }
  };

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const active = isActive(tab.route);
        
        if (tab.isCreate) {
          return (
            <TouchableOpacity
              key={index}
              style={styles.createButton}
              onPress={() => {
                Vibration.vibrate(50);
                router.push('/create');
              }}
            >
              <View style={styles.createIcon}>
                <Ionicons name="add" size={24} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => {
              Vibration.vibrate(30);
              if (tab.route === '/random') {
                handleRandomPress();
              } else if (tab.route === '/quiz-select') {
                router.push('/quiz-select');
              } else {
                router.push(tab.route);
              }
            }}
          >
            <Ionicons
              name={active ? tab.icon as any : `${tab.icon}-outline` as any}
              size={24}
              color={active ? 'white' : '#666'}
            />
            <Text style={[styles.tabLabel, active && styles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      
      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingBottom: 34, // Safe area para iPhone
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    color: '#666',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  activeLabel: {
    color: 'white',
  },
  createButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  createIcon: {
    width: 40,
    height: 32,
    backgroundColor: Colors.tiktok.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
});