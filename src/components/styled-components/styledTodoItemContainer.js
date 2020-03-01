import styled from "styled-components";

export default styled.article`
  background-color: var(${props => props.bgColor});
  border-radius: 0.75em;
  border: 1px solid var(${props => props.borderColor});
  color: var(--font-title-color);
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  &:hover {
    box-shadow: var(--box-shadow-todo-item);
  }
  animation: show-in 0.4s ease-out forwards;
  @keyframes show-in {
    from {
      transform: translateY(-30%);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
