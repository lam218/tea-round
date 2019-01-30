import React from "react";
import { mount } from "enzyme";
import SignInForm from "./SignInForm";
import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

describe("sign in form tests", () => {
  it("renders a form", () => {
    let props = {
      history: {
        push: jest.fn()
      },
      firebase: {
        doSignInWithEmailAndPassword: jest.fn()
      }
    };
    mount(
      <Router>
        <SignInForm {...props} />
      </Router>
    );
  });
  it("eneters input", () => {
    const form = mount(
      <Router>
        <SignInForm />
      </Router>
    ).find("input");
    form.first().simulate("change");
    form.last().simulate("change");
  });
//   it("renders a submits form", () => {
//     let props = {
//       history: {
//         push: jest.fn()
//       },
//       firebase: {
//         doSignInWithEmailAndPassword: jest.fn()
//       }
//     };
//     beforeEach(() => {
//       props = {
//         props
//       };
//     });
//     const form = mount(
//       <Router>
//         <SignInForm {...props} />
//       </Router>
//     ).find("form");
//     form.simulate("submit");
//     form.state({
//       email: "",
//       password: ""
//     });
//   });
});
