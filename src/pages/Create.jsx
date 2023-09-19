import React from 'react';
import Creation from "../components/create/Creation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
    return(
        <div className="create">
            <Creation />
            <ToastContainer
                position="top-right"
                toastStyle={{ top: "55px" , boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}
                hideProgressBar={true}
                autoClose={1500} />
        </div>
    );
}