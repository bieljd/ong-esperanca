import { recuperar, salvar } from "./storage.js";

const CHAVE_TEMA = "mare-azul-tema";
type Tema = "claro" | "escuro";

function temaAtual(): Tema {
  const salvo = recuperar<Tema | null>(CHAVE_TEMA, null);
  if (salvo === "claro" || salvo === "escuro") return salvo;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

function atualizarBotao(botao: HTMLButtonElement, tema: Tema): void {
  const escuro = tema === "escuro";
  botao.textContent = escuro ? "☀" : "☾";
  botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
  botao.setAttribute("aria-pressed", String(escuro));
  botao.title = escuro ? "Ativar tema claro" : "Ativar tema escuro";
}

function iniciarTema(): void {
  let botao = document.querySelector<HTMLButtonElement>(".tema-toggle");
  const nav = document.querySelector<HTMLElement>(".nav-principal");
  if (!nav) return;

  if (!botao) {
    botao = document.createElement("button");
    botao.type = "button";
    botao.className = "tema-toggle";
    nav.append(botao);
  }

  const temaInicial = temaAtual();
  document.documentElement.classList.toggle("tema-escuro", temaInicial === "escuro");
  document.documentElement.classList.toggle("tema-claro", temaInicial === "claro");
  atualizarBotao(botao, temaInicial);

  if (botao.dataset.temaInicializado === "true") return;
  botao.dataset.temaInicializado = "true";
  botao.addEventListener("click", () => {
    const tema: Tema = document.documentElement.classList.contains("tema-escuro") ? "claro" : "escuro";
    document.documentElement.classList.toggle("tema-escuro", tema === "escuro");
    document.documentElement.classList.toggle("tema-claro", tema === "claro");
    salvar(CHAVE_TEMA, tema);
    atualizarBotao(botao!, tema);
  });
}

document.addEventListener("DOMContentLoaded", iniciarTema);