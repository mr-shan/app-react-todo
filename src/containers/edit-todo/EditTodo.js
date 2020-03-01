import React from "react";
import { connect } from "react-redux";

import StyledWrapper from "./../../components/styled-components/styledTodoContainerWrapper";
import "./EditTodo.css";

// import Subtask from "./../../components/subtask/Subtask";
import SubtaskListItem from "./../../components/subtask-list-item/SubtaskListItem";
import EditableTitle from "./../../components/editable-title/EditableTitle";
import ColorPicker from "./../../components/color-picker/ColorPicker";
import EditableDate from "./../../components/editable-date/EditableDate";
import CreateNewSubtask from "./../../components/add-new-subtask/AddNewSubtask";

import httpService from "./../../rest/httpService";
import {
  showAlert,
  showNotification
} from "./../../store/actions/actionsCreators";

class EditTodo extends React.Component {
  constructor() {
    super();
    window.showLoader();
  }
  state = {
    rawTodoData: null,
    id: "",
    title: "",
    dueDate: null,
    status: false,
    colorTheme: "default",
    category: "General",
    tasks: [],
    hasError: null
  };
  componentDidMount() {
    if (!this.state.rawTodoData && !this.state.hasError) {
      this.fetchTaskData(this.props.match.params.id);
    }
  }

  fetchTaskData = id => {
    httpService
      .getTaskById(id)
      .then(response => {
        this.setState({
          rawTodoData: response.data,
          id: response.data.id,
          title: response.data.title,
          status: response.data.status,
          dueDate: response.data.dueDate,
          colorTheme: response.data.colorTheme,
          category: response.data.category,
          tasks: response.data.tasks || []
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: error.response });
        this.props.giveAlert({
          title: "Failed!",
          content: "Failed to retrieve data. Check your internet connection."
        });
      })
      .finally(() => window.hideLoader());
  };

  colorThemeChangeHandler = color => {
    this.setState({ colorTheme: color });
    console.log("Setting up new color: " + color);
    const modifiedData = {
      id: this.state.id,
      title: this.state.title,
      dueDate: this.state.dueDate,
      status: this.state.status,
      colorTheme: color,
      category: this.state.category,
      tasks: this.state.tasks
    };
    this.onSaveHandler(modifiedData);
  };

  onSaveHandler = modifiedData => {
    window.showLoader();
    const id = this.state.id;
    httpService
      .modifyTodoTask(id, modifiedData)
      .then(response => {
        this.fetchTaskData(id);
        this.props.giveNotification({
          title: `Modified: "${modifiedData.title}"`,
          id: Math.random(),
          type: "success"
        });
      })
      .catch(error => {
        this.setState({ hasError: error.response });
        this.props.giveNotification({
          title: `Failed to modify: "${modifiedData.title}"`,
          id: Math.random(),
          type: "success"
        });
      })
      .finally(() => window.hideLoader());
  };

  onCancelHandler = () => {
    this.props.history.goBack();
  };

  addNewSubtaskHandler = subtaskName => {
    const subtaskNameNoSpace = subtaskName.replace(/\s/g, "");
    if (this.state.tasks.find(e => e.title === subtaskNameNoSpace)) return;

    window.showLoader();
    const subtaskData = {
      title: subtaskName,
      dueDate: null,
      status: false,
      colorTheme: this.state.colorTheme,
      tasks: []
    };

    httpService
      .createNewSubtask(this.state.id, subtaskData)
      .then(response => {
        this.refreshData();
        this.props.giveNotification({
          title: `Added: "${subtaskData.title}"`,
          id: Math.random(),
          type: "success"
        });
      })
      .catch(error => {
        this.props.giveNotification({
          title: `Failed to add: "${subtaskData.title}"`,
          id: Math.random(),
          type: "error"
        });
      })
      .finally(() => window.hideLoader());
  };

  dueDateChangeHandler = date => {
    this.setState({ dueDate: date.toString() });
    const modifiedData = {
      id: this.state.id,
      title: this.state.title,
      dueDate: date,
      status: this.state.status,
      colorTheme: this.state.colorTheme,
      category: this.state.category,
      tasks: this.state.tasks
    };
    this.onSaveHandler(modifiedData);
  };

  taskTitleChangeHandler = title => {
    this.setState({ title: title });
    const modifiedData = {
      id: this.state.id,
      title: title,
      dueDate: this.state.dueDate,
      status: this.state.status,
      colorTheme: this.state.colorTheme,
      category: this.state.category,
      tasks: this.state.tasks
    };
    this.onSaveHandler(modifiedData);
  };

  refreshData = (status, response) => {
    console.log("[Edit Todo: Refresh Data]");
    console.log(status);
    console.log(response);
    this.fetchTaskData(this.state.id);
  };

  getSubtaskDetails = title => {
    const subtask = this.state.tasks.find(e => e.title === title);
    return [
      subtask,
      this.state.tasks.indexOf(subtask),
      this.state.tasks.slice()
    ];
  };

  render() {
    const style = {
      background: `var(--bg-todo-item-${this.state.colorTheme})`,
      borderRadius: "0.5rem",
      border: "solid 1px var(--bg-primary)"
    };

    if (this.state.hasError) {
      return (
        <StyledWrapper style={style}>
          <h3>{this.state.hasError?.status}</h3>
          <p>{this.state.hasError?.statusText}</p>
        </StyledWrapper>
      );
    }

    let renderData = null;
    if (this.state.rawTodoData) {
      renderData = (
        <React.Fragment>
          <div className="edit-todo-title-container">
            <div className="edit-todo-title-backdrop"></div>
            <EditableTitle
              minHeight="2.5rem"
              changed={this.taskTitleChangeHandler}
            >
              {this.state.title}
            </EditableTitle>
          </div>
          <h3>
            Expires at:{" "}
            <EditableDate
              changed={this.dueDateChangeHandler}
              date={this.state.dueDate}
            />
          </h3>
          <div className="edit-todo-task-options-container">
            <h4>
              Cateogry: <label>{this.state.category}</label>
            </h4>
            <h4>
              Color Theme:{" "}
              <ColorPicker changed={this.colorThemeChangeHandler}>
                Color
              </ColorPicker>
            </h4>
          </div>

          <div className="edit-todo-subtask-list-container">
            <div className="edit-todo-create-new-subtask">
              <CreateNewSubtask addTodo={this.addNewSubtaskHandler} />
            </div>
            {this.state.tasks.length === 0 ? null : (
              <React.Fragment>
                <h3>Subtasks</h3>
                {this.state.tasks.map(item => (
                  // <Subtask
                  //   key={item.title}
                  //   data={item}
                  //   statusChanged={this.subtaskStatusChangeHandler}
                  //   dateChanged={this.subtaskDateChangeHandler}
                  //   delete={this.deleteSubtaskHandler}
                  //   titleChanged={this.subtaskTitleChangeHandler}
                  // ></Subtask>
                  <SubtaskListItem
                    key={item.id}
                    data={item}
                    parentId={this.state.id}
                    level={1}
                    refreshData={this.refreshData}
                    backdropOpacity={0.1}
                  />
                ))}
              </React.Fragment>
            )}
          </div>
          <div className="edit-todo-buttons-container">
            <button onClick={this.onCancelHandler} className="edit-todo-btn">
              Back
            </button>
          </div>
        </React.Fragment>
      );
    }

    return <StyledWrapper style={style}>{renderData}</StyledWrapper>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    giveAlert: alertData => dispatch(showAlert(alertData)),
    giveNotification: data => dispatch(showNotification(data))
  };
};

export default connect(null, mapDispatchToProps)(EditTodo);
