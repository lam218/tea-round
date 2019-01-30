import React, { PureComponent } from "react";
import ToDoList from "../../containers/VisibleToDoList";
import Footer from "../../components/Footer";
import AddToDo from "../../containers/AddToDo";
import Total from "../../containers/Total";
import UpdatePassword from "../../components/UpdatePassword";

type State = {
  validation: boolean
};
export default class Account extends PureComponent<{}, State> {
  render() {
    return (
      <div className="App">
        <UpdatePassword />
        <AddToDo />
        <ToDoList />
        <Total />
        <Footer />
      </div>
    );
  }
}
