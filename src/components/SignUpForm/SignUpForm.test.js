import React from "react";
import { mount } from "enzyme";
import SignUpForm from "./SignUpFrom";
import { BrowserRouter as Router } from "react-router-dom";

describe("sign out button tests", () => {
  it("renders a button", () => {
    let props = {
      history: {
        push: jest.fn()
      },
      firebase: {
        doCreateUserWithEmailAndPassword: jest.fn()
      }
    };
    mount(
      <Router>
        <SignUpForm {...props} />
      </Router>
    );
  });
  it("eneters input", () => {
    const form = mount(
      <Router>
        <SignUpForm />
      </Router>
    ).find("input");
    form.first().simulate("change");
    form.at(2).simulate("change");
    form.last().simulate("change");
  });
});
