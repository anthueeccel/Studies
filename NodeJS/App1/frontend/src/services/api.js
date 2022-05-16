/* Este código faz o direcionamento para a API da aplicação. Utiliza a base Axios para 
React.JS (frontend - async) para NodeJS (backend)  : yarn add axios 
Created by: Anthue
Date: 2019-08-06*/
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;
