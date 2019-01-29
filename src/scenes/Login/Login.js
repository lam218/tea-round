import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

type State = {
  username: String,
  password: String
};

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
        <input
          type="password"
          onChange={e => this.changeValue(e, "password")}
        />
        <Link to={"/account"}>
          <button>Login</button>
        </Link>
        <Link to={ROUTES.SIGN_UP}>
          <button>Add account</button>
        </Link>
      </div>
    );
  }
}
