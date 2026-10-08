export type Shape = 'rect' | 'diamond' | 'circle';

export const site = {
  name: 'Lucas Schünemann',
  handle: 'lucas von',
  role: 'Product designer',
  focus: 'UX/UI',
  city: 'Blumenau, SC',
  coords: '26°55′S 49°04′W',
  timezone: 'America/Sao_Paulo',
  email: 'lucas.vhschunemann@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-von-helden/',
  instagram: 'https://www.instagram.com/lucasvonhelden/',
  status: 'Aberto a projetos freelance',
  description:
    'Lucas Schünemann, product designer com foco em UX/UI em Blumenau, SC. Co-fundador e CPO da neth!, UX/UI designer na Área Central e freelancer em produtos e sites.',
};

export const heroWords = ['complexos.', 'de dados.', 'de saúde.', 'em escala.'];

export const clients = [
  'Acompanha',
  'Área Central',
  'neth!',
  'Sendeski Café',
  'WF Odontologia',
  'MetaCumprida',
  'PF Advogados',
];

export const bio = [
  'Sou product designer com foco em UX/UI, co-fundador e CPO da neth!, uma startup de saúde e bem-estar digital.',
  'No meu trabalho principal sou UX/UI designer na Área Central. Liderei a criação de um design system multiplataforma que unificou padrões visuais e de interação entre vários produtos, encurtando o caminho do design até o desenvolvimento. Também reestruturei o fluxo de visualização de documentos de uma plataforma complexa, reduzindo atrito nas telas principais e aumentando a conclusão das tarefas.',
  'Na neth! cuido da direção de produto, da prototipação em Figma, do roadmap e da gestão do time de desenvolvimento.',
  'Em paralelo pego projetos freelance B2B e B2C, na maioria plataformas de inteligência de dados e sites. Vou do discovery e do mapeamento de jornada até a interface em alta fidelidade, pronta para desenvolvimento.',
];

export const facts: [string, string][] = [
  ['Função', 'Product designer, foco em UX/UI'],
  ['Hoje', 'CPO e co-fundador na neth!'],
  ['Também', 'UX/UI designer na Área Central'],
  ['Formação', 'Interaction Design Foundation'],
  ['Local', 'Blumenau, Santa Catarina (GMT-3)'],
  ['Situação', 'Aberto a projetos freelance'],
];

export const numbers: { value: number; suffix: string; label: string }[] = [
  { value: 4, suffix: '+', label: 'anos desenhando produtos' },
  { value: 15, suffix: '+', label: 'projetos entregues' },
];

