import React from "react";
import ToDoItem from "../ToDoItem";

type Props = {
  todos: String[],
  toggleTodo: () => void
};

const ToDoList = ({todos, toggleTodo}: Props) => {
  return todos && todos.map(item => <ToDoItem key={item.id} {...item} onClick={() => toggleTodo(item.id)}/>);
};
export default ToDoList;
