-- Schema do LUMEN (PostgreSQL 14+)
-- gen_random_uuid() é nativo a partir do PostgreSQL 13.

DROP TABLE IF EXISTS processos;

CREATE TABLE processos (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    numero         VARCHAR(30)  NOT NULL UNIQUE,
    cliente        VARCHAR(120) NOT NULL,
    assunto        VARCHAR(200) NOT NULL,
    movimentacao   TEXT         NOT NULL DEFAULT '',
    traducao       TEXT         NOT NULL,
    proximo_passo  VARCHAR(200) NOT NULL DEFAULT '',
    vez            VARCHAR(20)  NOT NULL DEFAULT 'advogado'
                   CHECK (vez IN ('advogado', 'cliente', 'judiciario', 'outraParte')),
    status         VARCHAR(20)  NOT NULL DEFAULT 'rascunho'
                   CHECK (status IN ('rascunho', 'publicado')),
    criado_em      TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em  TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);