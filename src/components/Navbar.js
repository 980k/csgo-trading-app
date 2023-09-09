import React, { useContext } from 'react';
import { NavLink ,useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import './Navbar.css';

export default function Navbar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout-related tasks (e.g., clearing session storage)
        sessionStorage.removeItem('auth_token');
        authContext.logout();
        navigate('/login'); // Redirect to the login page after logout
    };

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
                {
                    authContext.isAuthenticated ?
                        (<NavLink to="/logout" className="logout-link">Logout</NavLink>) :
                        (<NavLink to="/login" className="login-link">Login</NavLink>)
                }
            </div>
        </header>
    );
}