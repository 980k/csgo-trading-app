import React, { useState, useEffect } from 'react';
import './Filter.css';

const items = [
    'Bayonet', 'Bowie Knife', 'Butterfly Knife', 'Classic Knife',
    'Falchion Knife', 'Flip Knife', 'Gut Knife', 'Huntsman Knife',
    'Karambit', 'M9 Bayonet', 'Navaja Knife', 'Nomad Knife',
    'Paracord Knife', 'Shadow Daggers', 'Skeleton Knife',
    'Stiletto Knife', 'Survival Knife', 'Talon Knife', 'Ursus Knife'
];

export default function Filter({ selectedCount, onCheckboxChange }) {
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        onCheckboxChange(selectedItems);
    }, [selectedItems, onCheckboxChange]);

    const handleCheckboxChange = (index) => {
        const selectedItem = items[index];
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(selectedItem)) {
                return prevSelectedItems.filter(item => item !== selectedItem);
            } else {
                return [...prevSelectedItems, selectedItem];
            }
        });
    };

    return (
        <div className="filter">
            <header>
                {
                    (selectedCount > 0) ?
                        (<h2>Filter ({selectedCount}) </h2>) :
                        (<h2>Filter </h2>)
                }
            </header>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            className="item-checkbox"
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={`item${index}`}>{item}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
