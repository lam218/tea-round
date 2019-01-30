import todos from "./todos";
import visibilityFilter from "./visibilityFilters";

describe("todo tests", () => {
  it("add todo test", () => {
    todos([], {
      type: "ADD_TODO",
      id: 0,
      text: "action.text",
      completed: 0
    });
  });
  it("claim todo test", () => {
    todos(
      [
        {
          id: 0,
          text: "action.text",
          completed: 0
        }
      ],
      {
        type: "CLAIM_TODO",
        id: 0,
        text: "action.text",
        completed: 0
      }
    );
  });
  it("claim todo test - diff id", () => {
    todos(
      [
        {
          id: 0,
          text: "action.text",
          completed: 0
        }
      ],
      {
        type: "CLAIM_TODO",
        id: 1,
        text: "action.text",
        completed: 0
      }
    );
  });
  it("no type test", () => {
    todos([], {
      id: 0,
      text: "action.text",
      completed: 0
    });
  });
});

describe("filter tests", () => {
  it("set filter", () => {
    visibilityFilter([], {
      type: "SET_VISIBILITY_FILTER",
      filter: "ORDER_CREATED"
    });
  });
  it("no filter type", () => {
    visibilityFilter([], {
      filter: "ORDER_CREATED"
    });
  });
});
