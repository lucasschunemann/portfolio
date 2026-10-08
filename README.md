# Lucas Schünemann — portfólio

Um portfólio pensado como o catálogo de uma exposição: cubo branco, muito respiro, texto
pequeno e as imagens no centro. Cada projeto é uma obra na parede, com etiqueta de museu
(número, título, ano, disciplina, cliente). O Acompanha, que não tem telas públicas, aparece
como "Coleção particular".

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ estático
```

## Stack

- **Astro 7**, site estático, com `<ClientRouter />` (View Transitions)
- Imagens otimizadas pelo `astro:assets` (WebP em vários tamanhos, a partir de `src/assets/work`)
- Fontes via Fontsource: **Host Grotesk** (texto e títulos) e **Fragment Mono** (números,
  datas e coordenadas)
- Sem biblioteca de animação: CSS e um script pequeno em `src/scripts/site.ts`

## Onde mexer

| O quê | Arquivo |
|---|---|
| Bio, prática, ficha e obras | `src/data/site.ts` |
| Posição de cada obra na parede da home | campo `wall` de cada projeto em `src/data/site.ts` |
| Textos (um Markdown por texto) | `src/content/artigos/*.md` |
| Cores, tipografia e layout | `src/styles/global.css` (tokens no `:root`) |
| Home | `src/pages/index.astro` |
| Página de obra | `src/pages/obras/[slug].astro` |
| Textos | `src/pages/artigos/index.astro`, `src/pages/artigos/[slug].astro` |

Para publicar um texto, crie `src/content/artigos/<slug>.md`:

```yaml
---
title: 'Título'
date: 2026-10-08
theme: UX design
excerpt: 'Uma frase para a listagem e o SEO.'
---
```

## Movimento

Pouco, e só onde ajuda:

- Ao abrir uma obra, a imagem viaja da parede até a capa da página (View Transitions)
- Blocos aparecem com um fade curto ao entrar na tela
- Na parede, a imagem aproxima de leve no hover e a seta da etiqueta aparece
- Nos índices, as outras linhas esmaecem quando uma está em foco
- "Luz: acesa / apagada", no rodapé, troca entre tema claro e escuro (a primeira visita
  segue o sistema; a escolha fica salva)
- A hora de Blumenau no cabeçalho, com os dois pontos piscando

Com `prefers-reduced-motion`, tudo isso fica parado.
