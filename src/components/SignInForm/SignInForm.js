import React, { PureComponent } from "react";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

class SignInForm extends PureComponent {
  state = {
    email: "",
    password: "",
    errorMessage: null
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
    const { errorMessage } = this.state;
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <label>
          Email
          <input
            type="email"
            onChange={e => this.changeValue(e, "email")}
            placeholder="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={e => this.changeValue(e, "password")}
            placeholder="password"
          />
        </label>
        <button type="submit">Login</button>
        {errorMessage && <p>Looks like the email or password is incorrect</p>}
      </form>
    );
  }
}

export default withRouter(withFirebase(SignInForm));
