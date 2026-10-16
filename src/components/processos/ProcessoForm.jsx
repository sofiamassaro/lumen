import { useState } from 'react';
import { OPCOES_STATUS, OPCOES_VEZ, PROCESSO_VAZIO } from '../../utils/processo.js';

// Formulário controlado: cada input está ligado ao estado "dados".
// Serve para cadastrar (processoEmEdicao = null) e para editar.
// O pai troca a "key" do componente ao alternar o modo, o que reinicia o estado.
function ProcessoForm({ processoEmEdicao, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(() =>
    processoEmEdicao ? { ...PROCESSO_VAZIO, ...processoEmEdicao } : PROCESSO_VAZIO,
  );
  const editando = processoEmEdicao !== null;

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setDados((anteriores) => ({ ...anteriores, [name]: value }));
  }

  function enviar(evento) {
    evento.preventDefault();

    const limpo = Object.fromEntries(
      Object.entries(dados).map(([campo, valor]) => [campo, valor.trim()]),
    );
    if (!limpo.numero || !limpo.cliente || !limpo.assunto || !limpo.traducao) return;

    onSalvar({
      numero: limpo.numero,
      cliente: limpo.cliente,
      assunto: limpo.assunto,
      movimentacao: limpo.movimentacao,
      traducao: limpo.traducao,
      proximoPasso: limpo.proximoPasso,
      vez: limpo.vez,
      status: limpo.status,
    });
    if (!editando) setDados(PROCESSO_VAZIO);
  }

  return (
    <section className="cartao form-processo">
      <header className="cartao-cabecalho">
        <h2>{editando ? 'Editar processo' : 'Novo processo'}</h2>
        {editando && <span className="etiqueta-edicao">Modo de edição</span>}
      </header>

      <div className="form-grade">
        <form onSubmit={enviar} className="form-campos">
          <div className="linha-2">
            <label>
              Nº do processo *
              <input
                name="numero"
                value={dados.numero}
                onChange={alterarCampo}
                placeholder="0001234-56.2026.8.24.0023"
                required
              />
            </label>
            <label>
              Cliente *
              <input
                name="cliente"
                value={dados.cliente}
                onChange={alterarCampo}
                placeholder="Nome do cliente"
                required
              />
            </label>
          </div>

          <label>
            Assunto *
            <input
              name="assunto"
              value={dados.assunto}
              onChange={alterarCampo}
              placeholder="Ex.: Revisão de contrato bancário"
              required
            />
          </label>

          <label>
            Movimentação técnica
            <textarea
              name="movimentacao"
              value={dados.movimentacao}
              onChange={alterarCampo}
              rows={3}
              placeholder="Texto como consta no sistema do tribunal"
            />
          </label>

          <label>
            Tradução em linguagem clara *
            <textarea
              name="traducao"
              value={dados.traducao}
              onChange={alterarCampo}
              rows={4}
              placeholder="Explique ao cliente, sem juridiquês, o que aconteceu"
              required
            />
          </label>

          <label>
            Próximo passo
            <input
              name="proximoPasso"
              value={dados.proximoPasso}
              onChange={alterarCampo}
              placeholder="Ex.: Aguardar a decisão do juiz"
            />
          </label>

          <div className="linha-2">
            <label>
              De quem é a vez
              <select name="vez" value={dados.vez} onChange={alterarCampo}>
                {Object.entries(OPCOES_VEZ).map(([valor, rotulo]) => (
                  <option key={valor} value={valor}>
                    {rotulo}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Situação
              <select name="status" value={dados.status} onChange={alterarCampo}>
                {Object.entries(OPCOES_STATUS).map(([valor, rotulo]) => (
                  <option key={valor} value={valor}>
                    {rotulo}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="aviso">
            Só processos com situação <strong>Publicado</strong> ficarão visíveis ao cliente. Revise
            a tradução antes de publicar.
          </p>

          <div className="form-acoes">
            <button type="submit" className="botao botao-primario">
              {editando ? 'Salvar alterações' : 'Cadastrar processo'}
            </button>
            {editando && (
              <button type="button" className="botao botao-secundario" onClick={onCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProcessoForm;
