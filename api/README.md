# ReactTok API

API monolítica para o ReactTok - aplicativo educacional React Native estilo TikTok.

## 🚀 Tecnologias

- **Node.js** + **Express.js** - Framework web
- **SQLite** - Banco de dados SQL leve
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Proteção contra spam

## 📦 Instalação

```bash
cd api
npm install
```

## 🗄️ Configuração do Banco

```bash
# Criar tabelas
npm run migrate

# Popular dados iniciais
npm run seed
```

## 🏃‍♂️ Executar

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

## 📋 Endpoints da API

### Conceitos Educacionais
- `GET /api/concepts` - Listar todos os conceitos
- `GET /api/concepts/:id` - Buscar conceito específico
- `POST /api/concepts` - Criar novo conceito
- `PUT /api/concepts/:id` - Atualizar conceito
- `DELETE /api/concepts/:id` - Deletar conceito

### Usuários
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Perfil do usuário

### Likes
- `POST /api/likes` - Curtir/descurtir conceito
- `GET /api/likes/concept/:conceptId` - Contagem de likes
- `GET /api/likes/user/:userId` - Conceitos curtidos pelo usuário

### Utilitários
- `GET /health` - Health check da API

## 🔒 Segurança

- Rate limiting (100 req/15min por IP)
- Helmet para headers de segurança
- Validação de entrada com express-validator
- Hash de senhas com bcrypt
- JWT para autenticação

## 📊 Estrutura do Banco

### Tabelas:
- **users** - Usuários do app
- **concepts** - Conteúdo educacional
- **likes** - Sistema de curtidas
- **user_progress** - Progresso do usuário

## 🌐 Integração com React Native

O app React Native pode consumir esta API para:
- Buscar conceitos educacionais
- Sistema de autenticação
- Sincronizar likes e progresso
- Dados offline/online