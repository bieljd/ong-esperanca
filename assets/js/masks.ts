// Mantém somente os caracteres numéricos.
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

// Aplica a máscara de CPF progressivamente.
export function maskCPF(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 11);
  let resultado = digitos;

  if (digitos.length > 3) {
    resultado = `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  }
  if (digitos.length > 6) {
    resultado = `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
  }
  if (digitos.length > 9) {
    resultado = `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
  }

  return resultado;
}

// Aplica a máscara de telefone fixo ou celular.
export function maskTelefone(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 11);

  if (digitos.length <= 2) {
    return digitos.length === 2 ? `(${digitos})` : `(${digitos}`;
  }

  const codigoArea = digitos.slice(0, 2);
  const numero = digitos.slice(2);
  const tamanhoInicial = digitos.length === 11 ? 5 : 4;
  const parteInicial = numero.slice(0, tamanhoInicial);
  const parteFinal = numero.slice(tamanhoInicial);

  if (parteFinal.length === 0) {
    return `(${codigoArea}) ${parteInicial}`;
  }

  return `(${codigoArea}) ${parteInicial}-${parteFinal}`;
}

// Aplica a máscara de CEP progressivamente.
export function maskCEP(valor: string): string {
  const digitos = apenasDigitos(valor).slice(0, 8);

  if (digitos.length <= 5) {
    return digitos;
  }

  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}