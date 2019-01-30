import React from "react";
import { shallow } from "enzyme";
import Total from "./Total";

describe("total tests", () => {
  it("renders a total", () => {
    let props = {
      total: 0
    };
    shallow(<Total {...props} />);
  });
});
