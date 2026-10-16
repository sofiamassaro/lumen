import { Settings } from 'lucide-react';

// Advogado fictício da demonstração (sem autenticação nesta sprint)
const ADVOGADO = { nome: 'Helena Rocha', iniciais: 'HR' };

function BarraSuperior({ titulo }) {
  return (
    <header className="barra-superior">
      <h1 className="barra-titulo">{titulo}</h1>
      <div className="barra-acoes">
        <button type="button" className="botao-icone" title="Configurações (em breve)" disabled>
          <Settings size={18} aria-hidden="true" />
        </button>
        <span className="avatar" title={ADVOGADO.nome}>
          {ADVOGADO.iniciais}
        </span>
      </div>
    </header>
  );
}

export default BarraSuperior;
