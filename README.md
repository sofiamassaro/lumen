# LUMEN

> Seu cliente entende. Você recupera seu tempo.

O LUMEN é um painel para escritórios de advocacia que traduz as movimentações processuais em linguagem clara para o cliente. O advogado cadastra o processo, escreve uma explicação sem juridiquês, indica o próximo passo e de quem é a vez, e acompanha uma prévia de como o cliente vai ler essa atualização.

Este repositório contém o protótipo funcional do front-end, desenvolvido em React.

## Funcionalidades

- **Início:** indicadores do escritório (total de processos, publicados, rascunhos para revisar e processos aguardando o cliente) e lista dos processos atualizados recentemente.
- **Processos:** CRUD completo, com cadastro, listagem, edição e exclusão (com confirmação).
- **Detalhe do processo:** visão do advogado (dados técnicos e datas) lado a lado com a prévia do cliente.
- **Prévia do cliente:** mostra o assunto, a tradução em linguagem clara, o próximo passo e de quem é a vez.
- **Situação do processo:** cada processo é *Rascunho* ou *Publicado*. Só os publicados ficarão visíveis ao cliente.
- **Persistência local:** os dados ficam salvos no `localStorage` do navegador.

Os itens *Clientes* e *Dúvidas* aparecem no menu lateral como "Em breve" e serão implementados nas próximas entregas.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (build e servidor de desenvolvimento)
- [React Router](https://reactrouter.com/) (rotas)
- [Lucide React](https://lucide.dev/) (ícones)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) (lint)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 20.19 ou superior (ou 22.12+).

```bash
# instalar as dependências
npm install

# iniciar o servidor de desenvolvimento
npm run dev
```

Depois, abra o endereço exibido no terminal (por padrão, http://localhost:5173).

### Outros scripts

| Comando           | O que faz                                   |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento        |
| `npm run build`   | Gera a versão de produção na pasta `dist/`  |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint`    | Verifica o código com o Oxlint              |

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/          # Layout, Sidebar e BarraSuperior
│   └── processos/       # ProcessoForm, ProcessoLista, PreviaCliente, StatusBadge
├── hooks/
│   └── useProcessos.js  # estado da lista e operações do CRUD
├── pages/               # InicioPage, ProcessosPage, ProcessoDetalhePage
├── services/
│   └── processosStorage.js  # único ponto de acesso ao localStorage
├── utils/
│   └── processo.js      # modelo do processo, opções e formatação de datas
├── App.jsx              # definição das rotas
├── main.jsx             # ponto de entrada
└── index.css            # cores, fontes e estilos globais
```

### Rotas

| Rota              | Página                                  |
| ----------------- | --------------------------------------- |
| `/`               | Início                                  |
| `/processos`      | Cadastro e lista de processos           |
| `/processos/:id`  | Detalhe do processo                     |

Qualquer outra rota redireciona para o Início.

## Modelo de dados

Cada processo é salvo no `localStorage` sob a chave `lumen:processos` com os campos:

| Campo          | Descrição                                                             |
| -------------- | --------------------------------------------------------------------- |
| `id`           | Identificador gerado automaticamente                                  |
| `numero`*      | Número do processo                                                    |
| `cliente`*     | Nome do cliente                                                       |
| `assunto`*     | Assunto do processo                                                   |
| `movimentacao` | Texto técnico, como consta no sistema do tribunal                     |
| `traducao`*    | Explicação em linguagem clara para o cliente                          |
| `proximoPasso` | Próximo passo do processo                                             |
| `vez`          | De quem é a vez: `advogado`, `cliente`, `judiciario` ou `outraParte`  |
| `status`       | `rascunho` ou `publicado`                                             |
| `criadoEm`     | Data de cadastro (ISO 8601)                                           |
| `atualizadoEm` | Data da última alteração (ISO 8601)                                   |

\* Campos obrigatórios no formulário.

## Limitações atuais e próximos passos

- Não há autenticação: o advogado exibido na barra superior é fictício.
- Os dados ficam apenas no navegador. Limpar os dados do site apaga os processos.
- Na Sprint 3, o `processosStorage.js` será substituído por chamadas a uma API REST, sem alterar os componentes visuais.
- Páginas de Clientes e Dúvidas e a visão do próprio cliente ainda serão implementadas.
