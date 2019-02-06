import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Total from "../../containers/Total";

import "./Home.scss";

const Home = ({ authUser }) => {
  return <div>{authUser ? <HomeAuth /> : <HomeNonAuth />}</div>;
};

const HomeAuth = () => (
  <div className="home">
    <div className="home__card">
      <Total />
    </div>
    <div className="home__card">Latest tea rounds</div>{" "}
  </div>
);

const HomeNonAuth = () => (
  <div className="home">
    <p>Sign in or create an account to use tea round</p>
    <Link className="home__link" to={ROUTES.SIGN_IN}>
      Sign in
    </Link>
    <Link className="home__link" to={ROUTES.SIGN_UP}>
      Sign up
    </Link>
  </div>
);

export default Home;
