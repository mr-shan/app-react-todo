import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import StyledWrapper from "./../../components/styled-components/styledTodoContainerWrapper";
import StyledTodoItem from "./../../components/styled-components/styledTodoItemContainer";
import "./Reminder.css";

import { getAllTodos } from "./../../store/actions/actionsCreators";
import { dateToString } from "./../../utility/utility";

class Reminder extends React.Component {
  state = {
    reminderTasks: []
  };

  componentDidMount() {
    if (this.props.todos.length === 0) window.showLoader();
    this.props.getAllTodos();
  }

  componentDidUpdate() {
    if (this.state.reminderTasks.length === 0) {
      window.showLoader();
      console.log("Component updated!");
      const nextDueDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const remindersTasksList = [];
      this.props.todos.forEach(item =>
        this.getRemindersTasks(item, nextDueDate, remindersTasksList, item.id)
      );
      console.log(remindersTasksList);
      this.setState({ reminderTasks: remindersTasksList });
      window.hideLoader();
    }
  }

  getRemindersTasks(task, nextDueDate, remindersTasksList, rootParentId) {
    try {
      if (task.dueDate !== null) {
        const date = new Date(task.dueDate);
        // const dateDiff = nextDueDate - date;
        // if (dateDiff > 0 && dateDiff / (1000 * 60 * 60) <= 24)
        //   remindersTasksList.push({ ...task, parentId: rootParentId });
        const dateDiff = nextDueDate.getDate() - date.getDate();
        if (dateDiff >= 0 && dateDiff < 2 && !task.status)
          remindersTasksList.push({ ...task, parentId: rootParentId });
      }
    } catch (error) {
      console.log(error);
    }
    if (task.tasks.length > 0) {
      task.tasks.forEach(item =>
        this.getRemindersTasks(
          item,
          nextDueDate,
          remindersTasksList,
          rootParentId
        )
      );
    }
  }

  render() {
    return (
      <StyledWrapper>
        <h1>Get your reminders here!</h1>
        {this.state.reminderTasks.length > 0 ? this.state.reminderTasks.map(item => (
          <StyledTodoItem
            bgColor={
              item.colorTheme
                ? "--bg-todo-item-" + item.colorTheme
                : "--bg-todo-item-default"
            }
            borderColor={
              item.colorTheme
                ? "--border-todo-item-" + item.colorTheme
                : "--border-todo-item-default"
            }
            key={item.id}
            style={{paddingBottom: "0.5rem", margin: "auto", marginBottom: "0.75rem", maxWidth: "800px"}}
          >
            <h3 style={{padding: 0, margin: "0.5rem"}}>{item.title}</h3>
            <p>Expiring at: {dateToString(item.dueDate)}</p>
            <Link
              style={{ color: "var(--font-secondary-color)" }}
              to={`/edit-todo/${item.parentId}`}
            >
              Open root task
            </Link>
          </StyledTodoItem>
        )) : <h3>You have no tasks with due date within 24 hours.</h3>}
      </StyledWrapper>
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
    getAllTodos: () => dispatch(getAllTodos())
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Reminder);
