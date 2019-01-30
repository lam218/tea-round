import { connect } from "react-redux";
import Total from "../components/Total";

const getTotal = todos => {
  let total = 0;
  for (let i = 0; i < todos.length; i++) {
    total = total + todos[i].completed;
  }

  return total;
};

const mapStateToProps = state => ({
  total: getTotal(state.todos)
});

export default connect(mapStateToProps)(Total);
