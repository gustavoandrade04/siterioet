/* Rio Entretenimento - Google Analytics 4 */
(function () {
    'use strict';
    if (window.rioAnalytics) return;
    const enabled = ['rioentretenimento.com.br', 'www.rioentretenimento.com.br'].includes(window.location.hostname);
    let currentEvent = null;
    let viewed = false;
    function send(name, params) {
        if (!enabled) return;
        try { window.gtag('event', name, params); } catch (_) { /* Analytics never blocks the site. */ }
    }
    window.rioAnalytics = {
        viewEvent(evento) {
            currentEvent = {
                evento_id: String(evento.id),
                evento_nome: String(evento.nome).slice(0, 100)
            };
            if (!viewed) {
                viewed = true;
                send('visualizar_evento', currentEvent);
            }
        }
    };
    if (!enabled) return; // Local previews do not enter production reports.
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-X8KNXM1X4Z');
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-X8KNXM1X4Z';
    document.head.appendChild(script);

    function trackClick(event) {
        if (event.type === 'auxclick' && event.button !== 1) return;
        const link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;
        let action = link.dataset.analyticsAction;
        if (!action) {
            const url = new URL(link.href, window.location.href);
            if (url.hostname === 'chat.whatsapp.com') action = 'clique_grupo_whatsapp';
            else if (['wa.me', 'api.whatsapp.com'].includes(url.hostname) ||
                (url.hostname === 'bit.ly' && url.pathname === '/FalecomRaphaMattos')) action = 'clique_contato_whatsapp';
        }
        if (!['clique_ingresso', 'clique_lista_vip', 'clique_grupo_whatsapp', 'clique_contato_whatsapp', 'clique_links_evento'].includes(action)) return;
        send(action, { ...(currentEvent || {}), pagina_origem: window.location.pathname });
    }
    document.addEventListener('click', trackClick);
    document.addEventListener('auxclick', trackClick);
}());
