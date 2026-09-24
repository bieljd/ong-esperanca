// Revela conteúdos conforme eles entram na viewport.
document.addEventListener("DOMContentLoaded", () => {
  const seletores = [
    ".section-header",
    ".card",
    ".project-card",
    ".stats-grid > div",
    ".cta-final",
    ".form-bloco",
    ".page-header > *",
  ];
  const elementos = seletores.flatMap((seletor) => Array.from(document.querySelectorAll<HTMLElement>(seletor)));

  for (const seletor of seletores) {
    const grupo = Array.from(document.querySelectorAll<HTMLElement>(seletor));
    grupo.forEach((elemento, indice) => {
      elemento.classList.add("reveal");
      elemento.style.transitionDelay = `${indice * 60}ms`;
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elementos.forEach((elemento) => elemento.classList.add("is-visivel"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) {
          continue;
        }

        const elemento = entrada.target as HTMLElement;
        elemento.classList.add("is-visivel");
        observer.unobserve(elemento);
      }
    },
    { threshold: 0.15 },
  );

  elementos.forEach((elemento) => observer.observe(elemento));
});
