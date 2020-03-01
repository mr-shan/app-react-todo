import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import themes from "./../../css/themes";

import "./Navbar.css";

export default () => {
  const [theme, setTheme] = useState(themes.light);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    Object.keys(theme).forEach(key => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  useEffect(() => {
    const existingTheme = localStorage.getItem("theme");
    if (!existingTheme) {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      setTheme(themes[existingTheme]);
      const darkM = existingTheme === "light" ? false : true;
      setDarkMode(darkM);
    }
  }, []);

  const themeChangeHandler = () => {
    const newTheme = darkMode ? "light" : "dark";
    setTheme(themes[newTheme]);
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
  };
  const imgSrc = darkMode ? "/bright-sun.png" : "/dark-moon.png";
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/reminder" activeClassName="active">
            Reminders
          </NavLink>
        </li>
        <li
          style={{
            position: "absolute",
            top: "0.5em",
            right: "0.5em",
            width: "2rem"
          }}
        >
          <img
            onClick={themeChangeHandler}
            style={{ height: "1.75em", cursor: "pointer" }}
            src={imgSrc}
            alt="/theme-chang-img"
          />
        </li>
      </ul>
    </nav>
  );
};
