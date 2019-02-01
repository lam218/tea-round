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
  state = {
    loading: true
  };
  componentDidMount() {
    const { firebase, dispatch } = this.props;
    firebase.auth.onAuthStateChanged(
      authUser =>
        authUser &&
        firebase.getData().then(res => {
          dispatch(callTodo(res));
          this.setState({
            loading: false
          });
        })
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="App">
        <UpdatePassword />
        <AddToDo />
        {loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <ToDoList />
            <Total />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default withFirebase(connect()(Account));
