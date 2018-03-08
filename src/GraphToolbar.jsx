import React from "react";

const graphToolbar = ({ addNode, zoomIn, zoomOut }) => (
  <div className="toolbar">
    <div className="actions">
      <button className="action" onClick={addNode}>
        Add Node
      </button>
      <span>|</span>
      <button className="action" onClick={zoomIn}>
        Zoom In
      </button>
      <button className="action" onClick={zoomOut}>
        Zoom Out
      </button>
    </div>
  </div>
);

export default graphToolbar;
