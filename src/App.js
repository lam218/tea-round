import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import Modal from "./components/Modal/Modal";

type State = {
  listItems: String[]
};
class App extends PureComponent<{}, State> {
  state = {
    listItems: [],
    show: false,
    validation: false,
    value: ""
  };
  toggleModal = (shouldShow: boolean) => {
    this.setState({ show: shouldShow, validation: false });
  };
  addItem = () => {
    const { value } = this.state;
    if (value === "") {
      this.setState({
        validation: true
      });
    } else {
      this.setState(prevState => ({
        listItems: [...prevState.listItems, { item: prevState.value }],
        show: false,
        value: ""
      }));
    }
  };
  typeValue = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { listItems, show, value, validation } = this.state;
    return (
      <div className="App">
        <button onClick={() => this.toggleModal(true)}>show</button>
        <Modal handleClose={() => this.toggleModal(false)} show={show}>
          <input onChange={this.typeValue} value={value} />
          {validation && <p>Uh oh! Looks like you haven't added a task</p>}
          <button onClick={this.addItem}>add</button>
        </Modal>
        <ToDoList listItems={listItems} />
      </div>
    );
  }
}

export default App;
