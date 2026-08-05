console.log("Index.js carregado!");

fetch("eventos.json")
    .then(response => {
        console.log("Resposta:", response);
        return response.json();
    })
    .then(eventos => {
        console.log("Eventos:", eventos);

        // seu código continua aqui...
    })
    .catch(error => {
        console.error("Erro no fetch:", error);
    });
console.log("Rio Entretenimento carregado.");

fetch('eventos.json')

            .then(response => response.json())

            .then(eventos => {

                const destaque = eventos.filter(evento => evento.destaque);

                const container = document.getElementById("cards-destaque");

                container.innerHTML = "";

                destaque.forEach(evento => {

                    let status = "";
                    let statusClass = "";

                    if (evento.link_lista) {

                        status = `Lista VIP até ${evento.horario_lista_vip || "a confirmar"}`;
                        statusClass = "status-vip";

                    } else if (evento.link_ingresso) {

                        status = "Ingressos com desconto";
                        statusClass = "status-ingresso";

                    } else {

                        status = "Em breve";

                    }

                    container.innerHTML += `

                        <article 
                            class="card"
                            onclick="window.location.href='pages/evento.html?id=${evento.id}'">

                            <div class="card-image">

                                ${evento.imagem_card
                                    ? `<img src="${evento.imagem_card}" alt="${evento.nome}">`
                                    : ""
                                }

                            </div>

                            <div class="card-content">

                                <span class="codigo">

                                  ${evento.data.split("/").slice(0, 2).join("/")}, ${(evento["dia-da-semana"] || "").replace(/-feira,?/i, "").trim().toLowerCase()}

                                </span>

                                <h3>

                                    ${evento.nome}

                                </h3>

                                <p>

                                     ${evento.local}

                                </p>

                                <p>

                                     código: ${evento.codigo || ""}

                                </p>

                                <p class="status ${statusClass}">

                                    ${status}

                                </p>


                            </div>

                        </article>

                    `;

                });

            })

            .catch(() => {

                document.getElementById("cards-destaque").innerHTML =

                    "<p>Não foi possível carregar os eventos.</p>";

            });
