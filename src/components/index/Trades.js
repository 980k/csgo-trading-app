import React, { useState, useEffect } from 'react';
import { convertWear } from "../utilities/Utilities";
import './Trades.css';

export default function Trades({ data }) {

    const gridItems = data.map((trade, index) => (
        <div className="trade-grid-item">

            <div className="trade-list">
        <div><b>[H]</b>ave</div>
        <ul>
            {trade.have.map((item, itemIndex) => (
                <li key={itemIndex}>
                    {item.knife} | {item.finish} ({convertWear(item.wear)})
                </li>
            ))}
        </ul>

        <div><b>[W]</b>ant</div>
        <ul>
            {trade.want.map((item, itemIndex) => (
                <li key={itemIndex}>
                    {item.knife} | {item.finish} ({convertWear(item.wear)})
                </li>
            ))}
        </ul>
        </div>

        <div className="offerBtn">Make Offer</div>
    </div>
    ));

    return (
        <div className="trade-grid-container">
            {gridItems}
        </div>
    );
}
