import React, { PureComponent } from "react";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

class SignInForm extends PureComponent {
  state = {
    email: "",
    password: ""
  };
  changeValue = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  onSubmit = event => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...this.state });
        history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
      });

    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input onChange={e => this.changeValue(e, "email")} />
        <input
          type="password"
          onChange={e => this.changeValue(e, "password")}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default withRouter(withFirebase(SignInForm));
