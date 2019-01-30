import React from "react";
import { shallow } from "enzyme";
import ToDoList from "./ToDoList";

describe("list tests", () => {
  it("renders a list", () => {
    let props = {
      todos: [{ id: 0, onClick: jest.fn(), completed: 0, text: "test" }],
      claimTodo: jest.fn()
    };
    shallow(<ToDoList {...props} />);
  });
});
