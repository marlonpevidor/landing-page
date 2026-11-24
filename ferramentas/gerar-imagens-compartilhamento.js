// Gera as imagens de compartilhamento (1200x630) a partir do topo de cada página, com o escudo.
// Uso: na raiz, rode  python3 -m http.server 8765  e depois  node ferramentas/gerar-imagens-compartilhamento.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [url, out] of [['http://localhost:8765/', 'compartilhar.png'], ['http://localhost:8765/iecc/', 'iecc/compartilhar.png']]) {
    const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
    await p.goto(url); await p.waitForTimeout(1500);
    await p.evaluate(() => {
      const crest = document.querySelector('header .crest').cloneNode(true);
      crest.setAttribute('class', 'share-crest');
      crest.querySelector('clipPath').id = 'escudo-share';
      crest.querySelector('[clip-path]').setAttribute('clip-path', 'url(#escudo-share)');
      document.querySelector('.hero .wrap').prepend(crest);
    });
    await p.addStyleTag({ content: `header.top,.hero .actions{display:none!important}
      .hero{height:630px;display:flex;align-items:center;padding:0!important}.hero .wrap{width:100%}
      .share-crest{display:block;width:84px;height:96px;margin:0 auto 26px}
      .hero .meta{display:none!important} .hero h1{max-width:22ch!important}
      .hero p.lede{margin-bottom:0!important}` });
    await p.waitForTimeout(500);
    await p.screenshot({ path: '/home/user/landing-page/' + out });
    await p.close();
  }
  await b.close();
})();
