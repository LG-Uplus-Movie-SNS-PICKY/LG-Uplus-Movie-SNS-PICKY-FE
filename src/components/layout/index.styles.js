import styled from "@emotion/styled";
export const Flex = styled.div `
  display: flex;
  position: ${({ position }) => (position ? position : "static")};
  flex-direction: ${({ direction }) => (direction ? `${direction}` : "row")};
  justify-content: ${({ justify }) => (justify ? `${justify}` : "center")};
  align-items: ${({ align }) => (align ? `${align}` : "center")};
  gap: ${({ webGap }) => (webGap ? `${webGap}rem` : "0rem")};
  height: ${({ height }) => (height ? height : "auto")};
  margin: ${({ margin }) => (margin ? margin : "0")};
  padding: ${({ padding }) => (padding ? padding : "0")};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius ? `${borderRadius}px` : "0px"};

  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : "#FFFFFF"};

  overflow-y: ${({ overflowY }) => (overflowY ? overflowY : "visible")};

  flex: 1;

  /* 브라우저 크기에 따라 가로 크기 변경 */
  width: 100%; /* 기본적으로 부모 요소의 100% */

  @media (max-width: 480px) {
    width: 100%; /* 모바일 크기 이하 */
  }
`;
