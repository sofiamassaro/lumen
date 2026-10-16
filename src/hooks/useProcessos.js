import { useEffect, useState } from 'react';
import { carregarProcessos, gerarId, salvarProcessos } from '../services/processosStorage.js';

// Hook customizado: estado da lista de processos + operações do CRUD.
// Lê o localStorage uma vez (inicialização preguiçosa) e grava a cada alteração.
export function useProcessos() {
  const [processos, setProcessos] = useState(() => carregarProcessos());

  useEffect(() => {
    salvarProcessos(processos);
  }, [processos]);

  function adicionarProcesso(dados) {
    const agora = new Date().toISOString();
    const novo = { ...dados, id: gerarId(), criadoEm: agora, atualizadoEm: agora };
    setProcessos((anteriores) => [novo, ...anteriores]);
  }

  function atualizarProcesso(id, dados) {
    setProcessos((anteriores) =>
      anteriores.map((p) =>
        p.id === id ? { ...p, ...dados, atualizadoEm: new Date().toISOString() } : p,
      ),
    );
  }

  function removerProcesso(id) {
    setProcessos((anteriores) => anteriores.filter((p) => p.id !== id));
  }

  return { processos, adicionarProcesso, atualizarProcesso, removerProcesso };
}
