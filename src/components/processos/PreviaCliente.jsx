import { OPCOES_VEZ } from '../../utils/processo.js';

// Mostra o processo como o cliente vai ler: linguagem clara,
// próximo passo e de quem é a vez. Usado ao vivo no formulário e no detalhe.
function PreviaCliente({ processo }) {
  const { assunto, numero, traducao, proximoPasso, vez } = processo;

  return (
    <article className="previa">
      <p className="sobretitulo">Como o cliente vai ver</p>
      <h3 className="previa-assunto">{assunto || 'Assunto do processo'}</h3>
      <p className="previa-numero">{numero || 'Nº do processo'}</p>

      <p className="previa-traducao">
        {traducao || 'A tradução em linguagem clara aparece aqui enquanto você digita.'}
      </p>

      <dl className="previa-dados">
        <div>
          <dt>Próximo passo</dt>
          <dd>{proximoPasso || 'Não informado'}</dd>
        </div>
        <div>
          <dt>De quem é a vez</dt>
          <dd>{OPCOES_VEZ[vez]}</dd>
        </div>
      </dl>
    </article>
  );
}

export default PreviaCliente;
