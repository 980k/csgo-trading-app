import React from 'react';
import '../../styles/components/Offer.css'

export function IncomingOffers({ data }) {
    return (
        <div className="incoming-component">
            <h2>Incoming Offers &darr;</h2>

                {data.flatMap((item) =>
                    item.offers.map((offer) => (
                        <div key={offer._id} className="incoming-item">
                            <div className="original">
                                <span className="label"><b>[H]</b>ave</span>
                                <ul>
                                    {item.trade.have.map((haveItem) => (
                                        <li key={haveItem._id}>{`${haveItem.wear} ${haveItem.knife} ${haveItem.finish}`}</li>
                                    ))}
                                </ul>

                                <span className="label"><b>[W]</b>ant</span>
                                <ul>
                                    {item.trade.want.map((wantItem) => (
                                        <li key={wantItem._id}>{`${wantItem.wear} ${wantItem.knife} ${wantItem.finish}`}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offered">
                                <span className="label"><b>{`${offer.userId} Offered:`}</b></span>
                                <ul>
                                    {offer.offered.map((offeredItem) => (
                                        <li key={offeredItem._id}>{`${offeredItem.wear} ${offeredItem.knife} ${offeredItem.finish}`}</li>
                                    ))}
                                </ul>

                                <span className="label"><b>For:</b></span>
                                <ul>
                                    {offer.for.map((forItem) => (
                                        <li key={forItem._id}>{`${forItem.wear} ${forItem.knife} ${forItem.finish}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
}

export function OutgoingOffers({ data }) {
    return (
        <div className="outgoing-component">
            <h2>Outgoing Offers &uarr;</h2>

            {data.map((entry) => (
                <div key={entry.offer._id} className="outgoing-item">
                    <div className="offered">
                        <span className="label"><b>You Offered:</b></span>
                        <ul>
                            {entry.offer.offered.map((offerItem) => (
                                <li key={offerItem._id}>{offerItem.wear} {offerItem.knife} {offerItem.finish}</li>
                            ))}
                        </ul>
                        <span className="label"><b>For:</b></span>
                        <ul>
                            {entry.offer.for.map((forItem) => (
                                <li key={forItem._id}>{forItem.wear} {forItem.knife} {forItem.finish}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="original">
                        <span className="label"><b>[H]</b>ave</span>
                        <ul>
                            {entry.trade.have.map((haveItem) => (
                                <li key={haveItem._id}>{haveItem.wear} {haveItem.knife} {haveItem.finish}</li>
                            ))}
                        </ul>
                        <span className="label"><b>[W]</b>ant</span>
                        <ul>
                            {entry.trade.want.map((wantItem) => (
                                <li key={wantItem._id}>{wantItem.wear} {wantItem.knife} {wantItem.finish}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

