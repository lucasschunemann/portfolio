# Quieto · Guia de marca para o site

Versão 1.1 · novembro de 2026 · direção "Pausa"

Este arquivo é a referência visual e de texto do site da Quieto. Leia antes de qualquer mudança de interface. Os valores exatos estão em `tokens.css` e as animações em `motion.css`. Nunca escreva um hex, raio, sombra ou duração solto no código: use sempre a variável.

---

## 1. A marca em poucas linhas

- **Quieto** é um estúdio de design de produto e web em Blumenau, SC, fundado por Lucas Schünemann.
- **Tagline:** Produtos que não precisam gritar.
- **Posicionamento:** para startups, SaaS e empresas B2B com produtos complexos ou cheios de dados. A Quieto trabalha com poucos clientes por vez, com o fundador desenhando cada projeto, da pesquisa ao handoff.
- **Personalidade:** calmo, mas não lento. Preciso, mas não frio. Seletivo, mas não arrogante. Simples, mas não simplório. Premium, mas não exibido.
- **Nome em texto corrido:** "Quieto", com Q maiúsculo. Minúsculo só no logo.

---

## 2. Logo

### Símbolo
Duas barras verticais de pausa. A segunda é mais baixa: o volume descendo.

Geometria em `viewBox="0 0 100 100"`. A unidade `u` é a largura da barra (20):

| Peça | x | y | largura | altura | raio |
|---|---|---|---|---|---|
| Barra alta | 22 | 14 | 20 | 72 (3,6u) | 10 (0,5u) |
| Barra baixa | 56 | 34 | 20 | 52 (2,6u) | 10 |

O espaço entre as barras é 0,7u. As duas se alinham pela base. A barra alta vem sempre primeiro.

```html
<svg viewBox="0 0 100 100" aria-hidden="true">
  <rect x="22" y="14" width="20" height="72" rx="10" fill="currentColor"/>
  <rect x="56" y="34" width="20" height="52" rx="10" fill="currentColor"/>
</svg>
```

Arquivos prontos em `assets/`: `simbolo-grafite.svg`, `simbolo-negativo.svg` (pérola + sálvia), `simbolo-perola.svg`, `simbolo-musgo.svg`, `favicon.svg`.

### Assinatura horizontal (principal)
- Nome "quieto" em Host Grotesk 600, minúsculo, tracking −0,055em, entrelinha 0,9.
- Símbolo com altura de 0,64× o corpo do nome.
- Espaço entre símbolo e nome: 0,17× o corpo do nome.
- Até o nome ser vetorizado no Figma, monte o logo como componente HTML (SVG do símbolo + texto). Não use SVG com `<text>` dentro de `<img>`, porque a fonte não carrega.

```html
<a class="q-logo" href="/" aria-label="Quieto, início">
  <svg viewBox="0 0 100 100" aria-hidden="true" style="width:.64em;height:.64em">…</svg>
  <span class="q-word">quieto</span>
</a>
<!-- .q-logo { display:inline-flex; align-items:center; gap:.17em; font:600 22px/0.9 var(--font-sans); letter-spacing:-0.055em; color:var(--text-primary); text-decoration:none } -->
```

### Versões de cor
| Fundo | Barra alta + nome | Barra baixa |
|---|---|---|
| Pérola, papel | grafite | grafite (ou musgo, só no favicon e avatar) |
| Grafite | pérola | sálvia |
| Musgo | pérola | pérola |
| Sálvia | grafite, só o nome | sem símbolo |

### Regras
- Área de proteção: a altura da barra menor, em todos os lados.
- Tamanho mínimo: horizontal 96 px, só o nome 64 px, símbolo 16 px.
- Não distorcer, não girar, não aplicar sombra ou efeito, não inverter a ordem das barras, não usar sálvia sobre fundo claro, não redesenhar o nome em outra fonte.

### Arquitetura
Marca única. Extensões usam o nome mais um descritor em mono, separados por um fio vertical: `quieto | estúdio`, `quieto | notas`, `quieto | toolkit`. Nenhuma extensão ganha símbolo, cor ou fonte própria.

Selo para sites de clientes: pílula de 32 px com "Design por" + símbolo 12 px + "quieto".

---

## 3. Cor

### Papéis
| Cor | Hex | Uso |
|---|---|---|
| Pérola | #EEEAE2 | Fundo principal do site |
| Papel | #FBFAF7 | Superfície de telas de interface (formulário, portal) |
| Grafite | #141412 | Texto, blocos de peso, seções escuras |
| Musgo | #5F6E49 | Ação: links, botão de destaque, seleção, status positivo |
| Sálvia | #9DB876 | Acento sobre fundo escuro, barra baixa do símbolo |
| Argila | #C7B299 | Superfície quente: capas, fotos, cards de caso |
| Névoa | #D9DCD3 | Superfície fria: diagramas, gráficos |

