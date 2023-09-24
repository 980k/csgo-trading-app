import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Offers from "./pages/Offers";
import Create from "./pages/Create";
import Login from "./pages/Login";
import MakeOffer from "./pages/MakeOffer";
import AuthProvider from "./context/AuthProvider";

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Index />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='offers/:_id' element={<MakeOffer />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

