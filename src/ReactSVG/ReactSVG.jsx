import React from 'react';
import dagre from "dagre";

import Node from './Node';
import Edge from './Edge';

import DataAdapter from './DataAdapter';

import graphFactory from "./graph-factory";

const nodeMap = (nodeData, index) => {
    const node = graph.node(nodeData);
    return <Node key={index} {...DataAdapter.convertNode(node)} />
}

const edgeMap = (edgeData, index) => {
    const points = graph.edge(edgeData);
    
    return <Edge key={index} {...DataAdapter.convertEdge(edgeData, points)} />
}

const graph = graphFactory();
const layout = dagre.layout(graph);

let initialPoint = {
    x: 0,
    y: 0,
    triggerMove: false
};

class ReactSVG extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scale: 1,
            x: 0,
            y: 0
        };

        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);

        this.zoomInHandler = this.zoomInHandler.bind(this);
        this.zoomResetHandler = this.zoomResetHandler.bind(this);
        this.zoomOutHandler = this.zoomOutHandler.bind(this);
    }

    // Move
    onMouseDownHandler(event) {
        initialPoint.x = event.pageX;
        initialPoint.y = event.pageY;
        initialPoint.triggerMove = true;

        event.stopPropagation();
    }

    onMouseMoveHandler(event) {
        const { triggerMove } = this.state;
        if (initialPoint.triggerMove) {

            const x = event.pageX - initialPoint.x;
            const y = event.pageY - initialPoint.y;

            initialPoint.x = event.pageX;
            initialPoint.y = event.pageY;

            this.setState((prev) => {
                return {
                    x: prev.x + x,
                    y: prev.y + y
                }
            });

            event.stopPropagation();
        }
    }

    onMouseUpHandler(event) {
        initialPoint.x = 0;
        initialPoint.y = 0;
        initialPoint.triggerMove = false;

        event.stopPropagation();
    }

    // Zoom
    zoomInHandler(event) {
        event.stopPropagation();

        this.setState((prev) => ({
            scale: prev.scale === 0.2 ? prev.scale : prev.scale + (prev.scale * 0.1)
        }));
    }

    zoomResetHandler(event) {
        event.stopPropagation();

        this.setState((prev) => ({
            scale: 1
        }));
    }

    zoomOutHandler(event) {
        event.stopPropagation();

        this.setState((prev) => ({
            scale: prev.scale === 4 ? prev.scale : prev.scale - (prev.scale * 0.1)
        }));
    }



    render() {
        const { x, y, scale } = this.state;

        return (<div style={{ backgroundColor: 'rgb(232, 235, 237)', width: "100%", height: "100%" }}>
            <div style={{ textAlign: 'center' }}>
                <button onClick={this.zoomOutHandler}>-</button>
                <button onClick={this.zoomResetHandler}>Reset</button>
                <button onClick={this.zoomInHandler}>+</button>
            </div>
            <svg width="100%" height="100%"
                onMouseDown={this.onMouseDownHandler}
                onMouseUp={this.onMouseUpHandler}
                onMouseMove={this.onMouseMoveHandler}>
                <g transform={`translate(${x}, ${y}) scale(${scale})`}>
                    {graph.nodes().map(nodeMap)}
                    {graph.edges().map(edgeMap)}
                </g>
            </svg>
        </div>);
    }
}

export default ReactSVG;