import React, { Component } from "react";
import { default as Graph, Node } from "react-json-graph";
import dagre from "dagre";
import graphFactory from "./graph-factory";
import GraphToolbar from "./GraphToolbar";

class MyGraph extends Graph {
  renderNode(node) {
    const { Node: CustomNode, shouldNodeFitContent } = this.props;
    const { width, height } = node.size || {};
    const { scale, isStatic } = this.state;
    const NodeComponent = CustomNode || Node;

    return (
      <NodeComponent
        scale={scale}
        key={`node_${node.id}`}
        ref={component => {
          component && this.nodeComponents.push(component);
        }}
        getGraph={() => this.graphContainer}
        onChange={nodeJSON => {
          this._onChange(nodeJSON);
        }}
        x={node.position ? node.position.x : 0}
        y={node.position ? node.position.y : 0}
        width={width}
        height={height}
        isStatic={isStatic}
        shouldFitContent={shouldNodeFitContent}
        {...node}
      />
    );
  }
}

class MyNode extends Node {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { x, y, width, height } = this.props;
    const { label } = this.state;

    return (
      <div
        style={{ left: x, top: y, position: "absolute", width, height }}
        ref={element => {
          this.element = element;
        }}
        onMouseDown={event => {}}
      >
        {this.renderContainer({ isDragging: false, content: label })}
      </div>
    );
  }
}

class ReactGraph extends Component {
  graph = graphFactory();
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
      .map(({ id, label, x, y, width, height }) => ({
        id,
        label,
        width,
        height,
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
    dagre.layout(this.graph);

    // convert nodes and edges to something
    this.setState({
      nodes: ReactGraph.convertNodes(this.graph),
      edges: ReactGraph.convertEdges(this.graph.edges())
    });
  }

  addNode() {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    const nodes = this.graph.nodes();
    const parentNodeId = nodes[randomInt(1, nodes.length)];
    const randomId = parentNodeId + String.fromCharCode(randomInt(65, 90));

    this.graph
      .setNode(randomId, {
        label: randomId,
        width: 160,
        height: 36
      })
      .setEdge(parentNodeId, randomId);
    dagre.layout(this.graph);

    this.setState({
      nodes: ReactGraph.convertNodes(this.graph),
      edges: ReactGraph.convertEdges(this.graph.edges())
    });
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <React.Fragment>
        <GraphToolbar addNode={() => this.addNode()} />
        <MyGraph
          width={1200}
          height={900}
          json={{
            nodes,
            edges,
            isStatic: false,
            isVertical: true,
            isDirected: true
          }}
          onChange={newGraphJSON => {}}
          Node={MyNode}
        />
      </React.Fragment>
    );
  }
}

export default ReactGraph;
