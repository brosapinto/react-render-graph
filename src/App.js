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
      .setNode(0, { label: "Alice", width: 160, height: 36 })
      .setNode(1, { label: "Bob", width: 160, height: 36 })
      .setNode(2, { label: "Luke", width: 160, height: 36 })
      .setNode(3, { label: "John", width: 160, height: 36 });

    graph
      .setEdge(0, 1)
      .setEdge(1, 2)
      .setEdge(1, 1)
      .setEdge(2, 0)
      .setEdge(0, 3);

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
          width={600}
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
