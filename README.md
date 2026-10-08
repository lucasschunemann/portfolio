# Lucas Schünemann — portfólio

Um portfólio pensado como o catálogo de uma exposição, e escrito para trazer clientes: a
abertura diz o que eu faço e para quem, os serviços e o processo vêm logo depois das obras,
e todo caminho termina num contato (com e-mail já preenchido com um roteiro curto).

Cada projeto é uma obra na parede, com etiqueta de museu (número, título, ano, disciplina,
cliente). O Acompanha, que não tem telas públicas, aparece como um diagrama do motor de
créditos, marcado como "Coleção particular".

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
| Bio, clientes, serviços, processo, ficha e obras | `src/data/site.ts` |
| Pranchas das obras (capturas em passe-partout) | `src/assets/work/<projeto>/` |
| Posição de cada obra na parede da home | campo `wall` de cada projeto em `src/data/site.ts` |
| Retratos (abertura e díptico do Sobre) | `src/assets/retratos/` e `src/pages/index.astro` |
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

## Imagens das obras

As pranchas foram feitas a partir de capturas dos sites publicados (desktop em 2x e celular em
3x), centralizadas sobre um fundo no tom de cada projeto, com cantos arredondados e sombra
leve. A VON entra em tela cheia. O Sendeski usa as telas do protótipo, que não está no ar.

Cada figura tem um `layout` em `src/data/site.ts`: `full` (largura toda), `right` e `left`
(pendurada de um lado) ou `center`. A imagem da parede da home pode ser diferente da capa
(campo `wall.img`), como os celulares do Acronos e do TravelDone.

`public/og.jpg` é a imagem de compartilhamento. Ao publicar num domínio próprio, vale definir
`site` em `astro.config.mjs` e trocar `/og.jpg` por um endereço absoluto no `Base.astro`.

## Movimento

Pouco, e só onde ajuda:

- Ao abrir uma obra, a imagem viaja da parede até a capa da página (View Transitions)
- Blocos aparecem com um fade curto ao entrar na tela
- Na parede, a imagem aproxima de leve no hover e a seta da etiqueta aparece
- O retrato da abertura troca, no hover, para a outra foto (com o copo)
- Nos índices, as outras linhas esmaecem quando uma está em foco
- "Luz: acesa / apagada", no rodapé, troca entre tema claro e escuro (a primeira visita
  segue o sistema; a escolha fica salva)
- A hora de Blumenau no cabeçalho, com os dois pontos piscando

Com `prefers-reduced-motion`, tudo isso fica parado.
