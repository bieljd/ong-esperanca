import { apenasDigitos } from "./masks.js";

export type ValidatorResult = {
  ok: boolean;
  message?: string;
};

// Valida os dois dígitos verificadores do CPF.
export function isValidCPF(cpf: string): boolean {
  const digitos = apenasDigitos(cpf);

  if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) {
    return false;
  }

  let soma = 0;
  for (let indice = 0; indice < 9; indice += 1) {
    soma += Number(digitos[indice]) * (10 - indice);
  }

  let resto = (soma * 10) % 11;
  const primeiroDigito = resto === 10 ? 0 : resto;

  if (primeiroDigito !== Number(digitos[9])) {
    return false;
  }

  soma = 0;
  for (let indice = 0; indice < 10; indice += 1) {
    soma += Number(digitos[indice]) * (11 - indice);
  }

  resto = (soma * 10) % 11;
  const segundoDigito = resto === 10 ? 0 : resto;

  return segundoDigito === Number(digitos[10]);
}

// Aceita telefones fixos e celulares brasileiros.
export function isValidTelefone(tel: string): boolean {
  const digitos = apenasDigitos(tel);
  return digitos.length === 10 || digitos.length === 11;
}

// Valida o CEP com ou sem máscara.
export function isValidCEP(cep: string): boolean {
  return apenasDigitos(cep).length === 8;
}

// Faz uma validação básica e robusta do formato de e-mail.
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// Confirma se a data informa uma pessoa com pelo menos 18 anos.
export function isAdulto(dataISO: string): boolean {
  const nascimento = new Date(`${dataISO}T00:00:00`);

  if (!dataISO || Number.isNaN(nascimento.getTime())) {
    return false;
  }

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aniversarioAindaNaoChegou =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());

  if (aniversarioAindaNaoChegou) {
    idade -= 1;
  }

  return idade >= 18;
}

// Valida campos do cadastro e retorna mensagens prontas para a interface.
export function validarCampo(nome: string, valor: string): ValidatorResult {
  switch (nome) {
    case "nome":
      return valor.trim().length >= 3
        ? { ok: true }
        : { ok: false, message: "Informe seu nome completo (mínimo 3 caracteres)." };
    case "cpf":
      return isValidCPF(valor)
        ? { ok: true }
        : { ok: false, message: "CPF inválido. Verifique os números." };
    case "nascimento":
      return isAdulto(valor)
        ? { ok: true }
        : { ok: false, message: "Você precisa ter 18 anos ou mais." };
    case "email":
      return isValidEmail(valor)
        ? { ok: true }
        : { ok: false, message: "E-mail inválido." };
    case "telefone":
      return isValidTelefone(valor)
        ? { ok: true }
        : { ok: false, message: "Telefone inválido." };
    case "cep":
      return isValidCEP(valor)
        ? { ok: true }
        : { ok: false, message: "CEP inválido." };
    case "area":
      return valor.trim().length > 0
        ? { ok: true }
        : { ok: false, message: "Selecione uma área de interesse." };
    case "termos":
      return valor === "true"
        ? { ok: true }
        : { ok: false, message: "É necessário aceitar os termos." };
    default:
      return { ok: true };
  }
}