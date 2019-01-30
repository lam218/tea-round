import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {connect} from 'react-redux';
import {clearState} from '../../actions';

const SignOutButton = ({ firebase, history, dispatch }) => {
  const doSignOut = () => {
    firebase.doSignOut();
    history.push(ROUTES.SIGN_IN);
    dispatch(clearState())
  };
  return <button onClick={doSignOut}>Sign Out</button>;
};

export default connect()(withRouter(withFirebase(SignOutButton)));
