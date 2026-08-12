const container = document.getElementById("evento-container");
const id = new URLSearchParams(window.location.search).get("id");

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatEventText(value = "") {
    return escapeHtml(value)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}

function tagsDoEvento(evento) {
    return (evento.tags || []).map(tag => String(tag).toLowerCase());
}

function abaDoEvento(evento) {
    const tags = tagsDoEvento(evento);
    if (evento.destaque) return "destaque";
    if (tags.includes("reveillon")) return "reveillon";
    if (tags.includes("carnaval")) return "carnaval";
    if (tags.includes("premium")) return "premium";
    return tags[0] || "eventos";
}

function renderError(message) {
    container.innerHTML = `
        <div class="container">
            <div class="event-empty">
                <h1>Evento não encontrado</h1>
                <p>${escapeHtml(message)}</p>
                <a class="btn-main btn-sm mt-lg" href="../index.html">Voltar para a página inicial</a>
            </div>
        </div>`;
}

async function loadEvent() {
    if (!id) {
        renderError("Escolha um evento na página inicial para ver seus detalhes.");
        return;
    }

    try {
        const response = await fetch("../eventos.json");

        if (!response.ok) {
            throw new Error("Não foi possível carregar a lista de eventos.");
        }

        const eventos = await response.json();
        const evento = eventos.find(item => item.id === id);

        if (!evento) {
            renderError("Este evento não está disponível no momento.");
            return;
        }

        const imagem = (evento.imagem_detalhe || evento.imagem_card) ? `../${escapeHtml(evento.imagem_detalhe || evento.imagem_card)}` : "";
        const oQueVaiRolar = evento.o_que_vai_rolar || [];
        const artistas = evento.lineup || [];
        const descricao = oQueVaiRolar.map(item => `<li>${formatEventText(item)}</li>`).join("");
        const lineup = artistas.map(item => `<li>${formatEventText(item)}</li>`).join("");
        const detalhesCount = oQueVaiRolar.length + artistas.length;
        const limiteRelacionados = Math.min(4, Math.max(1, Math.ceil(detalhesCount / 2)));
        const abaAtual = abaDoEvento(evento);
        const relacionados = eventos
            .filter(item => item.id !== evento.id && abaDoEvento(item) === abaAtual)
            .slice(0, limiteRelacionados);
        const cardsRelacionados = relacionados.map(item => `
            <a class="event-related-card" href="evento.html?id=${encodeURIComponent(item.id)}">
                ${item.imagem_card ? `<img src="../${escapeHtml(item.imagem_card)}" alt="${escapeHtml(item.nome)}">` : ""}
                <span>
                    <strong>${escapeHtml(item.nome)}</strong>
                    <small>${escapeHtml(item.data || "Data a confirmar")}</small>
                </span>
            </a>
        `).join("");
        const sugestoes = cardsRelacionados ? `<aside class="event-related"><h2>Outros eventos ${abaAtual === "destaque" ? "da semana" : "desta categoria"}</h2><div class="event-related-grid">${cardsRelacionados}</div></aside>` : "";
        const acoes = [
            evento.link_lista && `<a class="btn-main" href="${escapeHtml(evento.link_lista)}" target="_blank" rel="noopener noreferrer">Entrar na Lista VIP</a>`,
            evento.link_ingresso && `<a class="btn-main btn-dark" href="${escapeHtml(evento.link_ingresso)}" target="_blank" rel="noopener noreferrer">Comprar ingresso</a>`
        ].filter(Boolean).join("");

        container.innerHTML = `
            <div class="container">
                <a class="event-back" href="../index.html">← Voltar para eventos</a>

                ${evento.link_grupo_vip ? `
                    <a class="vip-event-banner" href="${escapeHtml(evento.link_grupo_vip)}" target="_blank" rel="noopener noreferrer" aria-label="Entrar no Grupo VIP do WhatsApp">
                        <div class="vip-event-banner__logo" aria-hidden="true"><img src="../images/logo/logo.PNG" alt=""></div>
                        <div class="vip-event-banner__content">
                            <span class="vip-event-banner__eyebrow">Comunidade Rioet</span>
                            <strong>Entre no Grupo VIP do WhatsApp</strong>
                            <span class="vip-event-banner__description">Descontos exclusivos, viradas de lote e novidades dos melhores eventos.</span>
                        </div>
                        <span class="vip-event-banner__button">Entrar no grupo <span aria-hidden="true">→</span></span>
                    </a>
                ` : ""}

                <div class="event-layout">
                    <div class="event-media">
                        ${imagem ? `<img class="event-poster" src="${imagem}" alt="${escapeHtml(evento.nome)}">` : ""}
                        ${evento.link_linktree ? `<a class="event-linktree" href="${escapeHtml(evento.link_linktree)}" target="_blank" rel="noopener noreferrer">Ver todos os links do evento <span aria-hidden="true">→</span></a>` : ""}
                    </div>

                    <div class="event-content">
                        <span class="event-tag">${escapeHtml((evento.tags || ["Evento"])[0])}</span>
                        <h1>${escapeHtml(evento.nome)}</h1>
                        ${acoes ? `<div class="event-actions">${acoes}</div>` : ""}
                        <div class="event-info">
                            <p><strong>Quando:</strong> ${escapeHtml(evento["dia-da-semana"] || "")} ${escapeHtml(evento.data || "")}</p>
                            ${evento.horario ? `<p><strong>Horário:</strong> ${escapeHtml(evento.horario)}</p>` : ""}
                            <p><strong>Local:</strong> ${escapeHtml(evento.local || "A confirmar")}</p>
                            ${evento.codigo ? `<div class="event-code"><span>Use o código:</span><strong>${escapeHtml(evento.codigo)}</strong></div>` : ""}
                        </div>
                    </div>
                    ${(descricao || lineup) ? `
                        <div class="event-extra-info">
                            ${descricao ? `<section class="event-section"><h2>O que vai rolar</h2><ul>${descricao}</ul></section>` : ""}
                            ${lineup ? `<section class="event-section"><h2>Line-up</h2><ul>${lineup}</ul></section>` : ""}
                        </div>
                    ` : ""}
                    ${sugestoes}
                </div>
            </div>`;
    } catch (error) {
        console.error(error);
        renderError("Não foi possível carregar este evento. Tente novamente em instantes.");
    }
}

loadEvent();
