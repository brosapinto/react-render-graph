import React, { Component } from "react";
import cytoscape from "cytoscape";
import dagre from "dagre";
import graphFactory from "../graph-factory";
import GraphToolbar from "../GraphToolbar";

function toCytoscapeNode(id, dagreNode, classes) {
  const { x, y, label, width, height } = dagreNode;
  return {
    group: "nodes",
    // grabbable: false,
    // locked: true,
    selected: false, // whether the element is selected (default false)
    selectable: true, // whether the selection state is mutable (default true)
    // autounselectify: false, // Whether nodes should be unselectified

    // data: { weight: 75 },
    // data: { id, width: node.width, height: node.height },
    // data: { id, label: node.label, weight: node.weight || 10 },
    data: { id, label, width, height },
    // position: { x: grid(x), y: grid(y) }
    position: { x, y },
    classes
  };
}
function toCytoscapeEdge(dagreEdge, classes) {
  const { v: source, w: target, name, label } = dagreEdge;
  return {
    group: "edges",
    data: {
      source,
      target,
      label: label || name
    },
    classes
  };
}

const graph = graphFactory();
dagre.layout(graph);
const randomInt = max => Math.floor(Math.random() * max);
const randomNode = () => {
  const nodes = graph.nodes();
  const randomIdx = randomInt(nodes.length);
  const randomNodeName = nodes[randomIdx];
  return graph.node(randomNodeName);
};

let counter = 0;

class Cytoscape extends Component {
  state = {
    cy: null
  };

  constructor() {
    super();
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  zoomIn() {
    const { cy } = this.state;
    const selectedNodes = cy.$("node.selected");
    const position =
      selectedNodes.length > 0 ? selectedNodes[0].position() : undefined;

    cy.zoom({
      level: cy.zoom() + 0.2,
      position
    });
  }

  zoomOut() {
    const { cy } = this.state;
    const selectedNodes = cy.$("node.selected");
    const position =
      selectedNodes.length > 0 ? selectedNodes[0].position() : undefined;
    cy.zoom({
      level: cy.zoom() - 0.2,
      position
    });
  }

  addNode() {
    const { cy } = this.state;
    const nodeId = `e${counter}`;

    graph.setNode(nodeId, {
      label: nodeId,
      width: 100,
      height: 50
    });
    graph.setEdge({
      v: randomNode().label,
      w: nodeId,
      name: `e${counter}`,
      minlen: 2
      // weight
    });

    // generate the new layout
    dagre.layout(graph);

    // sync the new layout with cytoscape
    cy.startBatch();
    graph.nodes().forEach(id => {
      const dagreNode = graph.node(id);
      const cyNode = cy.getElementById(id);

      if (nodeId !== id) {
        cyNode.position({ x: dagreNode.x, y: dagreNode.y });
      } else {
        cy.add(toCytoscapeNode(id, dagreNode, "new"));
      }
    });
    graph
      .edges()
      .filter(e => e.v === nodeId || e.w === nodeId)
      .forEach(edge => cy.add(toCytoscapeEdge(edge, "new")));
    cy.endBatch();

    counter++;
  }

  removeNode(evt) {
    const { cy } = this.state;
    const cytoscapeNode = evt.target;
    const nodeId = cytoscapeNode.id();

    // clean Dagre graph
    graph.edges().forEach(({ v, w }) => {
      if (v === nodeId || w === nodeId) {
        graph.removeEdge(v, w);
      }
    });
    graph.removeNode(nodeId);

    // generate the new layout
    dagre.layout(graph);

    // sync the new layout with cytoscape
    cy.startBatch();
    cytoscapeNode.remove();
    graph.nodes().forEach(id => {
      const { x, y } = graph.node(id);
      const cyNode = cy.getElementById(id);

      cyNode.position({ x, y });
    });
    cy.endBatch();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const cy = cytoscape({
      container: document.getElementById("canvas"),

      boxSelectionEnabled: false,
      autounselectify: true,
      zoom: 1,
      minZoom: 0.3,
      maxZoom: 2,

      // selector: "node:selected",
      style: [
        {
          selector: "node",
          style: {
            width: "data(width)",
            height: "data(height)",
            content: "data(label)",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "center",
            "background-color": "white",

            shape: "roundrectangle",
            "border-style": "dashed",
            "border-width": "2px"
          }
        },
        {
          selector: "node.new",
          style: {
            "border-color": "orangered"
          }
        },
        {
          selector: "node.selected",
          style: {
            "border-style": "double",
            "border-color": "green"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier", // bezier, unbundled-bezier, segments
            // width: 4,
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea",
            "source-arrow-shape": "circle",
            "target-arrow-shape": "triangle",

            label: "data(label)",
            "text-rotation": "autorotate",
            "text-background-color": "white",
            "text-background-shape": "roundrectangle"
            // "edge-distances": "node-position"
          }
        },
        {
          selector: "edge.new",
          style: {
            "line-color": "orangered",
            "target-arrow-color": "orangered"
          }
        },
        {
          selector: "edge.selected",
          style: {
            "line-color": "green",
            "target-arrow-color": "green"
          }
        }
      ]
    });

    this.setState({ cy });
    // const grid = a => a - a % 80;

    graph.nodes().forEach(id => {
      const node = graph.node(id);
      cy.add(toCytoscapeNode(id, node));
    });

    graph.edges().forEach(edge => cy.add(toCytoscapeEdge(edge)));

    const selectedClass = "selected";
    cy.on("click", "node", function(evt) {
      // var node = cy.getElementById(evt.target.id());
      // const isSelected = node.selected();
      // node.select();
      const node = evt.target;
      console.log("click node " + node.id());

      const isSelected = node.hasClass(selectedClass);
      if (isSelected) {
        node.removeClass(selectedClass);
        node.connectedEdges().forEach(e => e.removeClass(selectedClass));
      } else {
        node.addClass(selectedClass);
        node.connectedEdges().forEach(e => e.addClass(selectedClass));
      }
    });

    cy.on("cxttap", "node", this.removeNode);
    // cy.on("cxttap", "node", function(evt) {
    //   var node = evt.target;
    //   console.log("cxttap node " + node.cy());
    // });
    // cy.on("click", "edge", function(evt) {
    //   var edge = evt.target;
    //   debugger;
    //   console.log("click edge ", edge);
    // });
    // cy.on("cxttap", "edge", function(evt) {
    //   var edge = evt.target;
    //   debugger;
    //   console.log("cxttap edge ", edge);
    // });

    const layout = cy.layout({
      name: "preset"
    });
    layout.run();
  }

  render() {
    return (
      <React.Fragment>
        <GraphToolbar
          addNode={this.addNode}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
        />
        <div style={{ height: "750px", width: "1200px" }} id="canvas" />;
      </React.Fragment>
    );
  }
}

export default Cytoscape;
