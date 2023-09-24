import React, {useState} from 'react';
import {itemsData} from "../../../objects/commonObjects";
import {renderOptions} from "../../../utilities/Utilities";

export default function AddItem({onAddItem}) {
    const [wearText, setWearText] = useState('');
    const [knifeText, setKnifeText] = useState('');
    const [finishText, setFinishText] = useState('');

    return (
        <>
            <label>
                Wear
                <input value={wearText} type="text" list="wearOptions"
                       onChange={(e) => setWearText(e.target.value)}/>
                <datalist id="wearOptions">{renderOptions(itemsData.wears)}</datalist>
            </label>

            <label>
                Knife
                <input value={knifeText} type="text" list="knifeOptions"
                       onChange={(e) => setKnifeText(e.target.value)}/>
                <datalist id="knifeOptions">{renderOptions(itemsData.knives)}</datalist>

            </label>
            <label>
                Finish
                <input value={finishText} type="text" list="finishOptions"
                       onChange={(e) => setFinishText(e.target.value)}/>
                <datalist id="finishOptions">{renderOptions(itemsData.finishes)}</datalist>
            </label>

            <button onClick={(e) => {
                e.preventDefault();
                setWearText('');
                setKnifeText('');
                setFinishText('');
                onAddItem({
                    wear: wearText,
                    knife: knifeText,
                    finish: finishText
                });
            }}>Add
            </button>
        </>
    );
}