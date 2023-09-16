import React, { useState } from 'react';
import '../../styles/components/MakeOfferForm.css'
import { itemsData, wearDictionary } from "../../objects/commonObjects";
import { getUserId, renderOptions} from "../../utilities/Utilities";

export default function MakeOfferForm({ tradeData }) {
    const [forItems, setForItems] = useState(tradeData.have);
    const [haveItems, setHaveItems] = useState([]);

    const postOffer = () => {
        fetch('http://localhost:4000/offers/newoffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tradeId: tradeData._id,
                userId: getUserId(),
                offered: haveItems,
                for: forItems,
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postOffer();
    }

    function handleAdd(id, data) {
        setHaveItems([...haveItems, data]);
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

                    <div className="have-header"><i>You are offering ...</i></div>

                    <ul>
                        {haveItems.map((item) => {
                            return <li>{item.knife} | {item.finish} ({wearDictionary[item.wear]})</li>;
                        })}
                    </ul>
                </fieldset>

                <h2>For: </h2>
                <ul>
                    {
                        forItems.map((item) => (
                            <li key={item._id}>{item.knife} {item.finish} ({item.wear})</li>
                        ))
                    }
                </ul>
                    <button type="submit" id="submitOfferBtn">Make Offer</button>
                </form>
            </div>
        </div>
    );
}