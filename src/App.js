import React from 'react';
import Calc from './calc/Calc';
import About from './misc/About';

import './global.scss';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <ul className="menu">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Calculator</Link></li>
        </ul>

        <Switch>
          <Route exact path="/" component={ Calc } />
          <Route exact path="/about" component={ About } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
