import React from "react";
import { shallow } from "enzyme";
import ToDoItem from "./ToDoItem";

describe("item tests", () => {
  it("renders an item", () => {
    let props = {
      onClick: jest.fn(),
      completed: 0,
      text: "test"
    };
    shallow(<ToDoItem {...props} />);
  });
});
