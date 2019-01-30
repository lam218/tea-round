import React from "react";
import ToDoItem from "../ToDoItem";

type Props = {
  todos: [{ id: number, onClick: () => void, completed: number, text: String }],
  claimTodo: () => void
};

const ToDoList = ({ todos, claimTodo }: Props) => {
  return (
    todos &&
    todos.map(item => (
      <ToDoItem key={item.id} {...item} onClick={() => claimTodo(item.id)} />
    ))
  );
};
export default ToDoList;
