
// Aguarda o DOM completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    console.log(">_ ClimaPlantio iniciado");
    
    iniciarMenu();
    marcarLinkAtivo();
    iniciarFaq();
    animarContadores();
    iniciarTypingEffect();
});

// ========== 1. MENU HAMBÚRGUER ==========
function iniciarMenu() {
    const hamburguer = document.querySelector(".navbar__hamburguer");
    const menuMobile = document.querySelector(".navbar__mobile");
    
    if (!hamburguer || !menuMobile) {
        console.log("Menu não encontrado");
        return;
    }
    
    console.log("Menu encontrado, inicializando...");
    
    // Abrir/fechar ao clicar no hambúrguer
    hamburguer.addEventListener("click", function(e) {
        e.stopPropagation();
        hamburguer.classList.toggle("aberto");
        menuMobile.classList.toggle("aberto");
        
        // Atualizar aria-expanded para acessibilidade
        const expandido = hamburguer.classList.contains("aberto");
        hamburguer.setAttribute("aria-expanded", expandido);
        
        console.log("Menu toggled:", expandido ? "aberto" : "fechado");
    });
    
    // Fechar menu ao clicar em um link
    const links = menuMobile.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", function() {
            hamburguer.classList.remove("aberto");
            menuMobile.classList.remove("aberto");
            hamburguer.setAttribute("aria-expanded", "false");
            console.log("Link clicado, menu fechado");
        });
    });
    
    // Fechar menu ao clicar fora (opcional)
    document.addEventListener("click", function(event) {
        const isClickInside = hamburguer.contains(event.target) || menuMobile.contains(event.target);
        if (!isClickInside && menuMobile.classList.contains("aberto")) {
            hamburguer.classList.remove("aberto");
            menuMobile.classList.remove("aberto");
            hamburguer.setAttribute("aria-expanded", "false");
        }
    });
}

// ========== 2. LINK ATIVO NA NAVEGAÇÃO ==========
function marcarLinkAtivo() {
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    console.log("Página atual:", paginaAtual);
    
    const todosLinks = document.querySelectorAll(".navbar__links a, .navbar__mobile a");
    todosLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === paginaAtual) {
            link.classList.add("ativo");
            console.log("Link ativo:", href);
        } else {
            link.classList.remove("ativo");
        }
    });
}

// ========== 3. FAQ ACORDEÃO ==========
function iniciarFaq() {
    const itens = document.querySelectorAll(".faq-item");
    if (!itens.length) return;
    
    itens.forEach(item => {
        const btn = item.querySelector(".faq-item__pergunta");
        if (btn) {
            btn.addEventListener("click", () => {
                const estaAberto = item.classList.contains("aberto");
                // Fecha todos
                itens.forEach(i => i.classList.remove("aberto"));
                // Abre o clicado se não estava aberto
                if (!estaAberto) item.classList.add("aberto");
            });
        }
    });
}

// ========== 4. CONTADORES ANIMADOS ==========
function animarContadores() {
    const contadores = document.querySelectorAll(".counter");
    if (!contadores.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const alvo = parseInt(el.dataset.target, 10);
            let atual = 0;
            const incremento = Math.ceil(alvo / 50);
            const timer = setInterval(() => {
                atual = Math.min(atual + incremento, alvo);
                el.textContent = atual.toLocaleString("pt-BR");
                if (atual >= alvo) clearInterval(timer);
            }, 30);
            observer.unobserve(el);
        });
    }, { threshold: 0.4 });
    
    contadores.forEach(el => observer.observe(el));
}

// ========== 5. EFEITO DE DIGITAÇÃO (opcional) ==========
function iniciarTypingEffect() {
    const elementos = document.querySelectorAll("[data-typing]");
    if (!elementos.length) return;
    
    elementos.forEach(async (el) => {
        const texto = el.getAttribute("data-typing") || el.innerText;
        el.innerText = "";
        for (let i = 0; i < texto.length; i++) {
            el.innerText += texto[i];
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    });
}

// ========== 6. EFEITO REVEAL AO SCROLL ==========
// Função adicional para animação de entrada dos elementos
const revealElements = document.querySelectorAll(".reveal");

function checkReveal() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

if (revealElements.length) {
    window.addEventListener("scroll", checkReveal);
    window.addEventListener("load", checkReveal);
}

// ========== 7. CONSOLE TECH ==========
console.log("%c┌─────────────────────────────────────────┐", "color: #00ff88; font-family: monospace");
console.log("%c│     🌱 ClimaPlantio - Sistema Ativo     │", "color: #00ff88; font-family: monospace");
console.log("%c│   🛰️ Satélites conectados: NASA/INPE   │", "color: #00ff88; font-family: monospace");
console.log("%c│   📡 Status: OPERACIONAL                │", "color: #00ff88; font-family: monospace");
console.log("%c└─────────────────────────────────────────┘", "color: #00ff88; font-family: monospace");