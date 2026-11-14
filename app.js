(function () {
  const $ = (id) => document.getElementById(id);
  let categoriaAtual = "Todos";
  const TODAS = "Todas as igrejas";

  document.title = CONFIG.titulo;
  $("subtitulo").textContent = CONFIG.subtitulo;
  $("linkRemover").href = "https://wa.me/" + CONFIG.whatsappResponsavel + "?text=" +
    encodeURIComponent("Olá! Gostaria de corrigir ou remover meu cadastro no " + CONFIG.titulo + ".");

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

  // "todo o estado" com o português correto
  const TODO_ESTADO = {
    AC: "todo o Acre", AL: "todo o estado de Alagoas", AP: "todo o Amapá", AM: "todo o Amazonas",
    BA: "toda a Bahia", CE: "todo o Ceará", DF: "todo o DF", ES: "todo o Espírito Santo",
    GO: "todo Goiás", MA: "todo o Maranhão", MT: "todo o Mato Grosso", MS: "todo o Mato Grosso do Sul",
    MG: "toda Minas Gerais", PA: "todo o Pará", PB: "toda a Paraíba", PR: "todo o Paraná",
    PE: "todo Pernambuco", PI: "todo o Piauí", RJ: "todo o estado do Rio de Janeiro", RN: "todo o Rio Grande do Norte",
    RS: "todo o Rio Grande do Sul", RO: "toda Rondônia", RR: "todo o estado de Roraima", SC: "toda Santa Catarina",
    SP: "todo o estado de São Paulo", SE: "todo Sergipe", TO: "todo o Tocantins",
  };

  const NOME_ESTADO = {
    AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
    ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
    MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
    RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
    SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
  };

  // Região: "Todo o Brasil" e os estados que têm negócios
  opcao(selRegiao, "Todo o Brasil", TODO_BRASIL);
  ordenar(NEGOCIOS.map((n) => n.estado))
    .sort((a, b) => (NOME_ESTADO[a] || a).localeCompare(NOME_ESTADO[b] || b, "pt-BR"))
    .forEach((uf) => opcao(selRegiao, NOME_ESTADO[uf] || uf, uf));

  // Lembra o último estado escolhido neste aparelho
  try {
    const salvo = localStorage.getItem("regiaoGuia");
    if (salvo && [...selRegiao.options].some((o) => o.value === salvo)) selRegiao.value = salvo;
  } catch (e) {}

  // No estado escolhido aparecem os negócios de lá e os que atendem todo o Brasil
  function naRegiao(n) {
    if (!selRegiao.value) return true;
    return n.estado === selRegiao.value || n.atende === "brasil";
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
  selRegiao.addEventListener("change", () => {
    try { localStorage.setItem("regiaoGuia", selRegiao.value); } catch (e) {}
    categoriaAtual = "Todos"; montarIgrejas(); desenharFiltros(); desenharLista(); });

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

  // 📍 onde o negócio está (bairros, cidade e estado)
  function textoLocal(n) {
    const cidadeUF = n.cidade ? n.cidade + (n.estado ? ", " + n.estado : "") : "";
    return (n.local ? n.local + ", " : "") + cidadeUF;
  }

  // Iniciais do negócio (sempre 2 letras), ignorando palavras pequenas
  function iniciais(nome) {
    const pequenas = ["de", "da", "do", "das", "dos", "e"];
    const palavras = (nome || "").replace(/[—–-]/g, " ").split(/\s+/).filter((w) => w && !pequenas.includes(w.toLowerCase()));
    return palavras.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  }

  function cartao(n) {
    const c = el("article", "cartao" + (n.exemplo ? " cartao-exemplo" : ""));
    if (n.exemplo) c.appendChild(el("p", "aviso-exemplo", "Exemplo fictício — apenas para teste"));
    const topoCartao = el("div", "topo-cartao");
    topoCartao.appendChild(el("span", "etiqueta", n.categoria));
    if (n.fixado) {
      const pino = el("span", "fixado");
      pino.title = "Fixado";
      pino.setAttribute("aria-label", "Fixado");
      pino.innerHTML = '<svg viewBox="0 -960 960 960" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="m648.7-462.7 86 77v79.79H519.61v239.3L480-27l-39.61-39.61v-239.3H225.87v-79.79l80-77v-322.26h-50v-79.22H698.7v79.22h-50v322.26Z"/></svg>';
      topoCartao.appendChild(pino);
    }
    c.appendChild(topoCartao);
    // Nome com o logo (ou as iniciais) num círculo ao lado
    const linhaNome = el("div", "linha-nome");
    const avatar = el("span", "avatar");
    if (n.logo) {
      const img = document.createElement("img");
      img.src = n.logo; img.alt = ""; img.loading = "lazy";
      img.onerror = () => { img.remove(); avatar.textContent = iniciais(n.nome); };
      avatar.appendChild(img);
    } else {
      avatar.textContent = iniciais(n.nome);
    }
    avatar.setAttribute("aria-hidden", "true");
    linhaNome.appendChild(avatar);
    linhaNome.appendChild(el("h2", null, n.nome));
    c.appendChild(linhaNome);
    if (n.responsavel) c.appendChild(el("p", "responsavel", n.responsavel));
    if (n.descricao) c.appendChild(el("p", "descricao", n.descricao));
    const onde = textoLocal(n);
    if (onde) c.appendChild(el("p", "local", "📍 " + onde));
    // 🌐 até onde o negócio atende
    if (n.atende === "brasil") {
      const p = el("p", "local local-alcance", "🌐 Atende em todo o Brasil (");
      p.appendChild(el("em", null, "online"));
      p.appendChild(document.createTextNode(" ou por entrega)"));
      c.appendChild(p);
    } else if (n.atende === "estado" && n.estado) {
      c.appendChild(el("p", "local local-alcance", "🌐 Atende em " + (TODO_ESTADO[n.estado] || "todo o " + n.estado)));
    } else if (n.cidade) {
      c.appendChild(el("p", "local local-alcance", "🌐 Atende em " + n.cidade));
    }
    if (n.endereco) {
      const p = el("p", "local local-mapa", "🏬 ");
      const a = el("a", "link-mapa", "Ver endereço no mapa");
      a.href = "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent([n.endereco, n.cidade, n.estado].filter(Boolean).join(", "));
      a.target = "_blank"; a.rel = "noopener";
      a.title = n.endereco;
      a.addEventListener("click", () => registrarClique("Mapa: " + n.nome));
      p.appendChild(a);
      c.appendChild(p);
    }

    if (n.igreja || n.pastor) {
      // ✓ alinhado com a igreja; "O irmão Marlon congrega na" e a referência alinhados com o nome da igreja
      const ref = el("div", "referencia referencia-grade");
      const nomeCompleto = (n.responsavel || "").trim();
      if (nomeCompleto && n.igreja) {
        const frase = (n.tratamento ? (n.tratamento === "irmã" ? "A " : "O ") + n.tratamento + " " : "") + nomeCompleto + " congrega " + (n.preposicaoIgreja || "em");
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
      .filter((n) => !termo || normalizar([n.nome, n.responsavel, n.categoria, n.descricao, n.local, n.cidade, n.estado, n.atende === "brasil" ? "online" : "", n.igreja, n.pastor].join(" ")).includes(termo))
      // Ordem: fixados primeiro; depois o cadastro mais recente (fim da lista em negocios.js) primeiro
      .sort((a, b) => (!!b.fixado - !!a.fixado) || (NEGOCIOS.indexOf(b) - NEGOCIOS.indexOf(a)));

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
        ? "Você vende algo ou presta algum serviço? Cadastre-se gratuitamente e seja um dos primeiros do guia."
        : "Você também trabalha com " + categoriaAtual.toLocaleLowerCase("pt-BR") + "? Cadastre-se gratuitamente e apareça aqui."));
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
    try { localStorage.setItem("regiaoGuia", TODO_BRASIL); } catch (e) {}
    montarIgrejas(); select.value = TODAS;
    desenharFiltros(); desenharLista();
  });
  // Testemunhos (some sozinho se a lista estiver vazia)
  if (typeof TESTEMUNHOS !== "undefined" && TESTEMUNHOS.length) {
    const lista = $("listaTestemunhos");
    TESTEMUNHOS.forEach((t) => {
      const f = el("figure", "testemunho");
      f.appendChild(el("blockquote", null, "“" + t.texto + "”"));
      f.appendChild(el("figcaption", null, "— " + t.nome + (t.detalhe ? ", " + t.detalhe : "")));
      lista.appendChild(f);
    });
    $("testemunhos").hidden = false;

    // Carrossel: setas e bolinhas só aparecem quando há mais de um testemunho
    if (TESTEMUNHOS.length > 1) {
      const ant = $("setaAnterior"), prox = $("setaProxima"), pontos = $("pontosTestemunhos");
      ant.hidden = prox.hidden = false;
      const atual = () => Math.round(lista.scrollLeft / lista.clientWidth);
      const ir = (i) => lista.scrollTo({ left: i * lista.clientWidth });
      TESTEMUNHOS.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", "Testemunho " + (i + 1));
        b.onclick = () => ir(i);
        pontos.appendChild(b);
      });
      const marcar = () => {
        const i = atual();
        [...pontos.children].forEach((b, j) => b.classList.toggle("ativo", j === i));
        ant.disabled = i === 0;
        prox.disabled = i === TESTEMUNHOS.length - 1;
      };
      ant.onclick = () => ir(atual() - 1);
      prox.onclick = () => ir(atual() + 1);
      lista.addEventListener("scroll", () => requestAnimationFrame(marcar));
      window.addEventListener("resize", marcar);
      marcar();
    }
  }

  desenharFiltros();
  desenharLista();
})();
