import httpService from "./../../rest/httpService";
import actionTypes from "./actionTypes";

const addNewRootTaskSync = task => {
  return {
    type: actionTypes.ADD_NEW_ROOT_TASK,
    payload: task
  };
};

export const addNewRootTask = task => {
  window.showLoader();
  return dispatch => {
    httpService
      .createNewTask(task)
      .then(response => {
        dispatch(addNewRootTaskSync({ ...task, id: response.data }));
      })
      .catch(error => {
        console.log(error);
        dispatch(
          showAlert({
            title: "Failed!",
            content: "Failed to add new task"
          })
        );
      })
      .finally(() => {
        window.hideLoader();
      });
  };
};

const deleteTodoTaskSync = id => {
  return {
    type: actionTypes.DELETE_TODO_TASK,
    id: id
  };
};

export const deleteTodoTask = payload => {
  return dispatch => {
    httpService
      .removeTaskById(payload.id)
      .then(response => dispatch(deleteTodoTaskSync(payload.id)))
      .catch(error => {
        console.log(error);
        dispatch(taskFailedToModify(payload.id));
        dispatch(
          showAlert({
            title: "Failed!",
            content: "Failed to delete task: " + payload.title
          })
        );
      });
  };
};

const statusChangeTodoSync = payload => {
  return {
    type: actionTypes.STATUS_CHANGE_TODO,
    payload: payload
  };
};

export const statusChangeTodo = payload => {
  return dispatch => {
    httpService
      .modifyTodoTask(payload.id, payload)
      .then(response => {
        dispatch(statusChangeTodoSync(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(taskFailedToModify(payload.id));
        dispatch(
          showAlert({
            title: "Failed!",
            content: "Failed to update task: " + payload.title
          })
        );
      });
  };
};

const setStoreWithTodosList = payload => {
  return {
    type: actionTypes.SET_TODO_TASK_LIST,
    payload: payload
  };
};

export const getAllTodos = () => {
  return dispatch => {
    httpService
      .getAllTasks()
      .then(response => {
        dispatch(setStoreWithTodosList(response.data));
      })
      .catch(error => {
        console.dir(error);
        dispatch(
          showAlert({
            title: "Failed",
            content: "Failed to get todo tasks."
          })
        );
      })
      .finally(() => window.hideLoader());
  };
};

export const taskFailedToModify = id => {
  return {
    type: actionTypes.TASK_FAILED_TO_MODIFY,
    id: id
  };
};

export const showAlert = alert => {
  return {
    type: actionTypes.SHOW_ALERT,
    alertObj: alert
  };
};

export const hideAlert = () => {
  return {
    type: actionTypes.HIDE_ALERT
  };
};

const showNotificationSync = notification => {
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    payload: notification
  };
};

export const showNotification = notification => {
  return dispatch => {
    setTimeout(() => {
      dispatch(removeNotification(notification));
    }, 2500);
    dispatch(showNotificationSync(notification));
  };
};

export const removeNotification = notification => {
  return {
    type: actionTypes.REMOVE_NOTIFICATION,
    payload: notification
  };
};
