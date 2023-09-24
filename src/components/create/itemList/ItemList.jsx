import React from 'react';
import {convertWear} from "../../../utilities/Utilities";
import '../../../styles/components/ItemList.css'

export default function ItemList({ items, onDeleteItem }) {
    return(
        <ul className="item-list">
            {items.map((item) => (
                <li key = {item.id}>
                    <Item item={item} onDelete={onDeleteItem} />
                </li>
            ))}
        </ul>
    );
}

function Item({ item, onDelete  }) {
    let itemContent;

    itemContent = (
        <>
            {`${item.knife} ${item.finish} (${convertWear(item.wear)})`}
        </>
    );

    return (
        <label>
            {itemContent}
            <button className="delete-button" onClick={() => onDelete(item.id)}>X</button>
        </label>
    );
}