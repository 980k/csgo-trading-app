import React from 'react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav>
            <div className="navbar-logo">
                <a href="">CSMEX</a>
            </div>
            <ul className="navbar-items">
                <li>
                    <a href="">Trades</a>
                </li>
                <li>
                    <a href="">Offers</a>
                </li>
                <li>
                    <a href="">Create</a>
                </li>
            </ul>
            <div className="navbar-login">
                <a href="">Login</a>
            </div>
        </nav>
    );
}
