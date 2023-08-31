import React from 'react';
import './Trades.css';

export default function Trades() {
    const itemCount = 30;
    const gridItems = [];

    for (let i = 0; i < itemCount; i++) {
        gridItems.push(
            <div key={i} className="trade-grid-item">
                Add Trade Here...
            </div>
        );
    }

    return (
        <div className="trade-grid-container">
            {gridItems}
        </div>
    );
}