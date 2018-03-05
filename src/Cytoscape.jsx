import React, { Component } from "react";
import cytoscape from "cytoscape";
import graphFactory from "./graph-factory";
import dagre from "dagre";

class Cytoscape extends Component {
  componentDidMount() {
    const graph = graphFactory();
    dagre.layout(graph);

    const cy = cytoscape({
      container: document.getElementById("canvas"),

      boxSelectionEnabled: false,
      autounselectify: true,
      zoom: 1,
      minZoom: 0.3,
      maxZoom: 2,

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
          selector: "edge",
          style: {
            "curve-style": "bezier",
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
        }
      ]
    });

    const grid = a => a - a % 80;

    graph.nodes().forEach(id => {
      const { x, y, label, width, height } = graph.node(id);
      // debugger;
      cy.add({
        group: "nodes",
        // grabbable: false,
        // locked: true,
        // data: { weight: 75 },
        // data: { id, width: node.width, height: node.height },
        // data: { id, label: node.label, weight: node.weight || 10 },
        data: { id, label, width, height },
        // position: { x: grid(x), y: grid(y) }
        position: { x, y }
      });
    });

    graph.edges().forEach(edge => {
      const { v: source, w: target, name, label } = edge;
      debugger;
      cy.add({
        group: "edges",
        data: {
          source,
          target,
          label: label || name
        }
      });
    });

    cy.on("click", "node", function(evt) {
      var node = evt.target;
      console.log("node " + node.cy());
    });

    cy.on("click", "edge", function(evt) {
      var edge = evt.target;
      debugger;
      console.log("edge ", edge);
    });

    const layout = cy.layout({
      name: "preset"
    });

    layout.run();
  }

  render() {
    return <div style={{ height: "750px", width: "1200px" }} id="canvas" />;
  }
}

export default Cytoscape;
