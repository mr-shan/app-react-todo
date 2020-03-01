import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import "./css/react-date-picker-custom-styles.css";

import Header from "./components/header/Header";
import Navbar from "./components/nav-bar/Navbar";
import Todo from "./containers/todo/Todo";
import Reminder from "./containers/reminder/Reminder";
import EditTodo from "./containers/edit-todo/EditTodo";
import PageNotFound from "./components/404/404";
import Alert from "./components/alert/Alert";
import Notification from "./components/notification/Notification";

const App = () => {
  const notifications = useSelector(state => state.notifications);
  return (
    <div className="app">
      <div className="notifications-container">
        {notifications.map(item => <Notification key={item.id} data={item}/>)}
      </div>
      <BrowserRouter basename="/">
        <Header />
        <Navbar />
        <div className="main-body-container">
          <Switch>
            <Route exact path="/home" component={Todo} />
            <Route path="/reminder" component={Reminder} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/edit-todo/:id" component={EditTodo} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      <Alert />
    </div>
  );
};

export default App;
