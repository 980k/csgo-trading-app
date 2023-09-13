import React, { useState } from 'react';
import './MakeOfferForm.css'
import jwtDecode from "jwt-decode";

const inventoryData = {
    wears: ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'],
    knives: [
        'Bayonet', 'Bowie Knife', 'Butterfly Knife', 'Classic Knife',
        'Falchion Knife', 'Flip Knife', 'Gut Knife', 'Huntsman Knife',
        'Karambit', 'M9 Bayonet', 'Navaja Knife', 'Nomad Knife',
        'Paracord Knife', 'Shadow Daggers', 'Skeleton Knife',
        'Stiletto Knife', 'Survival Knife', 'Talon Knife', 'Ursus Knife'
    ],
    finishes: [
        "Vanilla", "Safari Mesh", "Urban Masked", "Scorched", "Boreal Forest", "Stained",
        "Blue Steel", "Night", "Forest DDPAT", "Crimson Web", "Slaughter", "Fade", "Rust Coat",
        "Ultraviolet", "Damascus Steel", "Tiger Tooth", "Doppler (Phase 1)", "Doppler (Phase 2)",
        "Doppler (Phase 3)", "Doppler (Phase 4)", "Doppler (Ruby)", "Doppler (Sapphire)",
        "Doppler (Black Pearl)", "Marble Fade", "Freehand", "Bright Water", "Black Laminate",
        "Autotronic", "Lore", "Gamma Doppler (Phase 1)", "Gamma Doppler (Phase 2)",
        "Gamma Doppler (Phase 3)", "Gamma Doppler (Phase 4)", "Gamma Doppler (Emerald)",
        "Case Hardened"
    ],
};
const wearDictionary = {
    'Factory New' : 'FN',
    'Minimal Wear' : 'MW',
    'Field-Tested' : 'FT',
    'Well-Worn' : 'WW',
    'Battle-Scarred' : 'BS'
}

function renderOptions(options) {
    return options.map((option, index) => (
        <option key={index}>{option}</option>
    ));
}

function getUserId() {
    const auth_token = sessionStorage.getItem('auth_token');
    const decoded = jwtDecode(auth_token);
    return decoded.user.id;
}

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
                status: 'Active'
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
                    <legend><b>Have</b></legend>
                    <label htmlFor="haveWears">Wear</label>
                    <input type="text" id="haveWears" name="haveWears" list="wearOptions" />
                    <datalist id="wearOptions">{renderOptions(inventoryData.wears)}</datalist>

                    <label htmlFor="haveKnives">Knife</label>
                    <input type="text" id="haveKnives" name="haveKnives" list="knifeOptions" />
                    <datalist id="knifeOptions">{renderOptions(inventoryData.knives)}</datalist>

                    <label htmlFor="haveFinishes">Finish</label>
                    <input type="text" id="haveFinishes" name="haveFinishes" list="finishOptions" />
                    <datalist id="finishOptions">{renderOptions(inventoryData.finishes)}</datalist>

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

                <h2>For: </h2>
                <ul>
                    {
                        forItems.map((item) => (
                            <li key={item._id}>{item.knife} {item.finish} ({item.wear})</li>
                        ))
                    }
                </ul>

                    <button type="submit" id="submitBtn">Make Offer</button>

                </form>


            </div>
        </div>
    );
}