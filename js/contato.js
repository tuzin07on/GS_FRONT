function iniciarFormulario() {
    const form = document.querySelector("#form-contato");
    if (!form) return;

    const campos = {
        nome: {
            el: document.querySelector("#nome"),
            regex: /^[A-Za-zÀ-ú\s]{3,}$/,
            msg: "Nome deve ter ao menos 3 letras."
        },
        email: {
            el: document.querySelector("#email"),
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            msg: "E-mail inválido (ex: nome@dominio.com)."
        },
        cep: {
            el: document.querySelector("#cep"),
            regex: /^$|^\d{5}-?\d{3}$/,
            msg: "CEP inválido (ex: 01310-100).",
            opcional: true
        },
        mensagem: {
            el: document.querySelector("#mensagem"),
            regex: /^[\s\S]{10,}$/,
            msg: "Mensagem deve ter ao menos 10 caracteres."
        }
    };

    function validarCampo(campo) {
        if (campo.opcional && !campo.el.value.trim()) {
            campo.el.classList.remove("invalido", "valido");
            const erroEl = document.querySelector(`#erro-${campo.el.id}`);
            if (erroEl) erroEl.classList.remove("visivel");
            return true;
        }

        const valido = campo.regex.test(campo.el.value.trim());
        campo.el.classList.toggle("valido", valido);
        campo.el.classList.toggle("invalido", !valido);

        const erroEl = document.querySelector(`#erro-${campo.el.id}`);
        if (erroEl) {
            erroEl.textContent = valido ? "" : campo.msg;
            erroEl.classList.toggle("visivel", !valido);
        }
        return valido;
    }

    // Máscara para telefone
    const telefoneInput = document.querySelector("#telefone");
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, "");
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = `(${valor}`;
                } else if (valor.length <= 7) {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
                } else if (valor.length <= 11) {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
                } else {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
                }
            }
            this.value = valor.slice(0, 15);
        });
    }

    // Máscara para CEP
    const cepInput = document.querySelector("#cep");
    if (cepInput) {
        cepInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
        });
    }

    // Validação em tempo real
    Object.values(campos).forEach(campo => {
        if (campo.el) campo.el.addEventListener("input", () => validarCampo(campo));
    });

    // Submit do formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let tudoValido = true;
        Object.values(campos).forEach(campo => {
            if (!validarCampo(campo)) tudoValido = false;
        });

        if (tudoValido) {
            // Esconde o formulário
            form.style.display = "none";

            // Mostra mensagem de sucesso
            const sucesso = document.querySelector(".form__sucesso");
            if (sucesso) sucesso.classList.add("visivel");

            // Scroll para a mensagem de sucesso
            sucesso.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
}

// Inicializa o formulário quando o DOM estiver carregado
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarFormulario);
} else {
    iniciarFormulario();
}