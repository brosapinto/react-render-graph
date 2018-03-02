import React, { Component } from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import "./D3Dagre.css";

class D3Dagre extends Component {
  componentDidMount() {
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));

    g.setNode(0, { label: "ROOT", class: "type-TOP" });
    g.setNode(1, { label: "step 01", class: "type-S" });
    g.setNode(2, { label: "step 02", class: "type-NP" });
    g.setNode(3, { label: "Waz", class: "type-DT" });
    g.setNode(4, { label: "Up", class: "type-TK" });
    g.setNode(5, { label: "Hey", class: "type-VP" });
    g.setNode(6, { label: "Hello", class: "type-VBZ" });
    g.setNode(7, { label: "🤢 ", class: "type-TK" });
    g.setNode(8, { label: "I'm a node", class: "type-NP" });
    g.setNode(9, { label: "🤖", class: "type-DT" });
    g.setNode(10, { label: "an", class: "type-TK" });
    g.setNode(11, { label: "xpto", class: "type-NN" });
    g.setNode(12, { label: "💩 ", class: "type-TK" });
    g.setNode(13, { label: "😎", class: "type-." });
    g.setNode(14, { label: "😀", class: "type-TK" });

    // Add edges to the graph.

    // Set up edges, no special attributes.
    g.setEdge(3, 4);
    g.setEdge(2, 3);
    g.setEdge(1, 2);
    g.setEdge(6, 7);
    g.setEdge(5, 6);
    g.setEdge(9, 10);
    g.setEdge(8, 9);
    g.setEdge(8, 14);
    g.setEdge(14, 13);
    g.setEdge(3, 7);
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
      .append("g");

    renderer(svg, g);

    svg.selectAll("g.node").on("click", e => {
      console.log("node clicked", e);
    });
  }
  render() {
    return <div style={{ height: "750px", width: "750px" }} id="canvas" />;
  }
}

export default D3Dagre;
