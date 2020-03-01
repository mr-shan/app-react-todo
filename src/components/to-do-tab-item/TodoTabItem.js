import React from "react";
import { connect } from "react-redux";

import StyledTodoItem from "./../styled-components/styledTodoItemContainer";
import ColorPicker from "./../color-picker/ColorPicker";
import "./TodoTabItem.css";

import {
  deleteTodoTask,
  statusChangeTodo
} from "./../../store/actions/actionsCreators";
import { dateToString } from "./../../utility/utility";

const TodoTabItem = props => {
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

  const colorThemeChangeHandler = color => {};

  const loaderElement = isLoading ? (
    <div className="todo-list-item-loader-wrapper">
      <img src="loader.gif" alt="loading..." />
    </div>
  ) : null;

  //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  return (
    <StyledTodoItem
      bgColor={"--bg-todo-item-" + props.data.colorTheme}
      borderColor={"--border-todo-item-" + props.data.colorTheme}
      style={itemStyle}
    >
      <div className="todo-tab-item-container">
        <div className="todo-tab-title-container">
          <div className="todo-tab-item-title-backdrop"></div>
          <h3 className="todo-tab-item-title" onClick={editTaskRouteHandler}>
            {props.data.title}
          </h3>
        </div>

        <div className="todo-tab-item-body">
          <p>
            {props.data.dueDate
              ? `Expires at: ${dateToString(props.data.dueDate)}`
              : "No due date set."}
          </p>
        </div>

        <div className="todo-tab-item-footer-container">
          <div style={{ marginRight: "auto" }}>
            <input
              type="checkbox"
              id={props.data.title}
              checked={props.data.status}
              onChange={onTodoStatusChangeHandler}
            />
            <label htmlFor={props.data.title}>
              {props.data.status ? "In progress" : "Done"}
            </label>
          </div>
          <ColorPicker changed={colorThemeChangeHandler}>Color</ColorPicker>
          <img
            onClick={deleteItemHandler}
            className="todo-tab-item-footer-trash-img"
            src="/cross.png"
            alt="remove_img"
          />
        </div>
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

export default connect(null, mapDispatchtoProps)(TodoTabItem);
