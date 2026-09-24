const linksInterceptados = new WeakSet<HTMLAnchorElement>();

function caminhoCanonico(url: URL): string {
  const caminho = url.pathname.replace(/\.html$/, "");
  return caminho === "/index" || caminho === "" ? "/" : caminho;
}

function atualizarLinkAtivo(): void {
  const caminhoAtual = caminhoCanonico(new URL(window.location.href));

  document.querySelectorAll<HTMLAnchorElement>(".nav-principal a[href]").forEach((link) => {
    const url = new URL(link.href, window.location.href);
    const ativo = caminhoCanonico(url) === caminhoAtual;

    if (ativo) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

async function reexecutarScripts(): Promise<void> {
  const imports: Promise<unknown>[] = [];

  if (document.querySelector(".projects-grid")) {
    imports.push(import("./projetos.js"), import("./modal.js"));
  }

  if (document.querySelector("#form-cadastro")) {
    imports.push(import("./form.js"), import("./rascunho.js"));
  }

  if (document.querySelector("#grafico-impacto")) {
    imports.push(import("./grafico.js"));
  }

  await Promise.all(imports);
  document.dispatchEvent(new Event("DOMContentLoaded"));
}

function interceptarLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href$=".html"]').forEach((link) => {
    if (linksInterceptados.has(link)) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    link.addEventListener("click", (evento) => {
      if (evento.defaultPrevented || evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) {
        return;
      }

      evento.preventDefault();
      void navegar(url.href);
    });
    linksInterceptados.add(link);
  });
}

export async function navegar(url: string): Promise<void> {
  const destino = new URL(url, window.location.href);
  const mainAtual = document.querySelector<HTMLElement>("main");

  if (!mainAtual) {
    window.location.href = destino.href;
    return;
  }

  mainAtual.classList.add("carregando");

  try {
    const resposta = await fetch(destino.href);
    if (!resposta.ok) {
      throw new Error(`Falha ao carregar ${destino.href}: ${resposta.status}`);
    }

    const html = await resposta.text();
    const documento = new DOMParser().parseFromString(html, "text/html");
    const novoMain = documento.querySelector<HTMLElement>("main");

    if (!novoMain) {
      throw new Error(`A página ${destino.href} não contém um elemento <main>.`);
    }

    mainAtual.style.opacity = "0";
    await new Promise<void>((resolver) => window.setTimeout(resolver, 250));
    mainAtual.replaceWith(novoMain);
    novoMain.classList.add("entrando");

    const titulo = documento.querySelector("title")?.textContent?.trim();
    if (titulo) document.title = titulo;

    const urlCanonica = caminhoCanonico(destino);
    history.pushState({ url: urlCanonica }, "", urlCanonica);
    atualizarLinkAtivo();
    interceptarLinks();
    await reexecutarScripts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    console.error("Não foi possível navegar sem recarregar a página.", erro);
    window.location.href = destino.href;
  }
}

interceptarLinks();
atualizarLinkAtivo();

window.addEventListener("popstate", () => {
  void navegar(window.location.pathname);
});