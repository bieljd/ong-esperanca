import { projetos, renderizarProjetos } from "./templates.js";

// Retorna uma lista tipada de elementos.
function qsa<T extends Element>(seletor: string): T[] {
  return Array.from(document.querySelectorAll<T>(seletor));
}

// Filtra os projetos pela categoria selecionada.
document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos(projetos);

  const filtros = qsa<HTMLButtonElement>(".filtros .filtro");
  const grade = document.querySelector<HTMLElement>(".projects-grid");

  if (filtros.length === 0 || !grade) return;

  for (const filtro of filtros) {
    filtro.addEventListener("click", () => {
      const categoria = filtro.dataset.filtro ?? "todos";

      for (const outroFiltro of filtros) {
        const ativo = outroFiltro === filtro;
        outroFiltro.classList.toggle("ativo", ativo);
        outroFiltro.setAttribute("aria-pressed", String(ativo));
      }

      for (const projeto of grade.querySelectorAll<HTMLElement>(".project-card")) {
        const visivel = categoria === "todos" || projeto.dataset.categoria === categoria;

        if (visivel) {
          projeto.hidden = false;
          projeto.setAttribute("aria-hidden", "false");
          projeto.classList.remove("escondendo", "escondido");
          continue;
        }

        projeto.setAttribute("aria-hidden", "true");
        projeto.classList.add("escondendo");
        window.setTimeout(() => {
          if (projeto.getAttribute("aria-hidden") === "true") {
            projeto.classList.add("escondido");
            projeto.hidden = true;
          }
        }, 300);
      }
    });
  }
});
