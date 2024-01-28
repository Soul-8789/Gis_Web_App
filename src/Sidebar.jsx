// Sidebar.js
import React, { useState } from "react";
import {
  FaHome,
  FaInfo,
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaContao,
} from "react-icons/fa";
// import { FaService } from "react-icons/fa";
import "./App.css";
const Sidebar = ({ onMenuItemClick }) => {
  const menuItems = [
    { label: "Home", icon: <FaHome />, heading: "Dashboard" },
    { label: "About", icon: <FaInfo />, heading: "About Us" },
    { label: "Services", icon: <FaHeart />, heading: "Our Services" },
    { label: "Contact", icon: <FaContao />, heading: "Contact Us" },
  ];

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuItemClick = (item) => {
    setActiveMenu(activeMenu === item ? null : item); // Toggle the activeMenu state
    onMenuItemClick(item);
  };

  return (
    <div className="app">
      <div className="sidebar ">
        <div className="profile-icons">
          <div className="strip ">
            {menuItems.map((menuItem, index) => (
              <div
                key={index}
                onClick={() => handleMenuItemClick(menuItem.label)}
              >
                {menuItem.icon && (
                  <div className="menu-icon">{menuItem.icon}</div>
                )}
              </div>
            ))}
          </div>
          <div className="profile-icon">
            <FaUser />
          </div>
          <div className="logout-icon">
            <FaSignOutAlt />
          </div>
        </div>
      </div>

      {activeMenu && (
        <div className="content-container">
          <div className="popup">
            <h3>{activeMenu}</h3>
            <hr></hr>
            <div className="content-area">{/* Your content goes here */}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
