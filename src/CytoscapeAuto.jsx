import React, { Component } from "react";
import cytoscape from "cytoscape";
import graphFactory from "./graph-factory";
import cytoscapeDagre from "cytoscape-dagre";
import dagre from "dagre";

cytoscape.use(cytoscapeDagre);

class CytoscapeAuto extends Component {
  componentDidMount() {
    const graph = graphFactory();
    dagre.layout(graph);

    const nodes = graph.nodes().map(id => {
      const node = graph.node(id);
      return {
        data: {
          id,
          label: node.label,
          position: { x: node.x, y: node.y }
        }
      };
    });
    const edges = graph.edges().map(({ v: source, w: target }) => ({
      data: {
        source,
        target
      }
    }));

    const cy = cytoscape({
      container: document.getElementById("canvas"),

      boxSelectionEnabled: false,
      autounselectify: true,
      minZoom: 1,
      maxZoom: 2,

      layout: {
        name: "dagre"
      },

      style: [
        {
          selector: "node",
          style: {
            content: "data(label)",
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
      ],

      elements: {
        nodes,
        edges
      }
    });
    cy.on("click", "node", function(evt) {
      var node = evt.target;
      console.log("clicked " + node.id());
    });
  }

  render() {
    return <div style={{ height: "750px", width: "1200px" }} id="canvas" />;
  }
}

export default CytoscapeAuto;
