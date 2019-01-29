import React, { PureComponent } from "react";
import { FirebaseContext } from "../../components/Firebase";
import SignUpForm from "../../components/SignUpForm";
export default class CreateAccount extends PureComponent {
  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}
