import React, { PureComponent } from "react";
import ToDoList from "../../containers/VisibleToDoList";
import Footer from '../../components/Footer';
import AddToDo from "../../containers/AddToDo";
import Total from '../../containers/Total';

type State = {
  validation: boolean,
};
export default class Account extends PureComponent<{}, State> {
  state = {
    validation: false,
    value: ""
  };
  addItem = () => {
    const { value } = this.state;
    if (value === "") {
      this.setState({
        validation: true
      });
    } 
  };
  render() {
    const { validation } = this.state;
    return (
      <div className="App">
        <AddToDo validation={validation}/>
        <ToDoList />
        <Total />
        <Footer />
      </div>
    );
  }
}
