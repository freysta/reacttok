# ReactTok

ReactTok é um miniapp educacional desenvolvido em React Native com Expo, inspirado no formato "TikTok" (feed vertical) para ensinar conceitos fundamentais de React Native de forma rápida e interativa.

## 📱 Telas e Funcionalidades

### 1. Feed Principal (`/`)
- **Conceito**: Interface de rolagem vertical infinita (estilo TikTok).
- **Funcionalidade**:
    - Exibe "cards" que ocupam a tela inteira.
    - Cada card ensina um conceito rápido (ex: `useState`, `useEffect`).
    - Botão de "Curtir" com feedback tátil (Vibração).
    - Botão "Detalhes" para aprofundamento.
- **Tecnologia**: `FlatList` com `pagingEnabled`.

### 2. Detalhes (`/details/[id]`)
- **Conceito**: Explicação aprofundada do tópico escolhido.
- **Funcionalidade**:
    - Explicação teórica completa.
    - **Demonstração Interativa**: Um componente real rodando na tela (ex: um contador clicável para `useState`).
    - **Código Completo**: Bloco de código com syntax highlighting.
- **Navegação**: Transição via Stack Navigation.

## 🛠️ Tecnologias Utilizadas

- **Core**: React Native, Expo (SDK 52+).
- **Linguagem**: TypeScript.
- **Navegação**: Expo Router (File-based routing).
- **Interatividade**: 
    - `react-native-reanimated` (Animações).
    - `expo-haptics` / `Vibration` (Feedback tátil).
- **Estilização**: `StyleSheet` (CSS-in-JS nativo).
- **Componentes**: `FlatList` otimizada para vídeos/cards.

## 🚀 Como Rodar o Projeto

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npx expo start
   ```

3. **Teste no dispositivo**:
   - Escaneie o QR Code com o app **Expo Go** (Android/iOS).
   - Ou pressione `a` para abrir no emulador Android.
   - Ou pressione `i` para abrir no simulador iOS.

## 📚 Conceitos Ensinados

1. **Componentes + JSX**: A base da UI declarativa.
2. **useState**: Gerenciamento de estado local.
3. **useEffect**: Ciclo de vida e efeitos colaterais.
4. **StyleSheet**: Estilização e Layout (Flexbox).
5. **APIs Nativas**: Acesso ao hardware (Vibração).

## 📂 Estrutura de Pastas

```
/app
  index.tsx         # Tela Principal (Feed)
  details/[id].tsx  # Tela de Detalhes Dinâmica
  _layout.tsx       # Configuração da Navegação Stack
/components
  FeedItem.tsx      # Slide individual do Feed
  InteractiveDemos.tsx # Demos rodando ao vivo
  CodeBlock.tsx     # Exibição de código formatado
/data
  concepts.ts       # "Banco de dados" estático dos conteúdos
/constants
  theme.ts          # Paleta de cores (Dark Mode/TikTok theme)
```