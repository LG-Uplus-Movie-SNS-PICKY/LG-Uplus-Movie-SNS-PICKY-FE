import styled from "@emotion/styled";

interface FlexProps {
  direction?: "row" | "column"; // flex-direction은 row 또는 column으로 제한
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  webGap?: number; // rem 단위이므로 number로 지정
  width?: number; // rem 단위이므로 number로 지정
  widthPer?: number; // % 단위로 사용
  height?: number; // rem 단위
  heightVh?: number; // vh 단위
  margin?: string; // 예: "0 auto"
  padding?: string; // 예: "10px 20px"
  borderRadius?: number; // px 단위
  backgroundColor?: string; // 색상값
  mobileGap?: number; // rem 단위 (주석 처리된 부분에도 대응)
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? `${direction}` : "row")};
  justify-content: ${({ justify }) => (justify ? `${justify}` : "center")};
  align-items: ${({ align }) => (align ? `${align}` : "center")};
  gap: ${({ webGap }) => (webGap ? `${webGap}rem` : "0rem")};
  width: ${({ width, widthPer }) =>
    width ? `${width}rem` : widthPer ? `${widthPer}%` : "100%"};
  height: ${({ height, heightVh }) =>
    height ? `${height}rem` : heightVh ? `${heightVh}vh` : "100vh"};
  margin: ${({ margin }) => (margin ? margin : "0")};
  padding: ${({ padding }) => (padding ? padding : "0")};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "0px"};

  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#fff"};
  flex: 1;
  /* 브라우저 크기에 따라 가로 크기 변경 */
  /* @media (max-width: 1023px) {
    gap: ${({ mobileGap }) => (mobileGap ? `${mobileGap}rem` : "0")};
  } */
`;
