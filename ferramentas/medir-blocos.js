// Mede o espaço visível entre blocos consecutivos dentro das camadas.
// Uso: na raiz, rode  python3 -m http.server 8765  e depois
//      node ferramentas/medir-blocos.js [largura]
// Com o corte óptico (text-box), cada bloco de texto vai da altura das maiúsculas até a linha de base,
// então a distância entre as caixas é a distância que o olho lê.
// Mostra, por página, cada par de blocos e a distância entre o último pixel de um e o primeiro do outro.
const { chromium } = require('playwright');
const CONT = ['.hero .wrap', '.hero-copy', '.head', '.stack', '.final .wrap', '.band .wrap', '.center .wrap', '.pix-box',
              '.quotes', '.about .wrap', '.story .wrap', '.split', '.fit', '.paths', '.pillars', '.player-grid', '#como-funciona .wrap', '#percurso .wrap', '#para-quem .wrap'];
(async () => {
  const w = +(process.argv[2] || 390);
  const b = await chromium.launch();
  for (const u of ['/', '/iecc/', '/mentoria/']) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
    await p.goto('http://localhost:8765' + u); await p.waitForTimeout(900);
    await p.addStyleTag({ content: '.topbar{position:static!important}' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } scrollTo(0, 0); });
    await p.waitForTimeout(500);
    const pairs = await p.evaluate((CONT) => {
      const out = [];
      const vis = el => { const r = el.getBoundingClientRect(); return r.height > 0 && r.width > 0 && getComputedStyle(el).display !== 'none' && !el.closest('[hidden]'); };
      for (const sel of CONT) for (const c of document.querySelectorAll(sel)) {
        const kids = [...c.children].filter(vis);
        for (let i = 1; i < kids.length; i++) {
          const a = kids[i - 1].getBoundingClientRect(), bb = kids[i].getBoundingClientRect();
          if (bb.top < a.bottom - 2) continue; // lado a lado, não empilhado
          const name = el => (el.className || el.tagName).toString().split(' ')[0].slice(0, 14) || el.tagName;
          out.push({ sec: (c.closest('section,footer') || {}).id || c.closest('section')?.className || '', cont: sel,
            a: name(kids[i - 1]), b: name(kids[i]), ay: a.bottom + scrollY, by: bb.top + scrollY,
            x0: Math.max(0, Math.min(a.left, bb.left)), x1: Math.min(innerWidth, Math.max(a.right, bb.right)), atop: a.top + scrollY, bbot: bb.bottom + scrollY });
        }
      }
      return out;
    }, CONT);
    console.log(`\n== ${u} @${w}px   (espaço entre a base de um bloco e o topo do seguinte)`);
    for (const q of pairs) console.log(`${String(q.sec).slice(0, 12).padEnd(12)} ${q.a.padEnd(14)} → ${q.b.padEnd(14)} ${String(Math.round(q.by - q.ay)).padStart(3)} px`);
    await p.close();
  }
  await b.close();
})();
