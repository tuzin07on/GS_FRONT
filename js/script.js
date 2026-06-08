const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

function simularPlantio(){

    const cultura = document.getElementById("cultura").value;
    const cep = document.getElementById("cep").value;
    const resultado = document.getElementById("resultado");

    if(cultura === "" || cep === ""){

        resultado.innerHTML = `
            <div class="resultado-card">
                <h2>⚠ Atenção</h2>
                <p>Preencha todos os campos.</p>
            </div>
        `;

        return;
    }

    const nivel = Math.floor(Math.random() * 3);

    if(nivel === 0){

        resultado.innerHTML = `
            <div class="resultado-card">
                <h2>🟢 FAVORÁVEL</h2>

                <p>
                    Condições ideais para plantio de ${cultura}.
                    Recomendamos plantar nos próximos 3 dias.
                </p>
            </div>
        `;
    }

    if(nivel === 1){

        resultado.innerHTML = `
            <div class="resultado-card">
                <h2>🟡 ATENÇÃO</h2>

                <p>
                    Há previsão de instabilidade climática.
                    Monitore as condições antes do plantio.
                </p>
            </div>
        `;
    }

    if(nivel === 2){

        resultado.innerHTML = `
            <div class="resultado-card">
                <h2>🔴 CRÍTICO</h2>

                <p>
                    Solo seco ou chuva insuficiente.
                    Aguarde melhores condições.
                </p>
            </div>
        `;
    }
}

const perguntas = document.querySelectorAll(".faq-question");

perguntas.forEach((pergunta) => {

    pergunta.addEventListener("click", () => {

        const resposta = pergunta.nextElementSibling;

        if(resposta.style.maxHeight){
            resposta.style.maxHeight = null;
        }else{
            resposta.style.maxHeight =
                resposta.scrollHeight + "px";
        }

    });

});

const formulario = document.getElementById("formContato");

if(formulario){

    formulario.addEventListener("submit", function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const feedback = document.getElementById("feedback");

        if(nome === "" || email === "" || mensagem === ""){

            feedback.innerHTML =
                "⚠ Preencha todos os campos.";

            feedback.style.color = "#ff4444";

            return;
        }

        if(!email.includes("@")){

            feedback.innerHTML =
                "⚠ Digite um e-mail válido.";

            feedback.style.color = "#ff4444";

            return;
        }

        feedback.innerHTML =
            "✅ Mensagem enviada com sucesso!";

        feedback.style.color = "#00ff88";

        formulario.reset();

    });

}