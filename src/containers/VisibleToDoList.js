import { connect } from "react-redux";
import { claimTodo, VisibilityFilters } from "../actions";
import TodoList from "../components/ToDoList";

const compare = (a: Object, b: Object) =>
  a.completed < b.completed ? -1 : a.completed > b.completed ? 1 : 0;

const getMostUsed = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.ORDER_CREATED:
      return todos;
    case VisibilityFilters.LOWEST_FIRST:
      return todos.sort(compare);
    case VisibilityFilters.HIGHEST_FIRST:
      return todos.sort(compare).reverse();
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getMostUsed(state.todos, state.visibilityFilters)
});

const mapDispatchToProps = dispatch => ({
  claimTodo: (id) => dispatch(claimTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
