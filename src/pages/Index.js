import React, { useState, useEffect, useRef } from 'react';
import './Index.css';
import Filter from "../components/index/Filter";
import Trades from "../components/index/Trades";
import Activity from "../components/index/Activity";

export default function Index() {
    const [ data, setData ] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const hasRendered = useRef(false);

    const handleCheckboxChange = (selectedItems) => {
        setSelectedCheckboxes(selectedItems);
    };

    useEffect( () => {
        if (!hasRendered.current) {
            const events = new EventSource('http://localhost:4000/api/trades');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                setData((data) => data.concat(parsedData));
            };

            hasRendered.current = true;
        }
    }, []);

    useEffect(() => {
        if(selectedCheckboxes.length === 0) {
            setFilteredData(data);
            return;
        }

        let filteredItems = [];

        for(let i = 0; i < data.length; i++) {
            const trade = data[i];
            const haveItems = trade.have;
            const wantItems = trade.want;

            for(let j = 0; j < haveItems.length; j++) {
                const haveItem = haveItems[j];
                const item = haveItem.knife;

                if(selectedCheckboxes.includes(item) && !filteredItems.includes(trade)) {
                    filteredItems.push(trade);
                }
            }

            for(let j = 0; j < wantItems.length; j++) {
                const wantItem = wantItems[j];
                const item = wantItem.knife;

                if(selectedCheckboxes.includes(item) && !filteredItems.includes(trade)) {
                    filteredItems.push(trade);
                }
            }
        }
        setFilteredData(filteredItems);
    }, [selectedCheckboxes, data])

    return(
        <div className="grid-container">
            <div className="left-sidebar">
                <Filter selectedCount={selectedCheckboxes.length}
                        onCheckboxChange={handleCheckboxChange} />
                {console.log(filteredData.length)}
            </div>
            <div className="content" >
                <Trades data={filteredData} />
            </div>
            <div className="right-sidebar">
                <Activity />
            </div>
        </div>
    )

}
