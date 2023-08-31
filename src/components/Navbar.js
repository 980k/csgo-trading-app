import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <h1>CSMEX</h1>
            </div>
            <nav className="navbar-menu">
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active-link" className="navbar-link" exact>
                            Trades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/offers" activeClassName="active-link" className="navbar-link">
                            Offers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" activeClassName="active-link" className="navbar-link">
                            Create
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="navbar-login">
                <NavLink to="/login" className="login-link">Login</NavLink>
            </div>
        </header>
    );
}
