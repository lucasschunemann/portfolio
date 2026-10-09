# Projetos: o que existe e o que falta

Estado em 09/10/2026. Imagens e vídeos em `src/assets/work/<slug>/`. "Ao vivo" = dá para capturar de novo com `tools/capture`.

## Como um caso é montado

Menos obras, mais fundo. Só os casos completos vão para a parede da home (os que têm `wall` em `site.ts`);
os outros ficam no índice, com uma página curta.

Ordem da página da obra (cada seção some quando está vazia):

1. **Ficha:** ano, cliente, indústria, disciplina, *papel* (o que foi meu e o que foi do time), *duração*, ferramentas.
2. **Fig. 1:** a capa.
3. **Desafio:** o problema de partida, em uma ou duas frases.
4. **Decisões:** duas ou três, cada uma com título, o porquê e a figura que mostra. Substituem listas genéricas.
5. **Processo:** uma imagem (versões, wireframe) ou um parágrafo.
6. **Resultado:** só com dado real. Sem número, sem seção.
7. **Depoimento:** as palavras de quem contratou, com nome, cargo e permissão. Sem texto, não aparece.
8. **Hoje eu faria diferente:** opcional, uma ou duas linhas.
9. As figuras que sobram (celular, tema claro etc.).

Legenda descreve; o texto da decisão explica o porquê. Uma figura pode ser um vídeo curto (`video` na figura, feito com
`tools/capture/video.mjs`): toca sozinho só enquanto está na tela e fica parado com controles para quem pede menos movimento.

## Estado

| Nº | Obra | Na parede | Ao vivo | Decisões | Processo | Resultado | Falta |
|---|---|---|---|---|---|---|---|
| 01 | neth! | sim | somosneth.com | 3 | não | não | telas do painel por dentro, quais decisões foram do Lucas, números |
| 02 | Acronos | sim | acronosds.framer.website | 3 | sim | não | adoção (produtos, times), antes e depois de um componente |
| 03 | TravelDone | sim | traveldone.vercel.app | 3 (uma em vídeo) | sim | não | número de vendas ou alunos, se puder |
| 04 | Acompanha | sim | não | 2, só texto | não | não | sem imagens por enquanto (decidido); nº de versões, módulo de Educação |
| 05 | VON | sim | galery-lemon.vercel.app | 3 (uma em vídeo) | não | não | reação ou número |
| 06 | WF Odontologia | não | wfodondotologia.vercel.app | 3 (antes e depois) | sim | não | analytics da versão nova |
| 07 | PF Advogados | não | passigfirmino.adv.br | 3 (uma em vídeo) | não | sim, a confirmar | saiu da parede em 09/10/2026 (o Lucas preferiu um site mais bonito) |
| 08 | Real | não | somosreal.framer.website | não | não | não | ano, frase dos mentores |

Perguntas para o Lucas, uma por obra: `material/<slug>/notas.md` (também `material/area-central/` e `material/sites/`,
que junta WF, TravelDone e Real). Depoimentos aprovados em Acronos, TravelDone, Acompanha, WF, PF e Real (`material/depoimentos.md`).
O Sendeski saiu do site em 09/10/2026 (protótipo, fora do ar); as telas originais seguem em `material/sendeski/`. Esta pasta não vai para o git.

## Fatos levantados (para não procurar de novo)

- **PF Advogados:** o Wayback Machine tem o site em dez/2024, ainda sobre defesa de CNH ("Recebeu notificação de suspensão da
  sua CNH??"), com as mesmas seções de hoje: Home, Nossos Serviços, Quem somos?, Perguntas frequentes, Avaliações. A cópia
  arquivada está sem CSS, então não serve como imagem de antes. O site atual é de Rio do Sul, tem 6 áreas, 10 perguntas
  frequentes e 6 avaliações do Google.
- **Acronos:** changelog 0.1.0 em 25/11/2024; 4 guias de estilo (cores, tipografia, tamanhos, efeitos) e 12 componentes
  documentados (menu lateral, menu superior, área de texto, avatar, alertas, botões, tabs, controles, date picker, inputs,
  tabelas, paginação). Referências citadas na página Sobre: Carbon e Nimbus. Dois estilos de sombra.
- **neth!:** somosneth.com (Next.js, não Framer). Três públicos: pessoa (R$ 19,90/mês ou R$ 15,92/mês no anual), empresa
  (NR-01; o RH vê números do time, não o histórico de cada um) e neth! Clínica (1 profissional + 14 pacientes, R$ 89,90/mês).
  Páginas: empresas, profissionais, planos, método, sobre. Personagem: a Janeth. O aviso de cookies cobre as capturas:
  `HIDE='[role=dialog][aria-label="Preferências de cookies"]' node capture.mjs neth https://somosneth.com`.
- **WF e TravelDone, segunda versão (09/10/2026):** refeitos em HTML, CSS e JavaScript (com Lenis), na Vercel. As
  versões em Framer seguem no ar (wfodontologia.framer.website, traveldone.framer.website); a abertura antiga da WF está
  em `02-antes-depois`. A galeria do TravelDone é fixada (`#viagens`, de 4545 a 8899 px em 1440x900) e vira o vídeo
  `02-viagens`. O rodapé dos dois ainda leva ao portfólio antigo (lucasvon.framer.website).
- **Real (RealPlay):** mentoria clínica para psicólogos, de Toia e João; turma com início em 17/03 (2026). A página de
  contato no ar ainda tem texto de exemplo ("X SEGUIDORES", "Lorem ipsum").
- **Analytics (Framer, 9 set. a 9 out. de 2026):** WF 29 visitantes (25 no celular, 24 pelo Instagram; medido na versão em Framer); Real 18 (16 no
  celular). No site só aparece a proporção do celular, na legenda; os números absolutos ficam fora.

## O que eu consigo fazer sozinho

- Recapturar qualquer site ao vivo e recompor as pranchas (`tools/capture/README.md`).
- Vídeos de rolagem no celular (`video.mjs`) e cortes de gravações de tela (ffmpeg, ver o comentário em `compose.mjs`).
- Reescrever cada caso assim que as `notas.md` tiverem respostas.
