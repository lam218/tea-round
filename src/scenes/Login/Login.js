import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

type State = {
    username: String,
    password: String
}

export default class Login extends PureComponent<{}, State> {
  state = {
    username: "",
    password: ""
  };
  changeValue = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.changeValue(e, "username")} />
        <input type='password' onChange={e => this.changeValue(e, "password")} />
        <Link to={"/account"}>
          <button>Login</button>
        </Link>
      </div>
    );
  }
}
