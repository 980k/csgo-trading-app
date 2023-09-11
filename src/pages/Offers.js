import React, {useState, useEffect, useRef} from 'react';
import './Offers.css';
import { IncomingOffers, OutgoingOffers} from "../components/offers/Offer";

export default function Offers() {
    const [data, setData] = useState([]);
    const hasRendered = useRef(false);

    return(
        <div className="offer-grid-container">
            <div className="incoming-tab">
                <IncomingOffers data={data} />
            </div>

            <div className="outgoing-tab">
                <OutgoingOffers />
            </div>
        </div>
    );
}