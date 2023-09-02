import React from 'react';
import './LoginForm.css'

export default function LoginForm() {
    return(
        <div className="login-form-container">
        <form>
            <ul>
                <li><label htmlFor="username">Username</label></li>
                <li><input type="text" id="username" name="username" /></li>

                <li><label htmlFor="password">Password</label></li>
                <li><input type="text" id="password" name="password" /></li>
            </ul>

            <button>Log In</button>
        </form>
        </div>
    )
}