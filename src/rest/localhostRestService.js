import { v4 as uuidv4 } from "uuid";

export default (request, data) => {
  const requestQueue = [];

  const promiseHandler = (request, data, resolve, reject) => {
    switch (request) {
      case "getAll":
        getAllRequestHandler(resolve, reject);
        break;
      case "getOne":
        getOneRequestHandler(data, resolve, reject);
        break;
      case "put":
        putRequestHandler(data, resolve, reject);
        break;
      case "post":
        postRequestHandler(data, resolve, reject);
        break;
      case "delete":
        deleteRequestHandler(data, resolve, reject);
        break;
    }
    if (requestQueue.length !== 0) {
      const nextReq = requestQueue.splice(0, 1)[0];
      promiseHandler(
        nextReq.request,
        nextReq.data,
        nextReq.resolve,
        nextReq.reject
      );
    }
  };

  return new Promise((resolve, reject) => {
    if (requestQueue.length !== 0) {
      requestQueue.push({
        request: request,
        data: data,
        resolve,
        reject
      });
    } else {
      promiseHandler(request, data, resolve, reject);
    }
  });
};

const getAllRequestHandler = (resolve, reject) => {
  try {
    const str = localStorage.getItem("todoPostList");
    // str ? resolve(JSON.parse(str)) : resolve([]);
    if (str === null) {
      localStorage.setItem("todoPostList", JSON.stringify(defaultValue));
      resolve({
        data: defaultValue
      });
    } else {
      resolve({ data: JSON.parse(str) });
    }
  } catch (error) {
    reject({ message: "Exception occured!", error: error });
  }
};

const getOneRequestHandler = (id, resolve, reject) => {
  try {
    const str = localStorage.getItem("todoPostList");
    if (str === null) {
      return reject({
        message: "No tasks currently present in the application"
      });
    } else {
      const data = JSON.parse(str);
      const isFound = data.find(e => e.id === id);
      if (isFound) {
        return resolve({ data: isFound });
      }
      return reject({ message: "No such a task exists!" });
    }
  } catch (error) {
    reject({ message: "Exception occured!", error: error });
  }
};

const postRequestHandler = (body, resolve, reject) => {
  try {
    const str = localStorage.getItem("todoPostList");
    if (str === null) {
      return reject({
        message: "No tasks currently present in the application"
      });
    } else {
      const data = JSON.parse(str);
      body.id = uuidv4();
      data.splice(0, 0, body);
      localStorage.setItem("todoPostList", JSON.stringify(data));
      return resolve({ data: data });
    }
  } catch (error) {
    reject({ message: "Exception occured!", error: error });
  }
};

const deleteRequestHandler = (id, resolve, reject) => {
  try {
    const str = localStorage.getItem("todoPostList");
    if (str === null) {
      return reject({
        message: "No tasks currently present in the application"
      });
    } else {
      const data = JSON.parse(str);
      const isFound = data.find(e => e.id === id);
      if (isFound) {
        const index = data.indexOf(isFound);
        data.splice(index, 1);
        localStorage.setItem("todoPostList", JSON.stringify(data));
        return resolve({ data: data });
      } else {
        return reject({ message: "No such a task exists!" });
      }
    }
  } catch (error) {
    reject({ message: "Exception occured!", error: error });
  }
};

const putRequestHandler = (body, resolve, reject) => {
  try {
    const str = localStorage.getItem("todoPostList");
    if (str === null) {
      return reject({
        message: "No tasks currently present in the application"
      });
    } else {
      const data = JSON.parse(str);
      const isFound = data.find(e => e.id === body.id);
      if (isFound) {
        const index = data.indexOf(isFound);
        data.splice(index, 1, body.data);
        localStorage.setItem("todoPostList", JSON.stringify(data));
        return resolve({ data: body.data });
      } else {
        return reject({ message: "No such a task exists!" });
      }
    }
  } catch (error) {
    reject({ message: "Exception occured!", error: error });
  }
};

const defaultValue = [
  {
    id: uuidv4(),
    title: "A dummy task created for you to get started!",
    status: false,
    dueDate: null,
    category: "Dummy",
    colorTheme: "default"
  }
];
