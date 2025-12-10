const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const concepts = [
  // --- REACT CORE & HOOKS ---
  {
    id: 'jsx',
    title: 'Componentes + JSX',
    description: 'A base de tudo: Funções que retornam UI.',
    short_code: `function Hello() {
  return <Text>Olá!</Text>
}`,
    full_explanation: 'Em React Native, componentes são funções JavaScript que retornam JSX (uma sintaxe parecida com HTML). Eles são os blocos de construção da sua interface. O JSX é transformado em chamadas de função nativas.',
    full_code: `import React from 'react';
import { Text, View } from 'react-native';

export default function Welcome() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: 'white' }}>
        Bem-vindo ao React Native!
      </Text>
    </View>
  );
}`,
    category: 'react-core',
    difficulty_level: 1
  },
  {
    id: 'props',
    title: 'Props (Propriedades)',
    description: 'Passando dados de pai para filho.',
    short_code: `<Greeting name="" />`,
    full_explanation: 'Props são argumentos passados para componentes React. Elas são somente leitura (imutáveis) do ponto de vista do componente filho, permitindo que componentes sejam reutilizáveis e dinâmicos.',
    full_code: `import React from 'react';
import { Text, View } from 'react-native';

function Greeting({ name }) {
  return <Text>Olá, {name}!</Text>;
}

export default function App() {
  return (
    <View>
      <Greeting name="Ana" />
      <Greeting name="Pedro" />
    </View>
  );
}`,
    category: 'react-core',
    difficulty_level: 1
  },
  {
    id: 'state',
    title: 'useState',
    description: 'Memória do componente. Quando muda, a tela atualiza.',
    short_code: `const [count, setCount] = useState(0);`,
    full_explanation: 'O Hook useState permite adicionar estado ao componente funcional. Ele retorna um par: o valor atual do estado e uma função para atualizá-lo. Atualizações de estado acionam uma nova renderização.',
    full_code: `import React, { useState } from 'react';
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
}`,
    category: 'react-hooks',
    difficulty_level: 2
  },
  {
    id: 'effect',
    title: 'useEffect',
    description: 'Efeitos colaterais: timers, APIs, mudanças.',
    short_code: `useEffect(() => {
  console.log('Montou!');
}, []);`,
    full_explanation: 'O Hook useEffect sincroniza um componente com um sistema externo (API, timers, subscriptions). Ele roda após a renderização e pode ter uma função de limpeza (cleanup).',
    full_code: `import React, { useState, useEffect } from 'react';
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
}`,
    category: 'react-hooks',
    difficulty_level: 3
  },
  {
    id: 'use-context',
    title: 'useContext',
    description: 'Compartilhar dados globalmente sem "prop drilling".',
    short_code: `const theme = useContext(ThemeContext);`,
    full_explanation: 'O Context API permite passar dados pela árvore de componentes sem ter que passar props manualmente em cada nível. useContext é o hook para consumir esses valores.',
    full_code: `import React, { createContext, useContext } from 'react';
import { Text, View } from 'react-native';

const ThemeContext = createContext('light');

function ThemedText() {
  const theme = useContext(ThemeContext);
  return <Text>Tema atual: {theme}</Text>;
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedText />
    </ThemeContext.Provider>
  );
}`,
    category: 'react-hooks',
    difficulty_level: 3
  },
  {
    id: 'use-ref',
    title: 'useRef',
    description: 'Referências mutáveis que não causam re-render.',
    short_code: `const inputRef = useRef(null);`,
    full_explanation: 'useRef retorna um objeto mutável cuja propriedade .current é persistida durante todo o ciclo de vida do componente. Usado para acessar elementos DOM/Nativos ou guardar valores que não precisam renderizar na tela.',
    full_code: `import React, { useRef } from 'react';
import { TextInput, Button, View } from 'react-native';

export default function FocusInput() {
  const inputRef = useRef(null);

  return (
    <View>
      <TextInput ref={inputRef} placeholder="Digite aqui..." />
      <Button 
        title="Focar Input" 
        onPress={() => inputRef.current.focus()} 
      />
    </View>
  );
}`,
    category: 'react-hooks',
    difficulty_level: 2
  },
  {
    id: 'use-memo',
    title: 'useMemo',
    description: 'Memorizar cálculos pesados para performance.',
    short_code: `const val = useMemo(() => heavy(a, b), [a, b]);`,
    full_explanation: 'useMemo memoriza o resultado de uma função cara. Ele só recalcula o valor quando uma das dependências muda, evitando processamento desnecessário em cada renderização.',
    full_code: `import React, { useState, useMemo } from 'react';
import { Text, Button, View } from 'react-native';

export default function HeavyCalc() {
  const [count, setCount] = useState(0);
  
  const double = useMemo(() => {
    // Simula cálculo lento
    let i = 0; while(i < 50000000) i++;
    return count * 2;
  }, [count]);

  return (
    <View>
      <Text>Dobro: {double}</Text>
      <Button title="Incrementar" onPress={() => setCount(count + 1)} />
    </View>
  );
}`,
    category: 'react-hooks',
    difficulty_level: 4
  },
  {
    id: 'use-callback',
    title: 'useCallback',
    description: 'Memorizar funções para evitar recriação.',
    short_code: `const fn = useCallback(() => {}, [deps]);`,
    full_explanation: 'useCallback retorna uma versão memorizada da função callback que só muda se uma das dependências mudar. Útil para passar callbacks para componentes filhos otimizados (React.memo).',
    full_code: `import React, { useState, useCallback } from 'react';
import { Button, View } from 'react-native';

export default function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <Button title="Click" onPress={increment} />;
}`,
    category: 'react-hooks',
    difficulty_level: 4
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    description: 'Reutilizar lógica de estado entre componentes.',
    short_code: `function useToggle() { ... }`,
    full_explanation: 'Você pode extrair lógica de componentes em funções reutilizáveis chamadas Custom Hooks. Eles devem começar com "use" e podem chamar outros hooks.',
    full_code: `import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

// Hook customizado
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle];
}

export default function App() {
  const [isOn, toggleIsOn] = useToggle();
  return (
    <View>
      <Text>{isOn ? 'Ligado' : 'Desligado'}</Text>
      <Button title="Alternar" onPress={toggleIsOn} />
    </View>
  );
}`,
    category: 'react-hooks',
    difficulty_level: 3
  },

  // --- REACT NATIVE COMPONENTS ---
  {
    id: 'view',
    title: 'View',
    description: 'O container fundamental. Como uma <div>.',
    short_code: `<View style={{ flex: 1 }} />`,
    full_explanation: 'View é o componente mais básico para construir UI. Ele suporta layout com Flexbox, estilos, toque e acessibilidade. Mapeia para UIView no iOS e android.view.View no Android.',
    full_code: `import React from 'react';
import { View } from 'react-native';

export default function Boxes() {
  return (
    <View style={{ flexDirection: 'row', height: 100 }}>
      <View style={{ backgroundColor: 'blue', flex: 0.5 }} />
      <View style={{ backgroundColor: 'red', flex: 0.5 }} />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'text',
    title: 'Text',
    description: 'Exibir strings. Único lugar onde texto vive.',
    short_code: `<Text>Olá Mundo</Text>`,
    full_explanation: 'No React Native, todo texto deve estar dentro de um componente <Text>. Ele suporta aninhamento, estilos e toque.',
    full_code: `import React from 'react';
import { Text, View } from 'react-native';

export default function Typography() {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>Título</Text>
      <Text>
        Texto normal com <Text style={{ fontWeight: 'bold' }}>negrito</Text>.
      </Text>
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Exibir imagens locais ou da rede.',
    short_code: `<Image source={{ uri: '...' }} />`,
    full_explanation: 'O componente Image exibe imagens. Requer uma fonte (source), que pode ser um require local ou um objeto URI para imagens remotas. Sempre defina dimensões para imagens remotas.',
    full_code: `import React from 'react';
import { Image, View } from 'react-native';

export default function Avatar() {
  return (
    <View>
      <Image 
        style={{ width: 50, height: 50 }}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'scrollview',
    title: 'ScrollView',
    description: 'Container de rolagem genérico.',
    short_code: `<ScrollView>...</ScrollView>`,
    full_explanation: 'ScrollView renderiza todos os seus filhos de uma vez. Ideal para telas com pouco conteúdo rolável. Para listas grandes, use FlatList.',
    full_code: `import React from 'react';
import { ScrollView, Text } from 'react-native';

export default function LongText() {
  return (
    <ScrollView>
      <Text style={{ fontSize: 40 }}>Role para baixo...</Text>
      {/* ...muito conteúdo... */}
      <Text style={{ fontSize: 40, marginTop: 500 }}>Fim!</Text>
    </ScrollView>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'flatlist',
    title: 'FlatList',
    description: 'Listas performáticas para grandes datasets.',
    short_code: `<FlatList data={...} renderItem={...} />`,
    full_explanation: 'FlatList renderiza apenas os itens visíveis na tela (virtualização), sendo muito mais performática que ScrollView para listas longas ou infinitas.',
    full_code: `import React from 'react';
import { FlatList, Text, View } from 'react-native';

const data = Array.from({ length: 50 }, (_, i) => 
  \`Item \${i}\`
);

export default function List() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={({item}) => <Text style={{padding: 20}}>{item}</Text>}
    />
  );
}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'sectionlist',
    title: 'SectionList',
    description: 'Listas com cabeçalhos de seção.',
    short_code: `<SectionList sections={...} />`,
    full_explanation: 'Similar à FlatList, mas projetada para listas agrupadas com cabeçalhos (ex: lista de contatos por letra).',
    full_code: `import React from 'react';
import { SectionList, Text, View } from 'react-native';

const sections = [
  { title: 'A', data: ['Ana', 'Arthur'] },
  { title: 'B', data: ['Beatriz', 'Bruno'] },
];

export default function Contacts() {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item}
      renderItem={({item}) => <Text style={{padding: 10}}>{item}</Text>}
      renderSectionHeader={({section: {title}}) => (
        <Text style={{fontWeight: 'bold', backgroundColor: '#eee'}}>{title}</Text>
      )}
    />
  );
}`,
    category: 'react-native',
    difficulty_level: 3
  },
  {
    id: 'textinput',
    title: 'TextInput',
    description: 'Entrada de texto pelo usuário.',
    short_code: `<TextInput onChangeText={...} />`,
    full_explanation: 'Componente fundamental para inputs via teclado. Suporta auto-correção, placeholder, senhas (secureTextEntry) e diferentes tipos de teclado.',
    full_code: `import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function Login() {
  const [pass, setPass] = useState('');
  return (
    <View>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        style={{borderWidth: 1, padding: 10, margin: 10}}
      />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'touchable',
    title: 'TouchableOpacity',
    description: 'Área clicável com feedback de opacidade.',
    short_code: `<TouchableOpacity onPress={...} />`,
    full_explanation: 'Um wrapper para fazer Views ou Textos responderem a toques corretamente. Reduz a opacidade quando pressionado.',
    full_code: `import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Btn() {
  return (
    <TouchableOpacity 
      onPress={() => alert('Oi!')}
      style={{ backgroundColor: 'blue', padding: 10 }}
    >
      <Text style={{ color: 'white' }}>Clique-me</Text>
    </TouchableOpacity>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'pressable',
    title: 'Pressable',
    description: 'Controle moderno e granular de toques.',
    short_code: `<Pressable onPress={...}>`,
    full_explanation: 'Substituto mais moderno para TouchableOpacity. Permite detectar vários estágios de interação (pressionado, longo clique) e estilizar condicionalmente.',
    full_code: `import React from 'react';
import { Pressable, Text } from 'react-native';

export default function ModernBtn() {
  return (
    <Pressable
      onPress={() => console.log('Click')}
      style={({ pressed }) => [
        { backgroundColor: pressed ? 'darkblue' : 'blue' },
        { padding: 10 }
      ]}
    >
      <Text style={{ color: 'white' }}>Pressione</Text>
    </Pressable>
  );
}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'activityindicator',
    title: 'ActivityIndicator',
    description: 'Spinner de carregamento circular.',
    short_code: `<ActivityIndicator size="large" />`,
    full_explanation: 'Exibe um indicador circular de carregamento nativo da plataforma (spinner).',
    full_code: `import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Conteúdo sobreposto à tela atual.',
    short_code: `<Modal visible={isVisible}>...</Modal>`,
    full_explanation: 'Apresenta conteúdo acima da visualização atual. Útil para alertas customizados, menus ou formulários rápidos.',
    full_code: `import React, { useState } from 'react';
import { Modal, Text, Button, View } from 'react-native';

export default function Popup() {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Modal visible={visible} animationType="slide">
        <View style={{ marginTop: 50 }}>
          <Text>Olá do Modal!</Text>
          <Button title="Fechar" onPress={() => setVisible(false)} />
        </View>
      </Modal>
      <Button title="Abrir Modal" onPress={() => setVisible(true)} />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Botão de alternância (toggle).',
    short_code: `<Switch value={isOn} onValueChange={setIsOn} />`,
    full_explanation: 'Componente nativo para seleção booleana (Ligado/Desligado). A aparência varia entre iOS e Android.',
    full_code: `import React, { useState } from 'react';
import { Switch, View, Text } from 'react-native';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>Habilitar notificações?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={setEnabled}
        value={enabled}
      />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },

  // --- API & STYLING ---
  {
    id: 'style',
    title: 'StyleSheet',
    description: 'Estilização otimizada parecida com CSS.',
    short_code: `const styles = StyleSheet.create({...});`,
    full_explanation: 'A API StyleSheet cria objetos de estilo. É mais performática e valida as propriedades. O React Native usa Flexbox para layout.',
    full_code: `import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Box() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 8,
  }
});`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'flexbox',
    title: 'Flexbox Layout',
    description: 'O sistema de layout padrão.',
    short_code: `style={{ flex: 1, justifyContent: 'center' }}`,
    full_explanation: 'React Native usa Flexbox para distribuir elementos na tela. flexDirection padrão é "column" (vertical). justifyContent alinha no eixo principal, alignItems no transversal.',
    full_code: `import React from 'react';
import { View } from 'react-native';

export default function Center() {
  return (
    <View style={{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 2
  },
  {
    id: 'vibration',
    title: 'Vibration API',
    description: 'Controle de hardware: Vibração.',
    short_code: `Vibration.vibrate();`,
    full_explanation: 'A API Vibration permite acionar o motor de vibração do dispositivo por um tempo determinado ou em padrões.',
    full_code: `import React from 'react';
import { Button, Vibration, View } from 'react-native';

export default function Buzz() {
  return (
    <View>
      <Button
        title="Vibrar"
        onPress={() => Vibration.vibrate(500)}
      />
    </View>
  );
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'alert',
    title: 'Alert API',
    description: 'Diálogos nativos do sistema.',
    short_code: `Alert.alert('Título', 'Mensagem');`,
    full_explanation: 'Lança um diálogo de alerta nativo sobre todas as outras views. Pode ter botões customizados.',
    full_code: `import React from 'react';
import { Button, Alert, View } from 'react-native';

export default function Warning() {
  const showAlert = () => 
    Alert.alert(
      "Atenção",
      "Deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => console.log("Excluído") }
      ]
    );

  return <Button title="Deletar" onPress={showAlert} />;
}`,
    category: 'react-native',
    difficulty_level: 1
  },
  {
    id: 'navigation',
    title: 'React Navigation',
    description: 'Navegar entre telas de forma nativa.',
    short_code: `navigation.navigate('Details');`,
    full_explanation: 'Biblioteca padrão da comunidade para roteamento. Permite Stack, Tab e Drawer navigation com animações nativas.',
    full_code: `// Exemplo simplificado de uso dentro de um componente
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <Button
      title="Ir para Perfil"
      onPress={() => navigation.navigate('Profile')}
    />
  );
}`,
    category: 'react-ecosystem',
    difficulty_level: 3
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
  console.log('✅ Database seeded with 27 concepts across Core, Hooks, Components & APIs');
});

db.close();