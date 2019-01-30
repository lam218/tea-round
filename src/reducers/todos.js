const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: 0
        }
      ];
    case "CLAIM_TODO":
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: todo.completed + 1 }
          : todo
      );
    case "CALL_TODO":
      return action.todos;
    case "CLEAR_STATE":
      return [];
    default:
      return state;
  }
};

export default todos;
