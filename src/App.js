import './App.css';
import './components/Navbar';
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
        <Navbar/>

        <div className="container">
            <div className="left-sidebar">Left Sidebar</div>
            <div className="content">Main Content</div>
            <div className="right-sidebar">Right Sidebar</div>
        </div>

    </>
  );
}
