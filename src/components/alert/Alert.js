import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideAlert } from "./../../store/actions/actionsCreators";

import "./Alert.css";
import WithPopupModal from "./../../hoc/with-popup-modal/WithPopupModal";

export default () => {
  const alertState = useSelector(state => state.alert);

  const dispatch = useDispatch();
  const buttonClickHandler = () => {
    dispatch(hideAlert());
  };

  return (
    <WithPopupModal show={alertState === null ? false : true}>
      <div className="custom-alert-container">
        <h4 className="custom-alert-title">{alertState?.title}</h4>
        <p className="custom-alert-content">{alertState?.content}</p>
        <button
          className="custom-alert-container-button"
          onClick={buttonClickHandler}
        >
          Okay!
        </button>
      </div>
    </WithPopupModal>
  );
};
