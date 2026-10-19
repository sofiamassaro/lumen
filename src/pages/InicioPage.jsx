import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import StatusBadge from '../components/processos/StatusBadge.jsx';
import { useProcessos } from '../hooks/useProcessos.js';
import { formatarData } from '../utils/processo.js';

function InicioPage() {
  const { processos } = useProcessos();

  const indicadores = [
    { rotulo: 'Processos', valor: processos.length },
    { rotulo: 'Publicados', valor: processos.filter((p) => p.status === 'publicado').length },
    {
      rotulo: 'Rascunhos para revisar',
      valor: processos.filter((p) => p.status === 'rascunho').length,
    },
    { rotulo: 'Aguardando o cliente', valor: processos.filter((p) => p.vez === 'cliente').length },
  ];

  const recentes = [...processos]
    .sort((a, b) => b.atualizadoEm.localeCompare(a.atualizadoEm))
    .slice(0, 5);

  return (
    <div className="pilha">
      <section className="boas-vindas">
        <p className="sobretitulo">Painel do escritório</p>
        <h2 className="display">Seu cliente entende. Você recupera seu tempo.</h2>
        <Link to="/processos" className="botao botao-primario">
          <Plus size={16} aria-hidden="true" /> Cadastrar processo
        </Link>
      </section>

      <section className="indicadores">
        {indicadores.map(({ rotulo, valor }) => (
          <div key={rotulo} className="cartao indicador">
            <span className="indicador-valor">{valor}</span>
            <span className="legenda">{rotulo}</span>
          </div>
        ))}
      </section>

      <section className="cartao">
        <header className="cartao-cabecalho">
          <h2>Atualizados recentemente</h2>
          <Link to="/processos" className="link-processo">
            Ver todos
          </Link>
        </header>
        {recentes.length === 0 ? (
          <p className="legenda">Nenhum processo cadastrado ainda.</p>
        ) : (
          <ul className="lista-recentes">
            {recentes.map((p) => (
              <li key={p.id}>
                <div>
                  <Link to={`/processos/${p.id}`} className="link-processo">
                    {p.assunto}
                  </Link>
                  <span className="legenda bloco">
                    {p.cliente} · {formatarData(p.atualizadoEm)}
                  </span>
                </div>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default InicioPage;
