# Estrutura

O back end está na pasta chamada de:

- nodejs-express-sequelize-mysql
  

O front end está na pasta chamada de:

- vue-js-client-crud
  

O back end roda na porta 8080. O front end roda na porta 8081.

Tanto o front quanto o back end possuem seus respectivos arquivos **package.json**

# Como executar o teste:

1. Clone o repositório
  
2. Crie um banco de dados no MySQL chamado de "comprasDB"
  
3. Através do npm instale todas as dependências contidas tanto na pasta do font aquanto do back end
  
4. No arquivo `db.config.js` localizado em `nodejs-express-sequelize-mysql/app/config/db.config.js` adicione sua senha do MySQL na propriedade password (dessa forma o sequelize pode se comunicar com seu banco de dados)
  
   ```js
    module.exports = {
      HOST: "localhost",
      USER: "root",
      PASSWORD: process.env.SQL_KEY, // adicione sua senha
      DB: "comprasDB",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };
    ```
    

5. Dentro da pasta `nodejs-express-sequelize-mysql`, inicie o servidor do back end com o comando `node server.js` 
  
6. na pasta do front end (`vue-js-client-crud`) monte e suba o servidor com o comando `npm run serve` nesse momento o cli do vue deve compilar e rodar o front end localmente na porta 8081
  

## Overvações

Esta é a primeira vez que trabalho com algum banco de dados relacional e MySQL especificamente, até então eu tinha tido experiência apenas com o MongoDB. Também foi a primeira vez que trabalhei com vue dessa forma. Para o vue meu conhecimento era muito superficial, entendia como funcionavam as diretivas e nunca havia trabalhado com componentes por exemplo.

Dessa forma para conseguir cumprir o desafio além das documentações de cada ferramente utilizada me basei no seguinte tutorial

- [Vue.js + Node.js + Express + MySQL example: Build a full-stack CRUD Application - BezKoder](https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/#Configure_MySQL_database_038_Sequelize)
