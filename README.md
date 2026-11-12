# Guia de Negócios da Igreja

Site estático (HTML + CSS + JavaScript, sem instalar nada) que lista os serviços,
comércios e empresas dos membros da igreja, com busca, filtro por categoria e
botões diretos para WhatsApp e Instagram.

## Arquivos
- `negocios.js` — **os dados**. É o único arquivo que precisa ser editado no dia a dia.
- `index.html`, `estilo.css`, `app.js` — a estrutura, o visual e o funcionamento.

## Como adicionar um negócio
Abra `negocios.js`, copie um bloco `{ ... }`, cole no fim da lista e troque os dados.
O WhatsApp deve ter só números: `55` + DDD + número (ex.: `5511987654321`).

## Publicar no Netlify (atualização automática)
1. Em https://app.netlify.com, clique em **Add new site → Import an existing project → GitHub**.
2. Escolha este repositório e a branch `main`. Deixe "Build command" vazio e "Publish directory" como `.`.
3. Pronto: a cada alteração enviada para a `main`, o Netlify atualiza o site sozinho em segundos.
