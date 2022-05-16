/* Este código pesquisa os usuários que já receberam "like" e se tem "match" com o usuário logado.
Created by: Anthue
Date: 2019-08-06*/
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const {devId} = req.params;
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists'});
        }

        // Valida "like" entre usuário logado e outros usuários para "match"
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH');
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};