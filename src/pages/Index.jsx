import React, { useState, useEffect, useRef } from 'react';
import Filter from "../components/index/Filter";
import Trades from "../components/index/Trades";
import Activity from "../components/index/Activity";
import '../styles/pages/Index.css';

export default function Index() {
    const [ data, setData ] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const hasRendered = useRef(false);

    const handleCheckboxChange = (selectedItems) => {
        setSelectedCheckboxes(selectedItems);
    };

    useEffect(() => {
        let events = null;

        if (!hasRendered.current) {
            events = new EventSource('http://localhost:4000/api/trades');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                setData((data) => data.concat(parsedData));
            };

            hasRendered.current = true;
        }

        return () => {
            if (events) {
                events.close();
                hasRendered.current = false;
            }
        };
    }, []);

    useEffect(() => {
        if (selectedCheckboxes.length === 0) {
            setFilteredData(data);
            return;
        }

        const filteredItems = data.filter((trade) => {
            const haveItems = trade.have;
            const wantItems = trade.want;

            return (
                haveItems.some((haveItem) => selectedCheckboxes.includes(haveItem.knife)) ||
                wantItems.some((wantItem) => selectedCheckboxes.includes(wantItem.knife))
            );
        });

        setFilteredData(filteredItems);
    }, [selectedCheckboxes, data]);

    return(
        <div className="grid-container">
            <div className="left-sidebar">
                <Filter selectedCount={selectedCheckboxes.length}
                        onCheckboxChange={handleCheckboxChange} />
            </div>
            <div className="content" >
                <Trades data={filteredData} />
            </div>
            <div className="right-sidebar">
                <Activity />
            </div>
        </div>
    );
}
