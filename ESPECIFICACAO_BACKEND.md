# 🚀 Especificação da API Backend - ReactTok

Este documento serve como guia para o desenvolvimento do Backend do projeto **ReactTok**.
O objetivo é substituir os dados "mockados" (fixos) do aplicativo por uma API real.

---

## 🛠️ Tecnologias Sugeridas
Vocês têm liberdade para escolher, mas aqui vai a recomendação para rapidez e facilidade:
*   **Linguagem:** Node.js (com Express ou NestJS) ou Python (FastAPI).
*   **Banco de Dados:** MongoDB (NoSQL é perfeito para guardar JSON de código) ou PostgreSQL.
*   **Hospedagem Grátis:** Render.com, Railway ou Vercel (para Serverless).

---

## 📦 Modelo de Dados (Banco de Dados)

Precisamos de uma coleção/tabela chamada `concepts` (ou `videos`).

### Estrutura do Objeto (Schema)
Cada "aula" deve ter os seguintes campos:

| Campo | Tipo | Obrigatório? | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | String / UUID | Sim | Identificador único. |
| `title` | String | Sim | Título do conceito (Ex: "useState"). |
| `desc` | String | Sim | Descrição curta que aparece no feed. |
| `shortCode` | String (Texto Longo) | Sim | O código que aparece no card do feed. |
| `fullExplanation`| String (Texto Longo) | Sim | Explicação detalhada para a tela de Detalhes. |
| `fullCode` | String (Texto Longo) | Sim | Código completo para a tela de Detalhes. |
| `likes` | Number | Não (Default 0) | Quantidade de curtidas (para o futuro). |

---

## 🔌 Endpoints da API (Rotas)

O app React Native vai chamar essas URLs. O formato de resposta **precisa ser JSON**.

### 1. Listar Feed (GET)
Retorna todos os conceitos para preencher o feed infinito.

*   **Rota:** `GET /concepts`
*   **Resposta (Status 200):**
    ```json
    [
      {
        "id": "1",
        "title": "Componentes",
        "desc": "Blocos de construção da UI.",
        "shortCode": "function App() { return <View /> }",
        "fullExplanation": "Explicação longa aqui...",
        "fullCode": "import React from 'react'"
      },
      {
        "id": "2",
        "title": "useState",
        ...
      }
    ]
    ```

### 2. Criar Novo Slide (POST)
Usado quando o usuário clica em "Publicar" no app.

*   **Rota:** `POST /concepts`
*   **Body (JSON):**
    ```json
    {
      "title": "Novo Conceito",
      "desc": "Uma descrição legal",
      "shortCode": "const a = 1;",
      "fullExplanation": "Uma descrição legal",
      "fullCode": "const a = 1;"
    }
    ```
*   **Resposta (Status 201):** Retornar o objeto criado com o `id`.

---

## 💡 Dicas para os Devs Backend

1.  **CORS:** Não esqueçam de habilitar o CORS (`app.use(cors())` no Express) para aceitar requisições de qualquer origem, senão o app no celular pode ser bloqueado.
2.  **Delay:** A API deve ser rápida, mas lembrem-se que rodando localmente (`localhost:3000`), o emulador Android deve acessar via `http://10.0.2.2:3000` e o iPhone via `http://localhost:3000` ou IP da máquina (`192.168.x.x`).
3.  **Imagens:** Por enquanto não estamos enviando imagens, apenas Texto e Código.

---

## 🧪 Exemplo de Dados para Popular o Banco (Seed)

Podem usar este JSON para criar os primeiros registros no banco:

```json
[
  {
    "title": "Componentes + JSX",
    "desc": "A base de tudo: Funções que retornam UI.",
    "shortCode": "function Hello() {\n  return <Text>Olá!</Text>\n}",
    "fullExplanation": "Em React Native, componentes são funções JavaScript que retornam JSX...",
    "fullCode": "import React from 'react';\nimport { Text, View } from 'react-native';..."
  },
  {
    "title": "useState",
    "desc": "Memória do componente.",
    "shortCode": "const [count, setCount] = useState(0);",
    "fullExplanation": "O Hook useState permite adicionar estado ao componente...",
    "fullCode": "import React, { useState } from 'react';..."
  }
]
```