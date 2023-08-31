import React from 'react';
import './Index.css';
import Filter from "../components/index/Filter";
import Trades from "../components/index/Trades";
import Activity from "../components/index/Activity";

export default function Index() {
    return(
        <div className="grid-container">
            <div className="left-sidebar">
                <Filter />
            </div>
            <div className="content" >
                <Trades />
            </div>

            <div className="right-sidebar">
                <Activity />
            </div>
        </div>
    )
}