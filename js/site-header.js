const headerSlot = document.getElementById("site-header");

if (headerSlot) {
    headerSlot.innerHTML = `
        <header class="header">
            <div class="container">
                <a href="../index.html" class="logo-area" aria-label="Página inicial Rio Entretenimento">
                    <img src="../images/logo/logo.PNG" alt="Rio Entretenimento">
                    <div class="brand"><h2>RIO ENTRETENIMENTO</h2></div>
                </a>
                <nav class="nav-menu" aria-label="Navegação principal">
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="eventos.html">Eventos</a></li>
                        <li><a href="premium.html">Premium</a></li>
                        <li><a href="reveillon.html">Réveillon</a></li>
                        <li><a href="carnaval.html">Carnaval</a></li>
                    </ul>
                </nav>
                <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <a href="https://linktr.ee/Rioentretenimento" target="_blank" rel="noopener noreferrer" class="btn btn-main">Grupo VIP</a>
            </div>
        </header>`;

    window.configurarMenuMobile?.(headerSlot);
}
