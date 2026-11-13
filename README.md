# Guia de Negócios dos Irmãos

Site estático (HTML + CSS + JavaScript, sem instalar nada) que lista os serviços,
comércios e empresas de irmãos de várias igrejas. Todo cadastro tem referência
confirmada com o pastor da pessoa.

## Arquivos
- `negocios.js`: **os dados**. É o único arquivo que precisa ser editado no dia a dia.
- `index.html`: o guia (busca, filtro por igreja e por categoria, botões de WhatsApp e Instagram).
- `cadastro.html`: o formulário de cadastro. Ele monta uma mensagem e abre o WhatsApp do responsável.
- `estilo.css`, `app.js`: o visual e o funcionamento.

## Fluxo de cadastro com referência pastoral
1. A pessoa preenche `cadastro.html` (dados do negócio + igreja, pastor e telefone do pastor).
2. A mensagem chega no WhatsApp do responsável (`whatsappResponsavel` em `negocios.js`).
3. O responsável liga ou manda mensagem **diretamente** para o pastor e confirma a referência.
4. Confirmado, o negócio é adicionado em `negocios.js` com `igreja`, `pastor` e `referenciaEm`.

O telefone do pastor e a conversa de referência **não** vão para o site. Este repositório e o site são públicos.

## Publicar no Cloudflare Pages
1. Em https://dash.cloudflare.com, abra **Workers & Pages** e crie um projeto do tipo **Pages** com **upload direto** (Upload assets).
2. Dê o nome `guia-de-negocios-da-igreja`. O endereço será `https://guia-de-negocios-da-igreja.pages.dev`.
3. Arraste a pasta do site (com `index.html` dentro) e clique em **Deploy**.
4. Para atualizar: abra o projeto, clique em **Create deployment** (nova implantação) e arraste a pasta nova.

Se o endereço for diferente, atualize `siteUrl` em `negocios.js`.
O arquivo `_headers` faz o navegador sempre conferir se há versão nova do site.
