// App.jsx
import React, { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";
import SearchField from "./SearchField";
// import SideNav from "./SideNav";
const App = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <div>
      <div className="sidebar-left">
        <Sidebar onMenuItemClick={handleMenuItemClick} />
      </div>
      <div className="main">
        <MapComponent />
      </div>
    </div>
  );
};

export default App;
