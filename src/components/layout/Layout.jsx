import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import BarraSuperior from './BarraSuperior.jsx';

function tituloDaRota(caminho) {
  if (caminho === '/') return 'Início';
  if (caminho === '/processos') return 'Processos';
  if (caminho.startsWith('/processos/')) return 'Detalhe do processo';
  return 'LUMEN';
}

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="painel">
      <Sidebar />
      <div className="painel-principal">
        <BarraSuperior titulo={tituloDaRota(pathname)} />
        <main className="painel-conteudo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
