import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import graphFactory from "./graph-factory";
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

class D3Dagre extends Component {
  constructor() {
    super();
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
    console.log("addNode");
  }

  componentDidMount() {
    const graph = graphFactory();
    graph.nodes().forEach(id => {
      const node = graph.node(id);
      node.rx = node.ry = 5; // rounded corners
    });

    const render = new dagreD3.render();

    const view = d3.select("svg")
      .call(zoom)
      .append("g")
      .attr("width", "100%")
      .attr("height", "100%");

    render(view, graph);

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

  render() {
    return (
      <React.Fragment>
        <div className="actions">
          <a className="action" onClick={this.addNode}>
            Add Node
          </a>
          <span>|</span>
          <a className="action" onClick={this.zoomIn}>
            Zoom In
          </a>
          <a className="action" onClick={this.zoomOut}>
            Zoom Out
          </a>
        </div>
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
