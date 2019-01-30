import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { withFirebase } from "../Firebase";

class SignUpForm extends PureComponent {
  state = {
    name: "",
    username: "",
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
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...this.state });
        this.props.history.push(ROUTES.ACCOUNT)
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
        <div>{errorMessage}</div>
        <label>
          Name:
          <input onChange={e => this.changeValue(e, "name")} />
        </label>
        <label>
          Email:
          <input onChange={e => this.changeValue(e, "email")} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={e => this.changeValue(e, "password")}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default withRouter(withFirebase(SignUpForm));
