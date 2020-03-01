import styled from "styled-components";

export default styled.main`
  // background: linear-gradient(254deg, var(--bg-primary), var(--bg-ternary));
  // border-radius: 0.5em;
  color: var(--font-title-color);
  transition: all 0.3s;
  box-sizing: border-box;
  // border: solid 1px var(--bg-primary);
  margin: auto;
  max-width: ${props => props.maxWidth}
`;

// box-shadow: 0px 0px 5px 2px var(--bg-primary); 
// border: solid 1px var(--bg-primary);