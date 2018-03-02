import React, { Component } from "react";
import "./App.css";
import dagre from "dagre";
import Graph from "./Graph";
import GraphAuto from "./GraphAuto";

class App extends Component {
  constructor() {
    super();
    this.state = {
      graph: null
    };
  }

  componentDidMount() {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({}).setDefaultEdgeLabel(() => ({}));

    graph

      // .setNode(0, { label: "Alice", width: 160, height: 36 })
      // .setNode(1, { label: "Bob", width: 160, height: 36 })
      // .setNode(2, { label: "Luke", width: 160, height: 36 })
      // .setNode(3, { label: "John", width: 160, height: 36 })
      // .setEdge(0, 1)
      // .setEdge(0, 2)
      // .setEdge(1, 2)
      // .setEdge(2, 3);

      // .setNode("0", { label: "ROOT", class: "type-TOP" })
      // .setNode("1", { label: "step 01", class: "type-S" })
      // .setNode("2", { label: "step 02", class: "type-NP" })
      // .setNode("3", { label: "Waz", class: "type-DT" })
      // .setNode("4", { label: "Up", class: "type-TK" })
      // .setNode("5", { label: "Hey", class: "type-VP" })
      // .setNode("6", { label: "Hello", class: "type-VBZ" })
      // .setNode("7", { label: "🤢 ", class: "type-TK" })
      // .setNode("8", { label: "I'm a node", class: "type-NP" })
      // .setNode("9", { label: "🤖", class: "type-DT" })
      // .setNode("10", { label: "an", class: "type-TK" })
      // .setNode("11", { label: "xpto", class: "type-NN" })
      // .setNode("12", { label: "💩 ", class: "type-TK" })
      // .setNode("13", { label: "😎", class: "type-." })
      // .setNode("14", { label: "😀", class: "type-TK" })
      // .setEdge("3", "4")
      // .setEdge("2", "3")
      // .setEdge("1", "2")
      // .setEdge("6", "7")
      // .setEdge("5", "6")
      // .setEdge("9", "10")
      // .setEdge("8", "9")
      // .setEdge("8", "14")
      // .setEdge("14", "13")
      // .setEdge("3", "7")
      // .setEdge("11", "12")
      // .setEdge("8", "11")
      // .setEdge("5", "8")
      // .setEdge("1", "5")
      // .setEdge("13", "14")
      // .setEdge("1", "13")
      // .setEdge("0", "1");

      .setNode("n0", {})
      .setNode("n1", {})
      .setNode("n2", {})
      .setNode("n3", {})
      .setNode("n4", {})
      .setNode("n5", {})
      .setNode("n6", {})
      .setNode("n7", {})
      .setNode("n8", {})
      .setNode("n9", {})
      .setNode("n10", {})
      .setNode("n11", {})
      .setNode("n12", {})
      .setNode("n13", {})
      .setNode("n14", {})
      .setNode("n15", {})
      .setNode("n16", {})
      .setEdge("n0", "n1")
      .setEdge("n1", "n2")
      .setEdge("n1", "n3")
      .setEdge("n4", "n5")
      .setEdge("n4", "n6")
      .setEdge("n6", "n7")
      .setEdge("n6", "n8")
      .setEdge("n8", "n9")
      .setEdge("n8", "n10")
      .setEdge("n11", "n12")
      .setEdge("n12", "n13")
      .setEdge("n13", "n14")
      .setEdge("n13", "n15");

    // .setNode("A", { label: "A", width: 160, height: 36 })
    // .setNode("C", { label: "C", width: 160, height: 36 })
    // .setNode("B", { label: "B", width: 160, height: 36 })
    // .setNode("D", { label: "D", width: 160, height: 36 })
    // .setNode("E", { label: "E", width: 160, height: 36 })
    // .setNode("F", { label: "F", width: 160, height: 36 })
    // .setNode("G", { label: "G", width: 160, height: 36 })
    // .setNode("H", { label: "H", width: 160, height: 36 })
    // .setEdge("A", "B")
    // .setEdge("A", "C")
    // .setEdge("B", "G")
    // .setEdge("B", "H")
    // .setEdge("C", "D")
    // .setEdge("C", "E")
    // .setEdge("E", "F")
    // .setEdge("E", "A");

    dagre.layout(graph);
    this.setState({
      graph
    });
  }

  render() {
    return (
      <React.Fragment>
        <Graph graph={this.state.graph} />
        <GraphAuto graph={this.state.graph} />
      </React.Fragment>
    );
  }
}

export default App;
