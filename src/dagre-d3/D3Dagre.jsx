import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import graphFactory from "../graph-factory";
import GraphToolbar from "../GraphToolbar";
import "./D3Dagre.css";

const SELECTED_CLASS = "selected";

const zoom = d3
  .zoom()
  .scaleExtent([0, 4])
  .on("zoom", function() {
    const { target, transform } = d3.event;
    const svg = d3.select(this);
    const element = svg.select("g");

    element.attr(
      "transform",
      `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
    );
  });

const graph = graphFactory();
graph.nodes().forEach(id => {
  const node = graph.node(id);
  node.rx = node.ry = 5; // rounded corners
});

const randomInt = max => Math.floor(Math.random() * max);
const randomNode = () => {
  const nodes = graph.nodes();
  const randomIdx = randomInt(nodes.length);
  const randomNodeName = nodes[randomIdx];
  return graph.node(randomNodeName);
};

let counter = 0;

class D3Dagre extends Component {
  constructor() {
    super();

    // this.state = { graph };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.addNode = this.addNode.bind(this);
  }

  zoomIn() {
    const svg = d3.select("svg");
    zoom.scaleBy(svg, 1.1);
  }

  zoomOut() {
    const svg = d3.select("svg");
    zoom.scaleBy(svg, 0.9);
  }

  addNode() {
    const randomNodeName = randomNode().label;
    const id = `n${counter++}`;
    graph.setNode(id, {
      label: id,
      width: 100,
      height: 50,
      rx: 5,
      ry: 5,
      classes: "new"
    });
    graph.setEdge({
      v: randomNodeName,
      w: id,
      name: id,
      minlen: 2
      // weight
    });

    const view = d3.select("svg > g");
    this.renderGraph(view);

    view
      .selectAll("g.node")
      .filter(nodeDatum => nodeDatum === id)
      .classed("new", true);
    view
      .selectAll("g.edgePath")
      .filter(({ v, w }) => v === id || w === id)
      .classed("new", true);

    console.log("addNode", `${randomNodeName} -> ${id}`);
  }

  renderGraph(view) {
    const render = new dagreD3.render();

    render(view, graph);

    const renderGraphBound = this.renderGraph.bind(this, view);
    view.selectAll("g.node").on("contextmenu", function(nodeDatum) {
      d3.event.preventDefault();
      graph.removeNode(nodeDatum);
      renderGraphBound();
    });
    view.selectAll("g.node").on("click", function(nodeDatum) {
      // https://github.com/d3/d3-selection/blob/master/README.md#selection_on
      // d3.event - raw event

      console.log("node clicked", nodeDatum);

      const nodeId = nodeDatum;
      const node = d3.select(this);
      const toggledSelection = !node.classed(SELECTED_CLASS);

      const nodeEdges = view.selectAll("g.edgePath").filter(edgeDatum => {
        // https://github.com/d3/d3-selection/blob/master/README.md#selection_filter
        const { v, w } = edgeDatum; // v, w, name
        return v === nodeId || w === nodeId;
      });

      node.classed(SELECTED_CLASS, toggledSelection);
      nodeEdges.classed(SELECTED_CLASS, toggledSelection);
    });
  }

  componentDidMount() {
    const view = d3
      .select("svg")
      .call(zoom)
      .append("g")
      .attr("width", "100%")
      .attr("height", "100%");

    this.renderGraph(view);
  }

  render() {
    return (
      <React.Fragment>
        <GraphToolbar
          addNode={this.addNode}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
        />
        <svg
          style={{
            margin: "auto",
            display: "block",
            height: "750px",
            width: "750px"
          }}
        />
      </React.Fragment>
    );
  }
}

export default D3Dagre;
