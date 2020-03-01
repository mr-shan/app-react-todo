import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./WithPopupModal.css";

export default props => {
  return (
    <React.Fragment>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={300}
        classNames="with-popup-modal-backdrop-transition"
      >
        <div className="with-popup-modal-backdrop"></div>
      </CSSTransition>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={300}
        classNames="with-popup-modal-transition"
      >
        <div className="with-popup-modal-container">{props.children}</div>
      </CSSTransition>
    </React.Fragment>
  );
};
