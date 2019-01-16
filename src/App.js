import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import Modal from "./components/Modal/Modal";


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
    ],
    show: false
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
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
    const { listItems, show } = this.state;
    return (
      <div className="App">
        <button onClick={this.addItem} />
        <Modal handleClose={this.hideModal} show={show} />
        <ToDoList listItems={listItems} />
      </div>
    );
  }
}

export default App;
