// import axios from "axios";
import localStorageService from "./localhostRestService";

// const baseApiUrl = "http://localhost:4545";

// export default {
//   getAllTasks: () => axios.get(baseApiUrl + "/tasks"),
//   getTaskById: id => axios.get(baseApiUrl + "/tasks/" + id),
//   modifyTodoTask: (id, data) => axios.put(baseApiUrl + "/tasks/" + id, data),
//   removeTaskById: id => axios.delete(baseApiUrl + "/tasks/" + id),
//   createNewTask: data => axios.post(baseApiUrl + "/tasks", data),
//   createNewSubtask: (id, data) => axios.post(baseApiUrl + "/tasks/" + id, data),
// };

export default {
  getAllTasks: () => localStorageService('getAll'),
  getTaskById: id => localStorageService('getOne', id),
  modifyTodoTask: (id, data) => localStorageService('put', {id, data}),
  removeTaskById: id => localStorageService('delete', id),
  createNewTask: data => localStorageService('post', data),
  // createNewSubtask: (id, data) => axios.post(baseApiUrl + "/tasks/" + id, data),
};
