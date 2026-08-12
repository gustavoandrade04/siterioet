if (!document.querySelector(".contact-section")) {
    const contato = document.createElement("section");
    contato.className = "contact-section contact-section--global";
    contato.innerHTML = `
        <div class="container">
            <a href="https://bit.ly/FalecomRaphaMattos" target="_blank" rel="noopener noreferrer" class="btn btn-main btn-lg contact-button" aria-label="Entre em contato conosco pelo WhatsApp">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 29l6.8-1.8A12.7 12.7 0 1 0 16 3.2Zm0 23.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-4 .9 1-3.9-.3-.4A10.5 10.5 0 1 1 16 26.3Zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.3-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6s0-.5 0-.7c-.1-.2-.7-1.7-1-2.4s-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.5s-1.2 1.1-1.2 2.8 1.2 3.3 1.3 3.5c.2.2 2.3 3.6 5.7 5 2 .9 2.8 1 3.8.8.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.3Z"/></svg>
                <span>Entre em contato conosco</span>
            </a>
        </div>`;

    const rodape = document.querySelector("footer");
    (rodape || document.body).insertAdjacentElement(rodape ? "beforebegin" : "beforeend", contato);
}
