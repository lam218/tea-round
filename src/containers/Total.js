import { connect } from "react-redux";
import Total from "../components/Total";

const getTotal = todos => {
    debugger;
  let total = 0;
    for (let i = 0; i < todos.length; i++) {
      total += todos[i].completed;
    }
  
  return total;
};

const mapStateToProps = state => ({
  todos: getTotal(state.todos)
});

export default connect(mapStateToProps)(Total);
