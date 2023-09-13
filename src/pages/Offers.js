import React, {useState, useEffect, useRef} from 'react';
import './Offers.css';
import { IncomingOffers, OutgoingOffers} from "../components/offers/Offer";
import jwtDecode from "jwt-decode";

export default function Offers() {
    const [data, setData] = useState([]);

    function getUserId() {
        const auth_token = sessionStorage.getItem('auth_token');
        const decoded = jwtDecode(auth_token);
        return decoded.user.id;
    }

    useEffect(() => {
        const userId = getUserId();

        fetch(`http://localhost:4000/offers/incoming/${userId}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

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