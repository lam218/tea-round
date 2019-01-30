import React from "react";
import { mount } from "enzyme";
import UpdatePassword from "./UpdatePassword";

describe("update password tests", () => {
  it("renders a password update", () => {
    let props = {
      firebase: {
        doPasswordUpdate: jest.fn()
      }
    };
    const form = mount(<UpdatePassword {...props} />);
    form.find("input").simulate("change");
  });
});
