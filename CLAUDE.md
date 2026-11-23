# Site do professor Marlon Pevidor

Site estático (HTML + CSS + JS puro, sem build), publicado no Cloudflare Pages a partir do branch `main`.
Endereços: `marlonpevidor.pages.dev` (principal) e `curso-iecc.pages.dev` (antigo, mesmo site; não apagar).

## Estrutura
- `index.html`: página inicial do professor (cursos, livro, professor, oferta). Tudo numa página só.
- `<sigla>/index.html`: uma página por curso. Ex.: `iecc/` = Introdução à Educação Cristã Clássica.
  Novos cursos: copiar `iecc/index.html` para uma pasta nova (`hpc/`, etc.), trocar conteúdo e lista `MODULOS`,
  e adicionar o cartão do curso na seção `#cursos` de `index.html`.
- `estilo.css`: estilos compartilhados por todas as páginas. Não duplicar CSS nas páginas.
- `pix.js` + `qrcode.js` (MIT, local): oferta via Pix. Chave, nome, cidade e valores no início de `pix.js`.
- Cada página de curso tem suas próprias perguntas frequentes; a página inicial não tem.
- `/#aula-N` redireciona para `/iecc/#aula-N` (links antigos das descrições do YouTube).

## Identidade visual
- Cores (tokens em `:root` de `estilo.css`): azul-marinho `#1c2a44`/`#131d31`, vinho `#7a1f2b`, dourado `#b38b3f`/`#d9c08a`, pergaminho `#f6f0e3`/`#ece2cc`.
- Fontes: Cormorant Garamond (títulos), EB Garamond (texto), Cormorant SC peso 600 (rótulos em maiúsculas).
  Não usar Cinzel: o "Ã" some em alguns navegadores (visto no computador do professor).
- Menu do topo aparece também no celular (marca e links centralizados em duas linhas).

## Simetria — regra obrigatória (o professor faz questão)
Usar sempre as medidas de `:root`; nunca valores soltos de padding/margin para seções e caixas.
- `--gutter: clamp(28px, 6vw, 40px)`: margem lateral do conteúdo (28 px no celular).
- `--section-y: clamp(64px, 10vw, 96px)`: espaço acima e abaixo de toda camada (64 px celular / 96 px computador).
- `--frame: 12px`: moldura dourada do topo; o texto dentro dela fica a `--gutter` da moldura.
- `--box-pad: clamp(22px, 5vw, 32px)`: espaço interno igual nos quatro lados de cartões e caixas.
- Primeiro e último elemento de cada bloco não têm margem externa (regra `:first-child`/`:last-child` em `estilo.css`).
- Botões lado a lado ou empilhados têm a mesma largura.
- Rodapé usa metade de `--section-y`.

**Verificação antes de entregar qualquer página nova ou alterada:**
1. `python3 -m http.server 8765` na raiz.
2. `node ferramentas/medir-simetria.js http://localhost:8765/ http://localhost:8765/<curso>/`
3. Em 390 px e 1280 px, top ≈ bottom e left ≈ right em cada camada (diferença máxima ~3 px,
   que é o espaço natural das letras). Texto alinhado à esquerda pode ter "right" um pouco maior.
4. Conferir que não há rolagem horizontal em 390 px e mandar captura do celular ao professor.

## Fluxo de trabalho
- Commits no branch de trabalho da sessão; o professor publica fazendo merge do pull request no GitHub.
  Cloudflare atualiza sozinho em ~1 minuto.
- Textos em português do Brasil, a partir do material do professor (Google Drive):
  livro *Como transformar a mente e o coração de sua família através da educação cristã clássica*
  (versão mais recente: Google Doc de 29/08/2025) e roteiro dos módulos do curso.

## Pendências conhecidas
- Foto do professor; link de compra e capa do livro; mentoria "A mente bem educada" (confirmar se existe);
  vídeos soltos `IMG_0144.MOV` e `IMG_0906.MOV` na pasta do curso.
- Links do YouTube das 38 aulas do IECC (campo `youtube` em `MODULOS`).
- Trocar `curso-iecc.pages.dev` por `marlonpevidor.pages.dev` nas meta tags quando confirmado.
- Lista final dos cursos (Panorama da História da Igreja, Seminário e outros).
