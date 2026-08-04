function configurarMenuMobile(raiz = document) {
    const botao = raiz.querySelector(".menu-toggle");
    const menu = raiz.querySelector(".nav-menu");

    if (!botao || !menu) return;

    botao.addEventListener("click", () => {
        const aberto = menu.classList.toggle("is-open");
        botao.setAttribute("aria-expanded", String(aberto));
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            botao.setAttribute("aria-expanded", "false");
        });
    });
}

window.configurarMenuMobile = configurarMenuMobile;
