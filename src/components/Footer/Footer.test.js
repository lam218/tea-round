import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("footer tests", () => {
  it("renders a footer", () => {

    shallow(<Footer />);
  });
});