export const services: {
  title: string;
  serif: string;
  shape: Shape;
  tone: 'green' | 'yellow' | 'blue';
  items: string[];
}[] = [
  {
    title: 'Produto',
    serif: 'pesquisa & fluxo',
    shape: 'rect',
    tone: 'green',
    items: [
      'Pesquisa de UX e validação de hipóteses',
      'Arquitetura de informação e estruturação de fluxos',
    ],
  },
  {
    title: 'Interface',
    serif: 'sistema & detalhe',
    shape: 'diamond',
    tone: 'yellow',
    items: [
      'Prototipação em média e alta fidelidade no Figma',
      'Design systems e consistência entre produtos',
    ],
  },
  {
    title: 'Web',
    serif: 'código & entrega',
    shape: 'circle',
    tone: 'blue',
    items: [
      'Sites em Framer com código customizado',
      'Handoff e colaboração próxima com desenvolvedores',
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  color: string;
  ink: 'light' | 'dark';
  shape: Shape;
  type: string;
  service: string;
  client: string;
  industry: string;
  when: string;
  year: string;
  tools: string;
  link?: string;
  summary: string;
  body: string[];
  lists: { title: string; items: string[] }[];
  images: { src: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: 'acompanha',
    name: 'Acompanha',
    color: '#ff6a2b',
    ink: 'dark',
    shape: 'diamond',
    type: 'Produto',
    service: 'Design de produto',
    client: 'Acompanha',
    industry: 'Materiais de construção',
    when: '2025 a 2026',
    year: '2025—26',
    tools: 'Figma',
    summary:
      'SaaS que mostra para lojas de material de construção se elas estão comprando bem.',
    body: [
      'O produto acompanha preço e demanda do mercado regional e compara com o que a loja está de fato pagando, para mostrar se a compra dela está boa ou não. Entrei nele para desenhar as telas e os fluxos que hoje seguem para desenvolvimento. A tela de produto, por exemplo, passou por várias versões inteiras até fechar num layout de coluna única com indicadores de confiança nos dados, num vocabulário visual próximo do Linear.',
      'Um dos módulos que desenhei transforma a Reforma Tributária brasileira em oportunidade de produto: um motor de créditos que simula a transição de PIS/COFINS/ICMS/ISS para CBS/IBS, com um simulador editável na própria tela em vez de um cenário fixo. Também fiz o módulo de Educação do produto.',
    ],
    lists: [
      {
        title: 'O que eu desenhei',
        items: [
          'Telas e fluxos principais, hoje em desenvolvimento',
          'A tela de produto, refeita várias vezes até chegar numa coluna única com indicadores de confiança nos dados',
          'O motor de créditos da Reforma Tributária, com um simulador editável na própria tela',
          'O módulo de Educação',
        ],
      },
    ],
    images: [],
  },
  {
    slug: 'acronos',
    name: 'Acronos',
    color: '#3d5bff',
    ink: 'light',
    shape: 'rect',
    type: 'Interface, design system',
    service: 'Design system',
    client: 'Área Central',
    industry: 'Software',
    when: 'Fevereiro de 2025',
    year: '2025',
    tools: 'Figma, design tokens',
    link: 'https://acronosds.framer.website',
    summary:
      'Sistema de design para consistência entre os produtos digitais da Área Central.',
    body: [
      'O Acronos foi criado para dar consistência, escalabilidade e eficiência aos produtos digitais da Área Central. Antes dele, cada time construía seus próprios componentes, e as pequenas diferenças entre eles se acumulavam até virar atrito.',
      'O sistema entrega componentes reutilizáveis e diretrizes de acessibilidade. Com ele, os times passam menos tempo redecidindo decisões já tomadas, e a colaboração entre design e desenvolvimento fica mais direta.',
    ],
    lists: [
      {
        title: 'Os quatro pilares',
        items: [
          'Consistência: uma identidade visual só, entre todos os produtos',
          'Velocidade: componentes reutilizáveis e documentados aceleram o desenvolvimento',
          'Acessibilidade: interfaces inclusivas, alinhadas aos padrões',
          'Escalabilidade: o sistema cresce junto com as plataformas',
        ],
      },
      {
        title: 'O que tem dentro',
        items: [
          'Styleguides de cor, tipografia, espaçamento e efeitos',
          'Componentes de navegação, formulário, avatar, avisos, botões e categorias',
          'Foco em produtos SaaS, pensado mobile-first',
          'Changelog e acesso direto ao arquivo no Figma',
        ],
      },
    ],
    images: [
      {
        src: '/work/acronos/01.jpg',
        caption:
          'A documentação do Acronos DS: navegação lateral com styleguides e componentes, e atalhos para os mais usados.',
      },
      {
        src: '/work/acronos/02.jpg',
        caption:
          'A página Sobre explica por que o sistema existe e o que ele resolve para os times.',
      },
    ],
  },
  {
    slug: 'sendeski-cafe',
    name: 'Sendeski Café',
    color: '#c07a3e',
    ink: 'light',
    shape: 'circle',
    type: 'Produto (e-commerce)',
    service: 'Protótipo',
    client: 'Sendeski Café',
    industry: 'Café gourmet',
    when: 'Junho de 2025',
    year: '2025',
    tools: 'Framer',
    summary:
      'Site para uma marca de café gourmet brasileira, construído em torno do produto.',
    body: [
      'O Sendeski Café precisava de um site moderno e funcional para uma marca de café gourmet. O processo começou com análise competitiva no segmento e identificação de um público que valoriza experiências autênticas além do próprio produto.',
      'A estrutura final prioriza os produtos premium na hierarquia visual, com um layout responsivo pensado para navegação simples entre loja, produtos e informações institucionais.',
    ],
    lists: [
      {
        title: 'Pesquisa e descoberta',
        items: [
          'Análise de concorrentes locais e internacionais de café gourmet',
          'Tendências de design minimalista e storytelling visual para produtos premium',
          'Persona: quem toma café gourmet e procura experiências autênticas e exclusivas',
        ],
      },
      {
        title: 'Wireframes e arquitetura',
        items: [
          'Hierarquia clara, com produtos premium e promoções em destaque',
          'Layout responsivo, pensado para desktop e mobile',
          'Navegação simples entre produtos, loja online e a marca',
        ],
      },
    ],
    images: [
      {
        src: '/work/sendeski/01.jpg',
        caption:
          'A home abre com o ritual do café: foto de produto em tela cheia e tipografia serifada.',
      },
      {
        src: '/work/sendeski/02.jpg',
        caption:
          'A página de produto, com variações de tamanho, preço e selos de qualidade logo abaixo da compra.',
      },
    ],
  },
  {
    slug: 'wf-odontologia',
    name: 'WF Odontologia',
    color: '#14c3a5',
    ink: 'dark',
    shape: 'rect',
    type: 'Web',
    service: 'Website',
    client: 'WF Odontologia',
    industry: 'Odontologia',
    when: 'Março de 2025',
    year: '2025',
    tools: 'Framer',
    link: 'https://wfodontologia.framer.website',
    summary: 'Landing page minimalista para uma clínica odontológica.',
    body: [
      'A WF Odontologia precisava de uma presença digital que comunicasse confiabilidade e expertise sem depender de excesso de informação na tela. A resposta foi um site limpo, com navegação intuitiva e conteúdo objetivo.',
      'O foco ficou na experiência de quem chega buscando um profissional: encontrar o que precisa rápido, sem ruído visual no caminho.',
    ],
    lists: [],
    images: [
      {
        src: '/work/wf-odontologia/01.jpg',
        caption: 'A home: chamada curta, foto da equipe e um único botão de contato.',
      },
      {
        src: '/work/wf-odontologia/02.jpg',
        caption: 'Quem atende e o que a clínica faz, com as especialidades em etiquetas.',
      },
    ],
  },
  {
    slug: 'traveldone',
    name: 'TravelDone',
    color: '#ff4fa3',
    ink: 'dark',
    shape: 'diamond',
    type: 'Web',
    service: 'Landing page',
    client: 'MetaCumprida',
    industry: 'Infoproduto',
    when: 'Março de 2025',
    year: '2025',
    tools: 'Framer',
    link: 'https://traveldone.framer.website',
    summary: 'Landing page para o infoproduto TravelDone, da MetaCumprida.',
    body: [
      'O TravelDone é um infoproduto sobre viajar com liberdade e praticidade. A landing page precisava traduzir essa promessa em algo visual e persuasivo sem soar como propaganda genérica de curso online.',
      'O resultado combina clareza, comunicação direta e uma estética leve, pensada para transmitir confiança antes mesmo de o visitante ler o primeiro parágrafo.',
    ],
    lists: [],
    images: [
      {
        src: '/work/traveldone/01.jpg',
        caption:
          'O topo da landing page: a promessa, uma foto de família viajando e a chamada para começar.',
      },
      {
        src: '/work/traveldone/02.jpg',
        caption:
          'Quem está por trás do curso, com selos de prova: mais de 15 países e 15 anos viajando.',
      },
    ],
  },
  {
    slug: 'pf-advogados',
    name: 'PF Advogados',
    color: '#7b5cff',
    ink: 'light',
    shape: 'circle',
    type: 'Web',
    service: 'Website',
    client: 'PF Advogados (Passig & Firmino)',
    industry: 'Advocacia',
    when: 'Janeiro de 2024',
    year: '2024',
    tools: 'Framer',
    link: 'https://passigfirmino.adv.br',
    summary: 'Site institucional para um escritório de advocacia.',
    body: [
      'Um escritório de advocacia vive de credibilidade, então o site da PF Advogados foi construído em torno disso: tons sóbrios, tipografia refinada e uma navegação direta até áreas de atuação e equipe.',
      'A seriedade da marca precisa aparecer antes de qualquer coisa, sem elementos brigando por atenção.',
    ],
    lists: [],
    images: [
      {
        src: '/work/pf-advogados/01.jpg',
        caption:
          'A home vai direto à dor de quem chega: a suspensão da CNH, com contato por WhatsApp sempre à mão.',
      },
      {
        src: '/work/pf-advogados/02.jpg',
        caption:
          'Quem somos: a equipe, a especialidade em direito de trânsito e os valores do escritório.',
      },
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, '0');
