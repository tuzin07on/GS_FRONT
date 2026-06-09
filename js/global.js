// Menu hambúrguer
function iniciarMenu() {
  const hamburguer = document.querySelector(".navbar__hamburguer");
  const menuMobile = document.querySelector(".navbar__mobile");
  if (!hamburguer || !menuMobile) return;

  hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("aberto");
    menuMobile.classList.toggle("aberto");
    const expandido = hamburguer.classList.contains("aberto");
    hamburguer.setAttribute("aria-expanded", expandido);
  });

  menuMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburguer.classList.remove("aberto");
      menuMobile.classList.remove("aberto");
    });
  });
}

// Link ativo
function marcarLinkAtivo() {
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__links a, .navbar__mobile a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === pagina) link.classList.add("ativo");
  });
}

// FAQ acordeão
function iniciarFaq() {
  const itens = document.querySelectorAll(".faq-item");
  if (!itens.length) return;

  itens.forEach(item => {
    const btn = item.querySelector(".faq-item__pergunta");
    if (btn) {
      btn.addEventListener("click", () => {
        const jaAberto = item.classList.contains("aberto");
        itens.forEach(i => i.classList.remove("aberto"));
        if (!jaAberto) item.classList.add("aberto");
      });
    }
  });
}

// Efeito de digitação (typing effect)
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

// Contador digital animado
function animarContadores() {
  const contadores = document.querySelectorAll(".counter");
  if (!contadores.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const alvo = parseInt(el.dataset.target, 10);
      let atual = 0;
      const passo = Math.ceil(alvo / 50);
      const timer = setInterval(() => {
        atual = Math.min(atual + passo, alvo);
        el.textContent = atual.toLocaleString("pt-BR");
        if (atual >= alvo) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  contadores.forEach(el => observer.observe(el));
}

// Terminal effect para console
console.log("%c>_ ClimaPlantio | Sistema de Monitoramento Agrícola v2.0", "color: #00ff88; font-family: monospace; font-size: 12px;");
console.log("%c>_ Satélites conectados: