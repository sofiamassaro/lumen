// Único ponto do app que conversa com a API REST do back-end (pasta /api).
// Substitui o antigo processosStorage.js (localStorage) da Sprint 2.

const URL_API = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

// Faz a requisição e transforma qualquer falha em um Error com mensagem legível
async function requisicao(caminho, { metodo = 'GET', corpo } = {}) {
  let resposta;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, {
      method: metodo,
      headers: corpo !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    // fetch só rejeita quando não há resposta: servidor desligado, rede, CORS
    throw new Error(
      'Não foi possível conectar à API. Verifique se o servidor está rodando e tente novamente.',
    );
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    // A API devolve { erro: "mensagem" } nos casos 400, 404, 409 e 500
    throw new Error(dados?.erro ?? `A API respondeu com erro (${resposta.status}).`);
  }
  return dados;
}

export function listarProcessos() {
  return requisicao('/processos');
}

export function criarProcesso(dados) {
  return requisicao('/processos', { metodo: 'POST', corpo: dados });
}

export function atualizarProcesso(id, dados) {
  return requisicao(`/processos/${id}`, { metodo: 'PUT', corpo: dados });
}

export function removerProcesso(id) {
  return requisicao(`/processos/${id}`, { metodo: 'DELETE' });
}
