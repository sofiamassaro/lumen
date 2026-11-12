import { useCallback, useEffect, useState } from 'react';
import * as api from '../services/processosApi.js';

// Hook customizado: estado da lista de processos + operações do CRUD via API.
// Busca a lista ao montar e expõe "carregando" e "erro" para as páginas.
// A lista sempre vem da API; o estado local só reflete o que a API confirmou.
// As operações de escrita lançam erro em caso de falha, para a página exibir a mensagem.
export function useProcessos() {
  const [processos, setProcessos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca a lista; o estado só muda quando a resposta chega (nunca de forma síncrona)
  const buscar = useCallback(
    () =>
      api
        .listarProcessos()
        .then((lista) => {
          setProcessos(lista);
          setErro(null);
        })
        .catch((falha) => setErro(falha.message))
        .finally(() => setCarregando(false)),
    [],
  );

  useEffect(() => {
    buscar();
  }, [buscar]);

  // Usado pelo botão "Tentar novamente" da mensagem de erro
  function recarregar() {
    setCarregando(true);
    setErro(null);
    buscar();
  }

  async function adicionarProcesso(dados) {
    const novo = await api.criarProcesso(dados);
    setProcessos((anteriores) => [novo, ...anteriores]);
  }

  async function atualizarProcesso(id, dados) {
    const atualizado = await api.atualizarProcesso(id, dados);
    setProcessos((anteriores) => [atualizado, ...anteriores.filter((p) => p.id !== id)]);
  }

  async function removerProcesso(id) {
    await api.removerProcesso(id);
    setProcessos((anteriores) => anteriores.filter((p) => p.id !== id));
  }

  return {
    processos,
    carregando,
    erro,
    recarregar,
    adicionarProcesso,
    atualizarProcesso,
    removerProcesso,
  };
}