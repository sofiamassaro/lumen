import { query } from "../db/connection.js";

// O banco usa snake_case; a API devolve camelCase, o mesmo formato
// que o front-end já usava no localStorage.
const COLUNAS = `
    id, numero, cliente, assunto, movimentacao, traducao,
    proximo_passo AS "proximoPasso", vez, status,
    criado_em     AS "criadoEm",
    atualizado_em AS "atualizadoEm"
`;

export async function listar() {
    const r = await query(`SELECT ${COLUNAS} FROM processos ORDER BY atualizado_em DESC`);
    return r.rows;
}

export async function buscarPorId(id) {
    const r = await query(`SELECT ${COLUNAS} FROM processos WHERE id = $1`, [id]);
    return r.rows[0];
}

export async function criar(dados) {
    const r = await query(
        `INSERT INTO processos
         (numero, cliente, assunto, movimentacao, traducao, proximo_passo, vez, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING ${COLUNAS}`,
        [
            dados.numero, dados.cliente, dados.assunto, dados.movimentacao,
            dados.traducao, dados.proximoPasso, dados.vez, dados.status
        ]
    );
    return r.rows[0];
}

export async function atualizar(id, dados) {
    const r = await query(
        `UPDATE processos SET
            numero = $1, cliente = $2, assunto = $3, movimentacao = $4,
            traducao = $5, proximo_passo = $6, vez = $7, status = $8,
            atualizado_em = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING ${COLUNAS}`,
        [
            dados.numero, dados.cliente, dados.assunto, dados.movimentacao,
            dados.traducao, dados.proximoPasso, dados.vez, dados.status, id
        ]
    );
    return r.rows[0] ?? null;
}

export async function remover(id) {
    const r = await query("DELETE FROM processos WHERE id = $1", [id]);
    return r.rowCount > 0;
}
