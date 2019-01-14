import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";

type State = {
  listItems: String[]
};
class App extends Component<{}, State> {
  state = {
    listItems: [
      {
        item: "one"
      },
      {
        item: "two"
      },
      {
        item: "three"
      }
    ]
  };
  addItem = () => {
    this.setState(prevState => ({
      listItems: [
        ...prevState.listItems,
        { item: `${prevState.listItems.length}` }
      ]
    }));
  };
  render() {
    const { listItems } = this.state;
    return (
      <div className="App">
        <button onClick={this.addItem} />
        <ToDoList listItems={listItems} />
      </div>
    );
  }
}

export default App;
