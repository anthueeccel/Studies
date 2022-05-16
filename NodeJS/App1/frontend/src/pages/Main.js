/* Este código valida os usuários e retira da tela os usuários que tem "like" ou "dislike" deixando
apenas os usuários que ainda não foram avaliados.
Created by: Anthue
Date: 2019-08-07
 */
import React, {useEffect, useState} from "react";
import './Main.css';
import { Link } from "react-router-dom";

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

 // Validação em tela.
export default function Main({ match }) {
    // Carrega os usuários do sistema
    const [users, setUsers] = useState([]);    
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                user: match.params.id,
            }
            })
            setUsers(response.data)
        }
        loadUsers();
    }, [match.params.id]);

    // validação usuários com "like"
    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {user: match.params.id}
        })

        setUsers(users.filter(user => user._id !== id));
    }

    // validação usuários com "dislike"
    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {user: match.params.id}
        })

        setUsers(users.filter(user => user._id !== id));
    }

    // Retorna usuários que não receberam "like"  ou "dislike"
    // Usuários não avaliados. Carregar os dados: avatar, nome e bio.
    return (
    <div className="main-container">
        <Link to="/">
            <img src={logo} alt="Tindev" />
        </Link>
        {users.length > 0 ? (
            <ul>
            {users.map(user => (
            <li key={user._id}>
                <img src={user.avatar} alt="user.name" />
                <footer>
                    <strong>user.name</strong>
                    <p>user.bio</p>
                </footer>

                <div className="buttons">
                    <button type="button" onClick={() =>handleDislike(user._id)}>
                        <img src={dislike} alt="Dislike" />
                    </button>
                    <button type="button" onClick={() =>handleLike(user._id)}>
                        <img src={like} alt="Like" />
                    </button>
                </div>
            </li>            
            ))}
        </ul>
        ) : (
            <div className="empty">Acabou :(</div> // se não tem usuários retorna esta msg.
        )}
    </div>
    )
}