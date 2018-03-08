import React from 'react';

import './edge.css';

const getMiddlePoint = (points) => {
    const middleIndex = Math.floor(points.length / 2);

    if(points.length % 2 === 0) {
        const pointA = points[middleIndex - 1];
        const pointB = points[middleIndex];

        return {x: pointB.x - pointA.x, y: pointB.y - pointA.y};
    }

    return points[middleIndex];
}

class Edge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };

        this.buildPath = this.buildPath.bind(this);
        this.getClassName = this.getClassName.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    state = {
        toggle: false
    }

    onClickHandler() {
        this.setState((prevState) => ({
            toggle: !prevState.toggle
        }));
    }

    getClassName() {
        const { toggle } = this.state;

        return toggle ? 'edge focus' : 'edge';
    }

    buildPath(points) {
        return points.reduce((acc, point) => {
            return `${acc} ${point.x + (250/2)} ${point.y + (90/2)}`;
        }, '');
    }

    render() {
        const { name, points } = this.props;
        const initPoint = points[0];
        const endPoint = points[points.length - 1];

        const middlePoint = getMiddlePoint(points);
        const labelSize = name.length < 4 ? 50 : name.length * 7;

        return (
            <g className={this.getClassName()} onClick={this.onClickHandler}>
                <path d={`M ${this.buildPath(points)}`} className="outer-line" />
                <path d={`M ${this.buildPath(points)}`} className="inner-line" />
                <circle className="line-end" cx={initPoint.x + (250/2)} cy={initPoint.y + (90/2)} r="5" />
                <circle className="line-end" cx={endPoint.x + (250/2)} cy={endPoint.y + (90/2)} r="5" />
                <rect fill="rgba(150, 150, 150, 1)" width={`${labelSize}px`} height="20px" x={middlePoint.x + (250/2) - (labelSize/2)} y={middlePoint.y + (90/2) - 15} rx="10" />
                <text id="label" xmlSpace="preserve" textAnchor="middle" y={middlePoint.y + (90/2)} x={middlePoint.x + (250/2)} >{name}</text>
            </g>
        );
    }
}

export default Edge;