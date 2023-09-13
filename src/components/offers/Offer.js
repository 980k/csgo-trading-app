import React from 'react';
import './Offer.css'

export function IncomingOffers({ data }) {
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.trade._id}>
                        <strong>User ID:</strong> {item.trade.userId}
                        <br />
                        <strong>Trade Details:</strong>
                        <ul>
                            <li>
                                <strong>Have:</strong> {item.trade.have.map((haveItem) => (
                                `${haveItem.wear} ${haveItem.knife} ${haveItem.finish}`
                            )).join(', ')}
                            </li>
                            <li>
                                <strong>Want:</strong> {item.trade.want.map((wantItem) => (
                                `${wantItem.wear} ${wantItem.knife} ${wantItem.finish}`
                            )).join(', ')}
                            </li>
                        </ul>
                        <br />
                        <strong>Offer Details:</strong>
                        <ul>
                            {item.offers.map((offer) => (
                                <li key={offer._id}>
                                    <strong>Offered:</strong> {offer.offered.map((offeredItem) => (
                                    `${offeredItem.wear} ${offeredItem.knife} ${offeredItem.finish}`
                                )).join(', ')}
                                    <br />
                                    <strong>For:</strong> {offer.for.map((forItem) => (
                                    `${forItem.wear} ${forItem.knife} ${forItem.finish}`
                                )).join(', ')}
                                    <br />
                                    <strong>Status:</strong> {offer.status}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
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
