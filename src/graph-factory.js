import dagre from "dagre";

/**
 * Creates a Directed Graph using Dagre
 * This graph should be used by all rendering options as a benchmark
 * @returns {Object} Dagre Graph instance
 */
const graphFactory = () => {
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({}).setDefaultEdgeLabel(() => ({}));

  graph
    .setNode("A", { label: "A", width: 160, height: 36 })
    .setNode("C", { label: "C", width: 160, height: 36 })
    .setNode("B", { label: "B", width: 160, height: 36 })
    .setNode("D", { label: "D", width: 160, height: 36 })
    .setNode("E", { label: "E", width: 160, height: 36 })
    .setNode("F", { label: "F", width: 160, height: 36 })
    .setNode("G", { label: "G", width: 160, height: 36 })
    .setNode("H", { label: "H", width: 160, height: 36 });

  graph
    .setEdge("A", "B")
    .setEdge("A", "C")
    .setEdge("B", "G")
    .setEdge("B", "H")
    .setEdge("C", "D")
    .setEdge("C", "E")
    .setEdge("E", "F")
    .setEdge("E", "A");

  return graph;
};

export default graphFactory;
