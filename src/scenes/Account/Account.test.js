import React from "react";
import { shallow } from "enzyme";
import Account from "./Account";

describe("account scene tests", () => {
  it("renders a scene", () => {
    let props = {};
    shallow(<Account {...props} />);
  });
});
