// Mede a simetria de cada camada (espaço acima/abaixo e esquerda/direita do conteúdo).
// Uso: na raiz do repositório, rode  python3 -m http.server 8765  e depois
//      node ferramentas/medir-simetria.js [url1 url2 ...]
// Meta: diferença de no máximo ~3 px entre top/bottom e entre left/right.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const urls = process.argv.slice(2).length ? process.argv.slice(2) : ['http://localhost:8765/','http://localhost:8765/iecc/'];
  for (const url of urls) for (const w of [390,1280]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    await p.goto(url); await p.waitForTimeout(1000);
    const r = await p.evaluate(() => {
      const out = [];
      for (const sec of document.querySelectorAll('header, section, footer')) {
        const sr = sec.getBoundingClientRect();
        // frame (hero ::after inset)
        let frame = null; const after = getComputedStyle(sec, '::after');
        if (after.content !== 'none' && after.position === 'absolute') frame = parseFloat(after.top);
        let t=1e9,bm=-1e9,l=1e9,rr=-1e9;
        const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) { const n = walker.currentNode; if (!n.textContent.trim()) continue;
          const el = n.parentElement; if (el.closest('[hidden]') || el.closest('.syllabus') || (el.closest('details:not([open])') && !el.closest('summary'))) continue; const cs = getComputedStyle(el); if (cs.display==='none'||cs.visibility==='hidden') continue;
          const rg = document.createRange(); rg.selectNodeContents(n);
          for (const x of rg.getClientRects()) { if (!x.width) continue; t=Math.min(t,x.top); bm=Math.max(bm,x.bottom); l=Math.min(l,x.left); rr=Math.max(rr,x.right);} }
        // include buttons/boxes/cards borders
        for (const el of sec.querySelectorAll('.btn, .pillar, .path, .ledger, .foundation, .stage, .syllabus, .portrait, .book-cover, blockquote, .pix-valores, .faq details, .video, .facts, .about img, .crest, .fit .no, .career li, .ledger > div')) {
          if (el.closest('[hidden]')) continue; const x = el.getBoundingClientRect(); if (!x.width) continue;
          t=Math.min(t,x.top); bm=Math.max(bm,x.bottom); l=Math.min(l,x.left); rr=Math.max(rr,x.right); }
        const f = frame||0;
        out.push(`${(sec.id||sec.className||sec.tagName).toString().slice(0,14).padEnd(14)} top ${Math.round(t-sr.top-f)} bottom ${Math.round(sr.bottom-bm-f)} left ${Math.round(l-sr.left-f)} right ${Math.round(sr.right-rr-f)}${frame?' (inside frame)':''}`);
      }
      return out;
    });
    console.log(`\n== ${url.replace('http://localhost:8765','')} @${w}px`); console.log(r.join('\n'));
    await p.close();
  }
  await b.close();
})();
