/* Página de acompanhamento do cadastro (cadastro-enviado.html#CODIGO).
   A etapa de cada código vem da planilha em CONFIG.planilhaAndamento. */
(function () {
  const $ = (id) => document.getElementById(id);

  // Sempre abrir a página no topo (o celular às vezes mantém a rolagem da página anterior)
  try { history.scrollRestoration = "manual"; } catch (e) {}
  window.scrollTo(0, 0);

  // [título, texto enquanto não aconteceu, texto depois que aconteceu]
  const ETAPAS = [
    ["Cadastro enviado", "", "Seus dados foram enviados ao responsável pelo guia pelo WhatsApp."],
    ["Pedido de referência ao pastor",
      "Vamos enviar ao seu pastor um formulário rápido, de poucos cliques. As respostas ficam apenas com o responsável pelo guia e não aparecem no <em>site</em>.",
      "Enviamos ao seu pastor um formulário rápido, de poucos cliques. As respostas ficam apenas com o responsável pelo guia e não aparecem no <em>site</em>."],
    ["Resposta do pastor",
      "Aguardando a resposta do seu pastor.",
      "Seu pastor respondeu. Agora estamos preparando o cartão do seu negócio. Os novos cadastros entram no <em>site</em> uma vez por semana."],
    ["Publicação no guia",
      "Confirmada a referência, seu negócio aparece no <em>site</em>.",
      "Pronto! Seu negócio já aparece no guia."],
  ];

  const codigo = (location.hash || "").replace("#", "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  let dados = null;
  try { dados = JSON.parse(sessionStorage.getItem("dadosAviso") || "null"); } catch (e) {}
  if (dados && dados.codigo !== codigo) dados = null;

  function desenhar(etapa) {
    const lista = $("etapas");
    lista.innerHTML = "";
    ETAPAS.forEach(([titulo, pendente, feito], i) => {
      const texto = i < etapa ? feito : pendente;
      const li = document.createElement("li");
      if (i < etapa) li.className = "feito";
      else if (i === etapa) li.className = "atual";
      const t = document.createElement("strong");
      t.textContent = titulo;
      li.appendChild(t);
      li.appendChild(document.createElement("br"));
      li.insertAdjacentHTML("beforeend", texto);
      if (i === 3 && etapa >= 4) {
        const a = document.createElement("a");
        a.href = "index.html"; a.className = "ver-no-guia"; a.textContent = "Ver meu negócio no guia →";
        li.appendChild(document.createElement("br"));
        li.appendChild(a);
      }
      lista.appendChild(li);
    });
    $("prazo").hidden = etapa >= 3;
    requestAnimationFrame(ajustarPrazo);
    $("dicaPastor").hidden = etapa >= 2 || !!dados;
    $("avisarPastor").hidden = etapa >= 2 || !dados;
    if (etapa >= 4) {
      $("tituloAndamento").textContent = "Seu negócio está no guia!";
      $("subtituloAndamento").textContent = "Obrigado por fazer parte do guia. Que Deus abençoe seu trabalho.";
    } else if (etapa >= 2) {
      $("tituloAndamento").textContent = "Seu cadastro está andando";
    }
  }

  // Lê a planilha publicada (CSV com colunas codigo,etapa)
  async function buscarEtapa() {
    if (!codigo || !CONFIG.planilhaAndamento) return 1;
    try {
      const url = CONFIG.planilhaAndamento + (CONFIG.planilhaAndamento.includes("?") ? "&" : "?") + "t=" + Date.now();
      const texto = await (await fetch(url)).text();
      for (const linha of texto.split(/\r?\n/)) {
        const [c, e] = linha.split(",").map((x) => (x || "").replace(/"/g, "").trim());
        if (c.toUpperCase() === codigo) return Math.min(4, Math.max(1, parseInt(e, 10) || 1));
      }
    } catch (e) {}
    return 1;
  }

  // Link de acompanhamento
  if (codigo) {
    const link = CONFIG.siteUrl + "/cadastro-enviado.html#" + codigo;
    $("codigoTexto").textContent = codigo;
    $("linkAcompanhar").value = link;
    $("acompanhar").hidden = false;
    $("copiarLink").onclick = async () => {
      try { await navigator.clipboard.writeText(link); }
      catch (e) { $("linkAcompanhar").select(); document.execCommand("copy"); }
      $("copiarLink").innerHTML = "✓ <em>Link</em> copiado";
    };
  }

  // Botões que só fazem sentido logo depois do envio
  try {
    const linkCadastro = sessionStorage.getItem("linkCadastro");
    if (linkCadastro && dados) {
      $("btnReenviar").href = linkCadastro;
      $("reenviar").hidden = false;
    }
  } catch (e) {}

  // Manda o código e o link para o próprio WhatsApp da pessoa (conversa consigo mesma)
  if (dados && codigo && dados.whatsapp) {
    const meu = String(dados.whatsapp).replace(/\D/g, "");
    const meuNumero = meu.length <= 11 ? "55" + meu : meu;
    const texto = "📌 *" + CONFIG.titulo + "*\nAcompanhamento do meu cadastro (" + dados.negocio + ")\n\n*Código:* " + codigo +
      "\n*_Link_:* " + CONFIG.siteUrl + "/cadastro-enviado.html#" + codigo;
    $("btnMeuWhats").href = "https://wa.me/" + meuNumero + "?text=" + encodeURIComponent(texto);
    $("btnMeuWhats").hidden = false;
    $("btnMeuWhats").addEventListener("click", () => registrarClique("Enviou link para o próprio WhatsApp"));
  }

  if (dados) {
    const fone = String(dados.telefonePastor || "").replace(/\D/g, "");
    const numero = fone.length <= 11 ? "55" + fone : fone;
    const pastor = String(dados.pastor || "").replace(/^(pr|pra|pastor|pastora|rev)\.?\s+/i, "");
    const msg = "A paz, pastor " + pastor + "! Aqui é " + dados.nome + ". Cadastrei meu negócio (" + dados.negocio +
      ") no " + CONFIG.titulo + " e indiquei o senhor como referência. O responsável pelo guia vai lhe enviar um formulário rápido pelo WhatsApp " +
      CONFIG.whatsappResponsavel.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") + ". São apenas alguns cliques. Obrigado!";
    $("btnAvisarPastor").href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);
    $("btnAvisarPastor").addEventListener("click", () => registrarClique("Avisou o pastor"));
  }

  // Caixa amarela: o bloco de texto fica do tamanho da linha mais longa, centralizado na caixa
  function ajustarPrazo() {
    const t = document.querySelector(".prazo-texto");
    if (!t || t.offsetParent === null) return;
    t.style.width = "";
    const r = document.createRange();
    r.selectNodeContents(t);
    const linhas = [...r.getClientRects()];
    if (!linhas.length) return;
    const largura = Math.max(...linhas.map((x) => x.right)) - Math.min(...linhas.map((x) => x.left));
    t.style.width = Math.ceil(largura) + 1 + "px";
  }
  window.addEventListener("resize", ajustarPrazo);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarPrazo);

  desenhar(1);
  buscarEtapa().then(desenhar);
  window.addEventListener("hashchange", () => location.reload());
})();
