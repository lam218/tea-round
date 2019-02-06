import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./Navigation.scss";

import SignOutButton from "../SignOutButton";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => {
  return (
    <div className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li className="nav__list-item">
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <SignOutButton />
      </ul>
    </div>
  );
};
const NavigationNonAuth = () => {
  return (
    <div className="nav">
      <ul className="nav__list">
        {/* <li className="nav__list-item">
          <Link to={ROUTES.SIGN_IN}>Login</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Navigation;
