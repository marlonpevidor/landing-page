/* ==================================================================
   OFERTA VIA PIX — dados do recebedor e valores dos botões.
   ================================================================== */
const PIX = {
  chave: "58198bd6-27ee-4c47-b6c5-5c43bdaf5612",
  nome: "Marlon Pevidor Meira",   // até 25 letras, sem acento
  cidade: "Brasilia",             // até 15 letras, sem acento
  valores: [50, 100, 150],
};

/* ---------- daqui para baixo não precisa mexer ---------- */
(function () {
  const box = document.getElementById("ofertar-box");
  if (!box) return;

  const campo = (id, v) => id + String(v.length).padStart(2, "0") + v;
  const limpa = (s, n) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").slice(0, n);
  function crc16(s) {
    let crc = 0xffff;
    for (let i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function codigoPix(valor) {
    let p = campo("00", "01") +
      campo("26", campo("00", "br.gov.bcb.pix") + campo("01", PIX.chave)) +
      campo("52", "0000") + campo("53", "986") +
      (valor ? campo("54", valor.toFixed(2)) : "") +
      campo("58", "BR") + campo("59", limpa(PIX.nome, 25)) + campo("60", limpa(PIX.cidade, 15)) +
      campo("62", campo("05", "***")) + "6304";
    return p + crc16(p);
  }
  window.__codigoPix = codigoPix; // usado em testes

  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const botoes = box.querySelector(".pix-valores");
  const res = box.querySelector(".pix-resultado");
  PIX.valores.concat([null]).forEach((v) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = v ? brl(v).replace(",00", "") : "Outro valor";
    b.onclick = () => mostra(v, b);
    botoes.appendChild(b);
  });

  function mostra(valor, botao) {
    botoes.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === botao));
    const codigo = codigoPix(valor);
    res.hidden = false;
    res.querySelector(".pix-titulo").innerHTML = valor
      ? `Oferta de <strong>${brl(valor)}</strong>`
      : `Oferta de <strong>valor livre</strong> — você digita o valor no app do banco`;
    const qr = res.querySelector(".pix-qr");
    qr.innerHTML = "";
    if (window.qrcode) {
      const q = qrcode(0, "M");
      q.addData(codigo);
      q.make();
      qr.innerHTML = q.createSvgTag({ cellSize: 5, margin: 2, scalable: true });
    }
    res.querySelector("textarea").value = codigo;
    const copiar = res.querySelector(".pix-copiar");
    copiar.textContent = "Copiar código Pix";
    copiar.onclick = async () => {
      try { await navigator.clipboard.writeText(codigo); }
      catch (e) { const t = res.querySelector("textarea"); t.select(); document.execCommand("copy"); }
      copiar.textContent = "Código copiado ✓";
    };
  }
})();
