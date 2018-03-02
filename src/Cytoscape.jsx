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
      zoom: 2,
      minZoom: 1,
      maxZoom: 2,

      style: [
        {
          selector: "node",
          style: {
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
            width: 4,
            "target-arrow-shape": "triangle",
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea",
            "source-arrow-shape": "circle",
            "target-arrow-shape": "circle"

            // label: "mylabel"
            // "edge-distances": "node-position"
          }
        }
      ]
    });

    graph.nodes().forEach(id => {
      const node = graph.node(id);
      cy.add({
        group: "nodes",
        // data: { weight: 75 },
        // data: { id, width: node.width, height: node.height },
        data: { id, label: node.label },
        position: { x: node.x, y: node.y }
      });
    });

    let i = 1;
    graph.edges().forEach(({ v: source, w: target }) => {
      cy.add({
        group: "edges",
        data: {
          id: "e" + i++,
          source,
          target
        }
      });
    });

    cy.on("click", "node", function(evt) {
      var node = evt.target;
      console.log("clicked " + node.id());
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
