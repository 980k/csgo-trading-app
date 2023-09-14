import React from 'react';
import '../../styles/components/Activity.css'

export default function Activity() {
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
                <tr>
                    <td>5m</td>
                    <td> Karambit Fade (FN) &#x2194; M9 Bayonet Fade (FN) </td>
                </tr>
                <tr>
                    <td>10m</td>
                    <td> Butterfly Knife Slaughter (FN) &#x2194; Butterfly K... </td>
                </tr>
                <tr>
                    <td>30m</td>
                    <td> Bayonet Tiger Tooth (FN) &#x2194; Flip Knife Dop... </td>
                </tr>
                <tr>
                    <td>45m</td>
                    <td> Stiletto Knife Crimson Web (FN) &#x2194; Nomad ... </td>
                </tr>
                <tr>
                    <td>1h</td>
                    <td> Talon Knife Marble Fade (FN) &#x2194; Skeleton K... </td>
                </tr>
                <tr>
                    <td>2h</td>
                    <td> Karambit Fade (FN) &#x2194; M9 Bayonet Fade (FN) </td>
                </tr>
                <tr>
                    <td>2.5h</td>
                    <td> Butterfly Knife Slaughter (FN) &#x2194; Butterfly K... </td>
                </tr>
                <tr>
                    <td>3h</td>
                    <td> Bayonet Tiger Tooth (FN) &#x2194; Flip Knife Dop... </td>
                </tr>
                <tr>
                    <td>5h</td>
                    <td> Stiletto Knife Crimson Web (FN) &#x2194; Nomad ... </td>
                </tr>
                <tr>
                    <td>10h</td>
                    <td> Talon Knife Marble Fade (FN) &#x2194; Skeleton K... </td>
                </tr>
            </table>
        </div>
    );
}