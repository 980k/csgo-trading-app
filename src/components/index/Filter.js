import React from 'react';
import './Filter.css';

export default function Filter() {
    const items = [
        'Bayonet', 'Bowie Knife', 'Butterfly Knife', 'Classic Knife',
        'Falchion Knife', 'Flip Knife', 'Gut Knife', 'Huntsman Knife',
        'Karambit', 'M9 Bayonet', 'Navaja Knife', 'Nomad Knife',
        'Paracord Knife', 'Shadow Daggers', 'Skeleton Knife',
        'Stiletto Knife', 'Survival Knife', 'Talon Knife', 'Ursus Knife'
    ];

    return(
        <div className="filter">
            <header>
                <h2>Filter Items</h2>
            </header>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <input type="checkbox" className="item-checkbox" />
                        <label htmlFor={`item${index}`}>{item}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
