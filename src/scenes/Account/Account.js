import React, { Component } from "react";
import ToDoList from "../../containers/VisibleToDoList";
import Footer from "../../components/Footer";
import AddToDo from "../../containers/AddToDo";
import Total from "../../containers/Total";
import UpdatePassword from "../../components/UpdatePassword";
import { withFirebase } from "../../components/Firebase";
import { connect } from "react-redux";
import { callTodo } from "../../actions";

class Account extends Component {
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(
      authUser =>
        authUser &&
        this.props.firebase
          .getData()
          .then(res =>
            this.props.dispatch(callTodo(res))
          )
    );
  }

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

export default withFirebase(connect()(Account));
