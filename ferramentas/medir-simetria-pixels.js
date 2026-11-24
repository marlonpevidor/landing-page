// Mede a simetria VISUAL de cada camada pelos pixels da tela: distância da borda de cima da camada
// até o primeiro pixel visível (texto, linha, imagem) e do último pixel visível até a borda de baixo.
// Uso: na raiz, rode  python3 -m http.server 8765  e depois
//      node ferramentas/medir-simetria-pixels.js [url1 url2 ...]
const { chromium } = require('playwright');
const { PNG } = require(require.resolve('pngjs', { paths: [process.env.PNGJS_DIR || __dirname] }));
(async () => {
  const urls = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/iecc/', '/mentoria/'].map(u => 'http://localhost:8765' + u);
  const b = await chromium.launch();
  for (const url of urls) for (const w of [390, 1280]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
    await p.goto(url); await p.waitForTimeout(1200);
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await p.addStyleTag({ content: '.topbar{position:static!important}' });
    await p.waitForTimeout(600);
    const secs = await p.evaluate(() => [...document.querySelectorAll('section, footer')].map(s => {
      const r = s.getBoundingClientRect(); return { id: s.id || s.className || s.tagName, top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY) };
    }));
    const png = PNG.sync.read(await p.screenshot({ fullPage: true }));
    const px = (x, y) => { const i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
    const diff = (a, c) => Math.abs(a[0] - c[0]) + Math.abs(a[1] - c[1]) + Math.abs(a[2] - c[2]);
    console.log(`\n== ${url.replace(/^https?:\/\/[^/]+/, '')} @${w}px   (cima / baixo, em px)`);
    for (const s of secs) {
      const y0 = s.top + 2, y1 = Math.min(s.bottom - 2, png.height - 1);  // ignora a linha fina de cima
      const bg = px(1, Math.min(y0 + 1, png.height - 1));
      let first = -1, last = -1;
      for (let y = y0; y <= y1; y++) {
        let ink = false;
        for (let x = 4; x < png.width - 4; x += 1) if (diff(px(x, y), bg) > 40) { ink = true; break; }
        if (ink) { if (first < 0) first = y; last = y; }
      }
      if (first < 0) continue;
      const t = first - s.top, bo = s.bottom - 1 - last, d = Math.abs(t - bo);
      console.log(`${String(s.id).slice(0, 16).padEnd(16)} ${String(t).padStart(4)} / ${String(bo).padEnd(4)}${d > 3 ? '  <<< diferença ' + d : ''}`);
    }
    await p.close();
  }
  await b.close();
})();
