import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import PreviaCliente from '../components/processos/PreviaCliente.jsx';
import StatusBadge from '../components/processos/StatusBadge.jsx';
import { useProcessos } from '../hooks/useProcessos.js';
import { formatarData } from '../utils/processo.js';

function ProcessoDetalhePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { processos } = useProcessos();
  const processo = processos.find((p) => p.id === id);

  if (!processo) {
    return (
      <section className="cartao vazio">
        <p>Processo não encontrado.</p>
        <Link to="/processos" className="botao botao-secundario">
          Voltar para Processos
        </Link>
      </section>
    );
  }

  return (
    <div className="pilha">
      <div className="detalhe-topo">
        <Link to="/processos" className="link-voltar">
          <ArrowLeft size={16} aria-hidden="true" /> Processos
        </Link>
        <button
          type="button"
          className="botao botao-primario"
          onClick={() => navigate('/processos', { state: { editarId: processo.id } })}
        >
          <Pencil size={16} aria-hidden="true" /> Editar
        </button>
      </div>

      <div className="detalhe-grade">
        <section className="cartao">
          <header className="cartao-cabecalho">
            <h2>Visão do advogado</h2>
            <StatusBadge status={processo.status} />
          </header>
          <dl className="lista-dados">
            <div>
              <dt>Nº do processo</dt>
              <dd>{processo.numero}</dd>
            </div>
            <div>
              <dt>Cliente</dt>
              <dd>{processo.cliente}</dd>
            </div>
            <div>
              <dt>Movimentação técnica</dt>
              <dd>{processo.movimentacao || 'Não informada'}</dd>
            </div>
            <div>
              <dt>Cadastrado em</dt>
              <dd>{formatarData(processo.criadoEm)}</dd>
            </div>
            <div>
              <dt>Última atualização</dt>
              <dd>{formatarData(processo.atualizadoEm)}</dd>
            </div>
          </dl>
        </section>

        <div>
          <PreviaCliente processo={processo} />
          {processo.status !== 'publicado' && (
            <p className="aviso">Rascunho: o cliente ainda não vê esta atualização.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessoDetalhePage;
