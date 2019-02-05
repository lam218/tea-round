import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withFirebase } from "./components/Firebase";
import Navigation from "./components/Navigation";
import Login from "./scenes/Login";
import Account from "./scenes/Account";
import CreateAccount from "./scenes/CreateAccount";
import PasswordForget from "./scenes/PasswordForget";
import TeaRound from "./scenes/TeaRound";
import Choice from './scenes/Choice';
import "./App.css";

class App extends PureComponent<{}, State> {
  state = {
    authUser: null
  };
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation authUser={this.state.authUser} />
          <hr />
          {/* <Route exact path={ROUTES.HOME} component={Home} /> */}
          <Route path={ROUTES.SIGN_IN} component={Login} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ADMIN} component={TeaRound} />
          <Route path={ROUTES.TEA_ROUND} component={Choice} />
          <Route path={ROUTES.SIGN_UP} component={CreateAccount} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
