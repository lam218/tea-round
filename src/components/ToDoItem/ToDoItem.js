import React from "react";

type Props = {
  text: String,
  onClick: () => void,
  completed: number
};

const ToDoItem = ({ onClick, completed, text }: Props) => (
  <div>
    <p>{text}</p>
    <p>{completed}</p>
    <button onClick={onClick}>Completed</button>
  </div>
);

export default ToDoItem;
