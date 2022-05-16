/* Este código faz referência ao modelo Dev e gravação no MongoDB.
Created by: Anthue
Date: 2019-08-06*/

// Mongoose para acesso banco de dados MongoDB.
const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true, //createdAt, updatedAt
});

module.exports = model('Dev', DevSchema);