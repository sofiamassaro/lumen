// O Express só reconhece um middleware de erro se ele tiver 4 parâmetros,
// por isso "_next" fica na assinatura mesmo sem ser usado.
export function errorHandler(err, req, res, _next) {
    // Corpo da requisição não é um JSON válido (erro lançado pelo express.json)
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ erro: "Corpo da requisição não é um JSON válido" });
    }

    console.error("[ERRO]", err);
    const status = err.status || 500;
    res.status(status).json({
        erro: status === 500 ? "Erro interno do servidor" : err.message
    });
}
