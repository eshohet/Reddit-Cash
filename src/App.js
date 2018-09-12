import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from "./layouts/home/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Home}/>
      </div>
    );
  }
}

export default App
