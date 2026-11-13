(function () {
  const $ = (id) => document.getElementById(id);
  let categoriaAtual = "Todos";
  const TODAS = "Todas as igrejas";

  document.title = CONFIG.titulo;
  $("titulo").textContent = CONFIG.titulo;
  $("subtitulo").textContent = CONFIG.subtitulo;
  if (CONFIG.canalWhatsApp) {
    $("linkCanal").href = CONFIG.canalWhatsApp;
    $("linkCanal").hidden = false;
    $("linkCanal").addEventListener("click", () => registrarClique("Canal do WhatsApp (topo)"));
  }

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

  // Filtros de igreja e região (montados sozinhos a partir dos dados)
  const select = $("filtroIgreja");
  const selRegiao = $("filtroRegiao");
  const TODO_BRASIL = "";

  function opcao(pai, texto, valor) {
    const o = el("option", null, texto);
    o.value = valor;
    pai.appendChild(o);
  }

  // Região: "Todo o Brasil", depois cada estado com suas cidades
  opcao(selRegiao, "Todo o Brasil", TODO_BRASIL);
  ordenar(NEGOCIOS.map((n) => n.estado)).forEach((uf) => {
    const grupo = document.createElement("optgroup");
    grupo.label = uf;
    opcao(grupo, "Todo o " + uf, "UF|" + uf);
    ordenar(NEGOCIOS.filter((n) => n.estado === uf).map((n) => n.cidade))
      .forEach((cid) => opcao(grupo, cid + ", " + uf, "CID|" + uf + "|" + cid));
    selRegiao.appendChild(grupo);
  });

  function naRegiao(n) {
    const [tipo, uf, cid] = selRegiao.value.split("|");
    if (!selRegiao.value) return true;
    if (tipo === "UF") return n.estado === uf;
    return n.estado === uf && n.cidade === cid;
  }

  // Igreja: só as igrejas que têm negócios na região escolhida
  function montarIgrejas() {
    const atual = select.value;
    select.innerHTML = "";
    const igrejas = ordenar(NEGOCIOS.filter(naRegiao).map((n) => n.igreja));
    [TODAS, ...igrejas].forEach((ig) => opcao(select, ig, ig));
    select.value = igrejas.includes(atual) ? atual : TODAS;
  }
  montarIgrejas();

  select.addEventListener("change", () => { categoriaAtual = "Todos"; desenharFiltros(); desenharLista(); });
  selRegiao.addEventListener("change", () => { categoriaAtual = "Todos"; montarIgrejas(); desenharFiltros(); desenharLista(); });

  function negociosDaIgreja() {
    return NEGOCIOS.filter(naRegiao).filter((n) => select.value === TODAS || n.igreja === select.value);
  }

  // Categorias (só as que existem na região e igreja selecionadas)
  function desenharFiltros() {
    const box = $("filtros");
    box.innerHTML = "";
    ["Todos", ...ordenar(negociosDaIgreja().map((n) => n.categoria))].forEach((cat) => {
      const b = el("button", "chip" + (cat === categoriaAtual ? " ativo" : ""), cat);
      b.type = "button";
      b.setAttribute("aria-pressed", cat === categoriaAtual);
      b.onclick = () => {
        categoriaAtual = cat;
        if (cat === "Todos") $("campoBusca").value = ""; // "Todos" também limpa a busca
        desenharFiltros(); desenharLista();
      };
      box.appendChild(b);
    });
  }

  // Bairro + cidade/UF, para "Centro" nunca aparecer sem dizer de onde
  function textoLocal(n) {
    const cidadeUF = n.cidade ? n.cidade + (n.estado ? ", " + n.estado : "") : "";
    if (!n.local) return cidadeUF;
    if (!cidadeUF || normalizar(n.local).includes(normalizar(n.cidade))) return n.local;
    return n.local + " — " + cidadeUF;
  }

  function cartao(n) {
    const c = el("article", "cartao" + (n.exemplo ? " cartao-exemplo" : ""));
    if (n.exemplo) c.appendChild(el("p", "aviso-exemplo", "Exemplo fictício — apenas para teste"));
    c.appendChild(el("span", "etiqueta", n.categoria));
    c.appendChild(el("h2", null, n.nome));
    if (n.responsavel) c.appendChild(el("p", "responsavel", n.responsavel));
    if (n.descricao) c.appendChild(el("p", "descricao", n.descricao));
    const onde = textoLocal(n);
    if (onde) c.appendChild(el("p", "local", "📍 " + onde));

    if (n.igreja || n.pastor) {
      // ✓ alinhado com a igreja; "O irmão Marlon congrega na" e a referência alinhados com o nome da igreja
      const ref = el("div", "referencia referencia-grade");
      const primeiroNome = (n.responsavel || "").trim().split(/\s+/)[0];
      if (primeiroNome && n.igreja) {
        const frase = (n.tratamento ? "O " + n.tratamento + " " : "") + primeiroNome + " congrega " + (n.preposicaoIgreja || "em");
        ref.appendChild(el("span", "congrega", frase));
      }
      ref.appendChild(el("span", "referencia-icone", "✓"));
      ref.appendChild(el("strong", "ref-igreja", n.igreja || ""));
      if (n.pastor) ref.appendChild(el("span", "ref-pastor", "Referência: " + n.pastor + (n.referenciaEm ? " (" + n.referenciaEm + ")" : "")));
      c.appendChild(ref);
    }

    const acoes = el("div", "acoes");
    if (n.whatsapp) {
      const a = el("a", "botao botao-whats", "WhatsApp");
      a.href = linkWhatsApp(n.whatsapp, "Olá, " + (n.responsavel || n.nome) + "! Vi seu contato no " + CONFIG.titulo + " e gostaria de saber mais sobre " + n.nome + ".");
      a.target = "_blank"; a.rel = "noopener";
      a.addEventListener("click", () => registrarClique("WhatsApp: " + n.nome));
      acoes.appendChild(a);
    }
    if (n.instagram) {
      const a = el("a", "botao botao-insta", "Instagram");
      a.href = "https://instagram.com/" + n.instagram.replace(/^@/, "");
      a.target = "_blank"; a.rel = "noopener";
      a.addEventListener("click", () => registrarClique("Instagram: " + n.nome));
      acoes.appendChild(a);
    }
    if (n.exemplo && !acoes.children.length) acoes.appendChild(el("p", "sem-contato", "Sem contato — empresa fictícia"));
    c.appendChild(acoes);
    return c;
  }

  function desenharLista() {
    const termo = normalizar($("campoBusca").value.trim());
    $("limparBusca").hidden = !$("campoBusca").value;
    const lista = negociosDaIgreja()
      .filter((n) => categoriaAtual === "Todos" || n.categoria === categoriaAtual)
      .filter((n) => !termo || normalizar([n.nome, n.responsavel, n.categoria, n.descricao, n.local, n.cidade, n.estado, n.igreja, n.pastor].join(" ")).includes(termo))
      .sort((a, b) => (!!a.exemplo - !!b.exemplo) || a.nome.localeCompare(b.nome, "pt-BR"));

    const grade = $("grade");
    grade.innerHTML = "";
    lista.forEach((n) => grade.appendChild(cartao(n)));

    // Cartão-convite no fim da lista (também em cada categoria e igreja);
    // some só durante uma busca por palavra
    if (!termo) {
      const c = el("a", "cartao cartao-convite");
      c.href = "cadastro.html";
      c.appendChild(el("span", "convite-icone", "+"));
      c.appendChild(el("h2", null, "Seu negócio aqui"));
      c.appendChild(el("p", "descricao", categoriaAtual === "Todos"
        ? "Você vende algo ou presta algum serviço? Cadastre-se de graça e seja um dos primeiros do guia."
        : "Você também trabalha com " + categoriaAtual + "? Cadastre-se de graça e apareça aqui."));
      c.appendChild(el("span", "botao botao-azul", "Quero cadastrar meu negócio"));
      grade.appendChild(c);
    }
    $("vazio").hidden = lista.length > 0;
    const igrejas = new Set(lista.map((n) => n.igreja)).size;
    $("contador").textContent = lista.length + (lista.length === 1 ? " negócio" : " negócios") +
      " de " + igrejas + (igrejas === 1 ? " igreja" : " igrejas");
  }

  const busca = $("campoBusca");
  busca.addEventListener("input", desenharLista);
  // No celular, o "Enter"/"Buscar" fecha o teclado para mostrar os resultados
  busca.addEventListener("keydown", (e) => { if (e.key === "Enter") busca.blur(); });
  $("limparBusca").addEventListener("click", () => { busca.value = ""; desenharLista(); });
  $("verTodos").addEventListener("click", () => {
    busca.value = ""; categoriaAtual = "Todos"; selRegiao.value = TODO_BRASIL;
    montarIgrejas(); select.value = TODAS;
    desenharFiltros(); desenharLista();
  });
  desenharFiltros();
  desenharLista();
})();
