import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import D3Dagre from "./D3Dagre";
import ReactGraph from "./ReactGraph";
import Cytoscape from "./Cytoscape";
import CytoscapeAuto from "./CytoscapeAuto";
import ReactSVG from "./ReactSVG/ReactSVG";

const Home = () => <h1>Home</h1>;

const Navigation = () => (
  <nav className="navigation">
    <NavLink to="/svg">SVG</NavLink>
    <NavLink to="/htmlsvg">HTML + SVG</NavLink>
    <NavLink to="/react_svg">React SVG</NavLink>
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
          <Route exact path="/" component={Home} />
          <Route path="/svg" component={D3Dagre} />
          <Route path="/htmlsvg" component={ReactGraph} />
          <Route path="/canvas" component={Cytoscape} />
          <Route path="/canvasauto" component={CytoscapeAuto} />
          <Route path="/react_svg" component={ReactSVG} />
        </section>
      </React.Fragment>
    </Router>
  </div>
);

export default App;
