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
    default:
      return state;
  }
};

export default todos;
