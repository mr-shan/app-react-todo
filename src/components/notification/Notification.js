import React from "react";
import PropTypes from 'prop-types';

import "./Notification.css";

export const Notification = props => {
  let backgroundColor;

  switch (props.data.type) {
    case "error":
      backgroundColor = "#a42020";
      break;
    default:
    case "success":
      backgroundColor = "#348134";
  }

  return (
    <div
      className="notification-container"
      style={{ background: backgroundColor }}
    >
      <h3 className="notification-title">{props.data.title}</h3>
    </div>
  );
};

Notification.propTypes = {
  data: PropTypes.object
}

export default Notification;