let nextTodoId = 0;
export const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});
export const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

export const claimTodo = id => ({
  type: "CLAIM_TODO",
  id
});
export const callTodo = todos => ({
  type: "CALL_TODO",
  todos
});

export const VisibilityFilters = {
  ORDER_CREATED: "ORDER_CREATED",
  LOWEST_FIRST: "LOWEST_FIRST",
  HIGHEST_FIRST: "HIGHEST_FIRST"
};
