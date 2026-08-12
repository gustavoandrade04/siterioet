const catalogo = document.getElementById("catalogo-eventos");
const modo = document.body.dataset.catalogo;
const parametros = new URLSearchParams(window.location.search);
const regiaoReveillon = parametros.get("regiao");
const busca = parametros.get("q") || "";
const campoBusca = document.getElementById("event-search-input");
const statusBusca = document.getElementById("event-search-status");

function escapar(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function temTag(evento, tag) {
    return (evento.tags || []).some(item => item.toLowerCase() === tag);
}

function dataParaOrdem(data = "") {
    const partes = data.match(/(\d{2})\/(\d{2})(?:\/(\d{4}))?/);
    if (!partes) return Number.MAX_SAFE_INTEGER;

    const [, dia, mes, ano] = partes;
    return new Date(Number(ano || 2026), Number(mes) - 1, Number(dia)).getTime();
}

function ePremium(evento) {
    return temTag(evento, "premium") && !temTag(evento, "reveillon") && !temTag(evento, "carnaval");
}

function regiaoDoReveillon(evento) {
    return String(evento.categoria_reveillon || "nordeste").toLowerCase();
}

function ordenarEventos(eventos) {
    const prioridadeReveillon = { nordeste: 0, rio: 1, buzios: 2 };

    return eventos.sort((a, b) => {
        if (modo === "reveillon" && !regiaoReveillon) {
            const diferencaDeRegiao = (prioridadeReveillon[regiaoDoReveillon(a)] ?? 3)
                - (prioridadeReveillon[regiaoDoReveillon(b)] ?? 3);
            if (diferencaDeRegiao) return diferencaDeRegiao;
        }

        return dataParaOrdem(a.data) - dataParaOrdem(b.data);
    });
}

function acessoEvento(evento) {
    if (evento.link_lista) {
        return '<span class="catalog-access catalog-access--vip">Lista VIP</span>';
    }

    if (evento.link_ingresso) {
        return '<span class="catalog-access catalog-access--ingresso">Ingressos com desconto</span>';
    }

    return "";
}

function normalizar(value = "") {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function correspondeABusca(evento, termo) {
    if (!termo) return true;

    const conteudo = [
        evento.nome,
        evento.local,
        evento.data,
        evento.horario,
        evento.categoria_reveillon,
        ...(evento.tags || [])
    ].join(" ");

    return normalizar(conteudo).includes(normalizar(termo));
}

function atualizarSubabas() {
    document.querySelectorAll(".catalog-tabs a").forEach(link => {
        const regiaoDoLink = new URL(link.href).searchParams.get("regiao");
        const selecionada = (regiaoDoLink || null) === regiaoReveillon;
        link.classList.toggle("is-active", selecionada);
        if (selecionada) link.setAttribute("aria-current", "page");
    });
}

function renderizar(eventos) {
    if (!eventos.length) {
        const mensagem = busca
            ? `Não encontramos eventos para <strong>${escapar(busca)}</strong>. Tente outro termo.`
            : "Estamos preparando novidades para você. Volte em breve.";
        catalogo.innerHTML = `<div class="catalog-empty"><h2>${busca ? "Nenhum evento encontrado" : "Eventos em breve"}</h2><p>${mensagem}</p></div>`;
        return;
    }

    const origem = `${window.location.pathname.split("/").pop() || "eventos.html"}${window.location.search}`;

    catalogo.innerHTML = eventos.map(evento => `
        <a class="catalog-card" href="evento.html?id=${encodeURIComponent(evento.id)}&voltar=${encodeURIComponent(origem)}">
            ${evento.imagem_card ? `<img src="../${escapar(evento.imagem_card)}" alt="${escapar(evento.nome)}">` : ""}
            <div class="catalog-card-content">
                <span class="event-tag">${escapar((evento.tags || ["Evento"])[0])}</span>
                <h2>${escapar(evento.nome)}</h2>
                <p class="catalog-meta">${escapar(evento.data)}${evento.horario ? ` • ${escapar(evento.horario)}` : ""}</p>
                <p class="catalog-meta">${escapar(evento.local || "Local a confirmar")}</p>
                ${acessoEvento(evento)}
            </div>
        </a>`).join("");
}

fetch("../eventos.json")
    .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar os eventos.");
        return response.json();
    })
    .then(eventos => {
        let filtrados = eventos;

        if (modo === "premium") filtrados = eventos.filter(ePremium);
        if (modo === "reveillon") {
            filtrados = eventos.filter(evento => temTag(evento, "reveillon"));
            if (regiaoReveillon) {
                filtrados = filtrados.filter(evento => regiaoDoReveillon(evento) === regiaoReveillon);
            }
            atualizarSubabas();
        }
        if (modo === "carnaval") filtrados = eventos.filter(evento => temTag(evento, "carnaval"));

        filtrados = filtrados.filter(evento => correspondeABusca(evento, busca));

        if (campoBusca) campoBusca.value = busca;
        if (statusBusca && busca) {
            statusBusca.textContent = `${filtrados.length} ${filtrados.length === 1 ? "evento encontrado" : "eventos encontrados"} para “${busca}”.`;
        }

        renderizar(ordenarEventos(filtrados));
    })
    .catch(() => {
        catalogo.innerHTML = '<div class="catalog-empty"><h2>Não foi possível carregar os eventos</h2><p>Tente novamente em instantes.</p></div>';
    });
