import React from "react";

type Props = {
  text: String,
  onClick: () => void,
  completed: number
};

const ToDoItem = ({ onClick, completed, text }: Props) => (
  <div>
    <p onClick={onClick}>{text}</p>
    <p>{completed}</p>
  </div>
);

export default ToDoItem;
