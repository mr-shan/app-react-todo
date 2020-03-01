import React from "react";
import PropTypes from "prop-types";

import "./EditableTitle.css";

export const EditableTitle = props => {
  const [title, setTitle] = React.useState("");
  const [keyPressed, setKeyPressed] = React.useState(false);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setTitle(props.children);
  }, [props.children]);

  const onTitleClickHandler = () => {
    inputRef.current.style.display = "block";
    inputRef.current.focus();
    inputRef.current.select();
  };

  const onBlurInputHandler = () => {
    if(keyPressed) {
      setKeyPressed(false);
      return;
    }
    inputRef.current.style.display = "none";
    if (title === props.children) return;
    const newTitle = title.replace(/\s/g, "");
    newTitle === "" ? setTitle(props.children) : props.changed(title);
  };

  const onKeyUpHandler = event => {
    switch (event.keyCode) {
      case 13:
        inputRef.current.style.display = "none";
        if (title === props.children) return;
        const newTitle = title.replace(/\s/g, "");
        if (newTitle === "") setTitle(props.children);
        props.changed(title);
        setKeyPressed(true);
        break;
      case 27:
        inputRef.current.style.display = "none";
        if (title === props.children) return;
        setTitle(props.children);
        setKeyPressed(true);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "inline-block",
        minHeight: props.minHeight
      }}
    >
      <input
        className="edit-todo-editable-input"
        value={title}
        onChange={event => setTitle(event.target.value)}
        ref={inputRef}
        onBlur={onBlurInputHandler}
        onKeyUp={onKeyUpHandler}
      />
      <div
        style={props.styling}
        onClick={onTitleClickHandler}
        className="editable-title-div"
      >
        {title}
      </div>
    </div>
  );
};

EditableTitle.propTypes = {
  children: PropTypes.string,
  changed: PropTypes.func,
  minHeight: PropTypes.any,
  styling: PropTypes.object
};

export default EditableTitle;
