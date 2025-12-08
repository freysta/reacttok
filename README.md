# ReactTok - Monorepo

ReactTok é um miniapp educacional desenvolvido em React Native com Expo, inspirado no formato "TikTok" (feed vertical) para ensinar conceitos fundamentais de React Native de forma rápida e interativa.

## 🚀 Inicialização do Projeto

### Pré-requisitos
- Node.js (versão 18+)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd Reackt-tok/front/reacttok
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   ```bash
   cd api
   npm install
   npm run migrate
   npm run seed
   cd ..
   ```

4. **Inicie o projeto (comando único):**
   ```bash
   npm start
   ```

   Este comando irá:
   - Iniciar a API backend na porta 3000
   - Iniciar o Expo Metro Bundler
   - Rodar ambos simultaneamente

5. **Acesse o app:**
   - **Web**: Pressione `w` no terminal
   - **Mobile**: Instale o app Expo Go e escaneie o QR code
   - **Emulador**: Pressione `a` (Android) ou `i` (iOS)

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

- **Frontend**: React Native, Expo (SDK 52+), TypeScript
- **Backend**: Node.js, Express, SQLite
- **Navegação**: Expo Router (File-based routing)
- **Interatividade**: 
    - `react-native-reanimated` (Animações)
    - `expo-haptics` / `Vibration` (Feedback tátil)
- **Estilização**: `StyleSheet` (CSS-in-JS nativo)

## 📚 Conceitos Ensinados

1. **Componentes + JSX**: A base da UI declarativa
2. **useState**: Gerenciamento de estado local
3. **useEffect**: Ciclo de vida e efeitos colaterais
4. **StyleSheet**: Estilização e Layout (Flexbox)
5. **FlatList**: Listas performáticas
6. **Navegação**: React Navigation
7. **TextInput**: Entrada de texto
8. **TouchableOpacity**: Botões customizados
9. **APIs Nativas**: Acesso ao hardware (Vibração)

## 📂 Estrutura do Projeto

```
/
├── api/                 # Backend API
│   ├── src/
│   │   ├── controllers/ # Lógica de negócio
│   │   ├── routes/      # Rotas da API
│   │   └── database/    # Migrations e seeds
│   └── package.json
├── app/                 # Frontend React Native
│   ├── index.tsx        # Tela Principal (Feed)
│   └── details/[id].tsx # Tela de Detalhes
├── components/          # Componentes reutilizáveis
├── constants/           # Temas e constantes
└── package.json         # Scripts principais
```

## 🔧 Scripts Disponíveis

### Desenvolvimento
- `npm start` - **Comando principal**: Roda API + Frontend simultaneamente
- `npm run api:dev` - Apenas API (porta 3000)
- `npm run expo:start` - Apenas Frontend (Expo Metro)

### Plataformas
- `npm run web` - Versão web no navegador
- `npm run android` - Android (emulador ou dispositivo)
- `npm run ios` - iOS (apenas no macOS)

### Utilitários
- `npm run lint` - Verificação de código
- `npm test` - Executa testes

### Banco de Dados (dentro da pasta api/)
- `npm run migrate` - Cria tabelas do banco
- `npm run seed` - Popula dados iniciais

## 🌐 URLs e Acesso

### API Backend
- **Base URL**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **Conceitos**: http://localhost:3000/api/concepts

### Frontend
- **Expo Metro**: Disponível após `npm start`
- **Web**: http://localhost:8081 (pressione `w`)
- **Mobile**: Use o app Expo Go + QR code

## 🛠️ Solução de Problemas

### API não conecta
- Verifique se a porta 3000 está livre
- Execute `cd api && npm run migrate && npm run seed`

### Expo não inicia
- Instale o Expo CLI: `npm install -g @expo/cli`
- Limpe o cache: `npx expo start --clear`

### Erro de dependências
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente