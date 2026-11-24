/* Mede a altura real da barra do topo (muda entre celular e computador) para que,
   ao tocar num link do menu, a rolagem pare exatamente no início da camada. */
(function () {
  var barra = document.querySelector(".topbar");
  if (!barra) return;
  function medir() {
    document.documentElement.style.setProperty("--topbar-h", barra.offsetHeight + "px");
  }
  medir();
  if ("ResizeObserver" in window) new ResizeObserver(medir).observe(barra);
  else window.addEventListener("resize", medir);
})();
