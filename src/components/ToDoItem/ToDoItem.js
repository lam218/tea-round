import React from "react";

type Props = {
  text: String,
  onClick: () => void,
  completed: boolean
};

const ToDoItem = ({ onClick, completed, text }: Props) => (
  <p
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </p>
);

export default ToDoItem;
