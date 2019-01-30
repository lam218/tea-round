import React from "react";
import ToDoItem from "../ToDoItem";
import { withFirebase } from "../Firebase";

type Props = {
  todos: [{ id: number, onClick: () => void, completed: number, text: String }],
  claimTodo: () => void
};

const ToDoList = ({ todos, claimTodo, firebase }: Props) => {
  todos.length > 0 && firebase.addUserData(todos);
  return (
    todos &&
    todos.length > 0 &&
    todos.map(item => (
      <ToDoItem key={item.id} {...item} onClick={() => claimTodo(item.id)} />
    ))
  );
};
export default withFirebase(ToDoList);
