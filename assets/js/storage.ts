export function salvar<T>(chave: string, valor: T): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn(`Não foi possível salvar "${chave}" no localStorage.`, erro);
  }
}

export function recuperar<T>(chave: string, padrao: T): T {
  try {
    const valor = localStorage.getItem(chave);
    if (!valor) return padrao;
    return JSON.parse(valor) as T;
  } catch (erro) {
    console.warn(`Não foi possível recuperar "${chave}" do localStorage.`, erro);
    return padrao;
  }
}

export function remover(chave: string): void {
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
    console.warn(`Não foi possível remover "${chave}" do localStorage.`, erro);
  }
}

export function existe(chave: string): boolean {
  try {
    return localStorage.getItem(chave) !== null;
  } catch (erro) {
    console.warn(`Não foi possível verificar "${chave}" no localStorage.`, erro);
    return false;
  }
}