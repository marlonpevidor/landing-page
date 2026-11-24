// Gera as imagens de compartilhamento (1200x630) a partir da abertura de cada página.
// Uso: na raiz, rode  python3 -m http.server 8765  e depois  node ferramentas/gerar-imagens-compartilhamento.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [url, out] of [['/', 'compartilhar.png'], ['/iecc/', 'iecc/compartilhar.png'], ['/mentoria/', 'mentoria/compartilhar.png']]) {
    const p = await b.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light', reducedMotion: 'reduce' });
    await p.goto('http://localhost:8765' + url); await p.waitForTimeout(1500);
    await p.addStyleTag({ content: `.topbar,.hero .actions,.facts-inline{display:none!important}
      .hero{height:630px;display:grid;align-items:center;padding-block:0!important}
      .hero .wrap{width:100%} .portrait{max-width:22rem}` });
    await p.waitForTimeout(400);
    await p.screenshot({ path: '/home/user/landing-page/' + out });
    await p.close();
  }
  await b.close();
})();
