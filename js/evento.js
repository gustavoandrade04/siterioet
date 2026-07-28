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

        const imagem = evento.imagem ? `../${escapeHtml(evento.imagem)}` : "";
        const descricao = (evento.o_que_vai_rolar || [])
            .map(item => `<li>${escapeHtml(item)}</li>`)
            .join("");
        const lineup = (evento.lineup || [])
            .map(item => `<li>${escapeHtml(item)}</li>`)
            .join("");
        const acoes = [
            evento.link_lista && `<a class="btn-main" href="${escapeHtml(evento.link_lista)}" target="_blank" rel="noopener noreferrer">Entrar na Lista VIP</a>`,
            evento.link_ingresso && `<a class="btn-main btn-dark" href="${escapeHtml(evento.link_ingresso)}" target="_blank" rel="noopener noreferrer">Comprar ingresso</a>`
        ].filter(Boolean).join("");

        container.innerHTML = `
            <div class="container">
                <a class="event-back" href="../index.html">← Voltar para eventos</a>
                <div class="event-layout">
                    ${imagem ? `<img class="event-poster" src="${imagem}" alt="${escapeHtml(evento.nome)}">` : ""}
                    <div class="event-content">
                        <span class="event-tag">${escapeHtml((evento.tags || ["Evento"])[0])}</span>
                        <h1>${escapeHtml(evento.nome)}</h1>
                        <div class="event-info">
                            <p><strong>Quando:</strong> ${escapeHtml(evento['dia-da-semana'] || "")} ${escapeHtml(evento.data || "")}</p>
                            ${evento.horario ? `<p><strong>Horário:</strong> ${escapeHtml(evento.horario)}</p>` : ""}
                            <p><strong>Local:</strong> ${escapeHtml(evento.local || "A confirmar")}</p>
                            ${evento.codigo ? `<p><strong>Código:</strong> ${escapeHtml(evento.codigo)}</p>` : ""}
                        </div>
                        ${descricao ? `<section class="event-section"><h2>O que vai rolar</h2><ul>${descricao}</ul></section>` : ""}
                        ${lineup ? `<section class="event-section"><h2>Line-up</h2><ul>${lineup}</ul></section>` : ""}
                        ${acoes ? `<div class="event-actions">${acoes}</div>` : ""}
                    </div>
                </div>
            </div>`;
    } catch (error) {
        console.error(error);
        renderError("Não foi possível carregar este evento. Tente novamente em instantes.");
    }
}

loadEvent();
