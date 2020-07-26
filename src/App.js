import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Result from './components/Result';

function App() {
  return (
    <div className="App">
      <h1 className="main-heading">Finding Falcone</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/result" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
