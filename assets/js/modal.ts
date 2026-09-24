export {};

// Controla o modal de detalhes dos projetos.
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector<HTMLDialogElement>("#modal-projeto");

  if (!modal) {
    return;
  }

  const imagem = modal.querySelector<HTMLImageElement>("#modal-imagem");
  const categoria = modal.querySelector<HTMLElement>("#modal-categoria");
  const titulo = modal.querySelector<HTMLElement>("#modal-titulo");
  const descricao = modal.querySelector<HTMLElement>("#modal-descricao");
  const metas = modal.querySelector<HTMLUListElement>("#modal-metas");
  const impacto = modal.querySelector<HTMLElement>("#modal-impacto");
  const botoesFechar = modal.querySelectorAll<HTMLButtonElement>(".modal-fechar, .modal-fechar-btn");
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
  const links = cards.flatMap((card) => Array.from(card.querySelectorAll<HTMLAnchorElement>(".project-link")));

  if (!imagem || !categoria || !titulo || !descricao || !metas || !impacto) {
    return;
  }

  const fecharModal = (): void => {
    try {
      modal.close();
    } catch (erro) {
      console.error("Não foi possível fechar o modal.", erro);
    }
  };

  for (const link of links) {
    link.addEventListener("click", (evento) => {
      evento.preventDefault();
      const card = link.closest<HTMLElement>(".project-card");

      if (!card) {
        return;
      }

      const dados = card.dataset;
      const dataProjeto = dados.projeto ?? "";
      console.log("Abrindo projeto:", dataProjeto);
      modal.dataset.projeto = dataProjeto;
      imagem.src = dados.imagem ?? "";
      imagem.alt = dados.titulo ?? "";
      categoria.textContent = dados.categoria ?? "";
      titulo.textContent = dados.titulo ?? "";
      descricao.textContent = dados.descricao ?? "";
      impacto.textContent = `"${dados.impacto ?? ""}"`;
      metas.replaceChildren();

      for (const meta of (dados.metas ?? "").split("|").filter(Boolean)) {
        const item = document.createElement("li");
        item.textContent = meta;
        metas.append(item);
      }

      const corpo = modal.querySelector<HTMLElement>(".modal-corpo");
      if (corpo) corpo.scrollTop = 0;

      modal.showModal();
      document.body.style.overflow = "hidden";
      window.setTimeout(() => {
        modal.querySelector<HTMLButtonElement>(".modal-fechar")?.focus();
      }, 100);
    });
  }

  botoesFechar.forEach((botao) => botao.addEventListener("click", fecharModal));

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      fecharModal();
    }
  });

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    imagem.src = "";
    imagem.alt = "";
    categoria.textContent = "";
    titulo.textContent = "";
    descricao.textContent = "";
    metas.replaceChildren();
    impacto.textContent = "";
  });
});