### Proporção
Pérola 60%, grafite 22%, musgo 8%, sálvia 5%, argila e névoa 5%. Muito fundo claro, pouco acento.

### Contraste (WCAG)
| Par | Razão | Uso |
|---|---|---|
| Grafite sobre pérola | 15,4:1 | Qualquer texto |
| Texto 2 (#5E5A52) sobre pérola | 5,7:1 | Texto secundário |
| Pérola sobre musgo | 4,6:1 | Texto de botão, rótulos |
| Grafite sobre sálvia | 8,4:1 | Qualquer texto |
| Argila sobre grafite | 9,0:1 | Destaque em seção escura |
| Sálvia sobre pérola | 1,8:1 | **Proibido para texto.** Só decoração |

### Tema escuro
Já definido em `tokens.css` via `[data-theme="dark"]` e `prefers-color-scheme`. No escuro, a ação vira sálvia com texto grafite.

---

## 4. Tipografia

Host Grotesk (400, 500, 600) para tudo. Fragment Mono (400) para rótulos, números, datas e metadados.

| Nível | Token | Tamanho | Entrelinha | Tracking | Peso |
|---|---|---|---|---|---|
| Display | `--t-display` | 52 a 132 px | 0,92 | −5,5% | 600 |
| Título 1 | `--t-h1` | 40 a 64 px | 0,95 | −5% | 600 |
| Título 2 | `--t-h2` | 32 a 44 px | 1 | −4,5% | 600 |
| Título 3 | `--t-h3` | 28 px | 1,15 | −3% | 600 |
| Abertura | `--t-lead` | 20 px | 1,45 | −1% | 400 |
| Corpo | `--t-body` | 16 px | 1,55 | 0 | 400 |
| Interface | `--t-ui` | 14 px | 1,45 | 0 | 400 / 500 |
| Pequeno | `--t-small` | 13 px | 1,5 | 0 | 400 |
| Rótulo | `--t-label` | 11 px | 1,45 | +6% | Mono, caixa alta |

Regras:
- Ênfase com peso, nunca com cor nem itálico.
- Mono só em caixa alta e até 13 px.
- Texto alinhado à esquerda, até 68 caracteres por linha (`--measure`).
- Nunca justificar.

---

## 5. Layout e espaço

- Container máximo de 1344 px, margem lateral `clamp(20px, 4vw, 48px)`, calha de 20 px.
- Desktop com 12 colunas, mobile com 4.
- Espaço em base 4: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Entre seções do site: 96 a 128 px. Dentro de seções: 32 a 48 px.
- Muito espaço em branco é parte da marca. Na dúvida, mais respiro.
- Rótulos de seção em mono pequeno, acima dos títulos ("01 · Contexto").

---

## 6. Componentes

O site tem dois tipos de superfície que convivem:

- **Editorial** (home, casos, serviços): blocos e imagens com canto reto (`--r-block: 0`), fios de 1 px separando conteúdo, tipografia grande.
- **Interface** (formulário, menus, portal, qualquer controle): mescla de Apple e Notion. Cantos contínuos que crescem com o tamanho, contorno feito de sombra fina, hover como fundo.

**Todo controle interativo segue o padrão de interface, mesmo dentro de páginas editoriais.**

### Raio
Tag 6 · item de menu 8 · botão, campo e select 10 · popover e lista agrupada 12 · card de interface 14 · toggle, toast e avatar 999.

### Contorno e sombra
- Sem borda escura. Contorno é `--shadow-1` (1 px a 6% de opacidade) ou borda `rgba(20,20,18,.14)` em campos.
- Sombra forte (`--shadow-2`) só no que flutua: menus, paleta de comandos, toast.

### Estados
- Hover: fundo `--hover` (5%). Nunca mudar cor de texto no hover.
- Pressionado: `--pressed` (9%).
- Foco: `--focus-ring` (anel musgo de 3 px) sempre visível no teclado (`:focus-visible`).
- Inativo: fundo `--neutro-200`, texto `--neutro-500`.

### Especificação
| Componente | Especificação |
|---|---|
| Botão primário | 36 px (ou 44 em CTA), raio 10, fundo grafite, texto papel 14/500. Seta opcional com `.q-arrow` |
| Botão secundário | Mesmo tamanho, fundo `--fill-secondary`, texto grafite, sem contorno |
| Botão terciário | Só texto em `--text-secondary`, raio 8, hover com fundo |
| Destrutivo | Fundo `rgba(163,65,46,.09)`, texto `--status-erro` |
| Botão de ícone | 32 × 32, raio 8, ícone 18 px |
| Campo | 36 a 44 px, raio 10, fundo branco, borda `rgba(20,20,18,.14)`. Foco: borda musgo + `--focus-ring`. Erro: borda e mensagem em `--status-erro`, com `aria-invalid` e `aria-describedby` |
| Busca | Raio 10, fundo `--fill-secondary`, ícone à esquerda, atalho `⌘K` em mono à direita |
| Chip de seleção | 36 a 40 px, raio 10, contorno fino. Selecionado: fundo grafite, texto papel, ícone de confirmação. `aria-pressed` |
| Segmented control | Trilho `--neutro-100`, raio 9, padding 2. Seletor branco, raio 7, `--shadow-thumb` |
| Toggle | 46 × 28, raio total. Ligado musgo, desligado `--neutro-200`. Bolinha branca de 24 px com sombra. `role="switch"` |
| Tag | 22 a 24 px, raio 6, 13 px, pares de cor `--tag-*` |
| Propriedades | Linhas de 34 px: ícone 15 px + chave em `--text-tertiary` 13 px + valor 14 px. Hover com fundo |
| Lista agrupada | Contêiner branco, raio 12, linhas de 46 px, ícone em bloco de 28 com raio 7, separador recuado até o texto, chevron em `--neutro-300` |
| Callout | Fundo `rgba(20,20,18,.04)`, raio 10, ícone em bloco de 28 |
| Toast | Pílula de 40 px, fundo `rgba(20,20,18,.88)` com `backdrop-filter: blur(16px)`, ícone sálvia, `--shadow-toast` |
| Paleta de comandos | Raio 12, fundo papel a 94% com blur 20, `--shadow-2`, itens de 34 px com raio 8, grupos com rótulo mono |
| Card de caso | Imagem com canto reto + nome em 24/600 + descrição 15 px + meta em mono. Link no card inteiro |

Toque mínimo: 44 × 44 em qualquer coisa clicável no mobile.

---

## 7. Elementos gráficos

A barra do símbolo vira linguagem visual:

- **Degrau:** quatro barras de altura decrescente. Indicador de etapa (preenchidas até a etapa atual, contorno nas próximas) e abertura de seção.
- **Ritmo:** fileira de barras que descem da esquerda para a direita. Capas e fundos de seção.
- **Pausa ampliada:** o símbolo gigante cortado pela borda. Capas de caso e fundos escuros.
- **Campo:** textura de barras tom sobre tom. Só em fundo escuro, contraste baixo.
- **Marcador:** símbolo de 12 px em musgo no lugar do bullet em listas de escopo.

Regras: barras sempre verticais e com pontas redondas. A altura só diminui no sentido da leitura. No máximo duas cores por composição. Ritmo e pausa ampliada nunca na mesma peça. Texto nunca sobre o ritmo.

Fotografia: luz natural, tons quentes, pouca saturação, lugares e processo reais. Nunca banco de imagem.

---

## 8. Ícones

- Grade de 24 px com 2 px de respiro, traço de 1,5 px, pontas e cantos redondos, só contorno.
- Base prática: Lucide com `stroke-width="1.5"`.
- Cor do texto ao lado. Musgo só quando o ícone é a ação.
- Ícone próprio "pausa" (`M9 5v14 M15 9v10`) repete o símbolo e serve para "etapa" ou "progresso".
- Tamanhos: 16, 20, 24, 32.

---

## 9. Movimento

Tokens: `--ease-out` (padrão), `--ease-inout` (loops), `--dur-fast` 160 ms, `--dur-base` 320 ms, `--dur-slow` 640 ms. Tudo pronto em `motion.css`.

- **Entrada do logo** (`.q-logo--intro`): só na primeira carga da home. As duas barras nascem iguais, a segunda desce 1u, depois o nome entra. Total de 1,4 s.
- **Hover de botão:** seta desliza 4 px.
- **Revelar ao rolar** (`.q-reveal`): sobe 12 px com fade. Cascata de 80 ms, no máximo quatro itens.
- **Popover e toast:** entram em 320 ms.
- **Loader** (`.q-loader`): três barras respirando, a última em musgo.

Princípios: uma coisa se move por vez. Movimento explica mudança de estado, nunca é enfeite. Deslocamento de 4 a 16 px. Nada quica nem estica. Com "reduzir movimento", tudo vira corte seco (já tratado em `motion.css`).

```js
// Revelar ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.q-reveal').forEach((el) => io.observe(el));
```

---

## 10. Voz e microcopy

Princípios: curto, concreto, sem pressa, honesto. Primeira pessoa do plural ("a gente", "nós").

**Evitar:** inovador, disruptivo, apaixonado, solução, incrível, sinergia, ponto de exclamação, emoji, travessão.

| Lugar | Assim |
|---|---|
| CTA principal | Começar um projeto |
| CTA secundário | Ver trabalhos |
| Envio de formulário | Enviar |
| Confirmação | Recebemos. Respondemos em até dois dias úteis. |
| Erro de campo | Faltou o endereço completo, com .com ou .com.br. |
| Estado vazio | Nada por aqui ainda. |
| Disponibilidade | Próxima vaga: [mês] |

Assim não: "Soluções inovadoras que transformam a experiência do seu usuário!". Assim: "Redesenhamos o fluxo de pedidos para ele caber em menos telas."

---

## 11. Estrutura das páginas

### Home
1. **Cabeçalho:** logo (com entrada animada na primeira visita), Trabalhos, Serviços, Estúdio, Notas e o botão "Começar um projeto".
2. **Hero:** display "Design de produto feito sem pressa.". Abertura: "A Quieto é um estúdio de design em Blumenau. Desenhamos produtos digitais, design systems e sites, com poucos projetos por vez para que cada decisão tenha o tempo que merece." Status "Próxima vaga: [mês]" e dois botões.
3. **Faixa de clientes:** Área Central, neth!, Acompanha, PF Advogados, WF Odontologia, RealPlay, MetaCumprida, Sendeski Café.
4. **Trabalhos selecionados:** grade de 2 colunas com neth!, Acronos, Acompanha e Sendeski Café. Imagem 4:3 com canto reto.
5. **Serviços** (seção grafite): título "Três coisas, bem feitas." Produto e UX/UI, Design systems e Sites, cada um com "A partir de R$ [valor]". O preço sai da conversa, não de uma tabela.
6. **Como funciona:** Conversa, Estrutura, Interface, Entrega, com o degrau mostrando cada etapa.
7. **Estúdio:** "Um estúdio pequeno de propósito." Retrato, bio curta e dados (base, fuso, ferramentas).
8. **Notas:** lista de textos com categoria e tempo de leitura.
9. **Contato** (seção musgo): "Tem um produto que precisa de calma?" com CTA.
10. **Rodapé** grafite.

### Página de caso
Rótulo "Trabalhos / Caso 0X", título-tese em display, metadados (cliente, setor, período, entregas), imagem 16:9, depois 01 Contexto, 02 Abordagem (4 passos), 03 Três decisões (imagem + título + parágrafo), 04 Resultado em seção grafite (números reais e depoimento) e Próximo caso.

### Começar um projeto
À esquerda: título, abertura e "O que acontece depois" (resposta em até dois dias úteis, conversa de 45 minutos, proposta em uma semana). À direita: formulário em superfície papel com raio 14. Campos: nome, e-mail, empresa, site (opcional), chips "O que você precisa" e "Investimento previsto", mensagem e o botão Enviar.

---

## 12. Acessibilidade

- Contraste mínimo de 4,5:1 para texto (tabela da seção 3).
- `:focus-visible` com anel musgo em todo elemento interativo.
- Toque de 44 × 44 no mobile.
- `<button>`, `<a href>`, `<label>` e `<fieldset>` de verdade. Nada clicável feito com `div`.
- `aria-pressed` nos chips, `role="switch"` + `aria-checked` nos toggles, `aria-current="page"` na navegação.
- Símbolo decorativo com `aria-hidden="true"`. Logo com `aria-label="Quieto, início"`.
- Respeitar `prefers-reduced-motion` e `prefers-color-scheme`.

---

## 13. A preencher antes de publicar

- [ ] E-mail e domínio do estúdio
- [ ] Mês da próxima vaga
- [ ] Valores "a partir de" de cada serviço e faixas do formulário
- [ ] Descrição e ano do caso Sendeski Café
- [ ] Métricas reais e depoimentos dos casos
- [ ] Confirmar com o Acompanha o que pode ser público
- [ ] Handles de Instagram e LinkedIn
- [ ] Fotos: retrato e imagens dos casos

---

## 14. Checklist antes de cada entrega

- [ ] Nenhum hex, raio, sombra ou duração fora de `tokens.css`
- [ ] Controles seguem o padrão de interface (seção 6)
- [ ] Sálvia não aparece como texto em fundo claro
- [ ] Testado com teclado, tema escuro e "reduzir movimento"
- [ ] Testado em 390 px de largura
- [ ] Texto revisado contra a lista de palavras a evitar
