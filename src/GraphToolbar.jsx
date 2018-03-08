import React from "react";

const graphToolbar = ({ addNode, zoomIn, zoomOut, reset }) => (
  <div className="toolbar">
    <div className="actions">
      <button onClick={addNode}>Add Node</button>
      <span>|</span>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={zoomIn}>Zoom In</button>
      {reset && <button onClick={reset}>Reset</button>}
    </div>
  </div>
);

export default graphToolbar;
