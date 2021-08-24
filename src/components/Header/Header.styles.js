import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  background: var(--medGrey);
  padding: 0 10px;
  box-shadow: 0 8px 6px -6px #000;
  height: 80px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
`;