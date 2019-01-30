import React from "react";
import { shallow } from "enzyme";
import CreateAccount from "./CreateAccount";

describe("create account scene tests", () => {
  it("renders a scene", () => {
    let props = {};
    shallow(<CreateAccount {...props} />);
  });
});
