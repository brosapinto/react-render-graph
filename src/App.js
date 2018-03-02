import React, { Component } from "react";
import Graph from "react-json-graph";
import dagre from "dagre";

class App extends Component {
  nodes = [];
  edges = [];

  render() {
    const graph = new dagre.graphlib.Graph();

    graph.setGraph({}).setDefaultEdgeLabel(() => ({}));

    graph
      .setNode("A", { label: "A", width: 160, height: 36 })
      .setNode("C", { label: "C", width: 160, height: 36 })
      .setNode("B", { label: "B", width: 160, height: 36 })
      .setNode("D", { label: "D", width: 160, height: 36 })
      .setNode("E", { label: "E", width: 160, height: 36 })
      .setNode("F", { label: "F", width: 160, height: 36 })
      .setNode("G", { label: "G", width: 160, height: 36 })
      .setNode("H", { label: "H", width: 160, height: 36 });

    graph
      .setEdge("A", "B")
      .setEdge("A", "C")
      .setEdge("B", "G")
      .setEdge("B", "H")
      .setEdge("C", "D")
      .setEdge("C", "E")
      .setEdge("E", "F")
      .setEdge("E", "A");

    dagre.layout(graph);

    this.nodes = graph.nodes().map(id => {
      const node = graph.node(id);
      return {
        id,
        label: node.label,
        position: { x: node.x, y: node.y }
      };
    });

    this.edges = graph.edges().map(({ v: source, w: target }) => ({
      source,
      target
    }));

    return (
      <div className="App">
        <Graph
          width={900}
          height={600}
          json={{
            nodes: this.nodes,
            edges: this.edges,
            isStatic: true,
            isVertical: true,
            isDirected: true
          }}
          onChange={newGraphJSON => {}}
        />
      </div>
    );
  }
}

export default App;
