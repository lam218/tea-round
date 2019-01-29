import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Navigation from "./components/Navigation";
import Login from "./scenes/Login";
import Account from "./scenes/Account";
import CreateAccount from "./scenes/CreateAccount";
//import TeaRound from './scenes/TeaRound';
import "./App.css";

class App extends PureComponent<{}, State> {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <hr />
          {/* <Route exact path={ROUTES.HOME} component={Home} /> */}
          <Route path={ROUTES.SIGN_IN} component={Login} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          {/* <Route path={ROUTES.TEA_ROUND} component={TeaRound} /> */}
          <Route path={ROUTES.SIGN_UP} component={CreateAccount} />
          {/* <Route path={ROUTES.PASSWORD_FORGET} component={passwordForget}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
