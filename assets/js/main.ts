/**
 * Contador animado para a seção de impacto.
 * Anima [data-contador] de 0 até o valor quando entra na viewport.
 * Suporta sufixo opcional via data-sufixo (ex: "t" para toneladas).
 * Respeita prefers-reduced-motion.
 */

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

function animarContador(el: HTMLElement): void {
  const alvo = Number(el.dataset.contador ?? "0");
  const sufixo = el.dataset.sufixo ?? "";
  const duracao = 1800;
  const inicio = performance.now();

  const prefereReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefereReduzido) {
    el.textContent = alvo.toLocaleString("pt-BR") + sufixo;
    return;
  }

  function passo(agora: number): void {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = Math.round(alvo * easeOutCubic(progresso));
    el.textContent = valorAtual.toLocaleString("pt-BR") + sufixo;

    if (progresso < 1) {
      requestAnimationFrame(passo);
    } else {
      el.textContent = alvo.toLocaleString("pt-BR") + sufixo;
    }
  }

  requestAnimationFrame(passo);
}

function iniciarContadores(): void {
  const contadores = document.querySelectorAll<HTMLElement>("[data-contador]");
  if (contadores.length === 0) return;

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const el = entrada.target as HTMLElement;
        animarContador(el);
        obs.unobserve(el);
      });
    },
    { threshold: 0.35, rootMargin: "0px 0px -40px 0px" }
  );

  contadores.forEach((c) => observer.observe(c));
}

document.addEventListener("DOMContentLoaded", iniciarContadores);