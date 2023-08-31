import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Offers from "./pages/Offers";
import Create from "./pages/Create";
import Login from "./pages/Login";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Index />} />
                <Route path='/offers' element={<Offers />} />
                <Route path='/create' element={<Create />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
}


