import React, { useState } from 'react';
import { itemsData, wearDictionary} from "../../objects/commonObjects";
import { getUserId, renderOptions } from "../../utilities/Utilities";
import '../../styles/components/Creation.css'

export default function Creation() {
    const [haveItems, setHaveItems] = useState([]);
    const [wantItems, setWantItems] = useState([]);

    const postTrade = () => {
        fetch('http://localhost:4000/api/trades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: getUserId(),
                have: haveItems,
                want: wantItems
            })
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Response error encountered.');
                }
                return response.json();
            })
            .then(() => {
                setHaveItems([]);
                setWantItems([]);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postTrade();
    };

    function handleAdd(id, data) {
        if(id === 'haveAddBtn') {
            setHaveItems([...haveItems, data]);
        } else if(id === 'wantAddBtn') {
            setWantItems([...wantItems, data]);
        }
    }

    return(
        <div className="creation-container">
        <form onSubmit={handleSubmit}>
            <h2>Create Trade Offer</h2>
            <fieldset>
                <legend><b>Have</b></legend>
                <label htmlFor="haveWears">Wear</label>
                <input type="text" id="haveWears" name="haveWears" list="wearOptions" />
                <datalist id="wearOptions">{renderOptions(itemsData.wears)}</datalist>

                <label htmlFor="haveKnives">Knife</label>
                <input type="text" id="haveKnives" name="haveKnives" list="knifeOptions" />
                <datalist id="knifeOptions">{renderOptions(itemsData.knives)}</datalist>

                <label htmlFor="haveFinishes">Finish</label>
                <input type="text" id="haveFinishes" name="haveFinishes" list="finishOptions" />
                <datalist id="finishOptions">{renderOptions(itemsData.finishes)}</datalist>

                <button
                    id="haveAddBtn"
                    onClick={(e) => {
                        e.preventDefault(); // Not necessary, but can be added
                        handleAdd(e.target.id, {
                            wear: document.getElementById('haveWears').value,
                            knife: document.getElementById('haveKnives').value,
                            finish: document.getElementById('haveFinishes').value
                        });
                    }}
                >
                    Add
                </button>

                <div className="have-header"><i>You have ...</i></div>

                <ul>
                    {haveItems.map((item) => {
                        return <li>{item.knife} | {item.finish} ({wearDictionary[item.wear]})</li>;
                    })}
                </ul>
            </fieldset>

            <div className="swap">&#8645;</div>

            <fieldset>
                <legend><b>Want</b></legend>
                <label htmlFor="wantWears">Wear</label>
                <input type="text" id="wantWears" name="wantWears" list="wearOptions" />
                <datalist id="wearOptions">{renderOptions(itemsData.wears)}</datalist>

                <label htmlFor="wantKnives">Knife</label>
                <input type="text" id="wantKnives" name="wantKnives" list="knifeOptions" />
                <datalist id="knifeOptions">{renderOptions(itemsData.knives)}</datalist>

                <label htmlFor="wantFinishes">Finish</label>
                <input type="text" id="wantFinishes" name="wantFinishes" list="finishOptions" />
                <datalist id="finishOptions">{renderOptions(itemsData.finishes)}</datalist>

                <button
                    id="wantAddBtn"
                    onClick={(e) => {
                        e.preventDefault(); // Not necessary, but can be added
                        handleAdd(e.target.id, {
                            wear: document.getElementById('wantWears').value,
                            knife: document.getElementById('wantKnives').value,
                            finish: document.getElementById('wantFinishes').value
                        });
                    }}
                >
                    Add
                </button>

                <div className="want-header"><i>You want ...</i></div>

                <ul>
                    {wantItems.map((item) => {
                        return <li>{item.knife} | {item.finish} ({wearDictionary[item.wear]})</li>;
                    })}
                </ul>
            </fieldset>

            <button type="submit" id="submitBtn">Create</button>
        </form>
        </div>
    );
}