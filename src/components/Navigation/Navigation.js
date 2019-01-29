import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import SignOutButton from '../SignOutButton'

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Login</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.TEA_ROUND}>Tea Round</Link>
        </li>
        <SignOutButton />
      </ul>
    </div>
  );
};
const NavigationNonAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
