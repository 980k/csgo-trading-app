import React from 'react';
import './Offer.css'

export function IncomingOffers({ data }) {
    return(
        <div className="incoming-component">
            <h2>Incoming Offers &darr;</h2>
            <div className="incoming-item">
                <div className="original">
                    <span className="label"><b>[H]</b>ave</span>
                    <ul>
                        <li>one</li>
                    </ul>

                    <span className="label"><b>[W]</b>ant</span>

                    <ul>
                        <li>M9 Bayonet | Sapphire (MW)</li>
                        <li>Flip Knife | Lore (FT)</li>
                    </ul>

                </div>
                <div className="offered">
                    <span className="label"><b>testuser2 Offered:</b></span>
                    <ul>
                        <li>Flip Knife | Lore (MW) </li>
                    </ul>

                    <span className="label"><b>For:</b></span>
                    <ul>
                        <li>Bayonet | Doppler (FT) </li>
                    </ul>

                </div>
            </div>


            <div className="incoming-item">
                <div className="original">
                    <span className="label"><b>[H]</b>ave</span>
                    <ul>
                        <li>one</li>
                    </ul>

                    <span className="label"><b>[W]</b>ant</span>

                    <ul>
                        <li>M9 Bayonet | Sapphire (MW)</li>
                        <li>Flip Knife | Lore (FT)</li>
                    </ul>

                </div>
                <div className="offered">
                    <span className="label"><b>testuser2 Offered:</b></span>
                    <ul>
                        <li>Flip Knife | Lore (MW) </li>
                    </ul>

                    <span className="label"><b>For:</b></span>
                    <ul>
                        <li>Bayonet | Doppler (FT) </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export function OutgoingOffers() {
    return(
        <div className="outgoing-component">
            <h2>Outgoing Offers &uarr;</h2>

            <div className="outgoing-item">
                <div className="offered">
                    <span className="label"><b>You Offered:</b></span>
                    <ul>
                        <li>Flip Knife | Lore (MW) </li>
                    </ul>

                    <span className="label"><b>For:</b></span>
                    <ul>
                        <li>Bayonet | Doppler (FT) </li>
                    </ul>

                </div>
                <div className="original">
                    <span className="label"><b>[H]</b>ave</span>
                    <ul>
                        <li>one</li>
                    </ul>

                    <span className="label"><b>[W]</b>ant</span>

                    <ul>
                        <li>M9 Bayonet | Sapphire (MW)</li>
                        <li>Flip Knife | Lore (FT)</li>
                    </ul>

                </div>
            </div>
        </div>
    );
}
