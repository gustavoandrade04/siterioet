const catalogo = document.getElementById("catalogo-eventos");
const modo = document.body.dataset.catalogo;

function escapar(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function dataParaOrdem(data = "") {
    const partes = data.match(/(\d{2})\/(\d{2})(?:\/(\d{4}))?/);

    if (!partes) return Number.MAX_SAFE_INTEGER;

    const [, dia, mes, ano] = partes;
    return new Date(Number(ano || 2026), Number(mes) - 1, Number(dia)).getTime();
}

function ePremium(evento) {
    const tags = (evento.tags || []).map(tag => tag.toLowerCase());
    return tags.includes("premium") && !tags.includes("reveillon") && !tags.includes("carnaval");
}

function renderizar(eventos) {
    if (!eventos.length) {
        catalogo.innerHTML = '<div class="catalog-empty"><h2>Nenhum evento encontrado</h2><p>Em breve teremos novidades por aqui.</p></div>';
        return;
    }

    catalogo.innerHTML = eventos.map(evento => `
        <a class="catalog-card" href="evento.html?id=${encodeURIComponent(evento.id)}">
            ${evento.imagem ? `<img src="../${escapar(evento.imagem)}" alt="${escapar(evento.nome)}">` : ""}
            <div class="catalog-card-content">
                <span class="event-tag">${escapar((evento.tags || ["Evento"])[0])}</span>
                <h2>${escapar(evento.nome)}</h2>
                <p class="catalog-meta">${escapar(evento.data)}${evento.horario ? ` • ${escapar(evento.horario)}` : ""}</p>
                <p class="catalog-meta">${escapar(evento.local || "Local a confirmar")}</p>
            </div>
        </a>`).join("");
}

fetch("../eventos.json")
    .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar os eventos.");
        return response.json();
    })
    .then(eventos => {
        const filtrados = modo === "premium" ? eventos.filter(ePremium) : eventos;
        renderizar(filtrados.sort((a, b) => dataParaOrdem(a.data) - dataParaOrdem(b.data)));
    })
    .catch(() => {
        catalogo.innerHTML = '<div class="catalog-empty"><h2>Não foi possível carregar os eventos</h2><p>Tente novamente em instantes.</p></div>';
    });
