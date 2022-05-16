/* Este código faz referência ao login do aplicativo. Procura e valida esse usuário no 
Github através de API
Created by: Anthue
Date: 2019-08-07*/
const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const {user} = req.headers;

        // recebe o username do usuário
        const loggedDev = await Dev.findById(user);

        // procura o usuário com o id do Github e verifica os seus "likes" e "dislikes"
        const users = await Dev.find({
            $and: [
                {_id:{$ne: user}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}},                
            ],
        })

        return res.json(users);
    },

    // Retorna usuário logado
    async store(req, res) {
        //console.log(req.body.username); 
             const {username} = req.body;

        const userExists = await Dev.findOne({ user: username});

        if (userExists) {
            return res.json(userExists);
        }

        // Retorna os dados do usuário (nome, username, avatar, bio) na API do Github 
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;
        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
        })        
    
        return res.json(dev);
    }
};