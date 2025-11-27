# 📱 ReactTok (v2.0)

**ReactTok** é uma plataforma educacional mobile (estilo TikTok) para ensino de React Native.
O projeto combina UX moderna (feed infinito vertical) com ferramentas de produtividade (favoritos, criação de conteúdo).

---

## 🚀 Funcionalidades Principais

### 1. Feed Infinito (`Home`)
*   **Navegação:** Swipe vertical (cima/baixo) infinito.
*   **Conteúdo:** Cards de tela cheia com explicações rápidas e snippets de código.
*   **Interação:**
    *   ❤️ **Curtir:** Feedback tátil (Vibração).
    *   💬 **Compartilhar:** Envia o código via WhatsApp/Telegram.
    *   🔖 **Salvar:** Persiste o conteúdo nos favoritos.
    *   ... **Detalhes:** Abre aula completa + Demonstração Interativa.

### 2. Criação de Conteúdo (`Create`)
*   **Publicação:** Usuários podem criar seus próprios slides.
*   **Editor:** Formulário para Título, Resumo e Código.
*   **Simulação:** Loading de upload realista (3s) e feedback visual.
*   **Hot Update:** O novo slide aparece imediatamente no Feed.

### 3. Perfil do Usuário (`Profile`)
*   **Dashboard:** Estatísticas (Seguidores, Likes).
*   **Meus Favoritos:** Lista integrada de todos os itens salvos (persiste mesmo fechando o app via `AsyncStorage`).

---

## 🛠️ Stack Tecnológica

*   **Core:** React Native + Expo SDK 52.
*   **Linguagem:** TypeScript.
*   **Navegação:** Expo Router (File-based).
*   **Estado Global:** Context API (`ConceptsContext`).
*   **Persistência:** `AsyncStorage` (Favoritos).
*   **UI/UX:** `react-native-reanimated`, `expo-haptics`, `FlatList` otimizada.

---

## 📂 Estrutura do Projeto

```
/app
  index.tsx         # Feed Principal (Infinite Scroll)
  profile.tsx       # Perfil + Lista de Favoritos
  create.tsx        # Formulário de Criação (Novo Slide)
  details/[id].tsx  # Aula Completa + Demo Interativa
/components
  FeedItem.tsx      # Card do Feed (Likes, Share, Bookmark)
  InteractiveDemos  # Componentes reais rodando nas aulas
/context
  ConceptsContext   # Gerencia a lista de vídeos (Feed + Novos)
/hooks
  useBookmarks      # Lógica de salvar/remover favoritos
/data
  concepts.ts       # Dados iniciais (Seed)
```

## 🚀 Como Rodar

1.  **Instale as dependências**:
    ```bash
    npm install
    ```
2.  **Inicie o projeto**:
    ```bash
    npx expo start
    ```
3.  **Abra no Celular**: Escaneie o QR Code com o app **Expo Go**.

---

## 🔮 Próximos Passos (Roadmap Backend)
O time de Backend está desenvolvendo a API REST para persistência em nuvem.
Consulte o arquivo `ESPECIFICACAO_BACKEND.md` para detalhes da integração.
