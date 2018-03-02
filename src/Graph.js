import React, { Component } from "react";
import cytoscape from "cytoscape";

import Canvas from "./Canvas";

class Graph extends Component {
  state = {
    id: "Graph"
  };

  componentWillReceiveProps(nextProps) {
    const { graph } = nextProps;
    if (!graph) {
      return;
    }
    const cy = cytoscape({
      container: document.getElementById("Graph"),

      boxSelectionEnabled: false,
      autounselectify: true,
      style: [
        {
          selector: "node",
          style: {
            content: "data(id)",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "right",
            "background-color": "#11479e"
          }
        },

        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            width: 4,
            "target-arrow-shape": "triangle",
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea"
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
        data: { id },
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
    return <Canvas id={this.state.id} />;
  }
}

export default Graph;
