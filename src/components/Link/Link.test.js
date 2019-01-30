import React from "react";
import { shallow } from "enzyme";
import Link from "./Link";

describe("llink tests", () => {
  it("renders a link", () => {
    shallow(<Link />);
  });
});
