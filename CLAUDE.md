# Site do professor Marlon Pevidor

Site estático (HTML + CSS + JS puro, sem build), publicado no Cloudflare Pages a partir do branch `main`.
Endereços: `marlonpevidor.pages.dev` (principal) e `curso-iecc.pages.dev` (antigo, mesmo site; não apagar).

## Estrutura
- Todas as páginas seguem o MESMO modelo estético (o da página da mentoria) e usam só `estilo.css`.
  Partes comuns: barra clara no topo (escudo + "Marlon Pevidor" levando à página inicial, menu à direita;
  no celular, marca e menu centralizados), seções separadas por linhas finas, rodapé com *Nisi Dominus, frustra.* e a fonte "Salmo 127:1".
- `index.html`: página inicial do professor. Abertura com texto à esquerda e a foto em círculo à direita
  (`assets/marlon.webp`), cursos em cartões numerados (I, II, III, classe `.pillar`), faixa cobalto da mentoria,
  livro, professor (com quadro de formação), oferta Pix e chamada final.
- `<sigla>/index.html`: uma página por curso. Ex.: `iecc/` = Introdução à Educação Cristã Clássica.
  Novos cursos: copiar `iecc/index.html` para uma pasta nova (`hpc/`, etc.), trocar conteúdo e lista `MODULOS`,
  e adicionar o cartão do curso na seção `#cursos` de `index.html`.
- `mentoria/index.html`: página interna como as de curso (mesmo topo e estilo). Conteúdo da mentoria do professor;
  a foto NÃO aparece nela (fica na abertura da página inicial).
- `site.js` (em todas as páginas, `defer`): mede a altura real da barra do topo e grava em `--topbar-h`;
  `html { scroll-padding-top: calc(var(--topbar-h) - 1px) }` faz os links do menu pararem exatamente no início
  da camada, com a linha de cima dela escondida sob a linha da barra. Toda página nova precisa de `site.js`.
- Sala de aula (páginas de curso): usa a API oficial de vídeo do YouTube (`youtube.com/iframe_api`).
  Guarda no navegador (localStorage, chave `<sigla>-progresso`) a última aula, o minuto em que parou cada aula
  (a cada 5 s, ao pausar e ao sair da página) e as aulas assistidas (≥ 90%). Ao voltar, abre a última aula no
  minuto salvo, com o aviso "Você parou em 3:10…"; selos na lista: Assista / Parou em 3:10 / ✓ Assistida / Em breve;
  botão da abertura vira "Continue de onde parou: aula N (m:ss)". Ao terminar uma aula, abre e toca sozinha a próxima
  publicada. O progresso fica só naquele aparelho/navegador (não há login). Em novos cursos, trocar a chave.
- `pix.js` + `qrcode.js` (MIT, local): oferta via Pix. Chave, nome, cidade e valores no início de `pix.js`.
- Cada página de curso tem suas próprias perguntas frequentes; a página inicial não tem.
- `/#aula-N` redireciona para `/iecc/#aula-N` (links antigos das descrições do YouTube).
- Toda página interna volta à página inicial tocando na marca do topo (`../`). Páginas de curso têm "Outros cursos";
  a mentoria NÃO tem link para cursos no menu (só seções da própria página).
  Na página inicial, a marca usa `href="#top"`: só sobe ao início, sem recarregar a página.
- Marca do topo bem maior que o menu: "MARLON PEVIDOR" 1,15rem (celular 1,05rem) e escudo 38 px (celular 34 px);
  links do menu 0,8rem (celular 0,74rem).
- Abaixo da foto da abertura: ~30 px visíveis do anel até o nome e ~15 px do nome até a linha de baixo (proporção 2:1).
  O anel fica 12 px fora da foto: `figcaption { margin-top: calc(12px + 2rem) }`.
- No celular (foto acima do texto), pedido do professor: espaço do início da camada até o anel = espaço do anel
  até o nome = 36 px (`--photo-gap`). Por isso a abertura da página inicial no celular tem 36 px em cima,
  e não 64 (exceção à regra de simetria da camada; o "embaixo" continua 64).
