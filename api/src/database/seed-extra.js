const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const extraConcepts = [
  {
    id: 'scrollview',
    title: 'ScrollView',
    description: 'Rolagem simples para conteúdo pequeno.',
    short_code: `<ScrollView>\n  <Text>Conteúdo rolável</Text>\n</ScrollView>`,
    full_explanation: 'ScrollView é ideal para conteúdo pequeno que precisa rolar. Para listas grandes, use FlatList.',
    full_code: `import React from 'react';\nimport { ScrollView, Text, View } from 'react-native';\n\nexport default function Scroll() {\n  return (\n    <ScrollView style={{flex: 1}}>\n      {Array.from({length: 50}, (_, i) => (\n        <Text key={i} style={{padding: 10}}>Item {i + 1}</Text>\n      ))}\n    </ScrollView>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Exibir imagens locais e remotas.',
    short_code: `<Image source={{uri: 'https://...'}} style={{width: 100, height: 100}} />`,
    full_explanation: 'Componente Image suporta imagens locais (require) e remotas (uri). Sempre defina width e height.',
    full_code: `import React from 'react';\nimport { Image, View, StyleSheet } from 'react-native';\n\nexport default function ImageExample() {\n  return (\n    <View style={styles.container}>\n      <Image\n        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}\n        style={styles.image}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { alignItems: 'center' },\n  image: { width: 100, height: 100, margin: 10 }\n});`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Sobreposição que cobre toda a tela.',
    short_code: `<Modal visible={showModal}>\n  <Text>Conteúdo do Modal</Text>\n</Modal>`,
    full_explanation: 'Modal cria uma sobreposição que cobre toda a tela. Útil para formulários, confirmações ou conteúdo temporário.',
    full_code: `import React, { useState } from 'react';\nimport { Modal, Button, Text, View, StyleSheet } from 'react-native';\n\nexport default function ModalExample() {\n  const [visible, setVisible] = useState(false);\n\n  return (\n    <View style={styles.container}>\n      <Button title="Abrir Modal" onPress={() => setVisible(true)} />\n      <Modal visible={visible} animationType="slide">\n        <View style={styles.modal}>\n          <Text>Este é um Modal!</Text>\n          <Button title="Fechar" onPress={() => setVisible(false)} />\n        </View>\n      </Modal>\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Diálogos nativos do sistema.',
    short_code: `Alert.alert('Título', 'Mensagem');`,
    full_explanation: 'Alert mostra diálogos nativos do sistema operacional. Funciona diferente em iOS e Android.',
    full_code: `import React from 'react';\nimport { Alert, Button, View } from 'react-native';\n\nexport default function AlertExample() {\n  const showAlert = () => {\n    Alert.alert(\n      'Confirmação',\n      'Deseja continuar?',\n      [\n        { text: 'Cancelar', style: 'cancel' },\n        { text: 'OK', onPress: () => console.log('OK') }\n      ]\n    );\n  };\n\n  return (\n    <View>\n      <Button title="Mostrar Alert" onPress={showAlert} />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    description: 'Obter dimensões da tela do dispositivo.',
    short_code: `const {width, height} = Dimensions.get('window');`,
    full_explanation: 'Dimensions permite obter largura e altura da tela. Útil para layouts responsivos.',
    full_code: `import React from 'react';\nimport { Dimensions, Text, View } from 'react-native';\n\nexport default function ScreenInfo() {\n  const {width, height} = Dimensions.get('window');\n\n  return (\n    <View>\n      <Text>Largura: {width}px</Text>\n      <Text>Altura: {height}px</Text>\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'platform',
    title: 'Platform',
    description: 'Detectar sistema operacional (iOS/Android).',
    short_code: `Platform.OS === 'ios' ? 'iPhone' : 'Android'`,
    full_explanation: 'Platform permite executar código específico para cada plataforma.',
    full_code: `import React from 'react';\nimport { Platform, Text, View } from 'react-native';\n\nexport default function PlatformExample() {\n  return (\n    <View>\n      <Text>Sistema: {Platform.OS}</Text>\n      <Text>Versão: {Platform.Version}</Text>\n      {Platform.OS === 'ios' && <Text>É um iPhone!</Text>}\n      {Platform.OS === 'android' && <Text>É um Android!</Text>}\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'linking',
    title: 'Linking',
    description: 'Abrir URLs externas e deep links.',
    short_code: `Linking.openURL('https://google.com');`,
    full_explanation: 'Linking permite abrir URLs no navegador, fazer ligações, enviar emails e criar deep links.',
    full_code: `import React from 'react';\nimport { Button, Linking, View } from 'react-native';\n\nexport default function LinkingExample() {\n  const openWebsite = () => {\n    Linking.openURL('https://reactnative.dev');\n  };\n\n  const makeCall = () => {\n    Linking.openURL('tel:+5511999999999');\n  };\n\n  return (\n    <View>\n      <Button title="Abrir Site" onPress={openWebsite} />\n      <Button title="Fazer Ligação" onPress={makeCall} />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'animated',
    title: 'Animated',
    description: 'Animações fluidas e performáticas.',
    short_code: `Animated.timing(fadeAnim, {toValue: 1}).start();`,
    full_explanation: 'API Animated cria animações suaves que rodam na thread nativa para melhor performance.',
    full_code: `import React, { useRef, useEffect } from 'react';\nimport { Animated, View, Button } from 'react-native';\n\nexport default function AnimatedExample() {\n  const fadeAnim = useRef(new Animated.Value(0)).current;\n\n  const fadeIn = () => {\n    Animated.timing(fadeAnim, {\n      toValue: 1,\n      duration: 2000,\n      useNativeDriver: true\n    }).start();\n  };\n\n  return (\n    <View>\n      <Animated.View style={{opacity: fadeAnim, width: 100, height: 100, backgroundColor: 'blue'}} />\n      <Button title="Fade In" onPress={fadeIn} />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 3
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Botão liga/desliga nativo.',
    short_code: `<Switch value={enabled} onValueChange={setEnabled} />`,
    full_explanation: 'Switch é um botão de alternância nativo que segue o design do sistema operacional.',
    full_code: `import React, { useState } from 'react';\nimport { Switch, Text, View } from 'react-native';\n\nexport default function SwitchExample() {\n  const [enabled, setEnabled] = useState(false);\n\n  return (\n    <View style={{padding: 20}}>\n      <Text>Notificações: {enabled ? 'Ativadas' : 'Desativadas'}</Text>\n      <Switch\n        value={enabled}\n        onValueChange={setEnabled}\n        trackColor={{false: '#767577', true: '#81b0ff'}}\n        thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}\n      />\n    </View>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'statusbar',
    title: 'StatusBar',
    description: 'Controlar aparência da barra de status.',
    short_code: `<StatusBar barStyle="light-content" />`,
    full_explanation: 'StatusBar permite controlar cor, estilo e visibilidade da barra de status do sistema.',
    full_code: `import React from 'react';\nimport { StatusBar, View, Text, StyleSheet } from 'react-native';\n\nexport default function StatusBarExample() {\n  return (\n    <View style={styles.container}>\n      <StatusBar barStyle="light-content" backgroundColor="#000" />\n      <Text style={styles.text}>Barra de status customizada</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },\n  text: { color: 'white', textAlign: 'center' }\n});`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'safearea',
    title: 'SafeAreaView',
    description: 'Evitar sobreposição com notch/barra.',
    short_code: `<SafeAreaView style={{flex: 1}}>`,
    full_explanation: 'SafeAreaView garante que o conteúdo não seja sobreposto por notch, barra de status ou indicadores do sistema.',
    full_code: `import React from 'react';\nimport { SafeAreaView, Text, StyleSheet } from 'react-native';\n\nexport default function SafeAreaExample() {\n  return (\n    <SafeAreaView style={styles.container}>\n      <Text style={styles.text}>Conteúdo seguro</Text>\n    </SafeAreaView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, backgroundColor: '#f0f0f0' },\n  text: { margin: 20, fontSize: 18 }\n});`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'refresh',
    title: 'RefreshControl',
    description: 'Pull-to-refresh em listas.',
    short_code: `<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>`,
    full_explanation: 'RefreshControl adiciona funcionalidade de "puxar para atualizar" em ScrollView e FlatList.',
    full_code: `import React, { useState } from 'react';\nimport { ScrollView, RefreshControl, Text, View } from 'react-native';\n\nexport default function RefreshExample() {\n  const [refreshing, setRefreshing] = useState(false);\n  const [data, setData] = useState(['Item 1', 'Item 2', 'Item 3']);\n\n  const onRefresh = () => {\n    setRefreshing(true);\n    setTimeout(() => {\n      setData([...data, 'Item ' + (data.length + 1)]);\n      setRefreshing(false);\n    }, 2000);\n  };\n\n  return (\n    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>\n      {data.map((item, index) => (\n        <Text key={index} style={{padding: 20}}>{item}</Text>\n      ))}\n    </ScrollView>\n  );\n}`,
    category: 'react-native',
    difficulty_level: 2
  }
];

db.serialize(() => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO concepts 
    (id, title, description, short_code, full_explanation, full_code, category, difficulty_level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  extraConcepts.forEach(concept => {
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
  console.log('✅ Database seeded with extra concepts');
});

db.close();