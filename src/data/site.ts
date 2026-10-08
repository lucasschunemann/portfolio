import type { ImageMetadata } from 'astro';

export const site = {
  name: 'Lucas Schünemann',
  role: 'Product designer, UX/UI',
  city: 'Blumenau, Brasil',
  coords: '26°55′S 49°04′W',
  email: 'lucas.vhschunemann@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-von-helden/',
  instagram: 'https://www.instagram.com/_vonhelden/',
  status: 'Agenda aberta para novos projetos',
  description:
    'Lucas Schünemann, product designer em Blumenau. Design de produtos digitais, design systems e sites para startups, SaaS e negócios, do discovery à interface pronta para desenvolvimento.',
};

/** Link de e-mail já com assunto e um roteiro curto, para facilitar o primeiro contato. */
export const mailto = (subject = 'Novo projeto') => {
  const body = [
    'Olá, Lucas!',
    '',
    'O que eu preciso:',
    'Em que ponto o projeto está:',
    'Prazo ideal:',
    '',
  ].join('\n');
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const clients = ['Área Central', 'neth!', 'Acompanha', 'PF Advogados', 'WF Odontologia', 'MetaCumprida', 'Sendeski Café'];

export const services = [
  {
    title: 'Produto e UX/UI',
    text: 'Telas e fluxos para SaaS e plataformas de dados. Pesquisa, arquitetura de informação, protótipos e interface em alta fidelidade no Figma, prontos para o time desenvolver.',
    fit: 'Startups e times de produto',
    refs: ['acompanha', 'acronos'],
  },
  {
    title: 'Design systems',
    text: 'Componentes, tokens e documentação para manter vários produtos consistentes e parar de redecidir o que já foi decidido.',
    fit: 'Empresas com mais de um produto ou time',
    refs: ['acronos'],
  },
  {
    title: 'Sites e landing pages',
    text: 'Sites institucionais e páginas de venda em Framer, com código customizado quando precisa. Claros, rápidos e publicados no seu domínio.',
    fit: 'Clínicas, escritórios, marcas e infoprodutos',
    refs: ['pf-advogados', 'wf-odontologia', 'traveldone'],
  },
];

export const process = [
  { title: 'Conversa', text: 'Entendo o negócio, quem vai usar e o que precisa mudar. Daqui saem o escopo e o prazo.' },
  { title: 'Estrutura', text: 'Mapeamento de jornada e arquitetura de informação: o que entra, em que ordem e por quê.' },
  { title: 'Interface', text: 'Protótipo e alta fidelidade no Figma, ou direto no Framer quando é site. Você vê e comenta a cada etapa.' },
  { title: 'Entrega', text: 'Handoff com o time de desenvolvimento, ou o site publicado no seu domínio.' },
];

export const bio = [
  'Sou product designer com foco em UX/UI, co-fundador e CPO do neth!, uma startup de saúde e bem-estar digital.',
  'No meu trabalho principal sou UX/UI designer na Área Central. Liderei a criação de um design system multiplataforma que unificou padrões visuais e de interação entre vários produtos, encurtando o caminho do design até o desenvolvimento. Também reestruturei o fluxo de visualização de documentos de uma plataforma complexa, reduzindo atrito nas telas principais e aumentando a conclusão das tarefas.',
  'No neth! cuido da direção de produto, da prototipação em Figma, do roadmap e da gestão do time de desenvolvimento.',
  'Em paralelo pego projetos freelance B2B e B2C, na maioria plataformas de inteligência de dados e sites. Vou do discovery e do mapeamento de jornada até a interface em alta fidelidade, pronta para desenvolvimento.',
];

export const facts: [string, string][] = [
  ['Hoje', 'CPO e co-fundador no neth!'],
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

/** full: largura toda · right/left: pendurada de um lado · center: centralizada e menor */
export type Layout = 'full' | 'right' | 'left' | 'center';
export type Figure = { src: ImageMetadata; caption: string; layout?: Layout };

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
  /** posição na parede da home (colunas de 12, proporção, recuo vertical, imagem própria) */
  wall: { col: string; ratio: string; drop?: string; img?: ImageMetadata };
};

export const projects: Project[] = [
  {
    slug: 'pf-advogados',
    name: 'PF Advogados',
    year: '2024',
    when: 'Janeiro de 2024',
    type: 'Web',
    service: 'Website',
    client: 'Passig & Firmino Advogados',
    industry: 'Advocacia, direito imobiliário',
    tools: 'Framer',
    link: 'https://passigfirmino.adv.br',
    summary: 'Site institucional para um escritório de advocacia.',
    body: [
      'Um escritório de advocacia vive de credibilidade, então o site da PF Advogados foi construído em torno disso: tons sóbrios, tipografia refinada e uma navegação direta até áreas de atuação e equipe.',
      'A seriedade da marca precisa aparecer antes de qualquer coisa, sem elementos brigando por atenção.',
    ],
    lists: [],
    images: [
      { src: img('pf-advogados/01-capa'), caption: 'A abertura apresenta o escritório em uma frase, com o contato por WhatsApp sempre à mão.' },
      { src: img('pf-advogados/02-servicos'), caption: 'As áreas de atuação em cartões: compra e venda, contratos, regularização, locações, posse e condomínios.', layout: 'right' },
      { src: img('pf-advogados/03-quem-somos'), caption: 'Quem somos: a apresentação do escritório e dos sócios.', layout: 'left' },
      { src: img('pf-advogados/04-duvidas'), caption: 'As dúvidas mais comuns, abertas uma de cada vez.', layout: 'center' },
      { src: img('pf-advogados/05-celular'), caption: 'No celular, a mesma hierarquia em uma coluna.', layout: 'full' },
    ],
    wall: { col: '1 / span 7', ratio: '16 / 10' },
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
        src: img('acronos/01-capa'),
        caption: 'A documentação no tema escuro: navegação lateral com styleguides e componentes, e atalhos para os mais usados.',
      },
      { src: img('acronos/02-claro'), caption: 'O mesmo início no tema claro.', layout: 'right' },
      { src: img('acronos/03-componentes'), caption: 'O índice de componentes, cada um com a sua prévia.', layout: 'left' },
      { src: img('acronos/04-cores'), caption: 'Cores: as famílias da marca em escala, do tom mais escuro ao mais claro.', layout: 'right' },
      { src: img('acronos/05-botoes'), caption: 'Botões: variações de hierarquia, cor e estado.', layout: 'center' },
      { src: img('acronos/06-celular'), caption: 'No celular, a documentação vira uma coluna, com o menu recolhido.', layout: 'full' },
    ],
    wall: { col: '9 / span 4', ratio: '4 / 5', drop: '14vh', img: img('acronos/00-parede') },
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
      { src: img('wf-odontologia/01-capa'), caption: 'A abertura: chamada curta, a foto da equipe e um único botão de contato.' },
      { src: img('wf-odontologia/02-equipe'), caption: 'Os dentistas, as especialidades em etiquetas e os números da clínica.', layout: 'right' },
      { src: img('wf-odontologia/03-contato'), caption: 'O fechamento leva direto ao WhatsApp de cada unidade.', layout: 'left' },
      { src: img('wf-odontologia/04-celular'), caption: 'No celular.', layout: 'full' },
    ],
    wall: { col: '3 / span 7', ratio: '16 / 10' },
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
      { src: img('traveldone/01-capa'), caption: 'A promessa logo na abertura, com a chamada para começar.' },
      { src: img('traveldone/02-sobre'), caption: 'Quem está por trás do curso, com selos de prova: mais de 15 países e 15 anos viajando.', layout: 'right' },
      { src: img('traveldone/03-viagens'), caption: 'As viagens dos autores, em fotos com legenda à mão.', layout: 'left' },
      { src: img('traveldone/04-oferta'), caption: 'A oferta: o que está incluso e a garantia de sete dias lado a lado.', layout: 'center' },
      { src: img('traveldone/05-celular'), caption: 'No celular.', layout: 'full' },
    ],
    wall: { col: '1 / span 4', ratio: '4 / 5', img: img('traveldone/00-parede') },
  },
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
    wall: { col: '7 / span 6', ratio: '4 / 3', drop: '24vh' },
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
        src: img('sendeski/01-capa'),
        caption: 'A home abre com o ritual do café: foto de produto em tela cheia e tipografia serifada.',
      },
      {
        src: img('sendeski/02-produto'),
        caption: 'A página de produto, com variações de tamanho, preço e selos de qualidade logo abaixo da compra.',
        layout: 'right',
      },
    ],
    wall: { col: '4 / span 6', ratio: '16 / 10' },
  },
  {
    slug: 'von',
    name: 'VON',
    year: '2026',
    when: 'Agosto a outubro de 2026',
    type: 'Projeto pessoal',
    service: 'Conceito, design e desenvolvimento',
    client: 'Projeto pessoal',
    industry: 'Portfólio interativo',
    tools: 'TypeScript, three.js, Web Audio, Vite',
    link: 'https://galery-lemon.vercel.app',
    summary: 'Um portfólio por onde se anda: uma galeria 3D em ilhas flutuantes, com cada projeto exposto como escultura.',
    body: [
      'A VON é a minha galeria de trabalho em forma de lugar. Um boneco de cromo percorre ilhas brancas que flutuam sobre um mar de nuvens, e cada projeto está exposto numa sala, como escultura, com uma placa que abre o caso completo.',
      'A referência é o CGI do começo dos anos 2000: renders de demonstração de placa de vídeo, Frutiger Aero, o Aqua dos primeiros Mac OS X e menus de DVD. O mundo é renderizado pequeno e ampliado sem suavização, com o serrilhado de render antigo; a interface por cima é o contrário, nítida, em vidro fosco, com a grade e a hierarquia do design suíço.',
    ],
    lists: [
      {
        title: 'O que tem dentro',
        items: [
          'Seis salas, uma por projeto, cada uma com uma escultura gerada em código',
          'NPCs que conversam, um fliperama com jogo de verdade, uma lagoa, um mirante e um jardim com respiração guiada',
          'Tubos de vidro que levam de uma ilha a outra',
          'Dia e noite, cada um com a sua paleta e a sua música',
        ],
      },
      {
        title: 'Por baixo',
        items: [
          'three.js com piso espelhado de verdade e renderização em pixel',
          'Música generativa e efeitos sintetizados na hora com Web Audio, sem nenhum arquivo de áudio',
          'Nenhuma imagem, modelo 3D ou áudio carregado: o site inteiro pesa cerca de 185 kB com gzip',
          'Sem WebGL, a galeria abre como lista e continua navegável',
        ],
      },
    ],
    images: [
      { src: img('von/01-capa'), caption: 'A entrada: a galeria inteira aparece ao fundo antes de você entrar.' },
      { src: img('von/02-sala'), caption: 'A sala do Acronos: a escultura de módulos e a placa com o resumo do caso.', layout: 'right' },
      { src: img('von/03-noite'), caption: 'De noite, o céu fica periwinkle e as luzes das ilhas acendem.', layout: 'full' },
      { src: img('von/04-caso'), caption: 'O caso completo abre em tela cheia, com as imagens num monitor.', layout: 'left' },
      { src: img('von/05-catalogo'), caption: 'O catálogo leva direto a qualquer sala.', layout: 'center' },
      { src: img('von/06-celular'), caption: 'No celular: toque no chão para andar, pinça para o zoom.', layout: 'full' },
    ],
    wall: { col: '2 / span 10', ratio: '16 / 9' },
  },
];

export const pad = (n: number) => String(n).padStart(2, '0');
