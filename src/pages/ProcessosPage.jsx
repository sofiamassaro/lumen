import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProcessoForm from '../components/processos/ProcessoForm.jsx';
import ProcessoLista from '../components/processos/ProcessoLista.jsx';
import { useProcessos } from '../hooks/useProcessos.js';

function ProcessosPage() {
  const { processos, adicionarProcesso, atualizarProcesso, removerProcesso } = useProcessos();
  const location = useLocation();
  const navigate = useNavigate();

  // A página de detalhe pode abrir esta tela já em modo de edição
  const [editandoId, setEditandoId] = useState(() => location.state?.editarId ?? null);

  useEffect(() => {
    // Limpa o estado da navegação para não reabrir a edição ao recarregar
    if (location.state?.editarId) navigate('.', { replace: true, state: null });
  }, [location.state, navigate]);

  const processoEmEdicao = processos.find((p) => p.id === editandoId) ?? null;

  function salvar(dados) {
    if (processoEmEdicao) {
      atualizarProcesso(processoEmEdicao.id, dados);
      setEditandoId(null);
    } else {
      adicionarProcesso(dados);
    }
  }

  function iniciarEdicao(id) {
    setEditandoId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function excluir(processo) {
    const confirmou = window.confirm(
      `Excluir o processo "${processo.assunto}"? Esta ação não pode ser desfeita.`,
    );
    if (!confirmou) return;
    removerProcesso(processo.id);
    if (processo.id === editandoId) setEditandoId(null);
  }

  return (
    <div className="pilha">
      <ProcessoForm
        key={processoEmEdicao?.id ?? 'novo'}
        processoEmEdicao={processoEmEdicao}
        onSalvar={salvar}
        onCancelar={() => setEditandoId(null)}
      />
      <ProcessoLista
        processos={processos}
        idEmEdicao={editandoId}
        onEditar={iniciarEdicao}
        onExcluir={excluir}
      />
    </div>
  );
}

export default ProcessosPage;
