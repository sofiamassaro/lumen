import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { OPCOES_VEZ, formatarData } from '../../utils/processo.js';

function ProcessoLista({ processos, idEmEdicao, onEditar, onExcluir }) {
  if (processos.length === 0) {
    return (
      <section className="cartao vazio">
        <p>Nenhum processo cadastrado ainda.</p>
        <p className="legenda">Use o formulário acima para cadastrar o primeiro.</p>
      </section>
    );
  }

  return (
    <section className="cartao">
      <header className="cartao-cabecalho">
        <h2>Processos cadastrados</h2>
        <span className="legenda">{processos.length} no total</span>
      </header>

      <div className="tabela-rolagem">
        <table className="tabela">
          <thead>
            <tr>
              <th>Processo</th>
              <th>Cliente</th>
              <th>Vez de</th>
              <th>Situação</th>
              <th>Atualizado</th>
              <th aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {processos.map((processo) => (
              <tr key={processo.id} className={processo.id === idEmEdicao ? 'em-edicao' : ''}>
                <td>
                  <Link to={`/processos/${processo.id}`} className="link-processo">
                    {processo.assunto}
                  </Link>
                  <span className="legenda bloco">{processo.numero}</span>
                </td>
                <td>{processo.cliente}</td>
                <td>{OPCOES_VEZ[processo.vez]}</td>
                <td>
                  <StatusBadge status={processo.status} />
                </td>
                <td className="legenda">{formatarData(processo.atualizadoEm)}</td>
                <td>
                  <div className="celula-acoes">
                    <button
                      type="button"
                      className="botao-icone"
                      onClick={() => onEditar(processo.id)}
                      title="Editar"
                      aria-label={`Editar ${processo.assunto}`}
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="botao-icone perigo"
                      onClick={() => onExcluir(processo)}
                      title="Excluir"
                      aria-label={`Excluir ${processo.assunto}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProcessoLista;
