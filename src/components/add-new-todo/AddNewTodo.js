import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "./AddNewTodo.css";

export const AddNewTodo = props => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [category, setCategory] = useState("General");
  const [colorTheme, setColorTheme] = useState("default");
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [subtaskList, setSubtaskList] = useState([]);

  const onSubmit = () => {
    if (name === "") {
      return;
    }
    props.addHandler({
      title: name,
      status: false,
      dueDate: dueDate,
      category,
      colorTheme,
      tasks: subtaskList.map(item => {
        return { title: item, dueDate: null, status: false, colorTheme: colorTheme, tasks: [] };
      })
    });
  };

  const addSubtaskHandler = () => {
    const curTaskNoSpace = currentSubtask.replace(/\s/g, "");
    if (currentSubtask !== "" && !subtaskList.find(e => e === curTaskNoSpace)) {
      const newSubtaskList = [...subtaskList, currentSubtask];
      setSubtaskList(newSubtaskList);
      setCurrentSubtask("");
    }
  };

  const removeSubtaskHandler = subtaskName => {
    const itemRemovedSubtaskList = subtaskList.filter(e => e !== subtaskName);
    setSubtaskList(itemRemovedSubtaskList);
  };

  let subTasksRenders = null;
  if (subtaskList.length !== 0) {
    subTasksRenders = (
      <div className="subtasks-container">
        {subtaskList.map((item, key) => (
          <div key={key} className="subtask-item-wrapper">
            <span>{item}</span>
            <button onClick={() => removeSubtaskHandler(item)}>x</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="add-new-todo-container">
      <span onClick={props.cancelHandler} className="add-new-todo-cancel-cross">
        x
      </span>
      <h3 style={{ textAlign: "center" }}>Add a new Todo!!</h3>
      <div className="form-field-container">
        <label htmlFor="todoName">What you want to do?</label>
        <input
          type="text"
          id="todoName"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className="form-field-container">
        <label htmlFor="reminderDate">
          When do you want to get reminded for this task?
        </label>
        <DatePicker
          selected={dueDate}
          onChange={setDueDate}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-field-container">
        <label htmlFor="todoCategory">
          Set category to this task. (Default is general)
        </label>
        <input
          type="text"
          id="todoCategory"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
      </div>
      <div className="form-field-container">
        <label htmlFor="colorTheme">Give this a cool look.</label>
        <select onChange={event => setColorTheme(event.target.value)}>
          <option name="default" value="default">
            Default
          </option>
          <option name="red" value="red">
            Red
          </option>
          <option name="green" value="green">
            Green
          </option>
          <option name="blue" value="blue">
            Blue
          </option>
        </select>
      </div>
      <div className="form-field-container" style={{ position: "relative" }}>
        <label htmlFor="colorTheme">Add subtasks here!</label>
        <input
          type="text"
          value={currentSubtask}
          onChange={event => setCurrentSubtask(event.target.value)}
        />
        <button
          className="add-subtask-input-button"
          onClick={addSubtaskHandler}
        >
          +
        </button>
      </div>
      {subTasksRenders}
      <div className="buttons-wrapper">
        <button onClick={onSubmit}>Add</button>
        <button onClick={props.cancelHandler}>Cancel</button>
      </div>
    </div>
  );
};

AddNewTodo.propTypes = {
  addHandler: PropTypes.func,
  cancelHandler: PropTypes.func
}

export default AddNewTodo;