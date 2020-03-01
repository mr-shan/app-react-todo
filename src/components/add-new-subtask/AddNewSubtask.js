import React from "react";
import PropTypes from "prop-types";

import "./AddNewSubtask.css";

export const AddNewSubtask = props => {
  const [taskName, setTaskName] = React.useState("");

  const onAddButtonHandler = () => {
    if (taskName.replace(/\s/g, "") === "") return;
    props.addTodo(taskName);
    setTaskName("");
  };

  const onInputChangeHandler = event => {
    setTaskName(event.target.value);
  };

  const onKeyUpHandler = event => {
    switch (event.keyCode) {
      case 13:
        onAddButtonHandler();
        break;
      case 27:
        setTaskName("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="add-new-subtask-container">
      <input
        value={taskName}
        onChange={onInputChangeHandler}
        className="add-new-subtask-input"
        placeholder="Create a new subtask!"
        onKeyUp={onKeyUpHandler}
      />
      <button
        onClick={onAddButtonHandler}
        className="add-new-subtask-add-button"
      >
        Add
      </button>
    </div>
  );
};

AddNewSubtask.propTypes = {
  addTodo: PropTypes.func
};

export default AddNewSubtask;
