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
                <thead>
                    <th className="time-header">Time</th>
                    <th className="trade-header" colSpan={3}>Trade</th>
                </thead>

                <tbody>
                {acceptedData.map((offer) => (
                    <tr key={offer._id}>
                        <td className="time-data">{offer.acceptedAt}</td>

                        <td className="trade-data">
                            {offer.offered.map((offeredItem, index, array) => (
                                <span key={index}>
                                    {
                                        (index !== array.length-1) ?
                                            (`${offeredItem.knife} ${offeredItem.finish} (${convertWear(offeredItem.wear)}), `) :
                                            (`${offeredItem.knife} ${offeredItem.finish} (${convertWear(offeredItem.wear)}) `)
                                    }
                                </span>
                            ))}
                        </td>

                       <td>&#x2194;</td>

                        <td className="trade-data">

                            {offer.for.map((acceptedItem, index, array) => (
                                <span key={index}>
                                    {
                                        (index !== array.length-1) ?
                                            (` ${acceptedItem.knife} ${acceptedItem.finish} (${convertWear(acceptedItem.wear)}),`) :
                                            (` ${acceptedItem.knife} ${acceptedItem.finish} (${convertWear(acceptedItem.wear)})`)
                                    }
                                </span>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}