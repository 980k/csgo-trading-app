import React from 'react';
import Creation from "../components/create/Creation";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
    return (
        <div className="create">
            <Creation/>
            <ToastContainer
                position="top-right"
                toastStyle={{top: "55px", boxShadow: "none",
                    border: "1px solid #dcdcdd", color:"#6d6d6d"}}
                hideProgressBar={true}
                autoClose={1500}/>
        </div>
    );
}