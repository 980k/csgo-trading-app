import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import jwtDecode from 'jwt-decode';
import '../../styles/components/LoginForm.css'

export default function LoginForm() {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const auth_token = sessionStorage.getItem('auth_token');
        if(auth_token !== null) {
            console.log('Auth token present');
            redirect(auth_token);
        } else {
            console.log('No Auth token present');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let error = document.getElementById("error-text");

        const requestBody = {
            username,
            password
        }

        const res = await fetch("http://localhost:4000/user/login",{
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            response.json().then(data => {
                if(response.status !== 200){
                    error.innerHTML = data.msg;
                } else {
                    sessionStorage.setItem('auth_token', data.token);
                    sessionStorage.setItem('isAuthenticated', 'true');
                    authContext.login();
                    redirect(data.token);
                }
            });
        }).catch(error =>{
            console.log(error);
        });
    };

    const navigate = useNavigate();

    async function redirect(token) {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;

        const userResponse = await fetch(`http://localhost:4000/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (userResponse.status === 200) {
            navigate('/');
        } else {
            console.log('Error retrieving data.')
        }
    }

    return(
        <div className="login-form-container">
            <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="login-elements">
                <input type="text" id="username" name="username" placeholder="Username" />
                <input type="password" id="password" name="password" placeholder="Password" />
                <div className="error" id="error-text"></div>
            </div>
            <button className="login-button">Log In</button>
        </form>
        </div>
    );
}