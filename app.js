(function () {
  const $ = (id) => document.getElementById(id);
  let categoriaAtual = "Todos";

  // Textos do topo
  document.title = CONFIG.titulo + " — " + CONFIG.nomeIgreja;
  $("nomeIgreja").textContent = CONFIG.nomeIgreja;
  $("titulo").textContent = CONFIG.titulo;
  $("subtitulo").textContent = CONFIG.subtitulo;
  $("btnCadastro").href = linkWhatsApp(
    CONFIG.whatsappResponsavel,
    "Olá! Vi o " + CONFIG.titulo + " e quero cadastrar meu negócio."
  );

  function linkWhatsApp(numero, mensagem) {
    const n = String(numero).replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(mensagem);
  }

  function normalizar(texto) {
    return (texto || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  // Categorias (geradas automaticamente a partir dos dados)
  const categorias = ["Todos", ...new Set(NEGOCIOS.map((n) => n.categoria).sort((a, b) => a.localeCompare(b, "pt-BR")))];

  function desenharFiltros() {
    const box = $("filtros");
    box.innerHTML = "";
    categorias.forEach((cat) => {
      const b = el("button", "chip" + (cat === categoriaAtual ? " ativo" : ""), cat);
      b.type = "button";
      b.setAttribute("aria-pressed", cat === categoriaAtual);
      b.onclick = () => { categoriaAtual = cat; desenharFiltros(); desenharLista(); };
      box.appendChild(b);
    });
  }

  function cartao(n) {
    const c = el("article", "cartao");
    c.appendChild(el("span", "etiqueta", n.categoria));
    c.appendChild(el("h2", null, n.nome));
    if (n.responsavel) c.appendChild(el("p", "responsavel", n.responsavel));
    if (n.descricao) c.appendChild(el("p", "descricao", n.descricao));
    if (n.local) c.appendChild(el("p", "local", "📍 " + n.local));

    const acoes = el("div", "acoes");
    if (n.whatsapp) {
      const a = el("a", "botao botao-whats", "WhatsApp");
      a.href = linkWhatsApp(n.whatsapp, "Olá, " + (n.responsavel || n.nome) + "! Vi seu contato no " + CONFIG.titulo + " e gostaria de saber mais sobre " + n.nome + ".");
      a.target = "_blank"; a.rel = "noopener";
      acoes.appendChild(a);
    }
    if (n.instagram) {
      const a = el("a", "botao botao-insta", "Instagram");
      a.href = "https://instagram.com/" + n.instagram.replace(/^@/, "");
      a.target = "_blank"; a.rel = "noopener";
      acoes.appendChild(a);
    }
    c.appendChild(acoes);
    return c;
  }

  function desenharLista() {
    const termo = normalizar($("campoBusca").value.trim());
    const lista = NEGOCIOS
      .filter((n) => categoriaAtual === "Todos" || n.categoria === categoriaAtual)
      .filter((n) => !termo || normalizar([n.nome, n.responsavel, n.categoria, n.descricao, n.local].join(" ")).includes(termo))
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const grade = $("grade");
    grade.innerHTML = "";
    lista.forEach((n) => grade.appendChild(cartao(n)));
    $("vazio").hidden = lista.length > 0;
    $("contador").textContent = lista.length + (lista.length === 1 ? " negócio encontrado" : " negócios encontrados");
  }

  $("campoBusca").addEventListener("input", desenharLista);
  desenharFiltros();
  desenharLista();
})();
