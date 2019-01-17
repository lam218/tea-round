import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Account from '../scenes/Account';
//import TeaRound from '../scenes/TeaRound';
import Login from '../scenes/Login';

const BasicExample = () => {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/tearound">Tea Round</Link>
            </li>
          </ul>
  
          <hr />
  
          <Route exact path="/" component={Login} />
          <Route path="/account" component={Account} />
          {/* <Route path="/tearound" component={TeaRound} /> */}
        </div>
      </Router>
    );
  }

  export default BasicExample;