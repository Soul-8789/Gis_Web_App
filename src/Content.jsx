// Content.js
import React from "react";

const Content = ({ selectedItem }) => {
  return (
    <div className="content">
      <h2>{selectedItem}</h2>
      <p>Content for {selectedItem} goes here.</p>
    </div>
  );
};

export default Content;
