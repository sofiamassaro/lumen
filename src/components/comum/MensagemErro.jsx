import { RotateCw, TriangleAlert } from 'lucide-react';

// Mensagem de erro exibida quando a API falha.
// O botão "Tentar novamente" só aparece se a página passar onTentarNovamente.
function MensagemErro({ mensagem, onTentarNovamente }) {
  return (
    <div className="mensagem-erro" role="alert">
      <TriangleAlert size={18} aria-hidden="true" />
      <p>{mensagem}</p>
      {onTentarNovamente && (
        <button type="button" className="botao botao-secundario" onClick={onTentarNovamente}>
          <RotateCw size={16} aria-hidden="true" /> Tentar novamente
        </button>
      )}
    </div>
  );
}

export default MensagemErro;