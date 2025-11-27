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
		id: "jsx",
		title: "Componentes + JSX",
		desc: "A base de tudo: Funções que retornam UI.",
		shortCode: `function Hello() {
  return <Text>Olá!</Text>
}`,
		fullExplanation:
			"Em React Native, componentes são funções JavaScript que retornam JSX (uma sintaxe parecida com HTML). Eles são os blocos de construção da sua interface.",
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
}`,
	},
	{
		id: "state",
		title: "useState",
		desc: "Memória do componente. Quando muda, a tela atualiza.",
		shortCode: `const [count, setCount] = useState(0);`,
		fullExplanation:
			'O Hook useState permite adicionar estado ao componente. Quando você chama a função "set", o React re-renderiza o componente com o novo valor.',
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
}`,
	},
	{
		id: "effect",
		title: "useEffect",
		desc: "Efeitos colaterais: timers, APIs, mudanças.",
		shortCode: `useEffect(() => {
  console.log('Montou!');
}, []);`,
		fullExplanation:
			"O Hook useEffect executa código em momentos específicos: quando o componente nasce (mount), quando algo muda (update) ou quando morre (unmount).",
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
}`,
	},
	{
		id: "style",
		title: "StyleSheet",
		desc: "Estilização otimizada parecida com CSS.",
		shortCode: `const styles = StyleSheet.create({
  box: { color: 'red' }
});`,
		fullExplanation:
			"A API StyleSheet cria objetos de estilo. É mais performática que objetos literais e valida as propriedades. Usa Flexbox para layout por padrão.",
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
});`,
	},
	{
		id: "vibration",
		title: "APIs Nativas",
		desc: "Acesse hardware como Vibração facilmente.",
		shortCode: `import { Vibration } from 'react-native';
Vibration.vibrate();`,
		fullExplanation:
			"React Native e Expo fornecem acesso direto a funcionalidades do dispositivo. Vibration, Camera, Location e Sensors são exemplos comuns.",
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
}`,
	},
	{
		id: "navigation",
		title: "Navegação",
		desc: "Mova-se entre telas com React Navigation.",
		shortCode: `import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';`,
		fullExplanation:
			"React Navigation permite criar navegação entre telas. Stack Navigator empilha telas, Tab Navigator cria abas, e Drawer Navigator adiciona um menu lateral.",
		fullCode: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela de Detalhes</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
	},
	{
		id: "context",
		title: "Context API",
		desc: "Compartilhe estado global entre componentes.",
		shortCode: `const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`,
		fullExplanation:
			"Context API permite passar dados através da árvore de componentes sem precisar passar props manualmente em cada nível. É útil para temas, autenticação e estado global.",
		fullCode: `import React, { createContext, useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function ThemedText() {
  const { theme } = useContext(ThemeContext);
  return (
    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
      Texto com tema
    </Text>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText />
        <Button title="Alternar Tema" onPress={() => {}} />
      </View>
    </ThemeProvider>
  );
}`,
	},
	{
		id: "flatlist",
		title: "FlatList",
		desc: "Renderize listas eficientes de dados.",
		shortCode: `<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>`,
		fullExplanation:
			"FlatList é otimizada para renderizar listas grandes. Ela só renderiza os itens visíveis na tela, reciclando componentes para performance.",
		fullCode: `import React from 'react';
import { FlatList, Text, View } from 'react-native';

const data = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

export default function ItemList() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}`,
	},
	{
		id: "touchable",
		title: "TouchableOpacity",
		desc: "Crie botões e áreas tocáveis responsivas.",
		shortCode: `<TouchableOpacity onPress={handlePress}>
  <Text>Clique aqui</Text>
</TouchableOpacity>`,
		fullExplanation:
			"TouchableOpacity reduz a opacidade quando pressionado, dando feedback visual. Outras opções incluem TouchableHighlight e TouchableWithoutFeedback.",
		fullCode: `import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setCount(count + 1)}
      >
        <Text style={{ color: 'white' }}>Cliques: {count}</Text>
      </TouchableOpacity>
    </View>
  );
}`,
	},
	{
		id: "asyncstorage",
		title: "AsyncStorage",
		desc: "Armazene dados persistentes no dispositivo.",
		shortCode: `import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', 'value');`,
		fullExplanation:
			"AsyncStorage permite salvar dados localmente no dispositivo. É assíncrono e usa chave-valor. Ideal para configurações, cache e dados pequenos.",
		fullCode: `import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DataStorage() {
  const [data, setData] = useState('');
  const [storedData, setStoredData] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('myData', data);
      alert('Dados salvos!');
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('myData');
      if (value !== null) {
        setStoredData(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Digite algo"
        value={data}
        onChangeText={setData}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Salvar" onPress={saveData} />
      <Text style={{ marginTop: 20 }}>Dados salvos: {storedData}</Text>
    </View>
  );
}`,
	},
	{
		id: "modal",
		title: "Modal",
		desc: "Crie janelas sobrepostas para diálogos.",
		shortCode: `<Modal visible={isVisible}>
  <View style={styles.modal}>
    <Text>Conteúdo do Modal</Text>
  </View>
</Modal>`,
		fullExplanation:
			"Modal cria uma tela sobreposta. É útil para alertas, formulários e confirmações. Pode ser fechado por toque fora ou botão.",
		fullCode: `import React, { useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function ModalExample() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%'
          }}>
            <Text>Este é um modal!</Text>
            <TouchableOpacity
              style={{ marginTop: 10, alignSelf: 'flex-end' }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'blue' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}`,
	},
	{
		id: "dimensions",
		title: "Dimensions",
		desc: "Obtenha o tamanho da tela do dispositivo.",
		shortCode: `import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');`,
		fullExplanation:
			'Dimensions fornece as dimensões da tela. Útil para layouts responsivos e cálculos de tamanho. Use "window" para área utilizável.',
		fullCode: `import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export default function ScreenInfo() {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Largura da tela: {width}</Text>
      <Text>Altura da tela: {height}</Text>
      <View style={{
        width: width * 0.8,
        height: 50,
        backgroundColor: '#ff2d55',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      }}>
        <Text style={{ color: 'white' }}>80% da largura</Text>
      </View>
    </View>
  );
}`,
	},
	{
		id: "platform",
		title: "Platform",
		desc: "Escreva código específico para iOS ou Android.",
		shortCode: `import { Platform } from 'react-native';
if (Platform.OS === 'ios') {
  // Código iOS
}`,
		fullExplanation:
			"Platform permite detectar o sistema operacional. Use para estilos, comportamentos ou APIs diferentes entre iOS e Android.",
		fullCode: `import React from 'react';
import { Platform, Text, View } from 'react-native';

export default function PlatformSpecific() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Plataforma: {Platform.OS}</Text>
      <Text>Versão: {Platform.Version}</Text>
      <View style={{
        padding: 10,
        backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#ff2d55',
        borderRadius: 5,
        marginTop: 10
      }}>
        <Text style={{ color: 'white' }}>
          {Platform.OS === 'ios' ? 'iOS Style' : 'Android Style'}
        </Text>
      </View>
    </View>
  );
}`,
	},
	{
		id: "usecallback",
		title: "useCallback",
		desc: "Otimize funções para evitar re-renders desnecessários.",
		shortCode: `const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
		fullExplanation:
			"useCallback memoriza uma função, evitando que ela seja recriada a cada render. Útil para passar callbacks para componentes filhos otimizados.",
		fullCode: `import React, { useState, useCallback } from 'react';
import { Button, Text, View } from 'react-native';

function ChildComponent({ onPress }) {
  console.log('Child renderizado');
  return <Button title="Clicar" onPress={onPress} />;
}

export default function ParentComponent() {
  const [count, setCount] = useState(0);

  const handlePress = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contagem: {count}</Text>
      <ChildComponent onPress={handlePress} />
    </View>
  );
}`,
	},
];
