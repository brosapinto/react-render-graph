import React from "react";
import "./node.css";

class Node extends React.Component {
  state = {
    toggle: false
  };

  onClickHandler() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  render() {
    const { icon, name, description, position: { x, y } } = this.props;
    const toggle = this.state.toggle ? "node focus" : "node";

    return (
      <g
        className={toggle}
        onClick={() => this.onClickHandler()}
        transform={`translate(${x}, ${y})`}
      >
        <rect className="box" rx="5" />
        <text
          className="icon"
          xmlSpace="preserve"
          textAnchor="start"
          y="35"
          x="16"
        >
          {icon}
        </text>
        <text
          className="name"
          xmlSpace="preserve"
          textAnchor="start"
          y="35"
          x="44"
        >
          {name}
        </text>
        <text xmlSpace="preserve" textAnchor="start" y="65" x="44">
          {description}
        </text>
      </g>
    );
  }
}

export default Node;
