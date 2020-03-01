import actionTypes from "./actions/actionTypes";

// const Todo = function(id, title, status, dueDate) {
//   this.id = id;
//   this.title = title;
//   this.status = status;
//   this.dueDate = dueDate;
//   this.colorTheme = "default";
//   this.tasks = [];
// };

const initialState = {
  todolist: [],
  alert: null,
  alertQueue: [],
  author: "Shantanu",
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TODO_TASK_LIST:
      return {
        ...state,
        todolist: action.payload
      };
    case actionTypes.ADD_NEW_ROOT_TASK:
      const currentState = state.todolist.slice();
      return {
        ...state,
        todolist: [...currentState, { ...action.payload, isLoading: false }]
      };

    case actionTypes.DELETE_TODO_TASK:
      const newStateAfterDeletingTask = state.todolist.filter(
        e => e.id !== action.id
      );
      return {
        ...state,
        todolist: newStateAfterDeletingTask
      };
    case actionTypes.STATUS_CHANGE_TODO:
      const newStateAfterStatusChange = state.todolist.slice();
      const oldTask = state.todolist.find(e => e.id === action.payload.id);
      const index = state.todolist.indexOf(oldTask);
      newStateAfterStatusChange.splice(index, 1, action.payload);
      return {
        ...state,
        todolist: newStateAfterStatusChange
      };
    case actionTypes.TASK_FAILED_TO_MODIFY:
      const newState = state.todolist.slice();
      const taskFailedToModify = state.todolist.find(e => e.id === action.id);
      const indexOfTaskFailedToModify = state.todolist.indexOf(
        taskFailedToModify
      );
      newState.splice(indexOfTaskFailedToModify, 1, {
        ...taskFailedToModify,
        isLoading: false
      });
      return {
        ...state,
        todolist: newState
      };
    case actionTypes.SHOW_ALERT:
      if (state.alert !== null) {
        return {
          ...state,
          alertQueue: [...state.alertQueue, action.alertObj]
        };
      } else {
        return {
          ...state,
          alert: action.alertObj
        };
      }

    case actionTypes.HIDE_ALERT:
      if (state.alertQueue.length === 0) {
        return {
          ...state,
          alert: null
        };
      } else {
        const alertQueue = state.alertQueue.slice();
        const nextAlert = alertQueue.splice(0, 1)[0];
        return {
          ...state,
          alert: nextAlert,
          alertQueue: alertQueue
        };
      }
    case actionTypes.SHOW_NOTIFICATION:
      const oldNotifications = state.notifications.slice();
      return {
        ...state,
        notifications: [...oldNotifications, action.payload]
      };
    case actionTypes.REMOVE_NOTIFICATION:
      const oldNtfs = state.notifications.filter(
        item => item.id !== action.payload.id
      );
      return {
        ...state,
        notifications: oldNtfs
      };
    default:
      return state;
  }
};