- Barra do topo no celular: espaço visível IGUAL (22 px, `--tb-gap`) entre borda de cima, marca, cada linha do menu
  e borda de baixo; cada link tem área de toque de ~34 px (`--tap-y`) e ~29 px entre palavras.
- Página inicial: TODOS os links do menu descem para seções da própria página (Cursos, Mentoria, Livro, Sobre).
  "Mentoria" desce até a faixa `#mentoria`; só o botão da faixa leva a `mentoria/`.
- Abertura da página inicial: rótulo "Autor e educador cristão clássico"; abaixo da foto, só "Marlon Pevidor"
  (igual à marca do topo), em fonte maior. Seção "O professor": foto pequena em círculo à esquerda do rótulo e do nome (`.byline`).
  Páginas de curso e a mentoria NÃO têm seção do professor/biografia (quem chega já passou pela página inicial).
- Links do menu repetem o rótulo da seção de destino (ex.: menu "Como funciona" → seção "Como funciona");
  só os BOTÕES usam imperativo ("Veja como funciona").

- Livro na Amazon: https://a.co/d/00ePqFWon. Botão "Adquira seu exemplar na Amazon" (`.btn-primary`, nova aba)
  na seção do livro da página inicial e da página do curso; a capa desenhada também leva ao link.

## Identidade visual (modelo da mentoria)
- Fontes: Cormorant Garamond (títulos, citações, numerais) e Libre Franklin (texto, rótulos em maiúsculas, botões).
  Não usar Cinzel: o "Ã" some em alguns navegadores.
- Paleta tirada da foto (azulejo cobalto e creme), tokens em `:root` de `estilo.css`: `--paper #F3EEE4`,
  `--paper-2 #E7DECB`, `--ink #0E1A44`, `--ink-soft #4A4F6B`, `--cobalt #0B2A7A`, `--azure #2F62B8`, `--rule #D8CFBC`,
  `--on-cobalt`. Há tema escuro automático (`prefers-color-scheme`); usar sempre os tokens, nunca cores soltas.
- Componentes (classes do modelo): `.caps` (rótulo azul), `.head`, `.lede`, `.btn-primary`/`.btn-ghost`, `.hero`
  (`.hero.solo` sem foto), `.portrait`+`.ring`, `.band` (faixa cobalto; `.band.three`), `.story`, `blockquote`,
  `.paths`/`.path`, `.pillars`/`.pillar`, `.destiny`, `.about`, `.facts`, `.faq`, `.final`, `.center` (oferta),
  sala de aula (`.player-grid`, `.stage`, `.syllabus`). Títulos com parte final em `<em>` (itálico cobalto).
- Símbolo: escudo com ponta no topo e, dentro, a cruz "cross-fill" da Phosphor Icons (licença MIT), em `currentColor`
  (cobalto no topo claro). Escolha do professor: não trocar sem pedir. Proporção: linha 2,3 (viewBox 40), cruz em
  escala 0.08 centralizada em (20, 19.2).
- Ícones (escudo cobalto preenchido, cruz creme): `favicon.svg` (aba), `favicon-32.png`, `favicon.ico`, `icon-192.png`
  e `apple-touch-icon.png` (180x180, fundo creme, usado por favoritos e tela inicial do iPhone/Firefox iOS),
  além de `manifest.webmanifest` (ícones `icon-192-fundo.png` e `icon-512.png`, fundo creme).
  Toda página nova precisa dos `<link>` de ícone, do manifesto e do `theme-color` no `<head>` (copiar de `index.html`).
- Imagens de compartilhamento: `compartilhar.png`, `iecc/compartilhar.png`, `mentoria/compartilhar.png`, geradas com
  `node ferramentas/gerar-imagens-compartilhamento.js` (servidor local ligado). NÃO se atualizam sozinhas:
  gerar de novo quando a abertura mudar e aumentar o `?v=N` na meta `og:image`.

