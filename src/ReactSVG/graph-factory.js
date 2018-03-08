import dagre from "dagre";
import sr from "../graphs/sr.json";
import ix from "../graphs/ix.json";
import ex from "../graphs/ex.json";

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

  return graph;
};

export default graphFactory;
