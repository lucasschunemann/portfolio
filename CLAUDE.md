# Portfólio do Lucas Schünemann

Site estático em Astro 7 (pt-BR). Objetivo: **atrair clientes** (produto, UX/UI, design systems e sites).
O visual é de catálogo de exposição: cubo branco, texto pequeno, imagens como obras na parede.
**Menos é mais:** antes de acrescentar, veja o que dá para tirar.

## Como trabalhar aqui

- `npm run dev` (http://localhost:4321). Se der "Another astro dev server is already running": `npx astro dev stop`.
- Depois de trocar dependências, reinicie o dev server (o cache do Vite fica velho).
- `npm run build` precisa passar. Teste desktop (1440) e celular (390) sem rolagem horizontal.
- **Pergunte antes de subir para a `main`.** Commits em português, com o trailer de co-autoria.
- Texto do site em pt-BR. Grafia: **"o neth!"** (masculino). Instagram: `_vonhelden`.
- Não invente métricas nem depoimentos. Só números reais (os "4+ anos, 15+ projetos" vêm do Framer, não verificados).

## Mapa

| O quê | Onde |
|---|---|
| Todo o conteúdo (bio, serviços, processo, obras, legendas, layout das figuras) | `src/data/site.ts` |
| Textos/artigos (um Markdown cada) | `src/content/artigos/*.md` |
| Imagens e vídeos das obras (pranchas já compostas) | `src/assets/work/<slug>/` |
| Retratos | `src/assets/retratos/` |
| Home / obra / textos | `src/pages/index.astro`, `src/pages/obras/[slug].astro`, `src/pages/artigos/` |
| Figura da obra (layouts `full/right/left/center`, imagem ou vídeo) | `src/components/Fig.astro` |
| Diagrama do Acompanha | `src/components/Diagram.astro` |
| Estilo (tokens no `:root`) | `src/styles/global.css` |
| Material bruto e perguntas por obra (não vai pro git) | `material/<slug>/`, `material/<slug>/notas.md` |
| Ferramentas de captura e composição | `tools/capture/` |

Para uma obra nova: um objeto em `projects` (`site.ts`) e as imagens em `src/assets/work/<slug>/`. A página sai sozinha.
Só vai para a parede da home quem tem `wall`; o resto fica no índice. Textos com `featured: true` aparecem na home.

## Próxima sessão: preencher os casos com o que o Lucas responder

A estrutura dos casos já existe (Desafio, Decisões, Processo, Resultado, "Hoje eu faria diferente"; seções vazias somem).
Veja `docs/PROJETOS.md` (estado obra por obra e fatos já levantados) e as perguntas em `material/<slug>/notas.md`.

- Quando as `notas.md` tiverem respostas: ficha (papel, duração), resultados reais, frases de clientes, processo.
- neth! já é caso (Nº 01), feito só com o site público. Falta o que só o Lucas tem: telas do painel, quais decisões foram dele, números.
- Fluxo de documentos da Área Central: tem resultado citado na bio; pode virar caso (`material/area-central/notas.md`).
- Analytics do Framer: volume baixo não vai para o site; só proporções que sustentam uma decisão (ex.: "quase nove em cada dez visitas pelo celular").

## Pontos em aberto

- Textos que eu escrevi e o Lucas ainda deve revisar: abertura, serviços, etapas, "Vamos tirar o seu projeto do papel", "Eu respondo com os próximos passos", e os desafios e decisões de cada caso (a lista do que confirmar está em cada `notas.md`).
- Acompanha fica sem imagens por enquanto (decidido em 09/10/2026): diagrama e duas decisões em texto.
- Sendeski não está no ar: usa as telas do protótipo.
- O site da PF Advogados hoje é de Direito Imobiliário; nasceu para defesa de CNH (Wayback, dez/2024). Isso está no Resultado, a confirmar.
- Domínio próprio: definir `site` em `astro.config.mjs` e usar URL absoluta no `og:image`.
- O rodapé dos sites novos da WF e do TravelDone ("Site por") ainda leva a lucasvon.framer.website, o portfólio antigo. Trocar quando houver domínio.
- Há "—" em títulos e anos (`2025—26`). Na galeria VON o Lucas tirou todo "—" do copy; confirmar se vale aqui.
