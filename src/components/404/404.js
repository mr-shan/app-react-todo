import React from "react";

import StyledWrapper from "./../styled-components/styledTodoContainerWrapper";

export default () => {
  window.hideLoader();
  return (
    <StyledWrapper style={{height: "80vh"}}>
      <h1>404!</h1>
      <p>The page you are looking for is not found!</p>
    </StyledWrapper>
  );
};
