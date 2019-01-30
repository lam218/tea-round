export const addTodo = text => ({
  type: "ADD_TODO",
  id: Math.random(),
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
export const clearState = () => ({
  type: "CLEAR_STATE"
});

export const VisibilityFilters = {
  ORDER_CREATED: "ORDER_CREATED",
  LOWEST_FIRST: "LOWEST_FIRST",
  HIGHEST_FIRST: "HIGHEST_FIRST"
};
