import React from "react";
import ToDoItem from "../ToDoItem";

type Props = {
  listItems: String[]
};

const ToDoList = (props: Props) => {
  return props.listItems.map(item => <ToDoItem key={item.item} item={item.item} />);
};
export default ToDoList;
