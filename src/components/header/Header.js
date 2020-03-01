import React from "react";

import "./Header.css";

export default () => {
  return (
    <header>
      <div className="logo-container">
        <img src="/logo.png" alt="logo" />
        <div className="main-heading-container">
          <h1>Todo's App</h1>
          <div>Plan your work! Get Productive!</div>
        </div>
      </div>
    </header>
  );
};
