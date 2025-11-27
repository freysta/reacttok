export interface Concept {
  id: string;
  title: string;
  desc: string;
  shortCode: string;
  fullExplanation: string;
  fullCode: string;
}

export const CONCEPTS: Concept[] = [
  {
    id: 'jsx',
    title: 'Componentes + JSX',
    desc: 'A base de tudo: Funções que retornam UI.',
    shortCode: `function Hello() {
  return <Text>Olá!</Text>
}`,
    fullExplanation: 'Em React Native, componentes são funções JavaScript que retornam JSX (uma sintaxe parecida com HTML). Eles são os blocos de construção da sua interface.',
    fullCode: `import React from 'react';
import { Text, View } from 'react-native';

export default function Welcome() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: 'white' }}>
        Bem-vindo ao React Native!
      </Text>
    </View>
  );
}`
  },
  {
    id: 'state',
    title: 'useState',
    desc: 'Memória do componente. Quando muda, a tela atualiza.',
    shortCode: `const [count, setCount] = useState(0);`,
    fullExplanation: 'O Hook useState permite adicionar estado ao componente. Quando você chama a função "set", o React re-renderiza o componente com o novo valor.',
    fullCode: `import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Contagem: {count}</Text>
      <Button 
        title="Aumentar" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}`
  },
  {
    id: 'effect',
    title: 'useEffect',
    desc: 'Efeitos colaterais: timers, APIs, mudanças.',
    shortCode: `useEffect(() => {
  console.log('Montou!');
}, []);`,
    fullExplanation: 'O Hook useEffect executa código em momentos específicos: quando o componente nasce (mount), quando algo muda (update) ou quando morre (unmount).',
    fullCode: `import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Limpeza ao desmontar
    return () => clearInterval(interval);
  }, []);

  return <Text>Segundos: {seconds}</Text>;
}`
  },
  {
    id: 'style',
    title: 'StyleSheet',
    desc: 'Estilização otimizada parecida com CSS.',
    shortCode: `const styles = StyleSheet.create({
  box: { color: 'red' }
});`,
    fullExplanation: 'A API StyleSheet cria objetos de estilo. É mais performática que objetos literais e valida as propriedades. Usa Flexbox para layout por padrão.',
    fullCode: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Box() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <Text style={styles.text}>Estilo Legal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#ff2d55',
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});`
  },
  {
    id: 'vibration',
    title: 'APIs Nativas',
    desc: 'Acesse hardware como Vibração facilmente.',
    shortCode: `import { Vibration } from 'react-native';
Vibration.vibrate();`,
    fullExplanation: 'React Native e Expo fornecem acesso direto a funcionalidades do dispositivo. Vibration, Camera, Location e Sensors são exemplos comuns.',
    fullCode: `import React from 'react';
import { Button, Vibration, View } from 'react-native';

export default function Buzz() {
  return (
    <View>
      <Button
        title="Vibrar Celular"
        onPress={() => Vibration.vibrate(500)}
      />
    </View>
  );
}`
  }
];
