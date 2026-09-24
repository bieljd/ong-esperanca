// Atualiza o estado visual do header durante a rolagem.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector<HTMLElement>("#site-header");

  if (!header) {
    return;
  }

  let frameSolicitado = false;

  const atualizarHeader = (): void => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    frameSolicitado = false;
  };

  const aoRolar = (): void => {
    if (frameSolicitado) {
      return;
    }

    frameSolicitado = true;
    window.requestAnimationFrame(atualizarHeader);
  };

  atualizarHeader();
  window.addEventListener("scroll", aoRolar, { passive: true });
});
