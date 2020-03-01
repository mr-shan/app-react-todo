import React from "react";
import { connect } from "react-redux";

import StyledWrapper from "./../../components/styled-components/styledTodoContainerWrapper";
import StyledTodoItem from "./../../components/styled-components/styledTodoItemContainer";
import "./Todo.css";

import TodoListItem from "./../../components/to-do-list-item/TodoListItem";
// import TodoTabItem from "./../../components/to-do-tab-item/TodoTabItem";
import AddNewTodo from "./../../components/add-new-todo/AddNewTodo";
import WithPopupModal from "./../../hoc/with-popup-modal/WithPopupModal";

import {
  getAllTodos,
  addNewRootTask
} from "./../../store/actions/actionsCreators";

class Todo extends React.Component {
  state = {
    isNewTodoOpen: false
  };

  style = {
    display: "grid",
    gridRowGap: "0.5em"
  };

  style2 = {
    display: "grid",
    gridGap: "0.5em",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
  };

  componentDidMount() {
    if (this.props.todos.length === 0) window.showLoader();
    this.props.getAllTodos();
  }

  openAddTodoModalHandler = () => {
    if (!this.state.isNewTodoOpen) {
      this.setState({ isNewTodoOpen: true });
    }
  };

  closeTodoHandler = () => {
    this.setState({ isNewTodoOpen: false });
  };

  addNewTodoHandler = data => {
    this.setState({ isNewTodoOpen: false });
    this.props.onAddTodo(data);
  };

  render() {
    const popup = (
      <WithPopupModal show={this.state.isNewTodoOpen}>
        <AddNewTodo
          cancelHandler={this.closeTodoHandler}
          addHandler={this.addNewTodoHandler}
          show={this.state.isNewTodoOpen}
        />
      </WithPopupModal>
    );
    return (
      <div>
        {popup}
        <StyledWrapper maxWidth="900px">
          <StyledTodoItem
            bgColor="--bg-todo-item-default"
            borderColor="--border-todo-item-default"
            style={{ marginBottom: "1em", cursor: "pointer" }}
            onClick={this.openAddTodoModalHandler}
          >
            <h3> + Add a new Todo</h3>
          </StyledTodoItem>
          {this.props.todos.length === 0 ? (
            <h3>No todos found</h3>
          ) : (
            <div style={this.style}>
              {this.props.todos.map(item => (
                <TodoListItem
                  key={item.id}
                  data={item}
                  history={this.props.history}
                ></TodoListItem>
              ))}
            </div>
          )}
        </StyledWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todolist
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onAddTodo: data => dispatch(addNewRootTask(data)),
    getAllTodos: () => dispatch(getAllTodos())
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Todo);
