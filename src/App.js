import React, { PureComponent } from "react";
import Router from './router/Router';
import logo from "./logo.svg";
import "./App.css";


class App extends PureComponent<{}, State> {
  
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
