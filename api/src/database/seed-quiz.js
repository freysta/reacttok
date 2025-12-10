const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const questions = [
  {
    concept_id: 'jsx',
    question: 'O que o JSX retorna?',
    options: ['HTML puro', 'Objetos JavaScript', 'CSS', 'JSON'],
    correct_option_index: 1,
    explanation: 'JSX é uma extensão de sintaxe para JavaScript que produz "elementos" React, que são objetos JavaScript simples.'
  },
  {
    concept_id: 'state',
    question: 'Qual hook é usado para gerenciar estado em componentes funcionais?',
    options: ['useEffect', 'useContext', 'useState', 'useReducer'],
    correct_option_index: 2,
    explanation: 'useState é o hook fundamental para adicionar estado local a componentes funcionais.'
  },
  {
    concept_id: 'props',
    question: 'As props em React são:',
    options: ['Mutáveis', 'Imutáveis (somente leitura)', 'Globais', 'Assíncronas'],
    correct_option_index: 1,
    explanation: 'Props são somente leitura para o componente que as recebe. Isso garante o fluxo de dados unidirecional.'
  },
  {
    concept_id: 'view',
    question: 'Qual componente é equivalente a uma <div> no React Native?',
    options: ['Text', 'View', 'Container', 'Box'],
    correct_option_index: 1,
    explanation: 'View é o componente container fundamental no React Native, similar à div no desenvolvimento web.'
  },
  {
    concept_id: 'flatlist',
    question: 'Por que usar FlatList em vez de ScrollView para listas longas?',
    options: ['É mais fácil de estilizar', 'Suporta scroll horizontal', 'Virtualiza os itens (melhor performance)', 'Aceita qualquer tipo de dado'],
    correct_option_index: 2,
    explanation: 'FlatList renderiza apenas os itens visíveis na tela, economizando memória e processamento em listas grandes.'
  }
];

db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO questions (concept_id, question, options, correct_option_index, explanation)
    VALUES (?, ?, ?, ?, ?)
  `);

  questions.forEach(q => {
    stmt.run([
      q.concept_id,
      q.question,
      JSON.stringify(q.options),
      q.correct_option_index,
      q.explanation
    ]);
  });

  stmt.finalize();
  console.log(`✅ Seeded ${questions.length} quiz questions.`);
});

db.close();