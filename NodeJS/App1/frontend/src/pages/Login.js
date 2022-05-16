/* Este código faz referência a tela de login do aplicativo. 
Created by: Anthue
Date: 2019-08-07*/

import React, {useState} from 'react';
import './Login.css';

// Rota da API
import api from '../services/api';

import logo from '../assets/logo.svg';

// Validação do login do usuário através do username do Github
export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        });
        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return(
        <div className="login-container">           
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input placeholder="Digite seu usuario do Github" 
                value={username}
                onChange={e => setUsername(e.target.value)}               
                />
                <button type="submit">Enviar</button>
            </form>
        
        </div>
    );
}