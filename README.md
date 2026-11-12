# LUMEN

> Seu cliente entende. Você recupera seu tempo.

O LUMEN é um painel para escritórios de advocacia que traduz as movimentações processuais em linguagem clara para o cliente. O advogado cadastra o processo, escreve uma explicação sem juridiquês, indica o próximo passo e de quem é a vez, e acompanha uma prévia de como o cliente vai ler essa atualização.

Este repositório reúne as duas partes do projeto:

- **Front-end** (raiz do repositório): aplicação React que o advogado usa no navegador.
- **API** (pasta [`api/`](api/)): API REST em Node.js + Express que guarda os processos em um banco PostgreSQL.

```
Navegador (React + Vite)  ──HTTP/JSON──▶  API (Express)  ──SQL──▶  PostgreSQL
     localhost:5173                       localhost:3000
```

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Scripts disponíveis](#scripts-disponíveis)
- [API REST](#api-rest)
- [Modelo de dados](#modelo-de-dados)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Limitações atuais e próximos passos](#limitações-atuais-e-próximos-passos)

## Funcionalidades

- **Início:** indicadores do escritório (total de processos, publicados, rascunhos para revisar e processos aguardando o cliente) e lista dos processos atualizados recentemente.
- **Processos:** CRUD completo, com cadastro, listagem, edição e exclusão (com confirmação).
- **Detalhe do processo:** visão do advogado (dados técnicos e datas) lado a lado com a prévia do cliente.
- **Prévia do cliente:** mostra o assunto, a tradução em linguagem clara, o próximo passo e de quem é a vez.
- **Situação do processo:** cada processo é *Rascunho* ou *Publicado*. Só os publicados ficarão visíveis ao cliente.
- **Persistência em banco de dados:** os processos são salvos no PostgreSQL por meio da API.
- **Carregamento e erros:** as páginas mostram um indicador enquanto os dados chegam e uma mensagem clara (com botão *Tentar novamente*) quando a API está fora do ar ou recusa a operação.

Os itens *Clientes* e *Dúvidas* aparecem no menu lateral como "Em breve" e serão implementados nas próximas entregas.

## Tecnologias

**Front-end**

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (build e servidor de desenvolvimento)
- [React Router](https://reactrouter.com/) (rotas)
- [Lucide React](https://lucide.dev/) (ícones)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) (lint)

**Back-end**

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) com o driver [`pg`](https://node-postgres.com/)
- [`cors`](https://www.npmjs.com/package/cors) e [`dotenv`](https://www.npmjs.com/package/dotenv)

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19 ou superior (ou 22.12+)
- [PostgreSQL](https://www.postgresql.org/download/) 14 ou superior

### 1. Criar o banco de dados

Crie o banco e rode o schema e os dados de demonstração (substitua `postgres` pelo seu usuário, se for outro):

```bash
createdb -U postgres lumen
psql -U postgres -d lumen -f api/src/db/schema.sql
psql -U postgres -d lumen -f api/src/db/seed.sql
```

> ⚠️ O `schema.sql` começa com `DROP TABLE IF EXISTS processos`. Rodá-lo de novo **apaga todos os processos** cadastrados.

O `seed.sql` é opcional: ele insere três processos de exemplo para você ver o painel funcionando.

### 2. Configurar e iniciar a API

```bash
cd api
npm install
cp .env.example .env   # no Windows (PowerShell): Copy-Item .env.example .env
```

Edite o `api/.env` com os dados do seu PostgreSQL:

| Variável      | Descrição                       | Padrão do exemplo |
| ------------- | ------------------------------- | ----------------- |
| `DB_HOST`     | Endereço do servidor do banco   | `localhost`       |
| `DB_PORT`     | Porta do PostgreSQL             | `5432`            |
| `DB_USER`     | Usuário do banco                | `postgres`        |
| `DB_PASSWORD` | Senha do usuário                | *(vazio)*         |
| `DB_NAME`     | Nome do banco                   | `lumen`           |
| `PORT`        | Porta em que a API vai rodar    | `3000`            |

Depois, inicie a API:

```bash
npm run dev
```

Ao abrir http://localhost:3000 você deve ver `{ "mensagem": "API Lumen no ar" }`.

### 3. Configurar e iniciar o front-end

Em outro terminal, na **raiz** do repositório:

```bash
npm install
cp .env.example .env   # opcional: só é preciso se a API não estiver em http://localhost:3000
npm run dev
```

O arquivo `.env` do front-end tem uma única variável:

| Variável       | Descrição              | Padrão                  |
| -------------- | ---------------------- | ----------------------- |
| `VITE_API_URL` | Endereço base da API   | `http://localhost:3000` |

Abra o endereço exibido no terminal (por padrão, http://localhost:5173).

> Os arquivos `.env` estão no `.gitignore` e não devem ser enviados ao repositório. Use os `.env.example` como modelo.

## Scripts disponíveis

**Front-end** (na raiz)

| Comando           | O que faz                                   |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento        |
| `npm run build`   | Gera a versão de produção na pasta `dist/`  |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint`    | Verifica o código com o Oxlint              |

**API** (na pasta `api/`)

| Comando       | O que faz                                                  |
| ------------- | ---------------------------------------------------------- |
| `npm run dev` | Inicia a API e reinicia sozinha ao salvar um arquivo       |
| `npm start`   | Inicia a API sem recarregamento automático                 |

## API REST

Endereço base: `http://localhost:3000`. Todas as requisições e respostas usam JSON.

| Método   | Rota              | Descrição                     | Sucesso          |
| -------- | ----------------- | ----------------------------- | ---------------- |
| `GET`    | `/`               | Verifica se a API está no ar  | `200`            |
| `GET`    | `/processos`      | Lista todos os processos (mais recentes primeiro) | `200` |
| `GET`    | `/processos/:id`  | Busca um processo pelo `id`   | `200`            |
| `POST`   | `/processos`      | Cadastra um processo          | `201`            |
| `PUT`    | `/processos/:id`  | Atualiza um processo          | `200`            |
| `DELETE` | `/processos/:id`  | Remove um processo            | `204` (sem corpo) |

### Exemplo de cadastro

```bash
curl -X POST http://localhost:3000/processos \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "5009999-00.2026.8.24.0023",
    "cliente": "Ana Souza",
    "assunto": "Revisão de aposentadoria",
    "movimentacao": "Conclusos para despacho.",
    "traducao": "O processo foi enviado ao juiz para ele dar o próximo encaminhamento.",
    "proximoPasso": "Aguardar o despacho do juiz",
    "vez": "judiciario",
    "status": "rascunho"
  }'
```

Os campos `vez` e `status` são opcionais e, quando omitidos, valem `advogado` e `rascunho`. Espaços no início e no fim dos textos são removidos antes de salvar.

### Erros

Em caso de erro, a API responde com `{ "erro": "mensagem" }`:

| Status | Quando acontece                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------- |
| `400`  | JSON inválido, campo obrigatório faltando, campo que não é texto, texto acima do limite ou valor de `vez`/`status` inválido |
| `404`  | Processo não encontrado (inclusive quando o `id` não é um UUID válido) ou rota inexistente          |
| `409`  | Já existe um processo com o mesmo `numero`                                                          |
| `500`  | Erro interno (por exemplo, banco de dados fora do ar)                                               |

## Modelo de dados

Os processos ficam na tabela `processos` (veja [`api/src/db/schema.sql`](api/src/db/schema.sql)). O banco usa `snake_case`; a API converte os nomes e devolve os campos em `camelCase`:

| Campo na API   | Coluna no banco | Descrição                                                            | Regras                         |
| -------------- | --------------- | -------------------------------------------------------------------- | ------------------------------ |
| `id`           | `id`            | Identificador gerado pelo banco                                       | UUID                           |
| `numero`*      | `numero`        | Número do processo                                                   | até 30 caracteres, único       |
| `cliente`*     | `cliente`       | Nome do cliente                                                      | até 120 caracteres             |
| `assunto`*     | `assunto`       | Assunto do processo                                                  | até 200 caracteres             |
| `movimentacao` | `movimentacao`  | Texto técnico, como consta no sistema do tribunal                    | —                              |
| `traducao`*    | `traducao`      | Explicação em linguagem clara para o cliente                         | —                              |
| `proximoPasso` | `proximo_passo` | Próximo passo do processo                                            | até 200 caracteres             |
| `vez`          | `vez`           | De quem é a vez                                                      | `advogado`, `cliente`, `judiciario` ou `outraParte` |
| `status`       | `status`        | Situação da atualização                                              | `rascunho` ou `publicado`      |
| `criadoEm`     | `criado_em`     | Data de cadastro                                                     | ISO 8601                       |
| `atualizadoEm` | `atualizado_em` | Data da última alteração                                             | ISO 8601                       |

\* Campos obrigatórios.

## Estrutura do projeto

```
lumen/
├── api/                          # back-end (API REST)
│   ├── server.js                 # ponto de entrada: sobe o servidor
│   ├── .env.example              # modelo das variáveis de ambiente da API
│   └── src/
│       ├── app.js                # configuração do Express, rotas e 404
│       ├── routes/               # mapeamento das rotas de processos
│       ├── controllers/          # validações e respostas HTTP
│       ├── repositories/         # consultas SQL
│       ├── middlewares/          # tratamento centralizado de erros
│       └── db/
│           ├── connection.js     # pool de conexões com o PostgreSQL
│           ├── schema.sql        # criação da tabela
│           └── seed.sql          # dados de demonstração
├── src/                          # front-end (React)
│   ├── components/
│   │   ├── comum/                # Carregando e MensagemErro
│   │   ├── layout/               # Layout, Sidebar e BarraSuperior
│   │   └── processos/            # ProcessoForm, ProcessoLista, PreviaCliente, StatusBadge
│   ├── hooks/
│   │   └── useProcessos.js       # estado da lista, carregamento, erros e operações do CRUD
│   ├── pages/                    # InicioPage, ProcessosPage, ProcessoDetalhePage
│   ├── services/
│   │   └── processosApi.js       # único ponto do front que conversa com a API
│   ├── utils/
│   │   └── processo.js           # modelo do processo, opções e formatação de datas
│   ├── App.jsx                   # definição das rotas
│   ├── main.jsx                  # ponto de entrada
│   └── index.css                 # cores, fontes e estilos globais
├── public/                       # arquivos estáticos (favicon)
├── pmi_2/                        # documentos da disciplina (BMC e manual de identidade visual)
├── .env.example                  # modelo das variáveis de ambiente do front-end
└── index.html
```

A API segue uma divisão em camadas: a **rota** recebe a requisição, o **controller** valida os dados e escolhe o status HTTP, e o **repository** é o único lugar que escreve SQL. No front-end, os componentes nunca chamam `fetch` diretamente: tudo passa pelo `useProcessos`, que usa o `processosApi.js`.

### Rotas do front-end

| Rota              | Página                                  |
| ----------------- | --------------------------------------- |
| `/`               | Início                                  |
| `/processos`      | Cadastro e lista de processos           |
| `/processos/:id`  | Detalhe do processo                     |

Qualquer outra rota redireciona para o Início.

## Limitações atuais e próximos passos

- Não há autenticação: o advogado exibido na barra superior é fictício e a API aceita requisições de qualquer origem.
- Todos os processos pertencem a um único escritório; ainda não há separação por advogado ou por cliente.
- As páginas de Clientes e Dúvidas e a visão do próprio cliente (que mostrará só os processos publicados) ainda serão implementadas.
