import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import "./Graph.css";

class Graph extends Component {
  componentDidMount() {
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));

    g.setNode(0, { label: "ROOT", class: "type-TOP" });
    g.setNode(1, { label: "step 01", class: "type-S" });
    g.setNode(2, { label: "NP", class: "type-NP" });
    g.setNode(3, { label: "DT", class: "type-DT" });
    g.setNode(4, { label: "This", class: "type-TK" });
    g.setNode(5, { label: "VP", class: "type-VP" });
    g.setNode(6, { label: "VBZ", class: "type-VBZ" });
    g.setNode(7, { label: "is", class: "type-TK" });
    g.setNode(8, { label: "NP", class: "type-NP" });
    g.setNode(9, { label: "DT", class: "type-DT" });
    g.setNode(10, { label: "an", class: "type-TK" });
    g.setNode(11, { label: "NN", class: "type-NN" });
    g.setNode(12, { label: "example", class: "type-TK" });
    g.setNode(13, { label: ".", class: "type-." });
    g.setNode(14, { label: "sentence", class: "type-TK" });

    // Add edges to the graph.

    // Set up edges, no special attributes.
    g.setEdge(3, 4);
    g.setEdge(2, 3);
    g.setEdge(1, 2);
    g.setEdge(6, 7);
    g.setEdge(5, 6);
    g.setEdge(9, 10);
    g.setEdge(8, 9);
    g.setEdge(11, 12);
    g.setEdge(8, 11);
    g.setEdge(5, 8);
    g.setEdge(1, 5);
    g.setEdge(13, 14);
    g.setEdge(1, 13);
    g.setEdge(0, 1);

    const renderer = new dagreD3.render();

    const svg = d3
      .select(document.getElementById("canvas"))
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(
        d3.zoom().on("zoom", () => svg.attr("transform", d3.event.transform))
      )
      .on("click", () => {
        console.log("clicked");
      })
      .append("g");

    renderer(svg, g);
  }
  render() {
    //return <svg style={{ height: "500px", width: "600px" }} id="nodeTree" />;
    return <div style={{ height: "1000px", width: "1000px" }} id="canvas" />;
  }
}

export default Graph;
