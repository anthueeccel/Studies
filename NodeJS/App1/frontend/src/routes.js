/* Este código faz referência as rotas utilizadas no frontend da aplicação.
Created by: Anthue
Date: 2019-08-07
 */

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
    return (
        <BrowserRouter>
        {/* Rota da tela inicial / login */}
        <Route path="/" exact component={Login} />

        {/* Rota da tela principal com id do usuário logado */}
        <Route path="/dev/:id" component={Main} /> 
        </BrowserRouter>
    )
}