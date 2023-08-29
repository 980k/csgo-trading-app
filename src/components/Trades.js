import React from 'react';
import './Trades.css';

function GridComponent() {
    const itemCount = 40;
    const gridItems = [];

    for (let i = 0; i < itemCount; i++) {
        gridItems.push(
            <div key={i} className="grid-item">
                Add Trade Here...
            </div>
        );
    }

    return (
        <div id="grid-container">
            {gridItems}
        </div>
    );
}

export default GridComponent;
