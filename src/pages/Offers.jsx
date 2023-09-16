import React, {useState, useEffect} from 'react';
import { IncomingOffers, OutgoingOffers} from "../components/offers/Offer";
import { getUserId } from "../utilities/Utilities";
import '../styles/pages/Offers.css';

export default function Offers() {
    const [offerData, setOfferData] = useState({
        tradeOffers: [],
        associatedTrades: [],
    });

    useEffect(() => {
        const auth_token = sessionStorage.getItem('auth_token');

        if (!auth_token) {
            return;
        }

        const userId = getUserId();

        fetch(`http://localhost:4000/offers/all/${userId}`)
            .then((response) => response.json())
            .then((newData) => {
                // Update the offerData state with the new data
                setOfferData(newData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Function to update the offer status and fetch updated data
    const handleDeclineOffer = (offerId) => {
        // Make a network request to update the offer status in the database
        fetch(`http://localhost:4000/offers/update/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "declined"
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Response error encountered.');
                }
                // After successfully updating the status, fetch the updated data
                return fetch(`http://localhost:4000/offers/all/${getUserId()}`);
            })
            .then((response) => response.json())
            .then((newData) => {
                // Update the offerData state with the updated data
                setOfferData(newData);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const handleAcceptOffer = (tradeId, offerId) => {
        fetch(`http://localhost:4000/api/trades/${tradeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                acceptedOffer: offerId,
                offerStatus: "accepted",
                tradeStatus: "inactive"
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Response error encountered.');
                }
                return fetch(`http://localhost:4000/offers/all/${getUserId()}`);
            })
            .then((response) => response.json())
            .then((newData) => {
                setOfferData(newData);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });

        fetch(`http://localhost:4000/offers/update/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "accepted"
            })
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Response error encountered.');
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    return (
        <div className="offer-grid-container">
            <div className="incoming-tab">
                {/* Pass the offerData state and the decline handler to IncomingOffers */}
                <IncomingOffers data={offerData.tradeOffers} onDeclineOffer={handleDeclineOffer} onAcceptOffer={handleAcceptOffer} />
            </div>

            <div className="outgoing-tab">
                <OutgoingOffers data={offerData.associatedTrades} />
            </div>
        </div>
    );
}
