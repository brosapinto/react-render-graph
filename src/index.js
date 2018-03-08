import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import logo from "./logo.svg";
import "./index.css";

import D3Dagre from "./dagre-d3/D3Dagre";
import ReactSVG from "./react-svg";
import ReactGraph from "./react-graph/ReactGraph";
import Cytoscape from "./canvas-cytoscape/Cytoscape";
import CytoscapeAuto from "./canvas-cytoscape/CytoscapeAuto";

const Navigation = () => (
  <nav className="navigation">
    <NavLink to="/svg">SVG</NavLink>
    <NavLink to="/react_svg">React SVG</NavLink>
    <NavLink to="/htmlsvg">HTML + SVG</NavLink>
    <NavLink to="/canvas">Canvas</NavLink>
    <NavLink to="/canvasauto">Canvas Auto</NavLink>
  </nav>
);

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <Router>
      <React.Fragment>
        <Navigation />
        <section className="content">
          <Route exact path="/" component={() => <h1>Home</h1>} />
          <Route path="/svg" component={D3Dagre} />
          <Route path="/htmlsvg" component={ReactGraph} />
          <Route path="/canvas" component={Cytoscape} />
          <Route path="/react_svg" component={ReactSVG} />
          <Route path="/canvasauto" component={CytoscapeAuto} />
        </section>
      </React.Fragment>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
