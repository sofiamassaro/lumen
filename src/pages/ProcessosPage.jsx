import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carregando from '../components/comum/Carregando.jsx';
import MensagemErro from '../components/comum/MensagemErro.jsx';
import ProcessoForm from '../components/processos/ProcessoForm.jsx';
import ProcessoLista from '../components/processos/ProcessoLista.jsx';
import { useProcessos } from '../hooks/useProcessos.js';

function ProcessosPage() {
  const {
    processos,
    carregando,
    erro,
    recarregar,
    adicionarProcesso,
    atualizarProcesso,
    removerProcesso,
  } = useProcessos();
  const location = useLocation();
  const navigate = useNavigate();

  // A página de detalhe pode abrir esta tela já em modo de edição
  const [editandoId, setEditandoId] = useState(() => location.state?.editarId ?? null);
  // Erro de uma ação (salvar ou excluir), separado do erro ao carregar a lista
  const [erroAcao, setErroAcao] = useState(null);

  useEffect(() => {
    // Limpa o estado da navegação para não reabrir a edição ao recarregar
    if (location.state?.editarId) navigate('.', { replace: true, state: null });
  }, [location.state, navigate]);

  const processoEmEdicao = processos.find((p) => p.id === editandoId) ?? null;

  // Devolve true se a API confirmou, para o formulário saber se pode limpar os campos
  async function salvar(dados) {
    setErroAcao(null);
    try {
      if (processoEmEdicao) {
        await atualizarProcesso(processoEmEdicao.id, dados);
        setEditandoId(null);
      } else {
        await adicionarProcesso(dados);
      }
      return true;
    } catch (falha) {
      setErroAcao(falha.message);
      return false;
    }
  }

  function iniciarEdicao(id) {
    setEditandoId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function excluir(processo) {
    const confirmou = window.confirm(
      `Excluir o processo "${processo.assunto}"? Esta ação não pode ser desfeita.`,
    );
    if (!confirmou) return;
    setErroAcao(null);
    try {
      await removerProcesso(processo.id);
      if (processo.id === editandoId) setEditandoId(null);
    } catch (falha) {
      setErroAcao(falha.message);
    }
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setErroAcao(null);
  }

  return (
    <div className="pilha">
      {erroAcao && <MensagemErro mensagem={erroAcao} />}
      <ProcessoForm
        key={processoEmEdicao?.id ?? 'novo'}
        processoEmEdicao={processoEmEdicao}
        onSalvar={salvar}
        onCancelar={cancelarEdicao}
      />
      {carregando ? (
        <Carregando />
      ) : erro ? (
        <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
      ) : (
        <ProcessoLista
          processos={processos}
          idEmEdicao={editandoId}
          onEditar={iniciarEdicao}
          onExcluir={excluir}
        />
      )}
    </div>
  );
}

export default ProcessosPage;