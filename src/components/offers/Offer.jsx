import React from 'react';
import { convertWear} from "../../utilities/Utilities";
import '../../styles/components/Offer.css'

export function IncomingOffers({ data, onDeclineOffer, onAcceptOffer }) {
    return (
        <div className="incoming-component">
            <h2>Incoming Offers &darr;</h2>

            {data.flatMap((item) =>
                item.offers.map((offer) => (
                    <div key={offer._id} className="incoming-item">
                        <div className="original">
                            <span className="label"><b>[H]</b>ave</span>
                            {/* Render the 'item.trade.have' data */}
                            <ul>
                                {item.trade.have.map((haveItem) => (
                                    <li key={haveItem._id}>{`${haveItem.knife} ${haveItem.finish} (${convertWear(haveItem.wear)})`}</li>
                                ))}
                            </ul>

                            <span className="label"><b>[W]</b>ant</span>
                            {/* Render the 'item.trade.want' data */}
                            <ul>
                                {item.trade.want.map((wantItem) => (
                                    <li key={wantItem._id}>{`${wantItem.knife} ${wantItem.finish} (${convertWear(wantItem.wear)})`}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="offered">
                            <span className="label"><b>{`${offer.userId} Offered:`}</b></span>
                            {/* Render the 'offer.offered' data */}
                            <ul>
                                {offer.offered.map((offeredItem) => (
                                    <li key={offeredItem._id}>{`${offeredItem.knife} ${offeredItem.finish} (${convertWear(offeredItem.wear)})`}</li>
                                ))}
                            </ul>

                            <span className="label"><b>For:</b></span>
                            {/* Render the 'offer.for' data */}
                            <ul>
                                {offer.for.map((forItem) => (
                                    <li key={forItem._id}>{`${forItem.knife} ${forItem.finish} (${convertWear(forItem.wear)})`}</li>
                                ))}
                            </ul>
                        </div>
                        {
                            offer.status === "pending" ? (
                                <div className="button-container">
                                    <button className="action"
                                            id="accept-btn"
                                            onClick={() => onAcceptOffer(offer.tradeId, offer._id)}
                                    >Accept
                                    </button>
                                    <button
                                        className="action"
                                        id="decline-btn"
                                        onClick={() => onDeclineOffer(offer._id)} // Call the parent's onDeclineOffer function
                                    >
                                        Decline
                                    </button>
                                </div>
                            ) : (
                                <div className="offer-status">
                                    {offer.status === "declined" ? (
                                        <span><i>Trade Declined</i></span>
                                    ) : (
                                        <span><i>Trade Accepted</i></span>
                                    )}
                                </div>
                            )
                        }
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
                        <div className="label-header">
                            <span className="label"><b>You Offered:</b></span>
                            <span className="status"><b>status:</b> <i>{entry.offer.status}</i></span>
                        </div>
                        <ul>
                            {entry.offer.offered.map((offerItem) => (
                                <li key={offerItem._id}>{`${offerItem.knife} ${offerItem.finish} (${convertWear(offerItem.wear)})`}</li>
                            ))}
                        </ul>
                        <div className="label-header">
                        <span className="label"><b>For:</b></span>
                        </div>

                        <ul>
                            {entry.offer.for.map((forItem) => (
                                <li key={forItem._id}>{`${forItem.knife} ${forItem.finish} (${convertWear(forItem.wear)})`}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="original">
                        <span className="label"><b>[H]</b>ave</span>
                        <ul>
                            {entry.trade.have.map((haveItem) => (
                                <li key={haveItem._id}>{`${haveItem.knife} ${haveItem.finish} (${convertWear(haveItem.wear)})`}</li>
                            ))}
                        </ul>
                        <span className="label"><b>[W]</b>ant</span>
                        <ul>
                            {entry.trade.want.map((wantItem) => (
                                <li key={wantItem._id}>{`${wantItem.knife} ${wantItem.finish} (${convertWear(wantItem.wear)})`}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

