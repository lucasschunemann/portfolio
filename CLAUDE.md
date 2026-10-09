# Portfólio do Lucas Schünemann

Site estático em Astro 7 (pt-BR). Objetivo: **atrair clientes** (produto, UX/UI, design systems e sites).
O visual é de catálogo de exposição: cubo branco, texto pequeno, imagens como obras na parede.

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
| Imagens das obras (pranchas já compostas) | `src/assets/work/<slug>/` |
| Retratos | `src/assets/retratos/` |
| Home / obra / textos | `src/pages/index.astro`, `src/pages/obras/[slug].astro`, `src/pages/artigos/` |
| Figura da obra (layouts `full/right/left/center`) | `src/components/Fig.astro` |
| Diagrama do Acompanha | `src/components/Diagram.astro` |
| Estilo (tokens no `:root`) | `src/styles/global.css` |
| Material bruto (não vai pro git) | `material/<slug>/` |
| Ferramentas de captura e composição | `tools/capture/` |

Para uma obra nova: um objeto em `projects` (`site.ts`) e as imagens em `src/assets/work/<slug>/`. A página sai sozinha.

## Próxima sessão: detalhar mais cada projeto

Veja `docs/PROJETOS.md` (o que já existe e o que falta, obra por obra) e `material/README.md` (como entregar prints e fotos).

Direção: cada obra deve virar um case que convença um cliente: problema, o que foi feito, processo, resultado,
com mais imagens (telas, processo, detalhes, antes e depois). Hoje cada uma tem de 2 a 6 imagens e texto curto.

Ideias já levantadas:
- Estrutura de case mais rica: Desafio, Solução, Processo, Resultado (só com dados reais) e "O que eu faria diferente".
- Galeria por obra com mais figuras e legendas de verdade, escritas por quem fez.
- Resultados reais por projeto (conversão, tempo, feedback do cliente). Se não houver número, não inventar.
- Depoimentos curtos de clientes, com nome e permissão.
- Páginas de serviço ou preço-base, se o Lucas quiser.

## Pontos em aberto

- Textos que eu escrevi e o Lucas ainda deve revisar: abertura, serviços, etapas, "Vamos tirar o seu projeto do papel", "Eu respondo com os próximos passos".
- Acompanha não tem telas públicas: hoje é um diagrama. Perguntar se há prints liberados.
- Sendeski não está no ar: usa as telas do protótipo.
- O site da PF Advogados hoje é de Direito Imobiliário (não mais da CNH).
- Domínio próprio: definir `site` em `astro.config.mjs` e usar URL absoluta no `og:image`.
- Há "—" em títulos e anos (`2025—26`). Na galeria VON o Lucas tirou todo "—" do copy; confirmar se vale aqui.
