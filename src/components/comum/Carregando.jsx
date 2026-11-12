// Aviso exibido enquanto a lista de processos é buscada na API
function Carregando() {
  return (
    <section className="cartao vazio" aria-busy="true">
      <p className="legenda">Carregando processos...</p>
    </section>
  );
}

export default Carregando;