import styled from "@emotion/styled";

interface FlexProps {
  position?: "relative" | "absolute" | "fixed" | "sticky";
  direction?: "row" | "column"; // flex-direction은 row 또는 column으로 제한
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  webGap?: number; // rem 단위이므로 number로 지정
  height?: string; // rem 단위
  heightVh?: number; // vh 단위
  margin?: string; // 예: "0 auto"
  padding?: string; // 예: "10px 20px"
  borderRadius?: number; // px 단위
  backgroundColor?: string; // 색상값
  mobileGap?: number; // rem 단위 (주석 처리된 부분에도 대응)
  overflowY?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  position: ${({ position }) => (position ? position : "static")};
  flex-direction: ${({ direction }) => (direction ? `${direction}` : "row")};
  justify-content: ${({ justify }) => (justify ? `${justify}` : "center")};
  align-items: ${({ align }) => (align ? `${align}` : "center")};
  gap: ${({ webGap }) => (webGap ? `${webGap}rem` : "0rem")};
  height: ${({ height }) => (height ? height : "auto")};
  margin: ${({ margin }) => {
    console.log(margin);
    return margin ? margin : "0";
  }};
  padding: ${({ padding }) => (padding ? padding : "0")};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "0px"};

  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#FFFFFF"};

  overflow-y: ${({ overflowY }) => (overflowY ? overflowY : "visible")};

  flex: 1;

  /* 브라우저 크기에 따라 가로 크기 변경 */
  width: 100%; /* 기본적으로 부모 요소의 100% */

  @media (max-width: 480px) {
    width: 100%; /* 모바일 크기 이하 */
  }
`;
