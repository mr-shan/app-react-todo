import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import StyledTodoItem from "./../styled-components/styledTodoItemContainer";
import "./TodoListItem.css";

import {
  deleteTodoTask,
  statusChangeTodo
} from "./../../store/actions/actionsCreators";
import { dateToString } from "./../../utility/utility";

const TodoListItem = props => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(props.data.isLoading);
  }, [props]);

  const deleteItemHandler = event => {
    props.onRemoveTodoItem(props.data);
    setIsLoading(true);
  };

  const onTodoStatusChangeHandler = event => {
    props.onStatusChange({ ...props.data, status: event.target.checked });
    setIsLoading(true);
  };

  const itemStyle = props.data.status
    ? { filter: "brightness(0.6)", textDecoration: "line-through" }
    : {};

  const editTaskRouteHandler = event => {
    if (event.target.type !== "checkbox") {
      console.log("Edit task with id: " + props.data.id);
      props.history.push("/edit-todo/" + props.data.id);
    }
  };

  const loaderElement = isLoading ? (
    <div className="todo-list-item-loader-wrapper">
      <img src="/loader.gif" alt="loading..." />
    </div>
  ) : null;

  return (
    <StyledTodoItem
      bgColor={"--bg-todo-item-" + props.data.colorTheme}
      borderColor={"--border-todo-item-" + props.data.colorTheme}
      style={itemStyle}
    >
      <div className="todo-list-item-container">
        <input
          type="checkbox"
          checked={props.data.status}
          onChange={onTodoStatusChangeHandler}
        />
        <div className="todo-tab-item-data">
          <h3 onClick={editTaskRouteHandler}>{props.data.title}</h3>
          <p>
            {props.data.dueDate
              ? `Expires at: ${dateToString(props.data.dueDate)}`
              : "No due date set."}
          </p>
        </div>
        <img
          onClick={deleteItemHandler}
          className="trash-img"
          src="/cross.png"
          alt="remove_img"
        />
      </div>
      {loaderElement}
    </StyledTodoItem>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    onRemoveTodoItem: payload => dispatch(deleteTodoTask(payload)),
    onStatusChange: data => dispatch(statusChangeTodo(data))
  };
};

TodoListItem.propTypes = {
  data: PropTypes.object,
  onRemoveTodoItem: PropTypes.func,
  onStatusChange: PropTypes.func
};

export default connect(null, mapDispatchtoProps)(TodoListItem);
