# Sqlite to Postgres Migration

![Logo](doc/logo.jpg)

Ferramenta desenvolvida para migrar dados de um banco de dados Sqlite para Postgres.
Atualmente você pode:

- Pegar os dados de uma tabela no Sqlite.
- Gerar um arquivo de insert SQL.
- Inserir diretamente os dados migrados no Postgres.
- Suporta conexão via SSL com certificado.
- Ativar Debug das querys.

## Como usar

Primeiro passo, clone o repositorio e instale as dependencias:

```bash
git clone git@github.com:tuliocll/sqlite-to-postgres.git

cd sqlite-to-postgres

yarn
```

No arquivo `index.js` na linha `38` digite o nome da tabela e a model dessa tabela (mais a baixo vamos ver como criar uma model). Em seguida, configure o Sqlite (na sessão mais abaixo) e o Postgres(mais abaixo também), agora basta rodar o comando `yarn run`.

## Model

Uma model aqui na ferramenta é a representação da sua tabela no banco de dados em formato de `Object`, contendo apenas o nome(`key`) e o tipo(`value`) e sendo exportado como default, por exemplo, para uma tabela como essa:

![Schema de uma tabela chamada "post" no Sqlite](doc/model-sqlite.jpg)

Teremos um objeto dessa forma:

![Objeto de uma tabela chamada "post" no Javascript](doc/model-js.jpg)

A Model serve para que possamos mapear o tipo de cada campo, para que possamos converte-los de forma adequada, por tanto os tipos suportados para cada campo pode ser encontrado no arquivo [Types.js](src/utils/types.js).

As Models por padrão devem ser criadas em `database/Models/`.

## Configurando Sqlite

Para configurar o Sqlite basta colocar o banco de dados na pasta `database` e renomea-lo para `data.db`.

> Caso queira editar o caminho e o nome, basta o arquivo de configuração [config.js](src/config/config.js).

## Configurando Postgres

Toda Configuração do Postgres fica no arquivo `.env`, basta criar esse arquivo usando o `env.example` como base e trocar apenas as configurações.

> Para utilizar certificado na sua conexão Postgres basta copiar o certificado para a pasta `certs` e renomea-lo para `certificate.crt`.

## Opções

No arquivo `.env` ainda é possivel configurar duas opções:

| Config      | Descrição                                                               |
| ----------- | ----------------------------------------------------------------------- |
| SQL_TO_FILE | Cria uma arquivo .sql com o nome da tabela e todos os inserts.          |
| DONT_INSERT | Impede que os inserts gerados sejam inseridos direto no banco Postgres. |

## Support

You can buy me a coffee on [Ko-fi](https://ko-fi.com/tuliocll).

<div align="center">

### Made with 💙 in Bahia, Brasil.

</div>
