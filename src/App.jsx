import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import InicioPage from './pages/InicioPage.jsx';
import ProcessosPage from './pages/ProcessosPage.jsx';
import ProcessoDetalhePage from './pages/ProcessoDetalhePage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<InicioPage />} />
        <Route path="/processos" element={<ProcessosPage />} />
        <Route path="/processos/:id" element={<ProcessoDetalhePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
