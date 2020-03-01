import React from "react";
import PropTypes from "prop-types";

import "./Subtask.css";
import EditableTitle from "./../editable-title/EditableTitle";
import EditableDate from "./../editable-date/EditableDate";

export const Subtask = props => {
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    setStatus(props.data.status);
  }, [props.data.status]);
  const deleteItemHandler = () => {
    props.delete(props.data.title);
  };

  const statusChangeHandler = event => {
    setStatus(event.target.checked);
    props.statusChanged(props.data.title, event.target.checked);
  };

  const dateChangeHandler = date => {
    props.dateChanged(props.data.title, date);
  };

  const titleChangedHandler = title => {
    props.titleChanged(props.data.title, title);
  };

  let backdropOpacity = 0.1;
  let textDecoration = "";
  if (props.data.status) {
    backdropOpacity = 0.3;
    textDecoration = "line-through";
  }

  return (
    <div className="edit-todo-subtask-container">
      <div
        className="subtask-color-backdrop"
        style={{ opacity: backdropOpacity }}
      ></div>
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={status}
        value={status}
        onChange={statusChangeHandler}
      />
      <div>
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
          <label style={{ textDecoration: textDecoration }}>Expires at: </label>
        ) : null}
        <EditableDate
          styling={{ textDecoration: textDecoration }}
          date={props.data.dueDate}
          changed={dateChangeHandler}
        />
        <div className="subtask-create-subtask-button">Create subtask</div>
      </div>
      <img
        onClick={deleteItemHandler}
        className="subtask-delete-button"
        src="/cross.png"
        alt="remove_img"
      />
    </div>
  );
};

Subtask.propTypes = {
  data: PropTypes.object,
  delete: PropTypes.func,
  statusChanged: PropTypes.func,
  dateChanged: PropTypes.func,
  titleChanged: PropTypes.func
};

export default Subtask;
