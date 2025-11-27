# 📱 ReactTok - Documentação do Projeto e Guia da Equipe

Este documento serve como guia para o desenvolvimento e apresentação do seminário sobre o App **ReactTok**.

---

## 1. Visão Geral e Funcionamento
O **ReactTok** é um aplicativo educacional que usa a interface familiar de vídeos curtos (estilo TikTok/Reels) para ensinar programação.
- **Feed Infinito:** O usuário desliza para cima/baixo para trocar de "aula" (conceito).
- **Interação:** Botão de curtir (com vibração real) e botão de detalhes.
- **Aprofundamento:** Ao clicar em "Detalhes", o usuário vê uma explicação completa e, o mais importante, uma **demonstração interativa** do código rodando ao vivo.

### Como usar o App (Para a Apresentação)
1.  **Abrir:** O app inicia direto no Feed.
2.  **Navegar:** Deslize o dedo (swipe) para cima para ver o próximo conceito.
3.  **Interagir:** Toque no ❤️ para curtir (sinta a vibração).
4.  **Estudar:** Toque no botão `...` (Detalhes) para abrir a aula completa.
5.  **Testar:** Na tela de detalhes, brinque com a "Demonstração Interativa" (clique nos botões, veja o contador mudar, etc).
6.  **Voltar:** Toque na seta ou deslize para voltar ao Feed.

---

## 2. Arquitetura Técnica (Como funciona o código)

O app foi construído com **React Native (Expo)** usando **TypeScript**.

*   **Navegação (`app/`)**: Usamos o **Expo Router**.
    *   `index.tsx`: É a tela principal. Usa uma `FlatList` com a propriedade `pagingEnabled`. Isso é o que faz a lista "travar" em cada item, criando o efeito de slide/vídeo.
    *   `details/[id].tsx`: É uma rota dinâmica. O `[id]` significa que essa mesma tela carrega conteúdos diferentes baseados no ID do conceito clicado.
*   **Dados (`data/concepts.ts`)**: Aqui fica o "cérebro" do conteúdo. É um array (lista) simples com todo o texto e código que aparece no app. Não usamos banco de dados complexo para facilitar a manutenção.
*   **Estilização (`constants/theme.ts`)**: Um arquivo centralizado com as cores (Preto, Branco e o Rosa do TikTok). Se mudar a cor aqui, muda no app todo.

---

## 3. Divisão de Tarefas (Quem faz o quê?)

Aqui está o guia passo-a-passo para dividir o trabalho entre os integrantes.

### 🧑‍🏫 Colega 1: Responsável pelo Conteúdo (As Aulas)
**Missão:** Adicionar novos conceitos, melhorar as explicações e criar os exemplos práticos.

**Onde você vai mexer:**
1.  `data/concepts.ts` (Texto e Código)
2.  `components/InteractiveDemos.tsx` (O componente que funciona de verdade)

**Passo a Passo para criar uma nova aula:**
1.  Abra `data/concepts.ts`.
2.  Adicione um novo objeto na lista `CONCEPTS`. Exemplo:
    ```typescript
    {
      id: 'novo-conceito', // ID único, sem espaços
      title: 'Nome da Aula',
      desc: 'Resumo curto para o feed.',
      shortCode: `codigo curto...`,
      fullExplanation: 'Texto longo explicando tudo...',
      fullCode: `O código completo...`
    }
    ```
3.  Agora, vá em `components/InteractiveDemos.tsx`.
4.  Crie uma função nova no final do arquivo (ex: `function NovaAulaDemo() { ... }`).
5.  Adicione essa função no `switch` principal lá no topo do arquivo:
    ```typescript
    case 'novo-conceito': return <NovaAulaDemo />;
    ```
6.  Pronto! O novo slide aparecerá automaticamente no app.

---

### 🧑‍💻 Colega 2: Responsável pelos Detalhes (UI/UX e Ajustes)
**Missão:** Melhorar a aparência, ícones, animações e garantir que o app esteja bonito e sem bugs.

**Onde você vai mexer:**
1.  `components/FeedItem.tsx` (O visual de cada slide)
2.  `app/details/[id].tsx` (A tela de leitura)
3.  `constants/theme.ts` (Cores)

**Sugestões de tarefas para você:**
*   **Ícones:** Trocar os ícones do `Ionicons` em `FeedItem.tsx` por outros que façam mais sentido se necessário.
*   **Layout:** Ajustar o tamanho da fonte ou espaçamento em `styles` dentro de `FeedItem.tsx` se o texto estiver cortando em celulares pequenos.
*   **Cores:** Se quiser mudar o "Rosa TikTok" para outra cor (ex: Azul da empresa/escola), vá em `constants/theme.ts` e mude o `tint` e `accent`.
*   **Animação:** Tentar adicionar uma animação simples no coração quando curte (usando `react-native-reanimated`).
*   **Cabeçalho:** Melhorar o botão de "Voltar" na tela de detalhes.

---

## 4. Comandos Úteis para a Equipe

*   `npm install`: Instala as dependências (faça isso assim que baixar o projeto).
*   `npx expo start`: Roda o projeto.
    *   Aperte `w` para abrir no navegador (visualização limitada).
    *   Aperte `i` para abrir no simulador de iPhone (se estiver no Mac).
    *   Aperte `a` para abrir no emulador Android.
    *   **Melhor opção:** Instale o app **Expo Go** no seu celular físico e escaneie o QR Code.
