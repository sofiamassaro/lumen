import { NavLink } from 'react-router-dom';
import { FileText, House, MessageCircle, Users } from 'lucide-react';

// Itens ativos nesta sprint. "Clientes" e "Dúvidas" existem no protótipo
// do Figma, mas ficam desabilitados até as próximas entregas.
const ITENS = [
  { rota: '/', rotulo: 'Início', Icone: House, fim: true },
  { rota: '/processos', rotulo: 'Processos', Icone: FileText },
];

const ITENS_FUTUROS = [
  { rotulo: 'Clientes', Icone: Users },
  { rotulo: 'Dúvidas', Icone: MessageCircle },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="marca" aria-label="LUMEN">
        <span className="marca-l">L</span>
        <span className="marca-resto">umen</span>
      </div>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        {ITENS.map(({ rota, rotulo, Icone, fim }) => (
          <NavLink
            key={rota}
            to={rota}
            end={fim}
            className={({ isActive }) => `nav-item${isActive ? ' ativo' : ''}`}
          >
            <Icone size={18} aria-hidden="true" />
            {rotulo}
          </NavLink>
        ))}

        {ITENS_FUTUROS.map(({ rotulo, Icone }) => (
          <span key={rotulo} className="nav-item desabilitado" title="Disponível em breve">
            <Icone size={18} aria-hidden="true" />
            {rotulo}
            <span className="nav-etiqueta">Em breve</span>
          </span>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
