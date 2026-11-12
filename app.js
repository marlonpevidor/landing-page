(function () {
  const $ = (id) => document.getElementById(id);
  let categoriaAtual = "Todos";
  const TODAS = "Todas as igrejas";

  document.title = CONFIG.titulo;
  $("titulo").textContent = CONFIG.titulo;
  $("subtitulo").textContent = CONFIG.subtitulo;

  function linkWhatsApp(numero, mensagem) {
    return "https://wa.me/" + String(numero).replace(/\D/g, "") + "?text=" + encodeURIComponent(mensagem);
  }
  function normalizar(t) {
    return (t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }
  const ordenar = (lista) => [...new Set(lista.filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));

  // Filtro de igreja (gerado a partir dos dados)
  const select = $("filtroIgreja");
  [TODAS, ...ordenar(NEGOCIOS.map((n) => n.igreja))].forEach((ig) => {
    const o = el("option", null, ig);
    o.value = ig;
    select.appendChild(o);
  });
  select.addEventListener("change", () => { categoriaAtual = "Todos"; desenharFiltros(); desenharLista(); });

  function negociosDaIgreja() {
    return select.value === TODAS ? NEGOCIOS : NEGOCIOS.filter((n) => n.igreja === select.value);
  }

  // Categorias (só as que existem na igreja selecionada)
  function desenharFiltros() {
    const box = $("filtros");
    box.innerHTML = "";
    ["Todos", ...ordenar(negociosDaIgreja().map((n) => n.categoria))].forEach((cat) => {
      const b = el("button", "chip" + (cat === categoriaAtual ? " ativo" : ""), cat);
      b.type = "button";
      b.setAttribute("aria-pressed", cat === categoriaAtual);
      b.onclick = () => { categoriaAtual = cat; desenharFiltros(); desenharLista(); };
      box.appendChild(b);
    });
  }

  function cartao(n) {
    const c = el("article", "cartao" + (n.exemplo ? " cartao-exemplo" : ""));
    if (n.exemplo) c.appendChild(el("p", "aviso-exemplo", "Exemplo fictício — apenas para teste"));
    c.appendChild(el("span", "etiqueta", n.categoria));
    c.appendChild(el("h2", null, n.nome));
    if (n.responsavel) c.appendChild(el("p", "responsavel", n.responsavel));
    if (n.descricao) c.appendChild(el("p", "descricao", n.descricao));
    if (n.local) c.appendChild(el("p", "local", "📍 " + n.local));

    if (n.igreja || n.pastor) {
      const ref = el("div", "referencia");
      ref.appendChild(el("span", "referencia-icone", "✓"));
      const txt = el("div");
      txt.appendChild(el("strong", null, n.igreja || ""));
      if (n.pastor) txt.appendChild(el("span", null, "Referência: " + n.pastor + (n.referenciaEm ? " · " + n.referenciaEm : "")));
      ref.appendChild(txt);
      c.appendChild(ref);
    }

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
    if (n.exemplo && !acoes.children.length) acoes.appendChild(el("p", "sem-contato", "Sem contato — empresa fictícia"));
    c.appendChild(acoes);
    return c;
  }

  function desenharLista() {
    const termo = normalizar($("campoBusca").value.trim());
    const lista = negociosDaIgreja()
      .filter((n) => categoriaAtual === "Todos" || n.categoria === categoriaAtual)
      .filter((n) => !termo || normalizar([n.nome, n.responsavel, n.categoria, n.descricao, n.local, n.igreja, n.pastor].join(" ")).includes(termo))
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const grade = $("grade");
    grade.innerHTML = "";
    lista.forEach((n) => grade.appendChild(cartao(n)));
    $("vazio").hidden = lista.length > 0;
    const igrejas = new Set(lista.map((n) => n.igreja)).size;
    $("contador").textContent = lista.length + (lista.length === 1 ? " negócio" : " negócios") +
      " de " + igrejas + (igrejas === 1 ? " igreja" : " igrejas");
  }

  $("campoBusca").addEventListener("input", desenharLista);
  desenharFiltros();
  desenharLista();
})();
