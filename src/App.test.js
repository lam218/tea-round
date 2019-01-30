import React from "react";
import App from "./App";
import { mount } from "enzyme";


it("renders without crashing", () => {
  const props = {
    firebase: {
      auth: {
        onAuthStateChanged: jest.fn()
      }
    }
  };

  mount(<App {...props} />);
});
