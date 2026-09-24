import { apenasDigitos, maskCEP, maskCPF, maskTelefone } from "./masks.js";
import { validarCampo } from "./validators.js";

type CampoFormulario = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface DadosViaCEP {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

// Busca elementos sem perder a tipagem do DOM.
function el<T extends HTMLElement>(seletor: string): T | null {
  return document.querySelector<T>(seletor);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = el<HTMLFormElement>("#form-cadastro");

  if (!form) {
    return;
  }

  const cpf = el<HTMLInputElement>("#cpf");
  const telefone = el<HTMLInputElement>("#telefone");
  const cep = el<HTMLInputElement>("#cep");
  const motivacao = el<HTMLTextAreaElement>("#motivacao");
  const contadorMotivacao = el<HTMLElement>("#contador-motivacao");
  const alertaGeral = el<HTMLElement>("#alerta-geral");
  const camposTocados = new Set<string>();

  // Atualiza a máscara enquanto o usuário digita.
  cpf?.addEventListener("input", () => {
    cpf.value = maskCPF(cpf.value);
  });

  telefone?.addEventListener("input", () => {
    telefone.value = maskTelefone(telefone.value);
  });

  cep?.addEventListener("input", () => {
    cep.value = maskCEP(cep.value);
    if (apenasDigitos(cep.value).length === 8) {
      void preencherEndereco(cep.value);
    }
  });

  // Valida novamente apenas os campos já visitados.
  const camposObrigatorios = (): CampoFormulario[] =>
    Array.from(form.querySelectorAll<CampoFormulario>("[required]"));

  function valorDoCampo(campo: CampoFormulario): string {
    if (campo instanceof HTMLInputElement && campo.type === "checkbox") {
      return String(campo.checked);
    }

    return campo.value;
  }

  function validarEEntrada(campo: CampoFormulario): boolean {
    const resultado = validarCampo(campo.name, valorDoCampo(campo));
    const mensagem = el<HTMLElement>(`#error-${campo.name}`);

    campo.classList.toggle("is-valid", resultado.ok);
    campo.classList.toggle("is-invalid", !resultado.ok);
    campo.setAttribute("aria-invalid", String(!resultado.ok));

    if (mensagem) {
      mensagem.textContent = resultado.message ?? "";
    }

    return resultado.ok;
  }

  for (const campo of camposObrigatorios()) {
    campo.addEventListener("blur", () => {
      camposTocados.add(campo.name);
      validarEEntrada(campo);
    });

    campo.addEventListener("input", () => {
      if (camposTocados.has(campo.name)) {
        validarEEntrada(campo);
      }
    });

    campo.addEventListener("change", () => {
      if (camposTocados.has(campo.name)) {
        validarEEntrada(campo);
      }
    });
  }

  async function preencherEndereco(valor: string): Promise<void> {
    const numeroCEP = apenasDigitos(valor);

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${numeroCEP}/json/`);
      const dados = await resposta.json() as DadosViaCEP;

      if (dados.erro) {
        cep?.classList.add("is-invalid");
        cep?.classList.remove("is-valid");
        const mensagem = el<HTMLElement>("#error-cep");
        if (mensagem) mensagem.textContent = "CEP não encontrado.";
        return;
      }

      const endereco = el<HTMLInputElement>("#endereco");
      const cidade = el<HTMLInputElement>("#cidade");
      const uf = el<HTMLInputElement>("#uf");

      if (endereco) endereco.value = [dados.logradouro, dados.bairro].filter(Boolean).join(", ");
      if (cidade) cidade.value = dados.localidade ?? "";
      if (uf) uf.value = dados.uf ?? "";
      cep?.classList.add("is-valid");
      cep?.classList.remove("is-invalid");
    } catch (erro) {
      console.error("Não foi possível consultar o CEP.", erro);
    }
  }

  motivacao?.addEventListener("input", () => {
    if (contadorMotivacao) {
      contadorMotivacao.textContent = `${motivacao.value.length} / 500`;
    }
  });

  function mostrarAlerta(tipo: "sucesso" | "erro", mensagem: string): void {
    if (!alertaGeral) return;

    alertaGeral.hidden = false;
    alertaGeral.className = `alerta-geral ${tipo}`;
    alertaGeral.textContent = mensagem;
  }

  function limparEstado(): void {
    camposTocados.clear();
    for (const campo of camposObrigatorios()) {
      campo.classList.remove("is-valid", "is-invalid");
      campo.removeAttribute("aria-invalid");
    }

    for (const mensagem of form!.querySelectorAll<HTMLElement>(".error")) {
      mensagem.textContent = "";
    }

    if (contadorMotivacao) {
      contadorMotivacao.textContent = "0 / 500";
    }
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const camposInvalidos = camposObrigatorios().filter((campo) => {
      camposTocados.add(campo.name);
      return !validarEEntrada(campo);
    });
    const disponibilidade = form.querySelectorAll<HTMLInputElement>("input[name='disponibilidade']:checked");

    if (camposInvalidos.length > 0) {
      mostrarAlerta("erro", "Confira os campos destacados antes de enviar o cadastro.");
      camposInvalidos[0].focus();
      camposInvalidos[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const avisoDisponibilidade = disponibilidade.length === 0
      ? " Você ainda pode informar sua disponibilidade depois."
      : "";
    mostrarAlerta("sucesso", `Cadastro enviado com sucesso!${avisoDisponibilidade}`);
    form.reset();
    limparEstado();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      limparEstado();
      if (alertaGeral) alertaGeral.hidden = true;
    }, 0);
  });
});