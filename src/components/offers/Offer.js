import React from 'react';
import './Offer.css'

export default function Offer({ header } ) {
    return(
        <div className="offer-component">
            <h2>{header}</h2>
        </div>
    );
}