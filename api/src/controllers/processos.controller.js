import * as repo from "../repositories/processos.repository.js";

const CAMPOS_OBRIGATORIOS = ["numero", "cliente", "assunto", "traducao"];

const CAMPOS_TEXTO = [
    "numero", "cliente", "assunto", "movimentacao", "traducao", "proximoPasso", "vez", "status"
];

const LIMITES = { numero: 30, cliente: 120, assunto: 200, proximoPasso: 200 };

const VEZ_VALIDAS = ["advogado", "cliente", "judiciario", "outraParte"];
const STATUS_VALIDOS = ["rascunho", "publicado"];

// Formato de UUID; ids fora dele seriam rejeitados pelo PostgreSQL
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Valida o corpo e devolve { erro } ou { dados } já limpos (trim e valores padrão)
function validar(corpo) {
    if (!corpo || typeof corpo !== "object" || Array.isArray(corpo)) {
        return { erro: "Envie os dados do processo em JSON" };
    }

    const naoTexto = CAMPOS_TEXTO.filter(
        c => corpo[c] !== undefined && corpo[c] !== null && typeof corpo[c] !== "string"
    );
    if (naoTexto.length > 0) {
        return { erro: `Os campos devem ser texto: ${naoTexto.join(", ")}` };
    }

    const dados = {};
    for (const c of CAMPOS_TEXTO) dados[c] = (corpo[c] ?? "").trim();
    dados.vez = dados.vez || "advogado";
    dados.status = dados.status || "rascunho";

    const faltando = CAMPOS_OBRIGATORIOS.filter(c => !dados[c]);
    if (faltando.length > 0) {
        return { erro: `Campos obrigatórios faltando: ${faltando.join(", ")}` };
    }
    const longos = Object.entries(LIMITES).filter(([c, max]) => dados[c].length > max);
    if (longos.length > 0) {
        return {
            erro: `Texto acima do limite: ${longos.map(([c, max]) => `${c} (máx. ${max})`).join(", ")}`
        };
    }
    if (!VEZ_VALIDAS.includes(dados.vez)) {
        return { erro: `Valor de "vez" inválido. Use: ${VEZ_VALIDAS.join(", ")}` };
    }
    if (!STATUS_VALIDOS.includes(dados.status)) {
        return { erro: `Status inválido. Use: ${STATUS_VALIDOS.join(", ")}` };
    }
    return { dados };
}

export async function listar(req, res, next) {
    try {
        const processos = await repo.listar();
        res.json(processos);
    } catch (e) { next(e); }
}

export async function buscar(req, res, next) {
    try {
        if (!UUID.test(req.params.id)) return res.status(404).json({ erro: "Processo não encontrado" });
        const processo = await repo.buscarPorId(req.params.id);
        if (!processo) return res.status(404).json({ erro: "Processo não encontrado" });
        res.json(processo);
    } catch (e) { next(e); }
}

export async function criar(req, res, next) {
    try {
        const { erro, dados } = validar(req.body);
        if (erro) return res.status(400).json({ erro });
        const processo = await repo.criar(dados);
        res.status(201).json(processo);
    } catch (e) {
        if (e.code === "23505") {
            return res.status(409).json({ erro: "Número de processo já cadastrado" });
        }
        next(e);
    }
}

export async function atualizar(req, res, next) {
    try {
        if (!UUID.test(req.params.id)) return res.status(404).json({ erro: "Processo não encontrado" });
        const { erro, dados } = validar(req.body);
        if (erro) return res.status(400).json({ erro });
        const processo = await repo.atualizar(req.params.id, dados);
        if (!processo) return res.status(404).json({ erro: "Processo não encontrado" });
        res.json(processo);
    } catch (e) {
        if (e.code === "23505") {
            return res.status(409).json({ erro: "Número de processo já cadastrado" });
        }
        next(e);
    }
}

export async function remover(req, res, next) {
    try {
        if (!UUID.test(req.params.id)) return res.status(404).json({ erro: "Processo não encontrado" });
        const ok = await repo.remover(req.params.id);
        if (!ok) return res.status(404).json({ erro: "Processo não encontrado" });
        res.status(204).end();
    } catch (e) { next(e); }
}