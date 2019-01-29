import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignOutButton = ({ firebase, history }) => {
  const doSignOut = () => {
    firebase.doSignOut();
    history.push(ROUTES.SIGN_IN);
  };
  return <button onClick={doSignOut}>Sign Out</button>;
};

export default withRouter(withFirebase(SignOutButton));