## Estilo de escrita — regra obrigatória (preferência do professor)
- Nunca usar artigo definido antes de pronome possessivo (meu, minha, seu, sua, nosso, nossa e plurais),
  nem nas contrações. Escrever: "de sua família", "em seu ritmo", "a seu filho", "por sua oferta", "sua jornada".
  Evitar: "da sua", "do seu", "na sua", "no seu", "à sua", "ao seu", "pela sua", "a sua jornada".
- Exceção: quando "todo/toda/todos/todas" exige o artigo ("todo o meu poder", "toda a sua vida").
- Exceção: citações literais (Bíblia, outros autores) ficam como no original.
- Vale também para textos tirados do material do professor: corrigir ao copiar.
- Referências bíblicas: sempre "Livro capítulo:versículo" com dois-pontos (ex.: Jeremias 6:16), nunca ponto,
  e texto sempre na Almeida Revista e Atualizada (ARA), indicada como "(ARA)".
  Jeremias 6:16 (ARA): "Ponde-vos à margem no caminho e vede, perguntai pelas veredas antigas, qual é o bom caminho;
  andai por ele e achareis descanso para a vossa alma".
- Palavras estrangeiras sempre em itálico (`<em>`): online, app, QR Code, afterschooling, homeschooling, trivium,
  quadrivium, imago Dei, paideia, frases em latim etc. Exceções: nomes próprios (Logos Online School, YouTube) e
  meta tags/título da aba, que não aceitam itálico. Em rótulos em maiúsculas, o `<em>` usa o itálico da Cormorant Garamond.
  Títulos e descrições das aulas (`MODULOS`) aceitam `<em>`.
- Tríade sempre em ordem alfabética: "beleza, bondade e verdade".
- Rodapé IGUAL em todas as páginas: *Nisi Dominus, frustra.* (itálico, sem tradução) e, embaixo, a fonte
  "Salmo 127:1" (a frase é da Vulgata, Sl 127:1; NÃO é de Tomás de Aquino). O professor não quer o próprio nome
  sob a frase, para não parecer autoria. Mateus 12:34 (ARA) fica na seção "Por que esta mentoria existe" da mentoria.
- Botões e chamadas de ação SEMPRE no imperativo (você): "Veja os cursos gratuitos", "Conheça o professor",
  "Acesse →", "Assista à primeira aula", "Comece pelo curso de introdução", "Copie o código Pix", "Fale comigo no WhatsApp". Bio: "uma escola online que serve famílias educadoras".
- Verificar com: `grep -rniP "\b(d|n|pel)?[oa]s?\s+(meu|minha|seu|sua|nosso|nossa)s?\b" --include=*.html .`

## Simetria — regra obrigatória (o professor faz questão)
Usar sempre as medidas de `:root`; nunca valores soltos de padding/margin para seções e caixas.
O modelo é alinhado à esquerda: "right" maior que "left" é normal; o que precisa bater é top ≈ bottom.
- `--gutter: clamp(28px, 6vw, 40px)`: margem lateral do conteúdo (28 px no celular).
- `--section-y: clamp(64px, 10vw, 96px)`: espaço acima e abaixo de toda camada (64 px celular / 96 px computador).
- `--box-pad: clamp(22px, 5vw, 32px)`: espaço interno igual nos quatro lados de cartões e caixas.
- Títulos e parágrafos não têm margem própria: o espaço entre eles vem do `gap` dos blocos (`.stack`, `.head`…).
- Botões lado a lado ou empilhados têm a mesma largura.
- ESPAÇO ENTRE BLOCOS (pedido do professor): dentro de cada camada, a distância visível entre um bloco e o
  seguinte é SEMPRE a mesma. Bloco = rótulo, título, parágrafo, citação (com autor), grupo de botões, lista,
  quadro/cartão, grupo de valores do Pix, foto com legenda. Medidas (`:root`):
  `--block-gap` 32 px celular / 44 px computador (entre blocos de uma camada);
  `--box-gap` 22–26 px (entre blocos DENTRO de um quadro/cartão);
  `--tight-gap` 14 px (dentro de um mesmo bloco: dois botões, valores do Pix, nome + linha de baixo, citação + autor);
  `--list-gap` 16 px (itens de uma lista). Nunca usar outros valores de gap/margem entre blocos.
  Isso só funciona porque TODO bloco de texto tem `text-box: trim-both cap alphabetic` (vai da altura das maiúsculas
  à linha de base). Conferir com `node ferramentas/medir-blocos.js 390` e `... 1280`: todos os pares devem dar
  32/44, 14, 22–26 ou 16 (a capa do livro soma +12 da sombra).
