import type { ImageMetadata } from 'astro';

export const site = {
  name: 'Lucas Schünemann',
  role: 'Product designer, UX/UI',
  city: 'Blumenau, Brasil',
  coords: '26°55′S 49°04′W',
  email: 'lucas.vhschunemann@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-von-helden/',
  instagram: 'https://www.instagram.com/lucasvonhelden/',
  status: 'Aberto a projetos freelance',
  description:
    'Lucas Schünemann, product designer com foco em UX/UI em Blumenau. Co-fundador e CPO da neth!, UX/UI designer na Área Central e freelancer em produtos e sites.',
};

export const bio = [
  'Sou product designer com foco em UX/UI, co-fundador e CPO da neth!, uma startup de saúde e bem-estar digital.',
  'No meu trabalho principal sou UX/UI designer na Área Central. Liderei a criação de um design system multiplataforma que unificou padrões visuais e de interação entre vários produtos, encurtando o caminho do design até o desenvolvimento. Também reestruturei o fluxo de visualização de documentos de uma plataforma complexa, reduzindo atrito nas telas principais e aumentando a conclusão das tarefas.',
  'Na neth! cuido da direção de produto, da prototipação em Figma, do roadmap e da gestão do time de desenvolvimento.',
  'Em paralelo pego projetos freelance B2B e B2C, na maioria plataformas de inteligência de dados e sites. Vou do discovery e do mapeamento de jornada até a interface em alta fidelidade, pronta para desenvolvimento.',
];

export const practice = [
  'Pesquisa de UX e validação de hipóteses',
  'Arquitetura de informação e estruturação de fluxos',
  'Prototipação em média e alta fidelidade no Figma',
  'Design systems e consistência entre produtos',
  'Sites em Framer com código customizado',
  'Handoff e colaboração próxima com desenvolvedores',
];

export const facts: [string, string][] = [
  ['Hoje', 'CPO e co-fundador na neth!'],
  ['Também', 'UX/UI designer na Área Central'],
  ['Experiência', '4+ anos, 15+ projetos'],
  ['Formação', 'Interaction Design Foundation'],
  ['Base', 'Blumenau, Santa Catarina (GMT-3)'],
];

/* ------------------------------------------------------------------ obras */

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*/*.jpg', { eager: true });
const img = (key: string) => {
  const hit = files[`../assets/work/${key}.jpg`];
  if (!hit) throw new Error(`Imagem não encontrada: ${key}`);
  return hit.default;
};

export type Figure = { src: ImageMetadata; caption: string };

export type Project = {
  slug: string;
  name: string;
  year: string;
  when: string;
  type: string;
  service: string;
  client: string;
  industry: string;
  tools: string;
  link?: string;
  summary: string;
  body: string[];
  lists: { title: string; items: string[] }[];
  images: Figure[];
  /** posição na parede da home (colunas de 12, proporção, recuo vertical) */
  wall: { col: string; ratio: string; drop?: string };
};

export const projects: Project[] = [
  {
    slug: 'acompanha',
    name: 'Acompanha',
    year: '2025—26',
    when: '2025 a 2026',
    type: 'Produto',
    service: 'Design de produto',
    client: 'Acompanha',
    industry: 'Materiais de construção',
    tools: 'Figma',
    summary: 'SaaS que mostra para lojas de material de construção se elas estão comprando bem.',
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
    wall: { col: '1 / span 4', ratio: '4 / 5' },
  },
  {
    slug: 'acronos',
    name: 'Acronos',
    year: '2025',
    when: 'Fevereiro de 2025',
    type: 'Interface, design system',
    service: 'Design system',
    client: 'Área Central',
    industry: 'Software',
    tools: 'Figma, design tokens',
    link: 'https://acronosds.framer.website',
    summary: 'Sistema de design para consistência entre os produtos digitais da Área Central.',
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
        src: img('acronos/01'),
        caption: 'A documentação do Acronos DS: navegação lateral com styleguides e componentes, e atalhos para os mais usados.',
      },
      {
        src: img('acronos/02'),
        caption: 'A página Sobre explica por que o sistema existe e o que ele resolve para os times.',
      },
    ],
    wall: { col: '7 / span 6', ratio: '16 / 10', drop: '22vh' },
  },
  {
    slug: 'sendeski-cafe',
    name: 'Sendeski Café',
    year: '2025',
    when: 'Junho de 2025',
    type: 'Produto (e-commerce)',
    service: 'Protótipo',
    client: 'Sendeski Café',
    industry: 'Café gourmet',
    tools: 'Framer',
    summary: 'Site para uma marca de café gourmet brasileira, construído em torno do produto.',
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
        src: img('sendeski/01'),
        caption: 'A home abre com o ritual do café: foto de produto em tela cheia e tipografia serifada.',
      },
      {
        src: img('sendeski/02'),
        caption: 'A página de produto, com variações de tamanho, preço e selos de qualidade logo abaixo da compra.',
      },
    ],
    wall: { col: '3 / span 7', ratio: '16 / 10' },
  },
  {
    slug: 'wf-odontologia',
    name: 'WF Odontologia',
    year: '2025',
    when: 'Março de 2025',
    type: 'Web',
    service: 'Website',
    client: 'WF Odontologia',
    industry: 'Odontologia',
    tools: 'Framer',
    link: 'https://wfodontologia.framer.website',
    summary: 'Landing page minimalista para uma clínica odontológica.',
    body: [
      'A WF Odontologia precisava de uma presença digital que comunicasse confiabilidade e expertise sem depender de excesso de informação na tela. A resposta foi um site limpo, com navegação intuitiva e conteúdo objetivo.',
      'O foco ficou na experiência de quem chega buscando um profissional: encontrar o que precisa rápido, sem ruído visual no caminho.',
    ],
    lists: [],
    images: [
      { src: img('wf-odontologia/01'), caption: 'A home: chamada curta, foto da equipe e um único botão de contato.' },
      { src: img('wf-odontologia/02'), caption: 'Quem atende e o que a clínica faz, com as especialidades em etiquetas.' },
    ],
    wall: { col: '1 / span 5', ratio: '4 / 3' },
  },
  {
    slug: 'traveldone',
    name: 'TravelDone',
    year: '2025',
    when: 'Março de 2025',
    type: 'Web',
    service: 'Landing page',
    client: 'MetaCumprida',
    industry: 'Infoproduto',
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
        src: img('traveldone/01'),
        caption: 'O topo da landing page: a promessa, uma foto de família viajando e a chamada para começar.',
      },
      {
        src: img('traveldone/02'),
        caption: 'Quem está por trás do curso, com selos de prova: mais de 15 países e 15 anos viajando.',
      },
    ],
    wall: { col: '8 / span 5', ratio: '4 / 3', drop: '30vh' },
  },
  {
    slug: 'pf-advogados',
    name: 'PF Advogados',
    year: '2024',
    when: 'Janeiro de 2024',
    type: 'Web',
    service: 'Website',
    client: 'PF Advogados (Passig & Firmino)',
    industry: 'Advocacia',
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
        src: img('pf-advogados/01'),
        caption: 'A home vai direto à dor de quem chega: a suspensão da CNH, com contato por WhatsApp sempre à mão.',
      },
      {
        src: img('pf-advogados/02'),
        caption: 'Quem somos: a equipe, a especialidade em direito de trânsito e os valores do escritório.',
      },
    ],
    wall: { col: '5 / span 6', ratio: '16 / 10' },
  },
];

export const pad = (n: number) => String(n).padStart(2, '0');
