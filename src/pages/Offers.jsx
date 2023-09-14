import React, {useState, useEffect} from 'react';
import { IncomingOffers, OutgoingOffers} from "../components/offers/Offer";
import { getUserId } from "../utilities/Utilities";
import '../styles/pages/Offers.css';

export default function Offers() {
    const [data, setData] = useState({
        tradeOffers: [],
        associatedTrades: [],
    });

    useEffect(() => {
        const auth_token = sessionStorage.getItem('auth_token');

        if(!auth_token) {
            return;
        }

        const userId = getUserId();

        fetch(`http://localhost:4000/offers/all/${userId}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    return(
            <div className="offer-grid-container">
                <div className="incoming-tab">
                    <IncomingOffers data={data.tradeOffers} />
                </div>

                <div className="outgoing-tab">
                    <OutgoingOffers data={data.associatedTrades} />
                </div>
            </div>
    );
}