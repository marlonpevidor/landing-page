/* Oferta por Pix — gera o código "Copia e Cola" (padrão BR Code do Banco Central)
   e o QR Code, sem servidor. Os dados ficam em CONFIG.pix, no negocios.js. */
(function () {
  const $ = (id) => document.getElementById(id);
  if (typeof CONFIG === "undefined" || !CONFIG.pix || !$("oferta")) return;

  // Remove acentos e caracteres que alguns bancos não aceitam
  function limpar(texto, max) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9 ]/g, "").trim().slice(0, max);
  }
  function campo(id, valor) {
    return id + String(valor.length).padStart(2, "0") + valor;
  }
  // CRC16-CCITT (polinômio 0x1021, inicial 0xFFFF), exigido no fim do código
  function crc16(texto) {
    let crc = 0xffff;
    for (let i = 0; i < texto.length; i++) {
      crc ^= texto.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function codigoPix(valor) {
    const p = CONFIG.pix;
    const conta = campo("00", "br.gov.bcb.pix") + campo("01", p.chave) + campo("02", "Oferta");
    const corpo =
      campo("00", "01") +
      campo("26", conta) +
      campo("52", "0000") +
      campo("53", "986") +
      campo("54", valor.toFixed(2)) +
      campo("58", "BR") +
      campo("59", limpar(p.nome, 25)) +
      campo("60", limpar(p.cidade, 15)) +
      campo("62", campo("05", "OFERTA")) +
      "6304";
    return corpo + crc16(corpo);
  }
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }
  const reais = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function mostrar(valor, botaoAtivo) {
    document.querySelectorAll("#valores .valor").forEach((b) => b.classList.toggle("ativo", b === botaoAtivo));
    const codigo = codigoPix(valor);
    $("pixValor").textContent = reais(valor);
    $("pixCodigo").value = codigo;
    const qr = qrcode(0, "M");
    qr.addData(codigo);
    qr.make();
    $("qr").innerHTML = qr.createSvgTag({ cellSize: 5, margin: 4, scalable: true });
    $("copiarPix").textContent = "Copiar código Pix";
    $("pixGerado").hidden = false;
    registrarClique("Pix gerado: " + reais(valor));
    $("pixGerado").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Botões de valor
  const box = $("valores");
  CONFIG.pix.valores.forEach((v) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "valor"; b.textContent = "R$ " + v;
    if (v === CONFIG.pix.maisEscolhido) {
      b.classList.add("destaque");
      b.appendChild(el("small", null, "valor mais escolhido"));
    }
    b.onclick = () => { $("caixaOutro").hidden = true; mostrar(v, b); };
    box.appendChild(b);
  });
  const outro = document.createElement("button");
  outro.type = "button"; outro.className = "valor"; outro.textContent = "Outro valor";
  outro.onclick = () => {
    document.querySelectorAll("#valores .valor").forEach((b) => b.classList.toggle("ativo", b === outro));
    $("pixGerado").hidden = true;
    $("caixaOutro").hidden = false;
    $("campoOutro").focus();
  };
  box.appendChild(outro);

  function gerarOutro() {
    const v = Number($("campoOutro").value.replace(/[^\d,.]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", "."));
    if (!(v >= 1) || v > 99999) {
      $("pixGerado").hidden = true;
      $("campoOutro").setCustomValidity("Digite um valor a partir de R$ 1,00");
      $("campoOutro").reportValidity();
      return;
    }
    $("campoOutro").setCustomValidity("");
    mostrar(Math.round(v * 100) / 100, outro);
  }
  $("gerarOutro").onclick = gerarOutro;
  $("campoOutro").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); gerarOutro(); } });
  $("campoOutro").addEventListener("input", () => $("campoOutro").setCustomValidity(""));

  // Copiar código
  $("copiarPix").onclick = async () => {
    const t = $("pixCodigo");
    try { await navigator.clipboard.writeText(t.value); }
    catch (e) { t.select(); document.execCommand("copy"); }
    $("copiarPix").innerHTML = "✓ Código copiado! Agora cole no <em>app</em> do banco";
    registrarClique("Pix copiado: " + $("pixValor").textContent);
  };
})();
