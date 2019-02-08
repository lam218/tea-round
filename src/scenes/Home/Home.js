import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import * as ROUTES from "../../constants/routes";
import Total from "../../containers/Total";

import "./Home.scss";
import { withFirebase } from "../../components/Firebase";

const Home = ({ authUser, firebase }) => {
  return (
    <div>{authUser ? <HomeAuth firebase={firebase} /> : <HomeNonAuth />}</div>
  );
};

class HomeAuth extends React.PureComponent {
  state = {
    teaRound: []
  };
  componentDidMount() {
    this.props.firebase.Drinks.getTeaRounds().then(rounds => {
      let orderedRound = rounds.sort(this.compare);
      this.setState({ teaRound: orderedRound });
    });
  }
  compare = (a: Object, b: Object) =>
    a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
  render() {
    const { teaRound } = this.state;
    return (
      <div className="home">
        <div className="home__card">
          <Total />
        </div>
        <div className="home__card">
          <h3>Latest tea rounds</h3>
          {teaRound.map(round => (
            <div key={round.time}>
              <p>{round.completed}</p>
              <p>
                Called by: {round.email} At{" "}
                {moment(round.time).format("DD/MMM/YYYY HH:mm")}
              </p>

              <Link to={`${ROUTES.TEA_ROUND}?${round.uid}`}>See round</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

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

export default withFirebase(Home);
