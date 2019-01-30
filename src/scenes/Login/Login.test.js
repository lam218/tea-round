import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

describe("login scene tests", () => {
  it("renders a scene", () => {
    let props = {};
    shallow(<Login {...props} />);
  });
});
