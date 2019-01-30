import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import AddToDo from "./AddToDo";
import FilterLink from "./FilterLink";
import Total from "../components/Total";
import VisibleToDoList from "./VisibleToDoList";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  todos: [
    {
      id: 0,
      text: "action.text",
      completed: 0
    },
    {
      id: 1,
      text: "action.text",
      completed: 2
    }
  ],
  visibilityFilters: "ORDER_CREATED"
});

describe("list tests", () => {
  it("renders a list", () => {
    let props = {
      dispatch: jest.fn()
    };
    const add = mount(
      <Provider store={store}>
        <AddToDo {...props} />
      </Provider>
    );
    add.find("input").simulate("change", { value: "Hello" });
    add.find("form").simulate("submit");
  });
});

describe("link tests", () => {
  it("renders a link", () => {
    const link = mount(
      <Provider store={store}>
        <FilterLink />
      </Provider>
    );
    link.find("button").simulate("click");
  });
});

describe("list tests", () => {
  it("renders a list", () => {
    const total = mount(
      <Provider store={store}>
        <Total />
      </Provider>
    );
    expect(total.find("p")).toIncludeText("You owe  tea rounds");
  });
});
describe("list tests", () => {
  it("renders a list order created", () => {
    const orderState = mockStore({
      todos: [
        {
          id: 0,
          text: "action.text",
          completed: 0
        },
        {
          id: 1,
          text: "action.text",
          completed: 2
        }
      ],
      visibilityFilters: "ORDER_CREATED"
    });
    mount(
      <Provider store={orderState}>
        <VisibleToDoList />
      </Provider>
    );
  });
  it("renders a list lowest", () => {
    const lowestState = mockStore({
      todos: [
        {
          id: 0,
          text: "action.text",
          completed: 0
        },
        {
          id: 1,
          text: "action.text",
          completed: 2
        }
      ],
      visibilityFilters: "LOWEST_FIRST"
    });
    mount(
      <Provider store={lowestState}>
        <VisibleToDoList />
      </Provider>
    );
  });
  it("renders a list highest", () => {
    const highestState = mockStore({
      todos: [
        {
          id: 0,
          text: "action.text",
          completed: 0
        },
        {
          id: 1,
          text: "action.text",
          completed: 2
        }
      ],
      visibilityFilters: "HIGHEST_FIRST"
    });
    mount(
      <Provider store={highestState}>
        <VisibleToDoList />
      </Provider>
    );
  });
  //   it("renders a list highest", () => {
  //     const errorState = mockStore({
  //       todos: [
  //         {
  //           id: 0,
  //           text: "action.text",
  //           completed: 0
  //         },
  //         {
  //           id: 1,
  //           text: "action.text",
  //           completed: 2
  //         }
  //       ],
  //       visibilityFilters: "none"
  //     });
  //     const list = mount(
  //       <Provider store={errorState}>
  //         <VisibleToDoList />
  //       </Provider>
  //     );
  //     expect(list).toThrow(new Error("Unknown filter: none"));
  //   });
});
