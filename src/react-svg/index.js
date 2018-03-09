import React from "react";

import Node from "./Node";
import Edge from "./Edge";
import GraphToolbar from "../GraphToolbar";

import graphFactory from "../graph-factory";
import { convertNode, convertEdge } from "./data-adapter";
import { pipe } from "../fn-utils";
import { setNode, setEdge, calcLayout } from "../graph-utils";

let initialPoint = {
  x: 0,
  y: 0,
  triggerMove: false
};

class ReactSVG extends React.Component {
  state = {
    scale: 1,
    x: 0,
    y: 0,
    nodes: [],
    edges: []
  };

  static convertGraph(graph) {
    const nodes = graph
      .nodes()
      .map(nId => graph.node(nId))
      .map(convertNode);

    const edges = graph
      .edges()
      .map(edge => convertEdge(edge, graph.edge(edge)));

    return { nodes, edges };
  }

  componentDidMount() {
    this.graph = graphFactory();
    const state = pipe(calcLayout, ReactSVG.convertGraph)(this.graph);

    this.setState({ ...state });
  }

  addNode() {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    // randomly create a new node and connection
    const nodes = this.graph.nodes();
    const parentNodeId = nodes[randomInt(1, nodes.length)];
    const randomId = parentNodeId + String.fromCharCode(randomInt(65, 90));

    // update graph, calc layout and convert it for ReactGraph
    const state = pipe(
      setNode({ id: randomId, label: randomId, width: 250, height: 90 }),
      setEdge({ v: parentNodeId, w: randomId, name: "x", minlen: 2 }),
      calcLayout,
      ReactSVG.convertGraph
    )(this.graph);

    this.setState({ ...state });
  }

  // Move
  onMouseDownHandler(event) {
    event.stopPropagation();

    initialPoint.x = event.pageX;
    initialPoint.y = event.pageY;
    initialPoint.triggerMove = true;
  }

  onMouseMoveHandler(event) {
    event.stopPropagation();

    const { triggerMove } = this.state;
    if (initialPoint.triggerMove) {
      const x = event.pageX - initialPoint.x;
      const y = event.pageY - initialPoint.y;

      initialPoint.x = event.pageX;
      initialPoint.y = event.pageY;

      this.setState(prev => {
        return {
          x: prev.x + x,
          y: prev.y + y
        };
      });
    }
  }

  onMouseUpHandler(event) {
    event.stopPropagation();

    initialPoint.x = 0;
    initialPoint.y = 0;
    initialPoint.triggerMove = false;
  }

  // Zoom
  zoomInHandler(event) {
    event.stopPropagation();

    this.setState(prev => ({
      scale: prev.scale === 0.2 ? prev.scale : prev.scale + prev.scale * 0.1
    }));
  }

  zoomResetHandler(event) {
    event.stopPropagation();

    this.setState(prev => ({ scale: 1 }));
  }

  zoomOutHandler(event) {
    event.stopPropagation();

    this.setState(prev => ({
      scale: prev.scale === 4 ? prev.scale : prev.scale - prev.scale * 0.1
    }));
  }

  render() {
    const { x, y, scale, nodes, edges } = this.state;

    return (
      <React.Fragment>
        <GraphToolbar
          addNode={() => this.addNode()}
          zoomIn={e => this.zoomInHandler(e)}
          zoomOut={e => this.zoomOutHandler(e)}
          reset={e => this.zoomResetHandler(e)}
        />
        <div
          style={{
            backgroundColor: "rgb(232, 235, 237)",
            width: "100%",
            height: "100%"
          }}
        >
          <svg
            width="100%"
            height="100%"
            onMouseDown={e => this.onMouseDownHandler(e)}
            onMouseUp={e => this.onMouseUpHandler(e)}
            onMouseMove={e => this.onMouseMoveHandler(e)}
          >
            <g transform={`translate(${x}, ${y}) scale(${scale})`}>
              {nodes.map((node, index) => <Node key={index} {...node} />)}
              {edges.map((edge, index) => <Edge key={index} {...edge} />)}
            </g>
          </svg>
        </div>
      </React.Fragment>
    );
  }
}

export default ReactSVG;
