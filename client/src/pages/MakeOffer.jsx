import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MakeOfferForm from '../components/makeoffer/MakeOfferForm';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MakeOffer() {
    const {_id} = useParams();
    const [tradeData, setTradeData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/trades/${_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((tradeDataArray) => {
                if (Array.isArray(tradeDataArray) && tradeDataArray.length > 0) {
                    setTradeData(tradeDataArray[0]);
                    setLoading(false);
                } else {
                    setError(new Error('Invalid data format.'));
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [_id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="offer-tab">
                    <MakeOfferForm tradeData={tradeData}/>
                </div>
            )}
            <ToastContainer
                position="top-right"
                toastStyle={{top: "55px", boxShadow: "none",
                    border:"1px solid #dcdcdd", color:"#6d6d6d"}}
                hideProgressBar={true}
                autoClose={1500}/>
        </div>
    );
}