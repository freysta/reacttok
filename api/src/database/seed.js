const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const concepts = [
  {
    id: 'jsx',
    title: 'Componentes + JSX',
    description: 'A base de tudo: Funções que retornam UI.',
    short_code: `function Hello() {\n  return <Text>Olá!</Text>\n}`,
    full_explanation: 'Em React Native, componentes são funções JavaScript que retornam JSX (uma sintaxe parecida com HTML). Eles são os blocos de construção da sua interface.',
    full_code: `import React from 'react';\nimport { Text, View } from 'react-native';\n\nexport default function Welcome() {\n  return (\n    <View style={{ padding: 20 }}>\n      <Text style={{ color: 'white' }}>\n        Bem-vindo ao React Native!\n      </Text>\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'state',
    title: 'useState',
    description: 'Memória do componente. Quando muda, a tela atualiza.',
    short_code: `const [count, setCount] = useState(0);`,
    full_explanation: 'O Hook useState permite adicionar estado ao componente. Quando você chama a função "set", o React re-renderiza o componente com o novo valor.',
    full_code: `import React, { useState } from 'react';\nimport { Button, Text, View } from 'react-native';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <View>\n      <Text>Contagem: {count}</Text>\n      <Button \n        title="Aumentar" \n        onPress={() => setCount(count + 1)} \n      />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'effect',
    title: 'useEffect',
    description: 'Efeitos colaterais: timers, APIs, mudanças.',
    short_code: `useEffect(() => {\n  console.log('Montou!');\n}, []);`,
    full_explanation: 'O Hook useEffect executa código em momentos específicos: quando o componente nasce (mount), quando algo muda (update) ou quando morre (unmount).',
    full_code: `import React, { useState, useEffect } from 'react';\nimport { Text, View } from 'react-native';\n\nexport default function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    \n    // Limpeza ao desmontar\n    return () => clearInterval(interval);\n  }, []);\n\n  return <Text>Segundos: {seconds}</Text>;\n}`,
    category: 'react-native',
    difficulty_level: 3
  },
  {
    id: 'style',
    title: 'StyleSheet',
    description: 'Estilização otimizada parecida com CSS.',
    short_code: `const styles = StyleSheet.create({\n  box: { backgroundColor: 'red' }\n});`,
    full_explanation: 'A API StyleSheet cria objetos de estilo. É mais performática que objetos literais e valida as propriedades. Usa Flexbox para layout por padrão.',
    full_code: `import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function Box() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.box} />\n      <Text style={styles.text}>Estilo Legal</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  box: {\n    width: 100,\n    height: 100,\n    backgroundColor: '#ff2d55',\n    borderRadius: 10,\n    marginBottom: 20,\n  },\n  text: {\n    color: 'white',\n    fontSize: 20,\n    fontWeight: 'bold',\n  }\n});`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'vibration',
    title: 'APIs Nativas',
    description: 'Acesse hardware como Vibração facilmente.',
    short_code: `import { Vibration } from 'react-native';\nVibration.vibrate();`,
    full_explanation: 'React Native e Expo fornecem acesso direto a funcionalidades do dispositivo. Vibration, Camera, Location e Sensors são exemplos comuns.',
    full_code: `import React from 'react';\nimport { Button, Vibration, View } from 'react-native';\n\nexport default function Buzz() {\n  return (\n    <View>\n      <Button\n        title="Vibrar Celular"\n        onPress={() => Vibration.vibrate(500)}\n      />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'flatlist',
    title: 'FlatList',
    description: 'Listas performáticas para grandes datasets.',
    short_code: `<FlatList\n  data={items}\n  renderItem={({item}) => <Text>{item}</Text>}\n/>`,
    full_explanation: 'FlatList renderiza apenas os itens visíveis na tela, sendo muito mais performática que ScrollView para listas grandes.',
    full_code: `import React from 'react';\nimport { FlatList, Text, View } from 'react-native';\n\nconst data = ['Item 1', 'Item 2', 'Item 3'];\n\nexport default function List() {\n  return (\n    <FlatList\n      data={data}\n      keyExtractor={(item, index) => index.toString()}\n      renderItem={({item}) => (\n        <View style={{padding: 10}}>\n          <Text>{item}</Text>\n        </View>\n      )}\n    />\n  );\n}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'navigation',
    title: 'Navegação',
    description: 'Navegar entre telas com React Navigation.',
    short_code: `navigation.navigate('Details');`,
    full_explanation: 'React Navigation permite criar navegação entre telas de forma nativa, com animações e gestos apropriados para cada plataforma.',
    full_code: `import React from 'react';\nimport { Button, View } from 'react-native';\nimport { useNavigation } from '@react-navigation/native';\n\nexport default function Home() {\n  const navigation = useNavigation();\n\n  return (\n    <View>\n      <Button\n        title="Ir para Detalhes"\n        onPress={() => navigation.navigate('Details')}\n      />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 3
  },
  {
    id: 'textinput',
    title: 'TextInput',
    description: 'Capturar entrada de texto do usuário.',
    short_code: `<TextInput\n  value={text}\n  onChangeText={setText}\n  placeholder="Digite aqui"\n/>`,
    full_explanation: 'TextInput permite que usuários insiram texto. Sempre use com estado controlado para melhor experiência.',
    full_code: `import React, { useState } from 'react';\nimport { TextInput, Text, View, StyleSheet } from 'react-native';\n\nexport default function InputExample() {\n  const [text, setText] = useState('');\n\n  return (\n    <View style={styles.container}>\n      <TextInput\n        style={styles.input}\n        value={text}\n        onChangeText={setText}\n        placeholder="Digite seu nome"\n      />\n      <Text>Você digitou: {text}</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20 },\n  input: {\n    borderWidth: 1,\n    borderColor: '#ccc',\n    padding: 10,\n    marginBottom: 10,\n  }\n});`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'touchable',
    title: 'TouchableOpacity',
    description: 'Botões customizados com feedback visual.',
    short_code: `<TouchableOpacity onPress={handlePress}>\n  <Text>Clique aqui</Text>\n</TouchableOpacity>`,
    full_explanation: 'TouchableOpacity adiciona feedback visual (opacidade) quando pressionado, sendo ideal para criar botões customizados.',
    full_code: `import React from 'react';\nimport { TouchableOpacity, Text, StyleSheet } from 'react-native';\n\nexport default function CustomButton() {\n  const handlePress = () => {\n    console.log('Botão pressionado!');\n  };\n\n  return (\n    <TouchableOpacity style={styles.button} onPress={handlePress}>\n      <Text style={styles.text}>Pressione-me</Text>\n    </TouchableOpacity>\n  );\n}\n\nconst styles = StyleSheet.create({\n  button: {\n    backgroundColor: '#007AFF',\n    padding: 15,\n    borderRadius: 8,\n  },\n  text: {\n    color: 'white',\n    textAlign: 'center',\n  }\n});`,
    category: 'react-native',
    difficulty_level: 1
  }
];

db.serialize(() => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO concepts 
    (id, title, description, short_code, full_explanation, full_code, category, difficulty_level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  concepts.forEach(concept => {
    stmt.run([
      concept.id,
      concept.title,
      concept.description,
      concept.short_code,
      concept.full_explanation,
      concept.full_code,
      concept.category,
      concept.difficulty_level
    ]);
  });

  stmt.finalize();
  console.log('✅ Database seeded with concepts');
});

db.close();