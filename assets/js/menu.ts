// Inicializa o menu responsivo em telas pequenas.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector<HTMLElement>(".site-header");
  const headerInner = document.querySelector<HTMLElement>(".site-header .header-inner");
  const nav = document.querySelector<HTMLElement>(".nav-principal");

  if (!header || !nav) {
    return;
  }

  nav.id = nav.id || "nav-principal";
  let toggle = header.querySelector<HTMLButtonElement>(".menu-toggle");

  if (!toggle) {
    toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Abrir menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "nav-principal");
    toggle.innerHTML = '<span class="menu-icone" aria-hidden="true">☰</span>';
    (headerInner ?? header).append(toggle);
  }

  const icone = toggle.querySelector<HTMLElement>(".menu-icone");

  const fecharMenu = (): void => {
    document.body.classList.remove("nav-aberto");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menu");
    if (icone) icone.textContent = "☰";
  };

  toggle.addEventListener("click", () => {
    const aberto = document.body.classList.toggle("nav-aberto");
    toggle?.setAttribute("aria-expanded", String(aberto));
    toggle?.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    if (icone) icone.textContent = aberto ? "✕" : "☰";
  });

  for (const link of nav.querySelectorAll<HTMLAnchorElement>("a")) {
    link.addEventListener("click", fecharMenu);
  }

  document.body.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Node)) {
      return;
    }

    const clicouNoMenu = nav.contains(evento.target);
    const clicouNoBotao = toggle?.contains(evento.target) ?? false;

    if (!clicouNoMenu && !clicouNoBotao) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharMenu();
      toggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      fecharMenu();
    }
  });
});
