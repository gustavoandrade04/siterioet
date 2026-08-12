const buscaCabecalho = document.querySelector(".header-search");
const campoBuscaCabecalho = buscaCabecalho?.querySelector("input");
const botaoBuscaCabecalho = buscaCabecalho?.querySelector("button");

botaoBuscaCabecalho?.addEventListener("click", event => {
    if (buscaCabecalho.classList.contains("is-open")) return;
    event.preventDefault();
    buscaCabecalho.classList.add("is-open");
    botaoBuscaCabecalho.type = "submit";
    botaoBuscaCabecalho.setAttribute("aria-label", "Buscar eventos");
    botaoBuscaCabecalho.setAttribute("aria-expanded", "true");
    campoBuscaCabecalho.focus();
});
