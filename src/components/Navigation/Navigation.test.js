import React from "react";
import { mount } from "enzyme";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";

describe("navigation tests", () => {
  it("renders an non auth", () => {
    let props = {
      authUser: null
    };
    mount(
      <Router>
        <Navigation {...props} />
      </Router>
    );
  });
  it("renders auth", () => {
    let props = {
      authUser: true
    };
    mount(
      <Router>
        <Navigation {...props} />
      </Router>
    );
  });
});
