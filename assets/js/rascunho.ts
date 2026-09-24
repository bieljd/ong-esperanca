import { recuperar, remover, salvar } from "./storage.js";

const CHAVE_RASCUNHO = "mare-azul-rascunho";

export interface RascunhoFormulario {
  nome: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  area: string;
  disponibilidade: string[];
  motivacao: string;
  termos: boolean;
}

function lerFormulario(form: HTMLFormElement): RascunhoFormulario {
  const valor = (nome: string): string => {
    const campo = form.elements.namedItem(nome);
    return campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement || campo instanceof HTMLTextAreaElement
      ? campo.value
      : "";
  };

  return {
    nome: valor("nome"),
    cpf: valor("cpf"),
    nascimento: valor("nascimento"),
    email: valor("email"),
    telefone: valor("telefone"),
    cep: valor("cep"),
    endereco: valor("endereco"),
    cidade: valor("cidade"),
    uf: valor("uf"),
    area: valor("area"),
    disponibilidade: Array.from(form.querySelectorAll<HTMLInputElement>("input[name='disponibilidade']:checked")).map((campo) => campo.value),
    motivacao: valor("motivacao"),
    termos: (form.elements.namedItem("termos") as HTMLInputElement | null)?.checked ?? false,
  };
}

function restaurarFormulario(form: HTMLFormElement, rascunho: RascunhoFormulario): void {
  const campo = (nome: string): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null => {
    const elemento = form.elements.namedItem(nome);
    return elemento instanceof HTMLInputElement || elemento instanceof HTMLSelectElement || elemento instanceof HTMLTextAreaElement
      ? elemento
      : null;
  };

  ["nome", "cpf", "nascimento", "email", "telefone", "cep", "endereco", "cidade", "uf", "area", "motivacao"].forEach((nome) => {
    const elemento = campo(nome);
    const valor = rascunho[nome as keyof RascunhoFormulario];
    if (elemento && typeof valor === "string") elemento.value = valor;
  });

  form.querySelectorAll<HTMLInputElement>("input[name='disponibilidade']").forEach((elemento) => {
    elemento.checked = rascunho.disponibilidade.includes(elemento.value);
  });

  const termos = campo("termos");
  if (termos instanceof HTMLInputElement) termos.checked = rascunho.termos;
  document.querySelector<HTMLElement>("#contador-motivacao")?.replaceChildren(document.createTextNode(`${rascunho.motivacao.length} / 500`));
}

function criarBanner(form: HTMLFormElement, continuar: () => void, descartar: () => void): void {
  const banner = document.createElement("div");
  banner.className = "rascunho-banner";
  banner.setAttribute("role", "status");
  banner.innerHTML = `
    <span>Encontramos um rascunho.</span>
    <button type="button" class="btn btn-primary rascunho-continuar">Continuar</button>
    <button type="button" class="btn btn-ghost rascunho-descartar">Descartar</button>
  `;
  form.prepend(banner);
  banner.querySelector(".rascunho-continuar")?.addEventListener("click", () => {
    continuar();
    banner.remove();
  });
  banner.querySelector(".rascunho-descartar")?.addEventListener("click", () => {
    descartar();
    banner.remove();
  });
}

function ehRascunhoFormulario(valor: unknown): valor is RascunhoFormulario {
  if (!valor || typeof valor !== "object") return false;
  const rascunho = valor as Partial<RascunhoFormulario>;
  return typeof rascunho.nome === "string"
    && typeof rascunho.cpf === "string"
    && typeof rascunho.nascimento === "string"
    && typeof rascunho.email === "string"
    && typeof rascunho.telefone === "string"
    && typeof rascunho.cep === "string"
    && typeof rascunho.endereco === "string"
    && typeof rascunho.cidade === "string"
    && typeof rascunho.uf === "string"
    && typeof rascunho.area === "string"
    && Array.isArray(rascunho.disponibilidade)
    && rascunho.disponibilidade.every((item) => typeof item === "string")
    && typeof rascunho.motivacao === "string"
    && typeof rascunho.termos === "boolean";
}

function iniciarRascunho(): void {
  const form = document.querySelector<HTMLFormElement>("#form-cadastro");
  if (!form || form.dataset.rascunhoInicializado === "true") return;
  form.dataset.rascunhoInicializado = "true";

  const rascunho = recuperar<unknown>(CHAVE_RASCUNHO, null);
  if (ehRascunhoFormulario(rascunho)) {
    criarBanner(form, () => restaurarFormulario(form, rascunho), () => remover(CHAVE_RASCUNHO));
  } else if (rascunho !== null) {
    remover(CHAVE_RASCUNHO);
  }

  let temporizador: number | undefined;
  const salvarComDebounce = (): void => {
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(() => salvar(CHAVE_RASCUNHO, lerFormulario(form)), 500);
  };

  form.addEventListener("input", salvarComDebounce);
  form.addEventListener("change", salvarComDebounce);
  form.addEventListener("submit", () => {
    window.setTimeout(() => {
      if (form.querySelector("#alerta-geral.sucesso")) remover(CHAVE_RASCUNHO);
    }, 0);
  });
  form.addEventListener("reset", () => {
    window.clearTimeout(temporizador);
    remover(CHAVE_RASCUNHO);
  });
}

document.addEventListener("DOMContentLoaded", iniciarRascunho);