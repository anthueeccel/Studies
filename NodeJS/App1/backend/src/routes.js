/* Este código informa as rotas para acesso a Aplicação. 
Created by: Anthue
Date: 2019-08-06*/

const express = require('express'); //importa a variável express
const routes = express.Router(); 

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

// GET - página inicial
//routes.get('/', (req, res) => {    
//    return res.json({ message: `Olá ${req.query.name}`});
//});

// POST - recebe dados de um formulário (create)
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes; //exporta variável routes 
