import React from 'react';
import '../../styles/components/Activity.css'
import {convertWear} from "../../utilities/Utilities";

export default function Activity({ data }) {

    const acceptedData = data.filter((item) => item.status === 'accepted');

    return(
        <div className="activity">
            <header>
                <h2>Activity</h2>
            </header>

            <table className="activity-table">
                <tr>
                    <th>Time</th>
                    <th>Trade</th>
                </tr>

                <tbody>
                {acceptedData.map((offer) => (
                    <tr key={offer.id}>
                        <td>5m</td>

                        <td>
                            {offer.offered.map((offeredItem, index) => (
                                <span key={index}>{`${offeredItem.knife} ${offeredItem.finish} (${convertWear(offeredItem.wear)})`}</span>
                            ))}

                            &#x2194;

                            {offer.for.map((acceptedItem, index) => (
                                <span key={index}>{`${acceptedItem.knife} ${acceptedItem.finish} (${convertWear(acceptedItem.wear)})`}</span>
                            ))}
                        </td>
                        {/*<td>*/}
                        {/*    {offer.for.map((acceptedItem, index) => (*/}
                        {/*        <span key={index}>{`${acceptedItem.knife} ${acceptedItem.finish} (${convertWear(acceptedItem.wear)})`}</span>*/}
                        {/*    ))}*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>


            </table>
        </div>
    );
}