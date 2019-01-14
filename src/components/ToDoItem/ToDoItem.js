import React from 'react';

type Props = {
    item: String
}

const ToDoItem = (props: Props) => (
    <h2>{props.item}</h2>
);

export default ToDoItem;