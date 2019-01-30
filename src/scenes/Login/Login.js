import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignInForm from "../../components/SignInForm";

export default class Login extends PureComponent {
  render() {
    return (
      <div>
        <SignInForm />
        <Link to={ROUTES.SIGN_UP}>
          <button>Add account</button>
        </Link>
        <Link to={ROUTES.PASSWORD_FORGET}>
          <button>Forgot Password</button>
        </Link>
      </div>
    );
  }
}
