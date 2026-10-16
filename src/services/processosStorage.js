// Único ponto do app que conversa com o localStorage.
// Na Sprint 3, este arquivo é substituído por chamadas à API REST,
// sem precisar mexer nos componentes visuais.

const CHAVE = 'lumen:processos';

export function carregarProcessos() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo !== null ? JSON.parse(salvo) : [];
  } catch {
    // Conteúdo corrompido ou inacessível: recomeça com lista vazia
    return [];
  }
}

export function salvarProcessos(processos) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(processos));
  } catch (erro) {
    // Ex.: cota de armazenamento excedida
    console.error('Não foi possível salvar no localStorage:', erro);
  }
}

export function gerarId() {
  // crypto.randomUUID só existe em contexto seguro (https ou localhost)
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
