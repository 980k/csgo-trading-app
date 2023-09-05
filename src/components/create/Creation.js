import React, { useState } from 'react';
import './Creation.css'

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
                user: 'testUser7',
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

            <div className="swap">&#8645;</div>

            <fieldset>
                <legend><b>Want</b></legend>
                <label htmlFor="wantWears">Wear</label>
                <input type="text" id="wantWears" name="wantWears" list="wearOptions" />
                <datalist id="wearOptions">{renderOptions(inventoryData.wears)}</datalist>

                <label htmlFor="wantKnives">Knife</label>
                <input type="text" id="wantKnives" name="wantKnives" list="knifeOptions" />
                <datalist id="knifeOptions">{renderOptions(inventoryData.knives)}</datalist>

                <label htmlFor="wantFinishes">Finish</label>
                <input type="text" id="wantFinishes" name="wantFinishes" list="finishOptions" />
                <datalist id="finishOptions">{renderOptions(inventoryData.finishes)}</datalist>

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
    )
}