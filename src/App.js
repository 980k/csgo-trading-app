import './App.css';
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import GridComponent from "./components/Trades";
import Activity from "./components/Activity";
import { NavLink as Link } from "react-router-dom";


export default function App() {
  return (
    <>
        <Navbar/>

        <div id="container">
            <div id="left-sidebar">
                <Filter/>
            </div>
            <div id="content" >
                <GridComponent/>
            </div>

            <div id="right-sidebar">
                <Activity/>
            </div>
        </div>
    </>
  );
}
