import dagre from "dagre";
import sr from "./graphs/sr.json";
import ix from "./graphs/ix.json";
import ex from "./graphs/ex.json";

/**
 * Creates a Directed Graph using Dagre
 * This graph should be used by all rendering options as a benchmark
 * @returns {Object} Dagre Graph instance
 */
const graphFactory = () => {
  const graph = new dagre.graphlib.Graph({
    multigraph: true,
    compound: false
  });

  // https://github.com/dagrejs/dagre/wiki#configuring-the-layout
  // https://github.com/dagrejs/graphlib/wiki
  graph
    .setGraph({
      rankdir: "TB",
      // align: "UL",
      ranker: "network-simplex" // network-simplex, tight-tree or longest-path
      // nodesep: 200
      // edgesep: 10
      // ranksep: 70
    })
    .setDefaultEdgeLabel(() => ({}));

  const origGraph = ex;
  // const origGraph = ix;
  // const origGraph = sr;

  const initStep = origGraph.init;
  const steps = origGraph.steps;

  steps.forEach(s => {
    graph.setNode(s.id, {
      label: s.id,
      width: 250,
      height: 90
    });
  });

  // let edgeId = 0;
  steps.forEach(s => {
    Object.keys(s.transitions).forEach(t => {
      graph.setEdge({
        v: s.id,
        w: s.transitions[t],
        name: t,
        minlen: 2
        // weight
      });
    });
  });

  // graph
  // .setNode("A", { label: "AAAAA", width: 160, height: 36 })
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

  // .setNode("n0", {})
  // .setNode("n1", {})
  // .setNode("n2", {})
  // .setNode("n3", {})
  // .setNode("n4", {})
  // .setNode("n5", {})
  // .setNode("n6", {})
  // .setNode("n7", {})
  // .setNode("n8", {})
  // .setNode("n9", {})
  // .setNode("n10", {})
  // .setNode("n11", {})
  // .setNode("n12", {})
  // .setNode("n13", {})
  // .setNode("n14", {})
  // .setNode("n15", {})
  // .setNode("n16", {})
  // .setEdge("n0", "n1")
  // .setEdge("n1", "n2")
  // .setEdge("n1", "n3")
  // .setEdge("n4", "n5")
  // .setEdge("n4", "n6")
  // .setEdge("n6", "n7")
  // .setEdge("n6", "n8")
  // .setEdge("n8", "n9")
  // .setEdge("n8", "n10")
  // .setEdge("n11", "n12")
  // .setEdge("n12", "n13")
  // .setEdge("n13", "n14")
  // .setEdge("n13", "n15");

  /* 
    .setNode("A", { label: "A", width: 250, height: 90 })
    .setNode("C", { label: "C", width: 250, height: 90 })
    .setNode("B", { label: "B", width: 250, height: 90 })
    .setNode("D", { label: "D", width: 250, height: 90 })
    .setNode("E", { label: "E", width: 250, height: 90 })
    .setNode("F", { label: "F", width: 250, height: 90 })
    .setNode("G", { label: "G", width: 250, height: 90 })
    .setNode("H", { label: "H", width: 250, height: 90 })
    .setEdge({ v: "A", w: "B", name: "x", minlen: 2 })
    .setEdge({ v: "A", w: "C", name: "x", minlen: 2 })
    .setEdge({ v: "B", w: "G", name: "x", minlen: 2 })
    .setEdge({ v: "B", w: "H", name: "x", minlen: 2 })
    .setEdge({ v: "C", w: "D", name: "x", minlen: 2 })
    .setEdge({ v: "C", w: "E", name: "x", minlen: 2 })
    .setEdge({ v: "E", w: "F", name: "x", minlen: 2 })
    .setEdge({ v: "E", w: "A", name: "x", minlen: 2 }); */

  return graph;
};

export default graphFactory;
