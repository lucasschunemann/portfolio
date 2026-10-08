# lucas von — portfólio

Pôster suíço com alma brasileira: papel off-white, grid de 12 colunas, muito respiro,
grotesca condensada (Mona Sans) misturada com uma serifa estreita (Instrument Serif), e as
três formas da bandeira desmontada (retângulo verde, losango amarelo, círculo azul) como
sistema gráfico.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ estático
```

## Stack

- **Astro 7**, site estático (multipágina)
- **GSAP 3.15** com ScrollTrigger, SplitText e DrawSVG (todos gratuitos)
- **Lenis** para scroll suave
- Fontes via Fontsource: `Mona Sans Variable` (eixos de peso 200–900 e largura 75–125%) e
  `Instrument Serif` (normal e itálica)

## Onde mexer

| O quê | Arquivo |
|---|---|
| Conteúdo (bio, projetos, serviços) | `src/data/site.ts` |
| Artigos (um Markdown por artigo) | `src/content/artigos/*.md` |
| Cores, tipografia e todos os estilos | `src/styles/global.css` (tokens no `:root`) |
| Home | `src/pages/index.astro` |
| Página de caso | `src/pages/trabalho/[slug].astro` |
| Índice e página de artigo | `src/pages/artigos/index.astro`, `src/pages/artigos/[slug].astro` |
| Imagens dos projetos | `public/work/<projeto>/01.jpg`, `02.jpg` |

Para adicionar um projeto, basta incluir um objeto em `projects` no `site.ts`. A página
`/trabalho/<slug>/` é gerada sozinha. Projeto sem imagem (`images: []`) usa uma capa
tipográfica (veja `src/components/Poster.astro`, hoje feita para o Acompanha).

Para publicar um artigo, crie `src/content/artigos/<slug>.md` com este cabeçalho e escreva
o texto em Markdown abaixo dele (o primeiro parágrafo vira o lead em serifa, e cada `##`
entra no índice lateral):

```yaml
---
title: 'Título completo'
display: ['Parte em caixa-alta', 'parte em itálico']
date: 2026-10-07
theme: UX design
excerpt: 'Uma frase para a listagem e o SEO.'
tone: blue # blue | green | yellow | ink
shape: circle # rect | diamond | circle
---
```

A capa de cada artigo é gerada a partir de `shape` e `tone` (`src/components/ArticleCover.astro`).

## Motion

| Onde | O que acontece | Arquivo |
|---|---|---|
| Primeiro acesso | Loader: as três formas giram, trocam de lugar e voam até o hero | `scripts/home.ts` → `runLoader` |
| Hero | Arte generativa de linhas (ref. pôster *Brazilidade*). O cursor afasta as linhas, o clique solta uma onda, e no scroll a forma abre e gira | `scripts/lines.ts` |
| Hero | Título entra letra a letra; a palavra em itálico alterna | `scripts/home.ts` → `setupHero` |
| Marquee | Velocidade e direção seguem o scroll, com skew | `initMarquee` |
| Trabalho | Pilha de cards sticky que encolhem e escurecem | `initStack` |
| Serviços | Três cards saem empilhados e abrem em leque, com tilt 3D no hover | `initServices` |
| Sobre | A bandeira se monta no scroll, com parallax no mouse | `initFlag` |
| Rodapé | Letras de "LUCAS von" mudam peso e largura conforme o cursor | `initWordmark` |
| Entre páginas | Cortina na cor do projeto ou do artigo, com o nome dele | `scripts/core.ts` → `leave` / `enter` |
| Artigos (índice) | A prévia da capa segue o cursor e a linha se pinta na cor do artigo | `scripts/article.ts` → `initBlogList` |
| Artigo | Os anéis da capa nascem do centro, torcem com o scroll e fazem túnel com o cursor; barra de leitura e índice que acompanha a seção | `scripts/article.ts` |

Com `prefers-reduced-motion` ligado, o loader, o Lenis e as animações de scroll
ficam desligados, e a arte do hero vira um quadro estático.
