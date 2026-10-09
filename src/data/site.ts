import type { ImageMetadata } from 'astro';
import { email, phone } from './contato';

export { budgets, mailto, whatsapp } from './contato';

export const site = {
  name: 'Lucas Schünemann',
  role: 'Product designer, UX/UI',
  city: 'Blumenau, Brasil',
  coords: '26°55′S 49°04′W',
  email,
  whatsapp: phone,
  linkedin: 'https://www.linkedin.com/in/lucas-von-helden/',
  instagram: 'https://www.instagram.com/_vonhelden/',
  /** troque quando a data passar */
  status: 'Próxima vaga: dezembro',
  description:
    'Lucas Schünemann, product designer em Blumenau. Design de produtos digitais, design systems e sites para startups, SaaS e negócios, do discovery à interface pronta para desenvolvimento.',
};

export const clients = ['Área Central', 'neth!', 'Acompanha', 'PF Advogados', 'WF Odontologia', 'RealPlay', 'MetaCumprida', 'Sendeski Café'];

export const services = [
  {
    title: 'Produto e UX/UI',
    text: 'Telas e fluxos para SaaS e plataformas de dados. Pesquisa, arquitetura de informação, protótipos e interface em alta fidelidade no Figma, prontos para o time desenvolver.',
    /** preço de referência: ancora o valor e já filtra quem chega */
    from: 'R$ 8 mil',
    refs: ['neth', 'acompanha', 'acronos'],
  },
  {
    title: 'Design systems',
    text: 'Componentes, tokens e documentação para manter vários produtos consistentes e parar de redecidir o que já foi decidido.',
    from: 'R$ 15 mil',
    refs: ['acronos'],
  },
  {
    title: 'Sites e landing pages',
    text: 'Sites institucionais e páginas de venda, no Framer ou direto em código. Claros, rápidos e publicados no seu domínio.',
    from: 'R$ 2 mil',
    refs: ['traveldone', 'wf-odontologia', 'pf-advogados'],
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
  ['Experiência', '5+ anos'],
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

const clips = import.meta.glob<string>('../assets/work/*/*.mp4', { eager: true, query: '?url', import: 'default' });
const clip = (key: string) => {
  const hit = clips[`../assets/work/${key}.mp4`];
  if (!hit) throw new Error(`Vídeo não encontrado: ${key}`);
  return hit;
};

/** full: largura toda · right/left: pendurada de um lado · center: centralizada e menor */
export type Layout = 'full' | 'right' | 'left' | 'center';
/** Com `video`, a figura vira um vídeo curto em loop e `src` serve de pôster. */
export type Figure = { src: ImageMetadata; caption: string; layout?: Layout; video?: string };

/** O que foi decidido e por quê, com a figura que mostra a decisão (se houver). */
export type Decision = { title: string; text: string; fig?: Figure };

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
  /** o que foi meu e o que foi do time */
  role?: string;
  duration?: string;
  link?: string;
  summary: string;
  /** o problema de partida */
  challenge: string[];
  decisions: Decision[];
  process?: { text: string; figs?: Figure[] };
  /** só com dado real; sem isso a seção não aparece */
  result?: string[];
  /** as palavras de quem contratou, como foram ditas, com nome e permissão */
  quote?: { text: string; author: string; role: string };
  /** o que eu faria diferente hoje */
  retro?: string;
  /** a capa (a primeira) e as figuras que não pertencem a nenhuma decisão */
  images: Figure[];
  /**
   * Só os casos completos vão para a parede da home; os outros ficam no índice.
   * Posição em colunas de 12, proporção, recuo vertical e imagem própria.
   */
  wall?: { col: string; ratio: string; drop?: string; img?: ImageMetadata };
};

export const projects: Project[] = [
  {
    slug: 'neth',
    name: 'neth!',
    year: '2026',
    when: 'Em andamento',
    type: 'Produto',
    service: 'Direção de produto',
    client: 'neth!',
    industry: 'Saúde mental, educação em saúde',
    tools: 'Figma',
    role: 'Co-fundador e CPO: direção de produto, protótipos, roadmap e gestão do time de desenvolvimento',
    link: 'https://somosneth.com',
    summary: 'Vídeos curtos sobre saúde mental, feitos por profissionais de saúde, para pessoas, empresas e consultórios.',
    challenge: [
      'Quem tenta entender a própria saúde mental na internet esbarra antes em opinião e em promessa fácil, num formato feito para prender a atenção. O neth! precisava ser leve como as redes e confiável como a ciência, sem virar mais uma tarefa nem mais um feed.',
    ],
    decisions: [
      {
        title: 'Leve como as redes, sem o algoritmo',
        text: 'O formato é o vídeo curto, porque conteúdo que ninguém assiste até o fim não serve para nada. Mas não há feed infinito, anúncio nem meta de tempo de tela: a pessoa escolhe uma playlist por tema, assiste e sai. Avaliações curtas mostram a evolução em números.',
        fig: {
          src: img('neth/02-celular'),
          caption: 'No celular: a abertura, as playlists por tema e o espaço sem anúncio.',
          layout: 'full',
        },
      },
      {
        title: 'Nome e registro em cada vídeo',
        text: 'Confiança não vem de seguidores. Cada vídeo tem um responsável técnico com nome, formação e registro no conselho, e o roteiro passa por revisão antes da gravação. O site mostra esse caminho inteiro, inclusive os pontos em que um vídeo pode ser barrado.',
        fig: {
          src: img('neth/03-metodo'),
          caption: 'O método na própria home: pauta com origem, nome e registro, revisão antes da câmera.',
          layout: 'right',
        },
      },
      {
        title: 'A conta é de quem assiste',
        text: 'O mesmo catálogo chega por três caminhos: a assinatura individual, o plano para empresas, que cobre a etapa de informação e prevenção da NR-01, e o neth! Clínica, em que um profissional convida até 14 pacientes. Em todos, a conta é de quem usa. O RH vê números do time, não quais vídeos cada pessoa viu; o profissional libera o acesso, não acompanha o paciente. Sem esse limite, as pessoas aprendem a marcar presença sem assistir a nada.',
        fig: {
          src: img('neth/04-empresas'),
          caption: 'Para empresas: o que o RH vê e o que não vê, lado a lado.',
          layout: 'center',
        },
      },
    ],
    images: [
      {
        src: img('neth/01-capa'),
        caption: 'A abertura, com a Janeth: a personagem que dá as boas-vindas e aparece nos assuntos mais pesados, onde só texto deixaria a tela dura demais.',
      },
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
    tools: 'Figma, design tokens, Framer',
    role: 'Liderei a criação, das bases à documentação',
    link: 'https://acronosds.framer.website',
    summary: 'Sistema de design para consistência entre os produtos digitais da Área Central.',
    challenge: [
      'Antes do Acronos, cada time da Área Central construía os próprios componentes. As pequenas diferenças entre eles se acumulavam até virar atrito, entre os produtos e entre design e desenvolvimento.',
    ],
    decisions: [
      {
        title: 'Bases antes de componentes',
        text: 'A primeira versão começou pelas bases: famílias de cor, tipografia, espaçamentos e efeitos, já com tema claro e escuro. É em cima delas que os componentes são construídos.',
        fig: {
          src: img('acronos/04-cores'),
          caption: 'Cores: as famílias da marca em escala, do tom mais escuro ao mais claro.',
          layout: 'right',
        },
      },
      {
        title: 'Poucas opções, bem nomeadas',
        text: 'Cada opção que o sistema oferece é uma decisão a mais para o time. Por isso há só dois estilos de sombra, e os botões se organizam em três eixos: hierarquia, cor e estado.',
        fig: { src: img('acronos/05-botoes'), caption: 'Botões: variações de hierarquia, cor e estado.', layout: 'center' },
      },
      {
        title: 'Documentação fora do Figma',
        text: 'O sistema mora num site, não só num arquivo: quem é de design ou de desenvolvimento encontra o componente, vê a prévia e lê como usar sem abrir o Figma. Um changelog registra o que mudou em cada versão.',
        fig: { src: img('acronos/03-componentes'), caption: 'O índice de componentes, cada um com a sua prévia.', layout: 'left' },
      },
    ],
    process: {
      text: 'O ponto de partida foram sistemas de referência, como o Carbon, da IBM, e o Nimbus, da Nuvemshop, adaptados para produtos SaaS e pensados primeiro para o celular. Hoje são quatro guias de estilo e doze componentes documentados, da navegação aos formulários e tabelas.',
    },
    // aprovado por Rodrigo de Moraes em 09/10/2026
    quote: {
      text: 'Antes do Acronos, cada time resolvia o mesmo componente do seu jeito. O Lucas organizou as bases e documentou tudo num lugar que design e desenvolvimento usam de verdade. A gente parou de redecidir o que já estava decidido.',
      author: 'Rodrigo de Moraes',
      role: 'Product Manager na Área Central',
    },
    images: [
      {
        src: img('acronos/01-capa'),
        caption: 'A documentação no tema escuro: navegação lateral com guias de estilo e componentes, e atalhos para os mais usados.',
      },
      { src: img('acronos/02-claro'), caption: 'O mesmo início no tema claro.', layout: 'right' },
      { src: img('acronos/06-celular'), caption: 'No celular, a documentação vira uma coluna, com o menu recolhido.', layout: 'full' },
    ],
    wall: { col: '9 / span 4', ratio: '4 / 5', drop: '14vh', img: img('acronos/00-parede') },
  },
  // segunda versão, em código; a primeira (Framer, 2025) segue em traveldone.framer.website
  {
    slug: 'traveldone',
    name: 'TravelDone',
    year: '2026',
    when: 'Primeira versão em 2025, a atual em 2026',
    type: 'Web',
    service: 'Landing page',
    client: 'MetaCumprida',
    industry: 'Infoproduto',
    tools: 'HTML, CSS e JavaScript, na Vercel',
    role: 'Design e desenvolvimento',
    link: 'https://traveldone.vercel.app',
    summary: 'Página de venda de um curso sobre planejar viagens em família.',
    challenge: [
      'O TravelDone é um curso online sobre juntar dinheiro, achar promoção, usar milhas e montar roteiro, ensinado por um casal que viaja em família há mais de 15 anos. A página precisava vender sem soar como propaganda de curso: mostrar quem ensina, para quem serve e quanto custa, sem esconder nada.',
    ],
    decisions: [
      {
        title: 'Preço, acesso e garantia antes de rolar',
        text: 'Logo abaixo do botão de compra ficam as três respostas que decidem a compra: um ano de acesso, sete dias de garantia e 10× de R$ 27,70. No celular, uma barra com o preço, a garantia e o botão acompanha a rolagem.',
        fig: {
          src: img('traveldone/05-celular'),
          caption: 'No celular: a abertura, para quem é o curso e o preço. A barra com a garantia e o botão de compra fica fixa no pé da tela.',
          layout: 'full',
        },
      },
      {
        title: 'As viagens da família como prova',
        text: 'Em vez de fotos de banco de imagens, quinze viagens do casal, de Barcelona a Fortaleza, passam na horizontal enquanto a página rola, com o lugar escrito embaixo de cada foto e um contador de 01 a 15.',
        fig: {
          src: img('traveldone/02-viagens'),
          video: clip('traveldone/02-viagens'),
          caption: 'A galeria de viagens: a página para e as fotos correm na horizontal.',
          layout: 'full',
        },
      },
      {
        title: 'Depoimentos com a conversa original',
        text: 'Os dois depoimentos aparecem ao lado do print da mensagem em que o aluno escreveu. Quem lê vê de onde a frase veio.',
        fig: {
          src: img('traveldone/03-depoimentos'),
          caption: 'O que os alunos disseram, cada frase com o print da conversa.',
          layout: 'right',
        },
      },
    ],
    process: {
      text: 'A primeira versão foi feita no Framer, em 2025. A atual foi refeita do zero em HTML, CSS e JavaScript, com o pagamento pela Hotmart.',
    },
    // aprovado por Fernanda e Wagner em 09/10/2026
    quote: {
      text: 'A página nova mostra quem a gente é de verdade: as nossas viagens, o preço e a garantia, sem cara de propaganda de curso. O Lucas entendeu o que a gente queria antes de a gente saber explicar.',
      author: 'Fernanda e Wagner',
      role: 'criadores do TravelDone',
    },
    images: [
      {
        src: img('traveldone/01-capa'),
        caption: 'A abertura: a promessa, quem ensina e, logo abaixo do botão, acesso, garantia e parcelamento.',
      },
      {
        src: img('traveldone/04-preco'),
        caption: 'O preço como um ingresso: o que vem no curso de um lado, a garantia de sete dias do outro.',
        layout: 'center',
      },
    ],
    wall: { col: '1 / span 6', ratio: '16 / 10' },
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
    role: 'Telas e fluxos do produto, do motor de créditos ao módulo de Educação',
    summary: 'SaaS que mostra para lojas de material de construção se elas estão comprando bem.',
    challenge: [
      'Uma loja de material de construção compra o tempo todo, mas nem sempre sabe se comprou bem. O Acompanha acompanha preço e demanda do mercado regional e compara com o que a loja de fato pagou. Entrei no produto para desenhar as telas e os fluxos que hoje seguem para desenvolvimento.',
    ],
    decisions: [
      {
        title: 'Uma coluna, com a confiança à vista',
        text: 'A tela de produto passou por várias versões inteiras até fechar num layout de coluna única, com indicadores de confiança nos dados. Quem decide uma compra precisa saber o quanto pode confiar no número que está vendo. O vocabulário visual ficou próximo do Linear.',
      },
      {
        title: 'Um simulador em vez de um cenário',
        text: 'A Reforma Tributária troca PIS, COFINS, ICMS e ISS por CBS e IBS. Em vez de mostrar um cenário fixo dessa transição, o motor de créditos traz um simulador editável na própria tela: a loja muda as premissas e vê o efeito na hora.',
      },
    ],
    // aprovado por Rodrigo de Moraes em 09/10/2026
    quote: {
      text: 'O Lucas pegou um assunto árido como a Reforma Tributária e transformou num simulador que o lojista entende. A tela de produto foi e voltou várias vezes até ficar simples, e ele nunca se apegou à primeira versão.',
      author: 'Rodrigo de Moraes',
      role: 'Product Manager',
    },
    images: [],
    wall: { col: '8 / span 5', ratio: '4 / 3', drop: '18vh' },
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
    role: 'Projeto solo: conceito, design, código e som',
    link: 'https://galery-lemon.vercel.app',
    summary: 'Um portfólio por onde se anda: uma galeria 3D em ilhas flutuantes, com cada projeto exposto como escultura.',
    challenge: [
      'A pergunta era se um portfólio podia ser um lugar que se visita, e não uma página que se rola, sem pesar mais que um site comum. Na VON, um boneco de cromo percorre ilhas brancas sobre um mar de nuvens, e cada projeto está exposto numa sala, como escultura, com uma placa que abre o caso completo.',
    ],
    decisions: [
      {
        title: 'Dois tempos na mesma tela',
        text: 'O mundo é renderizado pequeno e ampliado sem suavização, com o serrilhado do CGI do começo dos anos 2000: demos de placa de vídeo, Frutiger Aero, o Aqua dos primeiros Mac OS X e menus de DVD. A interface por cima é o contrário: nítida, em vidro fosco, com a grade e a hierarquia do design suíço.',
        fig: {
          src: img('von/02-sala'),
          caption: 'A sala do Acronos: a escultura de módulos e a placa com o resumo do caso.',
          layout: 'right',
        },
      },
      {
        title: 'Nada para baixar',
        text: 'Nenhuma imagem, modelo 3D ou arquivo de áudio é carregado. As esculturas são geradas em código, a música é generativa e os efeitos são sintetizados na hora com Web Audio. O site inteiro pesa cerca de 185 kB com gzip.',
        fig: {
          src: img('von/03-passeio'),
          video: clip('von/03-passeio'),
          caption: 'Um passeio de dia, de noite e pelo tubo de vidro até a colina. Tudo o que aparece é gerado em código, na hora.',
          layout: 'full',
        },
      },
      {
        title: 'Andar é opcional',
        text: 'Quem anda acha mais: NPCs que conversam, um fliperama com jogo de verdade, uma lagoa, um mirante e um jardim com respiração guiada. Quem tem pressa abre o catálogo e vai direto a qualquer sala. Sem WebGL, a galeria abre como lista e continua navegável.',
        fig: { src: img('von/05-catalogo'), caption: 'O catálogo: os seis trabalhos e as outras salas, a um clique.', layout: 'center' },
      },
    ],
    images: [
      { src: img('von/01-capa'), caption: 'A entrada: a galeria inteira aparece ao fundo antes de você entrar.' },
      { src: img('von/04-caso'), caption: 'O caso completo abre em tela cheia, com as imagens num monitor.', layout: 'left' },
      { src: img('von/06-celular'), caption: 'No celular: toque no chão para andar, pinça para o zoom.', layout: 'full' },
    ],
    wall: { col: '2 / span 10', ratio: '16 / 9' },
  },

  /* fora da parede: só no índice */
  // segunda versão, em código; a primeira (Framer, 2025) segue em wfodontologia.framer.website
  {
    slug: 'wf-odontologia',
    name: 'WF Odontologia',
    year: '2026',
    when: 'Primeira versão em 2025, a atual em 2026',
    type: 'Web',
    service: 'Website',
    client: 'WF Odontologia',
    industry: 'Odontologia',
    tools: 'HTML, CSS e JavaScript, na Vercel',
    role: 'Design e desenvolvimento',
    link: 'https://wfodondotologia.vercel.app',
    summary: 'Site de uma clínica odontológica com duas unidades no Alto Vale do Itajaí.',
    challenge: [
      'A WF tem duas clínicas, em Braço do Trombudo e em Rio do Sul, e atende todas as especialidades. A primeira versão do site, feita no Framer, abria com "Encontre sua Meta.", uma frase que não dizia nada disso. A segunda precisava dizer o que a clínica faz e onde, e levar cada pessoa ao WhatsApp da unidade certa.',
    ],
    decisions: [
      {
        title: 'O quê e onde, na primeira linha',
        text: 'A abertura agora diz o serviço e a região: odontologia completa no Alto Vale do Itajaí, com as duas cidades logo acima. É a mesma informação do título da página, que é o que aparece na busca.',
        fig: {
          src: img('wf-odontologia/02-antes-depois'),
          caption: 'À esquerda, a primeira versão, no Framer; à direita, a atual.',
          layout: 'full',
        },
      },
      {
        title: 'Todas as especialidades, sem trocar de clínica',
        text: 'O que diferencia a clínica é atender todas as áreas, então o tratamento inteiro fica com a mesma equipe. As oito especialidades viram uma lista que abre uma de cada vez, para quem quer saber o que cada uma inclui.',
        fig: {
          src: img('wf-odontologia/03-especialidades'),
          caption: 'As especialidades, da clínica geral à odontopediatria.',
          layout: 'right',
        },
      },
      {
        title: 'Um WhatsApp para cada unidade',
        text: 'Cada clínica tem o seu cartão, com telefone, WhatsApp e mapa, e o fechamento pede para escolher a unidade antes de abrir a conversa. No celular, o botão de agendar fica fixo no pé da tela.',
        fig: {
          src: img('wf-odontologia/04-clinicas'),
          caption: 'As duas unidades, cada uma com o seu WhatsApp e o seu mapa.',
          layout: 'left',
        },
      },
    ],
    process: {
      text: 'A primeira versão foi feita no Framer, em 2025, e continua no ar. A segunda foi refeita do zero em HTML, CSS e JavaScript, com o texto reescrito seção por seção e um passo a passo do atendimento: contato, avaliação, plano e acompanhamento.',
    },
    // aprovado por Fernanda e Wagner em 09/10/2026
    quote: {
      text: 'Agora o site diz em uma linha o que a clínica faz e onde, e cada paciente cai no WhatsApp da unidade certa. Ficou com a cara da clínica: sério, mas sem ser frio.',
      author: 'Fernanda e Wagner',
      role: 'dentistas da WF Odontologia',
    },
    images: [
      { src: img('wf-odontologia/01-capa'), caption: 'A abertura: o que a clínica faz, onde fica e a nota no Google.' },
      {
        src: img('wf-odontologia/05-celular'),
        caption:
          'No celular, o botão de agendar acompanha a rolagem. Na versão anterior, quase nove em cada dez visitas chegavam pelo celular, a maioria pelo Instagram (Framer Analytics, setembro a outubro de 2026).',
        layout: 'full',
      },
    ],
  },
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
    role: 'Design e construção no Framer',
    link: 'https://passigfirmino.adv.br',
    summary: 'Site institucional para um escritório de advocacia em Rio do Sul.',
    challenge: [
      'Quem procura um advogado chega com um problema e pouca vontade de ler. O site precisava passar seriedade logo na abertura e levar a pessoa até uma conversa com o escritório, sem desvios no caminho.',
    ],
    decisions: [
      {
        title: 'Um caminho só',
        text: 'Todas as seções terminam no mesmo lugar: a conversa pelo WhatsApp. O botão aparece na abertura, fica fixo no canto da tela durante a rolagem e volta no fechamento. Para um escritório pequeno, é o canal que o cliente já tem aberto.',
        fig: {
          src: img('pf-advogados/05-rolagem'),
          video: clip('pf-advogados/05-rolagem'),
          caption: 'No celular, o botão do WhatsApp acompanha a rolagem do começo ao fim.',
          layout: 'full',
        },
      },
      {
        title: 'Serviços que descrevem situações',
        text: 'Cada uma das seis áreas de atuação ganha um cartão curto, com o nome da área e, logo abaixo, as situações em que ela entra: imóvel sem escritura, construção não averbada, conflito com o condomínio. Quem chega se reconhece na descrição antes de saber o nome técnico.',
        fig: {
          src: img('pf-advogados/02-servicos'),
          caption: 'As áreas de atuação: compra e venda, contratos, regularização, locações, posse e condomínios.',
          layout: 'right',
        },
      },
      {
        title: 'As dúvidas antes da ligação',
        text: 'Dez perguntas frequentes, escritas como o cliente perguntaria, respondidas uma de cada vez. Logo depois vêm as avaliações do Google, na voz de quem já foi atendido.',
        fig: {
          src: img('pf-advogados/04-duvidas'),
          caption: 'As perguntas frequentes, abertas uma de cada vez.',
          layout: 'center',
        },
      },
    ],
    result: [
      'O site nasceu para a defesa de motoristas com a CNH suspensa. Quando o escritório passou a atuar em Direito Imobiliário, a mesma estrutura de seções (serviços, quem somos, dúvidas e avaliações) recebeu o conteúdo novo.',
    ],
    // aprovado por Ramon Passig em 09/10/2026
    quote: {
      text: 'Um escritório vive de confiança, e o site passa isso logo na primeira tela. É simples de navegar e leva o cliente direto para a conversa com a gente.',
      author: 'Ramon Passig',
      role: 'Passig & Firmino Advogados',
    },
    images: [
      {
        src: img('pf-advogados/01-capa'),
        caption: 'A abertura: o que o escritório faz em uma frase e o botão para falar com um advogado.',
      },
    ],
  },
  {
    slug: 'real',
    name: 'Real',
    year: '2026',
    when: '2026',
    type: 'Web',
    service: 'Landing page',
    client: 'RealPlay',
    industry: 'Psicologia, mentoria clínica',
    tools: 'Framer',
    role: 'Design e construção no Framer',
    link: 'https://somosreal.framer.website',
    summary: 'Landing page para o Real, uma mentoria clínica para psicólogos.',
    challenge: [
      'O Real é uma mentoria para psicólogos que sabem o que fazer, mas precisam de ajuda no como fazer na sessão. A página precisava explicar um programa longo, com encontros ao vivo e conteúdo gravado, e levar quem se identifica até a lista de espera.',
    ],
    decisions: [],
    // aprovado por Toia em 09/10/2026
    quote: {
      text: 'O Lucas transformou um programa longo, cheio de detalhes, numa página que se lê com calma e leva direto para a lista de espera. Do jeito que a gente fala com os nossos alunos.',
      author: 'Toia',
      role: 'psicóloga e mentora do Real',
    },
    images: [
      { src: img('real/01-capa'), caption: 'A abertura: o que é o Real em uma frase e o caminho para a lista de espera.' },
      {
        src: img('real/02-projeto'),
        caption: 'Os dois mentores e o que a mentoria inclui, de sessões comentadas a trocas em grupo.',
        layout: 'right',
      },
      {
        src: img('real/03-celular'),
        caption:
          'No celular: a abertura, o que é o Real e para quem é. É por ele que chegam quase nove em cada dez visitas (Framer Analytics, setembro a outubro de 2026).',
        layout: 'full',
      },
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, '0');
