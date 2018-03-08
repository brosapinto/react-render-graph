import React from 'react';

import './node.css';

class Node extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            x: props.position.x,
            y: props.position.y
        };

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

        return toggle ? 'node focus' : 'node';
    }

    render() {
        const { icon, name, description } = this.props;
        const {x, y} = this.state;

        return (
            <g className={this.getClassName()}
                onClick={this.onClickHandler}
                transform={`translate(${x}, ${y})`}>
                <rect className="box" rx="5" />
                <text className="icon" xmlSpace="preserve" textAnchor="start" y="35" x="16">{icon}</text>
                <text className="name" xmlSpace="preserve" textAnchor="start" y="35" x="44">{name}</text>
                <text xmlSpace="preserve" textAnchor="start" y="65" x="44" >{description}</text>
            </g >
        );
    }
}

export default Node;