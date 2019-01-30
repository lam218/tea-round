import React from "react";
import { shallow } from "enzyme";
import Modal from "./Modal";

describe("modal tests", () => {
  it("renders a modal", () => {

    shallow(<Modal />);
  });
});
