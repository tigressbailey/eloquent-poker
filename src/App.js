import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './scenes/Main';
import NotFound from './scenes/NotFound';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default hot(App);
