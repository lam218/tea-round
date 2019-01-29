import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignInForm from "../../components/SignInForm";
import { FirebaseContext } from "../../components/Firebase";

export default class Login extends PureComponent {
  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {firebase => <SignInForm firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Link to={ROUTES.SIGN_UP}>
          <button>Add account</button>
        </Link>
      </div>
    );
  }
}
