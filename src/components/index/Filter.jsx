import React, { useState, useEffect } from 'react';
import { itemsData } from "../../objects/commonObjects";
import '../../styles/components/Filter.css';

export default function Filter({ selectedCount, onCheckboxChange }) {
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        onCheckboxChange(selectedItems);
    }, [selectedItems, onCheckboxChange]);

    const handleCheckboxChange = (index) => {
        const selectedItem = itemsData.knives[index];
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
                {itemsData.knives.map((item, index) => (
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
