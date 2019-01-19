import React, { PureComponent } from "react";
import Modal from "../../components/Modal";
import ToDoList from "../../containers/VisibleToDoList";
import Footer from '../../components/Footer';
import AddToDo from "../../containers/AddToDo";

type State = {
  listItems: String[],
  show: boolean,
  validation: boolean,
  value: String
};
export default class Account extends PureComponent<{}, State> {
  state = {
    listItems: [],
    show: false,
    validation: false,
    value: ""
  };
  toggleModal = shouldShow => {
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
        {/* <button onClick={() => this.toggleModal(true)}>show</button> */}
        <AddToDo validation={validation}/>
        {/* <Modal handleClose={() => this.toggleModal(false)} show={show}>
          <input onChange={this.typeValue} value={value} />
          
          <button onClick={this.addItem}>add</button>
        </Modal> */}
        <ToDoList />
        <Footer />
      </div>
    );
  }
}
