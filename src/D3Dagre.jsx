import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import graphFactory from "./graph-factory";
import "./D3Dagre.css";

class D3Dagre extends Component {
  componentDidMount() {
    const graph = graphFactory();
    const renderer = new dagreD3.render();
    const svg = d3
      .select(document.getElementById("canvas"))
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(
        d3.zoom().on("zoom", () => svg.attr("transform", d3.event.transform))
      )
      .append("g");

    renderer(svg, graph);

    svg.selectAll("g.node").on("click", e => {
      console.log("node clicked", e);
    });
  }
  render() {
    return <div style={{ height: "750px", width: "750px" }} id="canvas" />;
  }
}

export default D3Dagre;
