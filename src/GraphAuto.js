import React, { Component } from "react";
import cytoscape from "cytoscape";
import cytoscapeDagre from "cytoscape-dagre";
import Canvas from "./Canvas";

cytoscape.use(cytoscapeDagre);

class GraphAuto extends Component {
  state = {
    id: "GraphAuto"
  };
  componentWillReceiveProps(nextProps) {
    const { graph } = nextProps;
    if (!graph) {
      return;
    }

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
      container: document.getElementById("GraphAuto"),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: "dagre"
      },

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
    return <Canvas id={this.state.id} />;
  }
}

export default GraphAuto;
