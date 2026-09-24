// Controla a troca automática das imagens do hero.
document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.querySelector<HTMLElement>("#hero-slideshow");

  if (!slideshow) {
    return;
  }

  const slides = Array.from(slideshow.querySelectorAll<HTMLElement>(".hero-slide"));
  const legendas = Array.from(slideshow.querySelectorAll<HTMLElement>(".legenda-item"));

  if (slides.length < 2) {
    return;
  }

  let indiceAtual = 0;
  let intervalo: number | undefined;
  const DURACAO = 6000;
  const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Carrega as imagens antes das trocas.
  for (const slide of slides) {
    const imagem = slide.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
    if (imagem) {
      const preloader = new Image();
      preloader.src = imagem;
    }
  }

  const reiniciarProgresso = (): void => {
    slideshow.classList.add("reiniciar");
    window.setTimeout(() => {
      slideshow.classList.remove("reiniciar");
    }, 50);
  };

  const mostrarSlide = (novoIndice: number): void => {
    if (novoIndice === indiceAtual) {
      return;
    }

    slides[indiceAtual]?.classList.remove("ativo");
    legendas[indiceAtual]?.classList.remove("ativo");
    slides[novoIndice]?.classList.add("ativo");
    legendas[novoIndice]?.classList.add("ativo");
    indiceAtual = novoIndice;
    reiniciarProgresso();
  };

  const iniciarIntervalo = (): void => {
    if (intervalo !== undefined || movimentoReduzido.matches) {
      return;
    }

    intervalo = window.setInterval(() => {
      mostrarSlide((indiceAtual + 1) % slides.length);
    }, DURACAO);
  };

  const pausarIntervalo = (): void => {
    if (intervalo === undefined) {
      return;
    }

    window.clearInterval(intervalo);
    intervalo = undefined;
  };

  const manterPrimeiroSlide = (): void => {
    pausarIntervalo();
    slides.forEach((slide, indice) => slide.classList.toggle("ativo", indice === 0));
    legendas.forEach((legenda, indice) => legenda.classList.toggle("ativo", indice === 0));
    indiceAtual = 0;
  };

  if (movimentoReduzido.matches) {
    manterPrimeiroSlide();
    return;
  }

  iniciarIntervalo();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pausarIntervalo();
    } else {
      iniciarIntervalo();
    }
  });
});
