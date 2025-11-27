import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Vibration, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

interface InteractiveDemosProps {
  id: string;
}

export default function InteractiveDemo({ id }: InteractiveDemosProps) {
  switch (id) {
    case 'jsx': return <JsxDemo />;
    case 'state': return <StateDemo />;
    case 'effect': return <EffectDemo />;
    case 'style': return <StyleDemo />;
    case 'vibration': return <VibrationDemo />;
    default: return null;
  }
}

function DemoContainer({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Demonstração Interativa:</Text>
      <View style={styles.demoBox}>
        {children}
      </View>
    </View>
  );
}

// --- Demos ---

function JsxDemo() {
  return (
    <DemoContainer>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>Olá, sou um componente!</Text>
        <Text style={{ color: '#aaa' }}>Renderizado via JSX</Text>
      </View>
    </DemoContainer>
  );
}

function StateDemo() {
  const [count, setCount] = useState(0);
  return (
    <DemoContainer>
      <Text style={styles.demoText}>Valor: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.buttonText}>Aumentar +</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 8, backgroundColor: '#333' }]} onPress={() => setCount(0)}>
        <Text style={styles.buttonText}>Resetar</Text>
      </TouchableOpacity>
    </DemoContainer>
  );
}

function EffectDemo() {
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  return (
    <DemoContainer>
      <Text style={styles.demoText}>Timer: {timer}s</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: active ? '#ff2d55' : '#2ca02c' }]} 
        onPress={() => setActive(!active)}
      >
        <Text style={styles.buttonText}>{active ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>
    </DemoContainer>
  );
}

function StyleDemo() {
  const width = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(width.value),
    };
  });

  return (
    <DemoContainer>
      <Animated.View style={[styles.styleBox, animatedStyle]} />
      <View style={{ flexDirection: 'row', marginTop: 16, gap: 10 }}>
        <Button title="Estreito" onPress={() => width.value = 50} />
        <Button title="Largo" onPress={() => width.value = 200} />
      </View>
    </DemoContainer>
  );
}

function VibrationDemo() {
  return (
    <DemoContainer>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ff9500' }]} onPress={() => Vibration.vibrate(500)}>
        <Text style={styles.buttonText}>📳 VIBRAR AGORA</Text>
      </TouchableOpacity>
    </DemoContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
  },
  label: {
    color: Colors.tiktok.accent,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  demoBox: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 150,
  },
  demoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.tiktok.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  styleBox: {
    height: 80,
    backgroundColor: '#007AFF',
    borderRadius: 10,
  }
});