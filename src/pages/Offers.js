import React from 'react';
import './Offers.css';
import Offer from "../components/offers/Offer";

export default function Offers() {
    return(
        <div className="offer-grid-container">
            <div className="incoming-tab">
                <Offer header="Incoming Offers &darr;" />
            </div>

            <div className="outgoing-tab">
                <Offer header="Outgoing Offers &uarr;" />
            </div>
        </div>
    );
}