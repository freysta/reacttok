# 📱 ReactTok

**ReactTok** é uma aplicação móvel educativa estilo "TikTok" desenvolvida para ensinar conceitos fundamentais de **React Native** de forma rápida, visual e interativa.

> 🎓 **Projeto Acadêmico**
>
> Desenvolvido para a disciplina de **Dispositivos Móveis** do **IFRO - Campus Ji-Paraná**.
>
> **Desenvolvedores:**
> - Anderson Felipe Garcia Lopes
> - Gabriel Lucena Ferreira
> - Pedro Henrique

---

## ✨ Funcionalidades

- **Feed Infinito**: Role para baixo para descobrir novos conceitos (Hooks, Componentes, APIs).
- **Micro-Learning**: Explicações concisas com exemplos de código reais e coloridos.
- **Quiz Interativo**: Teste seus conhecimentos em diferentes categorias (Hooks, Core, Native).
- **Gamificação**: Sistema de pontuação e feedback imediato no Quiz.
- **Interação Social**: Curta (❤️) e Salve (📚) seus conceitos favoritos.
- **Conceito do Dia**: Uma recomendação diária para manter o hábito de estudo.

---

## 🛠 Tecnologias Utilizadas

### Frontend (Mobile)
- **React Native** com **Expo**
- **TypeScript** (Tipagem estática)
- **Expo Router** (Navegação baseada em arquivos)
- **Context API** (Gerenciamento de estado global)
- **React Syntax Highlighter** (Visualização de código)

### Backend (API)
- **Node.js** & **Express**
- **SQLite** (Banco de dados relacional leve)
- **API RESTful**

---

## 🚀 Como Rodar o Projeto

Este projeto é dividido em duas partes: **API** (Backend) e **App** (Frontend). Ambas precisam estar rodando simultaneamente.

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [Expo Go](https://expo.dev/client) instalado no seu celular (Android/iOS) ou um emulador configurado.

### 1. Configurando o Backend (API)

Abra um terminal na raiz do projeto e execute:

```bash
# Entre na pasta da API
cd api

# Instale as dependências
npm install

# Crie o banco de dados e as tabelas
npm run migrate

# Popule o banco com dados iniciais (Conceitos e Perguntas)
npm run seed

# Popule com dados extras e o quiz completo
node src/database/seed-extra.js
node src/database/seed-quiz-full.js

# Inicie o servidor
npm start
```

> A API estará rodando em `http://localhost:3000`. Mantenha este terminal aberto.

### 2. Configurando o Frontend (App)

Abra **outro** terminal na raiz do projeto e execute:

```bash
# Instale as dependências do projeto
npm install

# Inicie o Expo
npx expo start
```

### 3. Testando no Celular

1. Com o comando acima rodando, um **QR Code** aparecerá no terminal.
2. Abra o app **Expo Go** no seu celular.
3. Escaneie o QR Code.
4. **Importante:** Certifique-se de que seu celular e seu computador estejam na **mesma rede Wi-Fi**.

---

## 📂 Estrutura do Projeto

```
reacttok/
├── app/                 # Telas e Rotas (Expo Router)
│   ├── index.tsx        # Feed Principal
│   ├── quiz.tsx         # Tela de Quiz
│   └── details/[id].tsx # Detalhes do Conceito
├── components/          # Componentes Reutilizáveis (FeedItem, CodeBlock...)
├── context/             # Estados Globais (Auth, Concepts)
├── services/            # Comunicação com API
├── api/                 # Backend Node.js
│   ├── src/
│   │   ├── controllers/ # Lógica das rotas
│   │   ├── database/    # Scripts de Migração e Seeds
│   │   └── routes/      # Definição de endpoints
│   └── database.sqlite  # Arquivo do banco de dados
└── types/               # Definições de Tipos TypeScript
```

---

## 📝 Notas de Desenvolvimento

- **Conexão API**: O frontend detecta automaticamente o IP da sua máquina via `expo-constants` para conectar à API local. Não é necessário configurar IPs manualmente.
- **Banco de Dados**: O arquivo `database.sqlite` é criado automaticamente dentro da pasta `api/`. Se precisar resetar tudo, basta apagar esse arquivo e rodar `npm run migrate` e `npm run seed` novamente.

---

Feito com 💜 e React Native.
