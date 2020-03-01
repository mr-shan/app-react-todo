import React from "react";
import PropTypes from 'prop-types';

import "./ColorPicker.css";

export const ColorPicker = props => {
  const colorChangeClickHandler = color => {
    props.changed(color);
  };
  return (
    <div className="color-picker-container">
      <button className="color-picker-button">{props.children}</button>
      <div className="color-picker-wrapper">
        <span
          className="color-picker-wrapper-option"
          onClick={() => colorChangeClickHandler("default")}
        ></span>
        <span
          onClick={() => colorChangeClickHandler("red")}
          className="color-picker-wrapper-option color-picker-wrapper-option-red"
        ></span>
        <span
          onClick={() => colorChangeClickHandler("green")}
          className="color-picker-wrapper-option color-picker-wrapper-option-green"
        ></span>
        <span
          onClick={() => colorChangeClickHandler("blue")}
          className="color-picker-wrapper-option color-picker-wrapper-option-blue"
        ></span>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  changed: PropTypes.func,
  children: PropTypes.string
}

export default ColorPicker;