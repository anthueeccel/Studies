/* Este código faz a conexão com o Banco de Dados (Data Base)
Created by: Anthue
Date: 2019-08-06*/
const express = require('express');
const mongoose = require('mongoose'); // importação do Mongoose para acesso ao MongoDB
const cors = require('cors'); // importação da biblioteca para "inter-conexão" entre back e front

const routes = require('./routes'); //importa o arquivo routes.js

const server = express();

// String de conexão com o banco de dados. Deve0se incluir sua String de conexão com o MongoDB
mongoose.connect('mongodb+srv://[user]:[password]@[url-db-access]?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333); //porta do app/navegador
