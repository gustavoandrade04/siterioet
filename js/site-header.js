const headerSlot = document.getElementById("site-header");

if (headerSlot) {
    headerSlot.innerHTML = `
        <header class="header">
            <div class="container">
                <a href="../index.html" class="logo-area" aria-label="Página inicial Rio Entretenimento">
                    <img src="../images/logo/logo.PNG" alt="Rio Entretenimento">
                    <div class="brand"><h2>RIO ENTRETENIMENTO</h2></div>
                </a>
                <form class="header-search" action="eventos.html" role="search">
                    <label class="sr-only" for="header-search-input">Buscar eventos</label>
                    <input id="header-search-input" name="q" type="search" placeholder="Buscar eventos" autocomplete="off">
                    <button type="button" aria-label="Abrir busca" aria-expanded="false">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"/></svg>
                    </button>
                </form>
                <nav class="nav-menu" aria-label="Navegação principal">
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="eventos.html">Eventos</a></li>
                        <li><a href="premium.html">Festas Premium</a></li>
                        <li><a href="reveillon.html">Réveillon</a></li>
                        <li><a href="carnaval.html">Carnaval</a></li>
                        <li class="mobile-social-icons"><a href="https://www.instagram.com/rioentretenimento/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Rio Entretenimento"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.6 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 6.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"/></svg></a><a href="https://bit.ly/FalecomRaphaMattos" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 29l6.8-1.8A12.7 12.7 0 1 0 16 3.2Zm0 23.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-4 .9 1-3.9-.3-.4A10.5 10.5 0 1 1 16 26.3Zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6s0-.5 0-.7c-.1-.2-.7-1.7-1-2.4s-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.5s-1.2 1.1-1.2 2.8 1.2 3.3 1.3 3.5c.2.2 2.3 3.6 5.7 5 2 .9 2.8 1 3.8.8.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.3Z"/></svg></a></li>
                    </ul>
                </nav>
                <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <a href="https://linktr.ee/Rioentretenimento" target="_blank" rel="noopener noreferrer" class="btn btn-main">Grupo VIP</a><a href="https://www.instagram.com/rioentretenimento?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" class="instagram-link" aria-label="Instagram da Rio Entretenimento"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.6 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 6.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"/></svg></a><a href="https://bit.ly/FalecomRaphaMattos" target="_blank" rel="noopener noreferrer" class="whatsapp-link" aria-label="Fale conosco pelo WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 29l6.8-1.8A12.7 12.7 0 1 0 16 3.2Zm0 23.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-4 .9 1-3.9-.3-.4A10.5 10.5 0 1 1 16 26.3Zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6s0-.5 0-.7c-.1-.2-.7-1.7-1-2.4s-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.5s-1.2 1.1-1.2 2.8 1.2 3.3 1.3 3.5c.2.2 2.3 3.6 5.7 5 2 .9 2.8 1 3.8.8.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.3Z"/></svg></a>
            </div>
        </header>`;

    window.configurarMenuMobile?.(headerSlot);

    const busca = headerSlot.querySelector(".header-search");
    const campoBusca = busca?.querySelector("input");
    const botaoBusca = busca?.querySelector("button");

    botaoBusca?.addEventListener("click", event => {
        if (busca.classList.contains("is-open")) return;
        event.preventDefault();
        busca.classList.add("is-open");
        botaoBusca.type = "submit";
        botaoBusca.setAttribute("aria-label", "Buscar eventos");
        botaoBusca.setAttribute("aria-expanded", "true");
        campoBusca.focus();
    });
}
