import React, {useReducer, useState} from 'react';
import AddItem from "../create/itemList/AddItem";
import ItemList from "../create/itemList/ItemList";
import { itemsData, wearDictionary } from "../../objects/commonObjects";
import {convertWear, getUserId, renderOptions} from "../../utilities/Utilities";
import '../../styles/components/MakeOfferForm.css'
import { toast } from 'react-toastify';
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

export default function MakeOfferForm({ tradeData }) {
    const [forItems, setForItems] = useState(tradeData.have);
    const [forItemsExc, setForItemsExc] = useState([]);
    const [haveItems, dispatch] = useReducer(itemsReducer, []);

    const auth_token = sessionStorage.getItem('auth_token');

    const postOffer = () => {
        const haveItemsFormatted =  haveItems.map(({ id, ...rest }) => rest);

        fetch('http://localhost:4000/offers/newoffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': auth_token
            },
            body: JSON.stringify({
                tradeId: tradeData._id,
                userId: getUserId(auth_token),
                offered: haveItemsFormatted,
                for: forItems
            })
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Response error encountered.');
                }
                return response.json();
            })
            .then(() => {
                clearOffer();
            })
            .catch((error) => {
                console.error("Error: ", error);
            })
    }

    function clearOffer() {
        dispatch({
            type: 'cleared'
        });

        setForItems(tradeData.have);
        setForItemsExc([]);
    }

    function handleAddItemToList(itemObject) {
        // Determine which dispatch function to use based on the listType parameter
        dispatch({
            type: 'added',
            id: nextId++,
            wear: itemObject.wear,
            knife: itemObject.knife,
            finish: itemObject.finish
        });
    }

    function handleDeleteItem(itemId) {
        dispatch({
            type: 'deleted',
            id: itemId
        });
    }

    function clearItemLists() {
        dispatch({
            type: 'cleared'
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(auth_token) {
            postOffer();

            toast.success('Offer sent!', {
                position:'top-right',
                hideProgressBar: true
            });
        } else {
            toast.error('Please log in to make offer.', {
                position: 'top-right',
                hideProgressBar: true
            });
        }
    }

    function handleAddBtn(itemId) {
        const includedItem = forItemsExc.find(item => item._id === itemId);
        setForItems([...forItems, includedItem]);

        const newForExcArray = forItemsExc.filter(item => item._id !== itemId);
        setForItemsExc(newForExcArray);
    }

    function handleDeleteBtn(itemId) {
        const excludedItem = forItems.find(item => item._id === itemId);
        setForItemsExc([...forItemsExc, excludedItem]);

        const newForArray = forItems.filter(item => item._id !== itemId);
        setForItems(newForArray);
    }

    return (
        <div>
            <div className="trade-offer-container">
                <h2>[H]ave: </h2>
                <ul>
                    {tradeData.have.map((item, index) => (
                        <li key={index}>
                            {`${item.knife} | ${item.finish} (${item.wear})`}
                        </li>
                    ))}
                </ul>

                <h2>[W]ant: </h2>
                <ul>
                    {tradeData.want.map((item, index) => (
                        <li key={index}>
                            {item.knife} | {item.finish} ({item.wear})
                        </li>
                    ))}
                </ul>
            </div>

            <div className="down-arrow">&darr;</div>

            <div className="your-offer-container">
                <form onSubmit={handleSubmit}>

                <h2>Your offer: </h2>
                <fieldset>
                    <legend><b>Offer</b></legend>
                    <AddItem onAddItem={(item) => handleAddItemToList(item)} />

                    <div className="have-header"><i>You are offering ...</i></div>

                    <ItemList items={haveItems} onDeleteItem={(itemId) => handleDeleteItem(itemId)} />

                </fieldset>
                    <div className="offer-for-items">
                        <h2>For:</h2>
                        <ul>
                            {forItems.length > 0 ? (
                                forItems.map((item) => (
                                    <li key={item._id}>
                                        {item.knife} {item.finish} ({item.wear})
                                        {forItems.length > 1 ? (
                                            <button className="delete-btn" onClick={() => handleDeleteBtn(item._id)}> - </button>
                                        ) : null}
                                    </li>
                                ))
                            ) : null}
                        </ul>
                    </div>

                    {forItemsExc.length > 0 ? (
                        <div classname="offer-exc-items">
                            <h2>Excluded:</h2>
                            <ul>
                                {forItemsExc.map((item) => (
                                    <li key={item._id}>
                                        {item.knife} {item.finish} {item.wear}
                                        <button className="add-btn" onClick={() => handleAddBtn(item._id)}> + </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    <button type="submit" id="submitOfferBtn">Make Offer</button>
                </form>
            </div>
        </div>
    );
}

let nextId = 0;