import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import PasswordForget from "./PasswordForget";

describe("password forgot scene tests", () => {
  it("renders a scene", () => {
    let props = {};
    const form = mount(
      <Router>
        <PasswordForget {...props} />
      </Router>
    );
    form.find("input").simulate("change");
  });
});
