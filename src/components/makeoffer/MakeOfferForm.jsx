import React, {useReducer, useState} from 'react';
import AddItem from "../create/itemList/AddItem";
import ItemList from "../create/itemList/ItemList";
import { itemsData, wearDictionary } from "../../objects/commonObjects";
import { getUserId, renderOptions} from "../../utilities/Utilities";
import '../../styles/components/MakeOfferForm.css'

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
        // Determine which dispatch function to use based on the listType parameter

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

    function handleSubmit() {
        console.log('hi');
    }

    function handleAddButton(itemId) {

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
                            {item.knife} | {item.finish} ({item.wear})
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

                <h2>For: </h2>
                {/*<ul>*/}
                {/*    {*/}
                {/*        forItems.map((item) => (*/}
                {/*            <li key={item._id}>{item.knife} {item.finish} ({item.wear})*/}
                {/*                <button onClick={handleDeleteBtn}> - </button>*/}
                {/*            </li>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</ul>*/}

                {/*    {*/}
                {/*        (forItemsExc.length > 0) ?*/}
                {/*            (<ul>*/}
                {/*                {*/}
                {/*                    forItemsExc.map((item) => (*/}
                {/*                        <li key={item._id}>{item.knife} {item.finish} ({item.wear})*/}
                {/*                            <button> + </button>*/}
                {/*                        </li>*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*            </ul>) :*/}
                {/*            (<p></p>)*/}
                {/*    }*/}

                    <button type="submit" id="submitOfferBtn">Make Offer</button>
                </form>
            </div>
        </div>
    );
}

let nextId = 0;