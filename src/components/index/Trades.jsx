import React from 'react';
import { NavLink } from 'react-router-dom';
import { convertWear } from "../../utilities/Utilities";
import '../../styles/components/Trades.css';

export default function Trades({ data }) {

    const gridItems = data.map((trade, index) => (
        <div key={trade._id} className="trade-grid-item">

            <div className="trade-list">
        <div><b>[H]</b>ave</div>
        <ul>
            {trade.have.map((item, itemIndex) => (
                <li key={itemIndex}>
                    {item.knife} | {item.finish} ({convertWear(item.wear)})
                </li>
            ))}
        </ul>

        <div><b>[W]</b>ant</div>
        <ul>
            {trade.want.map((item, itemIndex) => (
                <li key={itemIndex}>
                    {item.knife} | {item.finish} ({convertWear(item.wear)})
                </li>
            ))}
        </ul>
        </div>

            <NavLink to={`/offers/${trade._id}`} key={trade._id} className="navlink-offer-btn">
                <div className="offerBtn">Make Offer</div>
            </NavLink>
    </div>
    ));

    return (
        <div className="trade-grid-container">
            {gridItems}
        </div>
    );
}