- Faixas azuis (`.band`) usam o mesmo `--section-y` das outras camadas (não são mais compactas).
- Única exceção: a abertura da página inicial no celular (36 px acima da foto, ver acima).
- Exceção 2 (pedido do professor): em "O professor" ao lado da fotinho (`.byline`), o rótulo e o nome ficam à
  distância de uma troca de linha do texto (altura da linha − altura das maiúsculas ≈ 16–17 px), não do --block-gap.
- Rodapé usa metade de `--section-y`.

- Simetria ÓPTICA: `text-box: trim-* cap alphabetic` corta a folga invisível acima do primeiro texto e abaixo do
  último texto de cada bloco (bloco `@supports` no fim de `estilo.css`). Sem isso, rótulos `.caps` no topo das
  camadas sobravam ~7 px a mais. Elementos que desenham além da caixa (sombra da capa, anel da foto) compensam
  com margem (`.book-cover { margin-bottom: 12px }`, `.byline img { margin-block: 5px }`).

**Verificação antes de entregar qualquer página nova ou alterada:**
1. `python3 -m http.server 8765` na raiz.
2. `PNGJS_DIR=<pasta com pngjs> node ferramentas/medir-simetria-pixels.js` (mede pelos PIXELS o que o olho vê:
   do topo da camada ao primeiro pixel visível e do último pixel à base; é a medição que vale).
   `ferramentas/medir-simetria.js` (caixas de texto) fica como apoio. Diferença aceitável: até ~5 px, vinda só de
   partes das letras abaixo da linha (g, p, ç) ou acentos.
3. Em 390 px e 1280 px, top ≈ bottom e left ≈ right em cada camada (diferença máxima ~3 px,
   que é o espaço natural das letras). Texto alinhado à esquerda pode ter "right" um pouco maior.
4. Conferir que não há rolagem horizontal em 390 px e mandar captura do celular ao professor.

## Fluxo de trabalho
- Commits no branch de trabalho da sessão; o professor publica fazendo merge do pull request no GitHub.
- Forma de trabalho combinada: ir guardando as alterações no branch (commit + push, sem abrir PR) e só abrir
  o pull request QUANDO o professor pedir, já com todas as alterações acumuladas. Ao entregar, dar o link do PR
  logo no início da resposta (se o anterior já foi publicado, abrir um novo). As alterações já aparecem na prévia
  do Cloudflare: https://claude-magical-knuth-bllvp8.marlonpevidor.pages.dev
  Cloudflare atualiza sozinho em ~1 minuto.
- Textos em português do Brasil, a partir do material do professor (Google Drive):
  livro *Como transformar a mente e o coração de sua família através da educação cristã clássica*
  (versão mais recente: Google Doc de 29/08/2025) e roteiro dos módulos do curso.

## Pendências conhecidas
- Capa do livro (imagem real); mentoria "A mente bem educada" (confirmar se existe);
  vídeos soltos `IMG_0144.MOV` e `IMG_0906.MOV` na pasta do curso.
- Links do YouTube das 38 aulas do IECC (campo `youtube` em `MODULOS`).
- Lista final dos cursos (Panorama da História da Igreja, Seminário e outros).
