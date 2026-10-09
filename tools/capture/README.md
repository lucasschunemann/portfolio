# Captura e composição das pranchas

Scripts Node (ESM) que tiram capturas de sites no ar e montam as pranchas das obras. Usam `playwright-core` e `sharp`
(devDependencies). É preciso um Chromium: por padrão o do cache do Playwright; ou `CHROME_PATH=/caminho/do/chrome`.

| Script | Faz |
|---|---|
| `capture.mjs <slug> <url>` | desktop (1440 em 2x) e celular (390 em 3x), rolando a página; salva em `out/<slug>/` |
| `pages.mjs <slug> <url...>` | páginas internas específicas (rolagem 0 e 820 px) |
| `dark.mjs` | exemplo de captura com `colorScheme: dark` (Acronos) |
| `links.mjs <url>` | lista os links internos de um site |
| `von2.mjs`, `von3.mjs` | exemplos de captura do mundo 3D da VON (clica, abre caso, troca para noite) |
| `sheet.mjs` | folhas de contato (`sheet-<slug>.jpg`) para escolher as melhores capturas |
| `compose.mjs` | monta as pranchas em passe-partout e grava em `src/assets/work/` |
| `og.mjs` | gera `public/og.jpg` a partir da home (precisa do dev server ligado) |

Fluxo: `node capture.mjs <slug> <url>` → `node sheet.mjs` → olhar as folhas → ajustar e rodar `node compose.mjs`.

Atenção: `compose.mjs` **apaga e recria** as pastas de `src/assets/work/` das obras listadas nele. Antes de rodar,
confira a lista no topo do arquivo e lembre de que o resultado precisa bater com os nomes usados em `src/data/site.ts`.
O Sendeski é montado a partir de `material/sendeski/*-original.jpg`.
