import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import graphFactory from "./graph-factory";
import "./D3Dagre.css";

const SELECTED_CLASS = "selected";

class D3Dagre extends Component {
  componentDidMount() {
    const graph = graphFactory();
    graph.nodes().forEach(id => {
      const node = graph.node(id);
      node.rx = node.ry = 5; // rounded corners
    });

    const render = new dagreD3.render();

    const svg = d3
      .select(document.getElementById("canvas"))
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(
        d3.zoom().on("zoom", () => svg.attr("transform", d3.event.transform))
      )
      .append("g");

    render(svg, graph);

    svg.selectAll("g.node").on("click", function(nodeDatum) {
      // https://github.com/d3/d3-selection/blob/master/README.md#selection_on
      // d3.event - raw event

      console.log("node clicked", nodeDatum);

      const nodeId = nodeDatum;
      const node = d3.select(this);
      const toggledSelection = !node.classed(SELECTED_CLASS);

      const nodeEdges = svg.selectAll("g.edgePath").filter(edgeDatum => {
        // https://github.com/d3/d3-selection/blob/master/README.md#selection_filter
        const { v, w } = edgeDatum; // v, w, name
        return v === nodeId || w === nodeId;
      });

      node.classed(SELECTED_CLASS, toggledSelection);
      nodeEdges.classed(SELECTED_CLASS, toggledSelection);
    });
    // svg.selectAll("g.edgePath").on("click", function(datum, index, groupNodes) {
  }

  render() {
    return <div style={{ height: "750px", width: "750px" }} id="canvas" />;
  }
}

export default D3Dagre;
