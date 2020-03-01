import React from "react";
import { useDispatch } from "react-redux";

import httpService from "./../../rest/httpService";
import { showNotification } from "./../../store/actions/actionsCreators";

export default withModifyTaskFunctionality = HocComponent => {
  return props => {
    const dispatch = useDispatch();

    const dispatchNotification = (title, type) => {
      dispatch(
        showNotification({
          title: title,
          id: Math.random(),
          type: type
        })
      );
    };

    const modifyTask = (id, data) => {
      httpService
        .modifyTodoTask(id, data)
        .then(response => {
          dispatchNotification(`Modified: "${data.title}"`, "success");
          props.refreshData(response, "success");
        })
        .catch(error => {
          dispatchNotification(`Failed to modify: "${data.title}"`, "error");
          props.refreshData(error, "failed");
        });
    };

    const deleteTask = id => {
      httpService
        .removeTaskById(id)
        .then(response => {
          dispatchNotification(`Removed: "${props.data.title}"`, "success");
          props.refreshData(response, "success");
        })
        .catch(error => {
          dispatchNotification(
            `Failed to remove: "${props.data.title}"`,
            "error"
          );
          props.refreshData(error, "failed");
        });
    };

    const createNewSubtask = data => {
      httpService
        .createNewSubtask(props.data.id, data)
        .then(response => {
          dispatchNotification(`Added: "${subtaskData.title}"`, "success");
          props.refreshData(response, "success");
        })
        .catch(error => {
          dispatchNotification(
            `Failed to add: "${subtaskData.title}"`,
            "error"
          );
          props.refreshData(error, "failed");
        });
    };

    return <HocComponent {...props} />;
  };
};
