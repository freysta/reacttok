const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const questions = [
  // --- REACT CORE (JSX) ---
  {
    concept_id: 'jsx',
    question: 'O que é JSX?',
    options: ['Uma linguagem de banco de dados', 'Uma extensão de sintaxe para JavaScript', 'Um framework CSS', 'Um compilador de código'],
    correct_option_index: 1,
    explanation: 'JSX é uma extensão de sintaxe para JavaScript que permite escrever estruturas tipo HTML dentro do código JS.'
  },
  {
    concept_id: 'jsx',
    question: 'O navegador entende JSX nativamente?',
    options: ['Sim, todos os navegadores modernos', 'Não, precisa ser transpilado (ex: Babel)', 'Apenas o Chrome', 'Apenas no modo de desenvolvedor'],
    correct_option_index: 1,
    explanation: 'Navegadores não entendem JSX. Ferramentas como Babel transformam JSX em chamadas de função JavaScript padrão (React.createElement).'
  },
  {
    concept_id: 'jsx',
    question: 'Como você insere uma variável JavaScript dentro do JSX?',
    options: ['Usando aspas duplas ""', 'Usando chaves {}', 'Usando colchetes []', 'Usando parênteses ()'],
    correct_option_index: 1,
    explanation: 'Chaves {} são usadas para "escapar" para o JavaScript dentro do JSX, permitindo inserir variáveis, funções ou expressões.'
  },
  
  // --- PROPS ---
  {
    concept_id: 'props',
    question: 'Props são:',
    options: ['Mutáveis pelo componente filho', 'Variáveis globais', 'Imutáveis (somente leitura)', 'Funções assíncronas'],
    correct_option_index: 2,
    explanation: 'Props são somente leitura. Um componente nunca deve modificar suas próprias props.'
  },
  {
    concept_id: 'props',
    question: 'Como passar uma prop chamada "nome" com valor "Ana"?',
    options: ['<Component nome="Ana" />', '<Component {nome: "Ana"} />', '<Component: "Ana" />', '<Component value="Ana" />'],
    correct_option_index: 0,
    explanation: 'A sintaxe correta é passar como um atributo HTML: nome="Ana".'
  },
  {
    concept_id: 'props',
    question: 'Props servem para:',
    options: ['Guardar estado interno', 'Passar dados de pai para filho', 'Fazer chamadas API', 'Estilizar componentes'],
    correct_option_index: 1,
    explanation: 'O principal propósito das props é a comunicação de dados do componente pai para o componente filho.'
  },

  // --- USESTATE ---
  {
    concept_id: 'state',
    question: 'O que o useState retorna?',
    options: ['Apenas o valor do estado', 'Uma função de atualização', 'Um array com [valor, funçãoDeAtualização]', 'Um objeto { state, setState }'],
    correct_option_index: 2,
    explanation: 'useState retorna um array onde o primeiro elemento é o valor atual e o segundo é a função para atualizar esse valor.'
  },
  {
    concept_id: 'state',
    question: 'Quando o estado muda, o que acontece?',
    options: ['Nada', 'O componente é desmontado', 'O componente renderiza novamente', 'A página recarrega'],
    correct_option_index: 2,
    explanation: 'Qualquer mudança de estado (state) dispara uma re-renderização do componente para refletir as mudanças na UI.'
  },
  {
    concept_id: 'state',
    question: 'Como atualizar o estado baseado no valor anterior?',
    options: ['setState(valor + 1)', 'setState(prev => prev + 1)', 'state = state + 1', 'updateState(valor)'],
    correct_option_index: 1,
    explanation: 'A forma correta e segura é passar uma função callback para o setter, que recebe o valor anterior como argumento.'
  },

  // --- USEEFFECT ---
  {
    concept_id: 'effect',
    question: 'Para que serve o useEffect?',
    options: ['Criar estado', 'Gerenciar rotas', 'Lidar com efeitos colaterais', 'Renderizar HTML'],
    correct_option_index: 2,
    explanation: 'useEffect é usado para efeitos colaterais como chamadas de API, subscriptions, timers e manipulação direta do DOM.'
  },
  {
    concept_id: 'effect',
    question: 'O que o array de dependências vazio [] faz?',
    options: ['Executa o efeito a cada renderização', 'Executa o efeito apenas uma vez (na montagem)', 'Nunca executa o efeito', 'Executa quando o componente desmonta'],
    correct_option_index: 1,
    explanation: 'Um array de dependências vazio [] diz ao React que o efeito não depende de nenhum valor das props ou estado, então ele executa apenas uma vez.'
  },
  {
    concept_id: 'effect',
    question: 'O retorno de uma função no useEffect serve para:',
    options: ['Atualizar o estado', 'Retornar JSX', 'Limpeza (cleanup) quando o componente desmonta', 'Nenhuma função'],
    correct_option_index: 2,
    explanation: 'A função retornada é executada quando o componente é desmontado ou antes de re-executar o efeito, usada para limpar timers ou subscriptions.'
  },

  // --- USECONTEXT ---
  {
    concept_id: 'use-context',
    question: 'O Context API resolve qual problema?',
    options: ['Performance lenta', 'Prop Drilling', 'Falta de tipagem', 'Renderização excessiva'],
    correct_option_index: 1,
    explanation: 'Context evita "Prop Drilling", que é passar props manualmente por muitos níveis de componentes apenas para chegar a um componente profundo.'
  },
  {
    concept_id: 'use-context',
    question: 'Qual componente fornece o valor do contexto?',
    options: ['<Context.Consumer>', '<Context.Provider>', '<Context.Value>', '<Context.Store>'],
    correct_option_index: 1,
    explanation: 'O Provider envolve os componentes que precisam acessar o contexto e aceita uma prop "value".'
  },

  // --- USEREF ---
  {
    concept_id: 'use-ref',
    question: 'useRef causa re-renderização quando seu valor muda?',
    options: ['Sim, sempre', 'Não', 'Apenas se for um objeto', 'Depende do navegador'],
    correct_option_index: 1,
    explanation: 'Alterar a propriedade .current de um ref NÃO dispara uma nova renderização. É útil para valores mutáveis que não afetam a visualização.'
  },
  {
    concept_id: 'use-ref',
    question: 'Qual é o uso comum de useRef?',
    options: ['Gerenciar formulários controlados', 'Acessar elementos imperativamente', 'Substituir useState', 'Fazer loopings'],
    correct_option_index: 1,
    explanation: 'useRef é frequentemente usado para acessar métodos imperativos de componentes ou elementos nativos (como .focus() em um input).'
  },

  // --- VIEW ---
  {
    concept_id: 'view',
    question: 'Qual a tag HTML equivalente a View?',
    options: ['<span>', '<p>', '<div>', '<img>'],
    correct_option_index: 2,
    explanation: 'View é o bloco de construção fundamental de layout, análogo à <div> no desenvolvimento web.'
  },
  {
    concept_id: 'view',
    question: 'Por padrão, qual é a direção do Flexbox numa View?',
    options: ['row (linha)', 'column (coluna)', 'grid', 'inline'],
    correct_option_index: 1,
    explanation: 'No React Native, o flexDirection padrão é "column", ao contrário da web onde é "row".'
  },

  // --- TEXT ---
  {
    concept_id: 'text',
    question: 'Onde strings podem ser renderizadas no React Native?',
    options: ['Soltas dentro de View', 'Apenas dentro de componentes <Text>', 'Em qualquer lugar', 'Dentro de console.log'],
    correct_option_index: 1,
    explanation: 'No React Native, texto cru deve estar sempre envolvido por um componente <Text>. Colocar texto solto numa View gera erro.'
  },
  {
    concept_id: 'text',
    question: 'O componente Text suporta aninhamento?',
    options: ['Não', 'Sim, para herdar estilos', 'Apenas no Android', 'Apenas no iOS'],
    correct_option_index: 1,
    explanation: 'Sim, componentes Text podem ser aninhados. O texto interno herda os estilos do texto pai (como cor e fonte).'
  },

  // --- FLATLIST ---
  {
    concept_id: 'flatlist',
    question: 'Qual a principal vantagem da FlatList sobre ScrollView?',
    options: ['Sintaxe mais simples', 'Melhor performance (virtualização)', 'Suporta imagens', 'Não precisa de chaves'],
    correct_option_index: 1,
    explanation: 'FlatList renderiza apenas os itens que estão visíveis na tela, economizando memória em listas longas.'
  },
  {
    concept_id: 'flatlist',
    question: 'Qual prop é obrigatória para renderizar os itens?',
    options: ['items', 'source', 'data e renderItem', 'list'],
    correct_option_index: 2,
    explanation: 'FlatList exige a prop "data" (array de dados) e "renderItem" (função que retorna o componente visual).'
  },
  {
    concept_id: 'flatlist',
    question: 'Para que serve keyExtractor?',
    options: ['Extrair a cor do item', 'Definir uma chave única para cada item', 'Remover itens duplicados', 'Filtrar a lista'],
    correct_option_index: 1,
    explanation: 'keyExtractor diz ao React como identificar cada item de forma única, essencial para a performance de atualizações da lista.'
  },

  // --- STYLESHEET ---
  {
    concept_id: 'style',
    question: 'Por que usar StyleSheet.create?',
    options: ['É obrigatório', 'Permite usar CSS puro', 'Valida estilos e melhora performance', 'Cria animações'],
    correct_option_index: 2,
    explanation: 'Embora objetos simples funcionem, StyleSheet.create valida as propriedades em tempo de execução e pode oferecer otimizações internas.'
  },
  {
    concept_id: 'style',
    question: 'React Native usa CSS?',
    options: ['Sim, arquivos .css', 'Não, usa objetos JavaScript com nomes parecidos', 'Usa SASS', 'Usa Bootstrap'],
    correct_option_index: 1,
    explanation: 'Não existe CSS (cascading style sheets) no React Native. Usa-se JavaScript para estilizar, com propriedades camelCase (ex: backgroundColor em vez de background-color).'
  },

  // --- FLEXBOX ---
  {
    concept_id: 'flexbox',
    question: 'O que justifyContent faz?',
    options: ['Alinha no eixo transversal', 'Alinha no eixo principal', 'Muda a cor de fundo', 'Define o tamanho da fonte'],
    correct_option_index: 1,
    explanation: 'justifyContent controla o alinhamento ao longo do eixo principal (definido por flexDirection).'
  },
  {
    concept_id: 'flexbox',
    question: 'O que alignItems faz?',
    options: ['Alinha no eixo transversal', 'Alinha no eixo principal', 'Centraliza texto', 'Nada'],
    correct_option_index: 0,
    explanation: 'alignItems controla o alinhamento no eixo transversal (perpendicular ao eixo principal).'
  },
  {
    concept_id: 'flexbox',
    question: 'Para ocupar todo o espaço disponível, usamos:',
    options: ['width: "100%"', 'flex: 1', 'height: 1000', 'display: block'],
    correct_option_index: 1,
    explanation: 'flex: 1 faz com que o componente expanda para preencher todo o espaço disponível dentro do seu container flex.'
  },

  // --- NAVIGATION ---
  {
    concept_id: 'navigation',
    question: 'Como navegar para outra tela?',
    options: ['router.push()', 'window.location', 'navigation.navigate("NomeDaTela")', 'redirect()'],
    correct_option_index: 2,
    explanation: 'A função navigation.navigate() é o método padrão do React Navigation para transitar entre rotas definidas.'
  },
  {
    concept_id: 'navigation',
    question: 'O que é uma Stack Navigator?',
    options: ['Menu lateral', 'Abas inferiores', 'Pilha de telas (uma sobre a outra)', 'Lista de itens'],
    correct_option_index: 2,
    explanation: 'Stack Navigator gerencia a navegação como uma pilha de cartas, onde novas telas são colocadas no topo e o botão "voltar" remove a carta do topo.'
  },

  // --- TOUCHABLE / PRESSABLE ---
  {
    concept_id: 'touchable',
    question: 'Qual é o sucessor moderno do TouchableOpacity?',
    options: ['Button', 'Pressable', 'ClickableView', 'Div'],
    correct_option_index: 1,
    explanation: 'Pressable é o componente mais novo e flexível para lidar com toques, oferecendo acesso ao estado da interação (pressed, hovered).'
  },
  {
    concept_id: 'touchable',
    question: 'O que o TouchableOpacity faz visualmente ao ser tocado?',
    options: ['Fica vermelho', 'Aumenta de tamanho', 'Diminui a opacidade', 'Toca um som'],
    correct_option_index: 2,
    explanation: 'Como o nome sugere, ele reduz a opacidade do componente filho para dar feedback visual de toque.'
  },

  // --- ACTIVITY INDICATOR ---
  {
    concept_id: 'activityindicator',
    question: 'ActivityIndicator serve para:',
    options: ['Mostrar progresso em %', 'Indicar carregamento (spinner)', 'Mostrar bateria', 'Navegação'],
    correct_option_index: 1,
    explanation: 'Ele renderiza o spinner nativo do sistema operacional (círculo giratório) para indicar que algo está carregando.'
  },

  // --- MODAL ---
  {
    concept_id: 'modal',
    question: 'O componente Modal cobre:',
    options: ['Apenas o componente pai', 'A tela inteira', 'O cabeçalho', 'O rodapé'],
    correct_option_index: 1,
    explanation: 'O Modal é renderizado acima de todo o conteúdo da aplicação, cobrindo a tela inteira (ou parte dela, dependendo do estilo).'
  },
  
  // --- TEXTINPUT ---
  {
    concept_id: 'textinput',
    question: 'Como pegar o texto digitado num TextInput?',
    options: ['onClick', 'onChange', 'onChangeText', 'onType'],
    correct_option_index: 2,
    explanation: 'onChangeText é a prop que recebe uma função callback, passando o texto novo como string simples a cada alteração.'
  },
  {
    concept_id: 'textinput',
    question: 'Para esconder a senha digitada, usamos:',
    options: ['type="password"', 'secureTextEntry={true}', 'hidden={true}', 'mode="secret"'],
    correct_option_index: 1,
    explanation: 'secureTextEntry é a propriedade booleana que mascara os caracteres digitados.'
  },

  // --- IMAGE ---
  {
    concept_id: 'image',
    question: 'Imagens remotas (URL) precisam obrigatoriamente de:',
    options: ['Borda', 'Dimensões (width/height)', 'Formato PNG', 'Legenda'],
    correct_option_index: 1,
    explanation: 'Diferente da web, o React Native não calcula o tamanho da imagem antes de baixar. Você deve especificar width e height para imagens remotas.'
  },
  {
    concept_id: 'image',
    question: 'Qual propriedade define o caminho da imagem?',
    options: ['src', 'href', 'source', 'url'],
    correct_option_index: 2,
    explanation: 'A propriedade correta é "source", que aceita um require() local ou um objeto { uri: ... }.'
  },

  // --- DIMENSIONS ---
  {
    concept_id: 'dimensions',
    question: 'O que Dimensions.get("window") retorna?',
    options: ['O tamanho da janela do navegador', 'As dimensões da tela do dispositivo', 'O tamanho do elemento pai', 'O tamanho da fonte padrão'],
    correct_option_index: 1,
    explanation: 'Retorna um objeto com largura (width) e altura (height) da tela visível do dispositivo.'
  },
  {
    concept_id: 'dimensions',
    question: 'Qual a limitação do Dimensions API?',
    options: ['Não funciona no Android', 'Não atualiza automaticamente ao girar a tela (em versões antigas)', 'Retorna valores em polegadas', 'Só funciona em tablets'],
    correct_option_index: 1,
    explanation: 'Dimensions é imperativo. Para layouts que mudam com a rotação, hooks como useWindowDimensions são preferíveis pois atualizam automaticamente.'
  },

  // --- PLATFORM ---
  {
    concept_id: 'platform',
    question: 'Como verificar se o OS é iOS?',
    options: ['Platform.isIOS', 'Platform.OS === "ios"', 'Platform.check("ios")', 'isIphone()'],
    correct_option_index: 1,
    explanation: 'Platform.OS retorna uma string ("ios", "android", "web") identificando o sistema operacional.'
  },
  {
    concept_id: 'platform',
    question: 'O Platform.select() serve para:',
    options: ['Selecionar arquivos do sistema', 'Selecionar elementos na tela', 'Retornar valores diferentes baseados na plataforma', 'Escolher a versão do React'],
    correct_option_index: 2,
    explanation: 'Ele aceita um objeto com chaves "ios", "android", "default" e retorna o valor correspondente à plataforma atual.'
  },

  // --- LINKING ---
  {
    concept_id: 'linking',
    question: 'Para abrir um site externo, usamos:',
    options: ['window.open()', 'Linking.openURL()', 'Navigation.push()', 'Browser.open()'],
    correct_option_index: 1,
    explanation: 'Linking.openURL(url) tenta abrir a URL no aplicativo padrão do sistema (navegador, email, telefone).'
  },
  {
    concept_id: 'linking',
    question: 'Como iniciar uma chamada telefônica?',
    options: ['Phone.call()', 'Linking.openURL("tel:12345")', 'Call.number("12345")', 'Linking.call("12345")'],
    correct_option_index: 1,
    explanation: 'O esquema "tel:" na URL instrui o sistema a abrir o discador com o número especificado.'
  },

  // --- ANIMATED ---
  {
    concept_id: 'animated',
    question: 'Por que usar useNativeDriver: true?',
    options: ['É obrigatório', 'Para rodar a animação na UI thread (nativa) evitando gargalos no JS', 'Para animar cores', 'Para suportar drivers de som'],
    correct_option_index: 1,
    explanation: 'Isso move a lógica da animação para o lado nativo, garantindo fluidez mesmo se a thread JS estiver travada.'
  },
  {
    concept_id: 'animated',
    question: 'Qual função inicia a animação?',
    options: ['.run()', '.play()', '.start()', '.go()'],
    correct_option_index: 2,
    explanation: 'Métodos como Animated.timing() retornam um objeto de animação que precisa chamar .start() para efetivamente começar.'
  },

  // --- STATUSBAR ---
  {
    concept_id: 'statusbar',
    question: 'O componente StatusBar afeta:',
    options: ['A barra de navegação inferior', 'A barra de status do sistema (bateria, hora)', 'O título do app', 'O modal'],
    correct_option_index: 1,
    explanation: 'Controla a visibilidade e o estilo (ícones claros ou escuros) da barra superior onde ficam hora, bateria e sinal.'
  },

  // --- SAFEAREAVIEW ---
  {
    concept_id: 'safearea',
    question: 'SafeAreaView é essencial para:',
    options: ['Proteger dados do usuário', 'Evitar que conteúdo fique atrás de notches e barras virtuais', 'Criptografar o app', 'Melhorar performance'],
    correct_option_index: 1,
    explanation: 'Em dispositivos modernos com "notch" (recorte) ou barras de gestos, SafeAreaView adiciona padding automático para manter o conteúdo visível.'
  },

  // --- REFRESHCONTROL ---
  {
    concept_id: 'refresh',
    question: 'RefreshControl é usado dentro de qual componente?',
    options: ['View', 'Text', 'ScrollView / FlatList', 'Modal'],
    correct_option_index: 2,
    explanation: 'Ele é passado via prop "refreshControl" especificamente para componentes de rolagem como ScrollView e FlatList.'
  }
];

db.serialize(() => {
  // Limpar perguntas antigas para evitar duplicatas excessivas neste seed simples
  db.run('DELETE FROM questions');

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
  console.log(`✅ Seeded ${questions.length} quiz questions covering all major topics.`);
});

db.close();