import React, { Component } from "react";
import Graph from "react-json-graph";
import dagre from "dagre";
import graphFactory from "./graph-factory";

class ReactGraph extends Component {
  state = {
    nodes: [],
    edges: []
  };

  /**
   * From Dagre Nodes to ReactJSONGraph nodes
   * @param {Object} graph Dagre graph instance
   * @returns {Array} List of nodes -- [{id, label, position: {x, y}, ...}]
   */
  static convertNodes = graph => {
    const nodes = graph.nodes();

    return nodes
      .map(id => ({ id, ...graph.node(id) }))
      .map(({ id, label, x, y }) => ({
        id,
        label,
        position: { x, y }
      }));
  };

  /**
   * From Dagre Edges to ReactJSONGraph edges
   * @param {Array} edges List of Dagre edges
   * @returns {Array} List of edges -- [{source, target}, ...]
   */
  static convertEdges = edges =>
    edges.map(({ v: source, w: target }) => ({ source, target }));

  componentDidMount() {
    const graph = graphFactory();
    dagre.layout(graph);

    // convert nodes and edges to something
    this.setState({
      nodes: ReactGraph.convertNodes(graph),
      edges: ReactGraph.convertEdges(graph.edges())
    });
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <React.Fragment>
        <Graph
          width={900}
          height={600}
          json={{
            nodes,
            edges,
            isStatic: true,
            isVertical: true,
            isDirected: true
          }}
          onChange={newGraphJSON => {}}
        />
      </React.Fragment>
    );
  }
}

export default ReactGraph;
