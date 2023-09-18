import React, { useReducer } from 'react';
import { getUserId } from "../../utilities/Utilities";
import AddItem from "./itemList/AddItem";
import ItemList from "./itemList/ItemList";
import '../../styles/components/Creation.css'

function itemsReducer(items, action) {
    switch (action.type) {
        case 'added': {
            return [...items, {
                id: action.id,
                wear: action.wear,
                knife: action.knife,
                finish: action.finish
            }];
        }
        case 'deleted': {
            return items.filter(item => item.id !== action.id);
        }
        case 'cleared': {
            return [];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default function Creation() {
    // Initialize two separate states and dispatch functions for each list
    const [haveItems, dispatchHaveItems] = useReducer(itemsReducer, []);
    const [wantItems, dispatchWantItems] = useReducer(itemsReducer, []);

    const postTrade = () => {
        const haveItemsFormatted =  haveItems.map(({ id, ...rest }) => rest);
        const wantItemsFormatted = wantItems.map(({ id, ...rest }) => rest);

        fetch('http://localhost:4000/api/trades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: getUserId(),
                have: haveItemsFormatted,
                want: wantItemsFormatted
            })
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Response error encountered.');
                }
                return response.json();
            })
            .then(() => {
                clearItemLists();
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };


    function handleAddItemToList(itemObject, listType) {
        // Determine which dispatch function to use based on the listType parameter
        const dispatch = listType === 'haveItems' ? dispatchHaveItems : dispatchWantItems;

        dispatch({
            type: 'added',
            id: nextId++,
            wear: itemObject.wear,
            knife: itemObject.knife,
            finish: itemObject.finish
        });
    }

    function handleDeleteItemFromList(itemId, listType) {
        // Determine which dispatch function to use based on the listType parameter
        const dispatch = listType === 'haveItems' ? dispatchHaveItems : dispatchWantItems;

        dispatch({
            type: 'deleted',
            id: itemId
        });
    }

    function clearItemLists() {
        dispatchHaveItems({
            type: 'cleared'
        });

        dispatchWantItems({
            type: 'cleared'
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postTrade();
    };

    return (
        <div className="creation-container">
            <form onSubmit={handleSubmit}>
                <h2>Create Trade Offer</h2>
                <fieldset>
                    <legend><b>Have</b></legend>
                    <AddItem onAddItem={(item) => handleAddItemToList(item, 'haveItems')} />
                    <div className="have-header"><i>You have ...</i></div>
                    <ItemList items={haveItems} onDeleteItem={(itemId) => handleDeleteItemFromList(itemId, 'haveItems')} />
                </fieldset>

                <div className="swap">&#8645;</div>

                <fieldset>
                    <legend><b>Want</b></legend>
                    <AddItem onAddItem={(item) => handleAddItemToList(item, 'wantItems')} />
                    <div className="want-header"><i>You want ...</i></div>
                    <ItemList items={wantItems} onDeleteItem={(itemId) => handleDeleteItemFromList(itemId, 'wantItems')} />
                </fieldset>

                <button type="submit" id="submitBtn">Create</button>
            </form>
        </div>
    );
}

let nextId = 0;