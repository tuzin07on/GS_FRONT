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

function marcarLinkAtivo() {
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__links a, .navbar__mobile a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === pagina) link.classList.add("ativo");
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  marcarLinkAtivo();
  iniciarFaq();
});