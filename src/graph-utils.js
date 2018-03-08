import dagre from "dagre";
import { curry } from "./fn-utils";

/**
 * @param {Object} node Node object
 * @param {Graph} graph Dagre graph instance
 * @returns {Graph} Dagre graph instance with new node appended
 */
export const setNode = curry((node, graph) => graph.setNode(node.id, node));

/**
 * @param {String} orig ID of the outbound node
 * @param {String} dest ID of the inbound node
 * @param {Graph} graph Dagre graph instance
 * @returns {Graph} Dagre graph instance with new connection
 */
export const setEdge = curry((orig, dest, graph) => graph.setEdge(orig, dest));

/**
 * Calculate the layout of a graph
 * @param {Graph} graph Dagre graph instance
 */
export const calcLayout = graph => {
  const { setPrototypeOf, getPrototypeOf } = Object;
  // shallow copy, preserving prototype chain
  const newGraph = setPrototypeOf({ ...graph }, getPrototypeOf(graph));
  // use dagre to calculate new layout
  dagre.layout(newGraph);

  return newGraph;
};
