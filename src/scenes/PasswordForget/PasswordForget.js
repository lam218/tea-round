import React, { PureComponent } from "react";
import { withFirebase } from "../../components/Firebase";
import { withRouter } from "react-router-dom";

class PasswordForget extends PureComponent {
  state = {
    email: ""
  };
  changeValue = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(authUser => {
        this.setState({ ...this.state });
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
        <p>Type the email you signed up with to reset your password</p>
        <input
          type="email"
          onChange={e => this.changeValue(e, "email")}
          placeholder="email"
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}
export default withRouter(withFirebase(PasswordForget));
