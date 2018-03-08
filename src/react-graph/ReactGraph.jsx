import React, { Component } from "react";
import { default as Graph, Node } from "react-json-graph";
import GraphToolbar from "../GraphToolbar";
import graphFactory from "../graph-factory";
import { pipe } from "../fn-utils";
import { setNode, setEdge, calcLayout } from "../graph-utils";

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
        onClick={() =>
          console.log(
            `clicked on ID %c${this.props.id}`,
            "color:red;font-weight:bold"
          )
        }
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
   * @param {Graph} graph Dagre graph instance
   * @returns {Object} -- {nodes: [{id, label, position, width, height}, ...], edges: [{source, targer}, ...]}
   */
  static convertGraph = graph => {
    const nodes = graph
      .nodes()
      .map(id => ({ id, ...graph.node(id) }))
      .map(node => ({ ...node, position: { x: node.y, y: node.y } }));

    const edges = graph
      .edges()
      .map(({ v: source, w: target }) => ({ source, target }));

    return { nodes, edges };
  };

  componentDidMount() {
    // get a graph, calculate the layout and convert it for ReactGraph
    const state = pipe(calcLayout, ReactGraph.convertGraph)(graphFactory());
    this.setState({ ...state });
  }

  addNode() {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    // randomly create a new node and connection
    const nodes = this.graph.nodes();
    const parentNodeId = nodes[randomInt(1, nodes.length)];
    const randomId = parentNodeId + String.fromCharCode(randomInt(65, 90));

    // update graph, calc layout and convert it for ReactGraph
    const state = pipe(
      setNode({ id: randomId, label: randomId, width: 250, height: 90 }),
      setEdge({ v: parentNodeId, w: randomId, name: "x", minlen: 2 }),
      calcLayout,
      ReactGraph.convertGraph
    )(this.graph);

    this.setState({ ...state });
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
