/* Em telas sensÃ­veis ao toque, evita que um arrasto lateral desloque a pÃ¡gina.
   Gestos verticais e toques em links/botÃµes continuam funcionando normalmente. */
(function () {
    let inicioX = 0;
    let inicioY = 0;

    document.addEventListener("touchstart", event => {
        if (event.touches.length !== 1) return;

        inicioX = event.touches[0].clientX;
        inicioY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchmove", event => {
        if (event.touches.length !== 1) return;

        const deltaX = Math.abs(event.touches[0].clientX - inicioX);
        const deltaY = Math.abs(event.touches[0].clientY - inicioY);

        if (deltaX > deltaY && deltaX > 8 && event.cancelable) {
            event.preventDefault();
        }
    }, { passive: false });

    window.addEventListener("scroll", () => {
        if (window.scrollX) window.scrollTo(0, window.scrollY);
    }, { passive: true });
}());
