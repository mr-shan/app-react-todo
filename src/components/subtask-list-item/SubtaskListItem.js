import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./SubtaskListItem.css";
import EditableTitle from "./../editable-title/EditableTitle";
import EditableDate from "./../editable-date/EditableDate";
import restService from "./../../rest/httpService";
import AddNewSubtask from "./../add-new-subtask/AddNewSubtask";
import { showNotification } from "./../../store/actions/actionsCreators";

export const SubtaskListItem = props => {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setStatus(props.data.status);
    setLoading(false);
  }, [props]);

  const modifyTodo = data => {
    setLoading(true);
    restService
      .modifyTodoTask(props.data.id, data)
      .then(response => {
        props.refreshData(response, "success");
        dispatch(
          showNotification({
            title: `Modified: "${data.title}"`,
            id: Math.random(),
            type: "success"
          })
        );
      })
      .catch(error => {
        props.refreshData(error, "failed");
        dispatch(
          showNotification({
            title: `Failed to modify: "${data.title}"`,
            id: Math.random(),
            type: "error"
          })
        );
      });
  };

  const deleteItemHandler = () => {
    setLoading(true);
    restService
      .removeTaskById(props.data.id)
      .then(response => {
        props.refreshData(response, "success");
        dispatch(
          showNotification({
            title: `Removed: "${props.data.title}"`,
            id: Math.random(),
            type: "success"
          })
        );
      })
      .catch(error => {
        props.refreshData(error, "failed");
        dispatch(
          showNotification({
            title: `Failed to remove: "${props.data.title}"`,
            id: Math.random(),
            type: "error"
          })
        );
      });
  };

  const statusChangeHandler = event => {
    setStatus(event.target.checked);
    const newData = { ...props.data };
    modifyTodo({ ...newData, status: event.target.checked });
  };

  const dateChangeHandler = date => {
    const newData = { ...props.data };
    newData.dueDate = date;
    modifyTodo(newData);
  };

  const titleChangedHandler = title => {
    const newData = { ...props.data };
    newData.title = title;
    modifyTodo(newData);
  };

  const addNewSubtaskHandler = taskName => {
    const subtaskNameNoSpace = taskName.replace(/\s/g, "");
    if (props.data.tasks.find(e => e.title === subtaskNameNoSpace)) return;
    setLoading(true);
    const subtaskData = {
      title: taskName,
      dueDate: null,
      status: false,
      tasks: []
    };

    restService
      .createNewSubtask(props.data.id, subtaskData)
      .then(response => {
        props.refreshData(response, "success");
        dispatch(
          showNotification({
            title: `Added: "${subtaskData.title}"`,
            id: Math.random(),
            type: "success"
          })
        );
      })
      .catch(error => {
        props.refreshData(error, "failed");
        dispatch(
          showNotification({
            title: `Failed to add: "${subtaskData.title}"`,
            id: Math.random(),
            type: "error"
          })
        );
      });
  };

  let backdropOpacityTemp = props.backdropOpacity;
  let textDecoration = "";
  if (props.data.status) {
    backdropOpacityTemp += 0.2;
    textDecoration = "line-through";
  }

  const loaderElement = loading ? (
    <div className="subtask-list-item-loader-wrapper">
      <img src="/loader.gif" alt="loading..." />
    </div>
  ) : null;

  return (
    <React.Fragment>
      <div className="edit-todo-subtask-container">
        <div
          className="subtask-color-backdrop"
          style={{ opacity: backdropOpacityTemp }}
        ></div>
        <input
          className="subtask-checkbox"
          type="checkbox"
          checked={status}
          value={status}
          onChange={statusChangeHandler}
        />
        <div style={{ width: "100%" }}>
          <div className="subtask-title-wrapper">
            <EditableTitle
              styling={{ textDecoration: textDecoration }}
              changed={titleChangedHandler}
              minHeight="1.5rem"
            >
              {props.data.title}
            </EditableTitle>
          </div>
          {props.data.dueDate ? (
            <label style={{ textDecoration: textDecoration }}>
              Expires at:{" "}
            </label>
          ) : null}
          <EditableDate
            styling={{ textDecoration: textDecoration }}
            date={props.data.dueDate}
            changed={dateChangeHandler}
          />
          <div style={{ maxWidth: "95%" }}>
            <AddNewSubtask addTodo={addNewSubtaskHandler} />
          </div>
        </div>
        <img
          onClick={deleteItemHandler}
          className="subtask-delete-button"
          src="/cross.png"
          alt="remove_img"
        />
        {loaderElement}
      </div>

      <div
        className="subtask-list-item-subtasks-container"
        style={{ paddingLeft: props.level + 20 + "px" }}
      >
        {props.data.tasks
          ? props.data.tasks.map(subtaskItem => (
              <SubtaskListItem
                key={subtaskItem.id}
                parentId={props.data.id}
                data={subtaskItem}
                level={props.level + 1}
                refreshData={props.refreshData}
                backdropOpacity={props.backdropOpacity + 0.06}
              />
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

SubtaskListItem.propTypes = {
  data: PropTypes.object,
  level: PropTypes.number,
  refreshData: PropTypes.func,
  backdropOpacity: PropTypes.number
};

export default SubtaskListItem;
