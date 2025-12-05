drop schema if exists reacttok_bd;
create database reacttok_bd;
use reacttok_bd;

CREATE TABLE concepts (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_code TEXT NOT NULL,
    full_explanation TEXT NOT NULL,
    full_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO concepts (
    id, title, description, short_code, full_explanation, full_code
) VALUES
('jsx',
'Componentes + JSX',
'A base de tudo: Funções que retornam UI.',
'function Hello() {
  return <Text>Olá!</Text>
}',
'Em React Native, componentes são funções JavaScript que retornam JSX (uma sintaxe parecida com HTML). Eles são os blocos de construção da sua interface.',
'import React from ''react'';
import { Text, View } from ''react-native'';

export default function Welcome() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: ''white'' }}>
        Bem-vindo ao React Native!
      </Text>
    </View>
  );
}'),

('state',
'useState',
'Memória do componente. Quando muda, a tela atualiza.',
'const [count, setCount] = useState(0);',
'O Hook useState permite adicionar estado ao componente. Quando você chama a função "set", o React re-renderiza o componente com o novo valor.',
'import React, { useState } from ''react'';
import { Button, Text, View } from ''react-native'';

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
}'),


('effect',
'useEffect',
'Efeitos colaterais: timers, APIs, mudanças.',
'useEffect(() => {
  console.log(''Montou!'');
}, []);',
'O Hook useEffect executa código em momentos específicos: quando o componente nasce (mount), quando algo muda (update) ou quando morre (unmount).',
'import React, { useState, useEffect } from ''react'';
import { Text, View } from ''react-native'';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return <Text>Segundos: {seconds}</Text>;
}'),


('style',
'StyleSheet',
'Estilização otimizada parecida com CSS.',
'const styles = StyleSheet.create({
  box: { color: ''red'' }
});',
'A API StyleSheet cria objetos de estilo. É mais performática que objetos literais e valida as propriedades. Usa Flexbox para layout por padrão.',
'import React from ''react'';
import { View, Text, StyleSheet } from ''react-native'';

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
    justifyContent: ''center'',
    alignItems: ''center'',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: ''#ff2d55'',
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: ''white'',
    fontSize: 20,
    fontWeight: ''bold'',
  }
});'),

('vibration',
'APIs Nativas',
'Acesse hardware como Vibração facilmente.',
'import { Vibration } from ''react-native'';
Vibration.vibrate();',
'React Native e Expo fornecem acesso direto a funcionalidades do dispositivo. Vibration, Camera, Location e Sensors são exemplos comuns.',
'import React from ''react'';
import { Button, Vibration, View } from ''react-native'';

export default function Buzz() {
  return (
    <View>
      <Button
        title="Vibrar Celular"
        onPress={() => Vibration.vibrate(500)}
      />
    </View>
  );
}');
