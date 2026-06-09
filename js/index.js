function animarContadores() {
    const contadores = document.querySelectorAll(".counter");
    if (!contadores.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const alvo = parseInt(el.dataset.target, 10);
            let atual = 0;
            const passo = Math.ceil(alvo / 60);
            const timer = setInterval(() => {
                atual = Math.min(atual + passo, alvo);
                el.textContent = atual.toLocaleString("pt-BR");
                if (atual >= alvo) clearInterval(timer);
            }, 20);
            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    contadores.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", animarContadores);