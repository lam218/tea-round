import React, { PureComponent } from "react";
import { withFirebase } from "../Firebase";

class UpdatePassword extends PureComponent {
  state = {
    password: "",
    success: false
  };
  onChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  onSubmit = e => {
    const { password } = this.state;
    this.props.firebase
      .doPasswordUpdate(password)
      .then(authUser => {
        this.setState({ password: "", success: true });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
      });

    e.preventDefault();
  };

  render() {
    const { success } = this.state;
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input type="password" onChange={e => this.onChange(e, "password")} />
        <button type="submit">Set new password</button>
        {success && <div>Successfully changed password</div>}
      </form>
    );
  }
}

export default withFirebase(UpdatePassword);
