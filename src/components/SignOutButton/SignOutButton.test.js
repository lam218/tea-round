import React from "react";
import { shallow } from "enzyme";
import SignOutButton from "./SignOutButton";

describe("sign out button tests", () => {
  it("renders a button", () => {
    let props = {
      history: {
        push: jest.fn()
      },
      firebase: {
        doSignOut: jest.fn()
      }
    };
    shallow(<SignOutButton {...props} />);
  });
});
