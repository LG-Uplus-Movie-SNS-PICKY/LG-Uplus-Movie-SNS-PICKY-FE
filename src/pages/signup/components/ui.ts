import theme from "./theme";
import styled, { DefaultTheme } from "styled-components";

// 재사용 될 텍스트
type StyleText = {
  color?: keyof DefaultTheme["color"];
  size?: keyof DefaultTheme["size"];
  weight?: keyof DefaultTheme["weight"];
  pointer?: boolean;
  margin?: string;
};

export const Text = {
  CheckIcon: styled.span<{ color?: keyof DefaultTheme["color"] }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.Red};
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  `,
  Mini: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size100)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  Subtitle: styled.span<StyleText>`
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Gray)};
  `,
  Notice100: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  Notice200: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Bold};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  Notice: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  TitleMenu100: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size500)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  TitleMenu200: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Bold};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size500)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  TitleMenu300: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Bold};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size550)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
    cursor: ${(props) => props.pointer && "pointer"};
    margin-bottom: 16px;
  `,
  FocusedMenu: styled.span<StyleText & { $isFocused: boolean }>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
    color: ${({ $isFocused }) =>
      $isFocused ? theme.color.Red : theme.color.Gray};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  Warning: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.Yellow)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  HugeWarning: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Bold};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size600)};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.White)};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  FocusedWarning: styled.span<StyleText & { $isFocused: boolean }>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
    color: ${({ $isFocused }) =>
      $isFocused ? theme.color.Red : theme.color.Gray};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
};

// 재사용 될 블록
type StyleBlock = {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $display?: string;
  $direction?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $border?: string;
  $borderRadius?: string;
  $color?: keyof DefaultTheme["color"] | string;
  $bgColor?: keyof DefaultTheme["color"] | string;
  $bgImg?: string;
  $bgSize?: string;
  $gap?: string;
  $position?: string;
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
  $relative?: boolean;
  $zIndex?: string;
  $pointer?: boolean;
  $maxWidth?: string;
  $borderBottom?: string;
  $flexGrow?: string;
};

export const Block = {
  AbsoluteBox: styled.div<StyleBlock>`
    position: absolute;
    top: ${(props: StyleBlock) => props.$top || "auto"};
    right: ${(props: StyleBlock) => props.$right || "auto"};
    bottom: ${(props: StyleBlock) => props.$bottom || "auto"};
    left: ${(props: StyleBlock) => props.$left || "auto"};
    z-index: ${(props: StyleBlock) => props.$zIndex || "auto"};
    width: ${(props: StyleBlock) => props.$width || "100%"};
    height: ${(props: StyleBlock) => props.$height || "auto"};
    min-width: 375px;
    max-width: 600px;
    margin: ${(props: StyleBlock) => props.$margin || "0"};
    padding: ${(props: StyleBlock) => props.$padding || "0"};
    border: ${(props: StyleBlock) => props.$border || "none"};
    border-radius: ${(props: StyleBlock) => props.$borderRadius || "0"};
    background-color: ${(props: StyleBlock) =>
      (props.$bgColor || "transparent") as string};
    cursor: ${(props: StyleBlock) => (props.$pointer ? "pointer" : "default")};
  `,
  FlexBox: styled.div<StyleBlock>`
    display: flex;
    flex-direction: ${(props: StyleBlock) => props.$direction || "row"};
    justify-content: ${(props: StyleBlock) =>
      props.$justifyContent || "flex-start"};
    align-items: ${(props: StyleBlock) => props.$alignItems || "stretch"};
    width: ${(props: StyleBlock) => props.$width || "100%"};
    height: ${(props: StyleBlock) => props.$height || "auto"};
    margin: ${(props: StyleBlock) => props.$margin || "0"};
    padding: ${(props: StyleBlock) => props.$padding || "0"};
    border: ${(props: StyleBlock) => props.$border || "none"};
    border-radius: ${(props: StyleBlock) => props.$borderRadius || "0"};
    background-color: ${(props: StyleBlock) =>
      (props.$bgColor || "transparent") as string};
    cursor: ${(props: StyleBlock) => (props.$pointer ? "pointer" : "default")};
    gap: ${(props: StyleBlock) => props.$gap || "0"};
  `,

  SoldoutBox: styled.div<StyleBlock>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 18px;
    font-weight: bold;
    width: ${(props) => props.$width || "100%"};
    height: ${(props) => props.$height || "100%"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
  `,
};

type StyleButton = {
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  color?: keyof DefaultTheme["color"] | string;
  bgColor?: keyof DefaultTheme["color"] | string;
  cursor?: string;
  border?: string;
  variant?: "primary" | "secondary";
};

export const Button = {
  Confirm: styled.div<StyleButton & { isDisabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 53px;
    border-radius: 16px;
    color: #ffffff;
    background-color: ${({ isDisabled }) =>
      isDisabled ? "#e8e8e8 " : "#FF084A"};
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  `,
  Select: styled.button<{ $isSelected: boolean }>`
    padding: 10px 20px;
    border: 1px solid
      ${({ $isSelected }) => ($isSelected ? "#007BFF" : "#D9D9D9")};
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#007BFF" : "#FFF"};
    color: ${({ $isSelected }) => ($isSelected ? "#FFF" : "#000")};
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};

    &:hover {
      background-color: ${({ $isSelected }) =>
        $isSelected ? "#0056b3" : "#f0f0f0"};
    }
  `,

  AlertModalSelect: styled.div<StyleButton>`
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid
      ${(props) => (props.variant === "primary" ? "#F4B647" : "#E8E8E8")};
    background-color: ${(props) =>
      props.variant === "primary" ? "#F4B647" : "white"};
    color: ${(props) => (props.variant === "primary" ? "white" : "#666")};
    width: 180px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: ${(props) =>
        props.variant === "primary" ? "orange" : "#f5f5f5"};
    }
  `,
  SelectInput: styled.div<StyleButton & { isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 273px;
    height: 53px;
    border-radius: 19px;
    color: ${({ isActive }) => (isActive ? "#F4B647" : "#C9CBD4")};
    background-color: ${({ isActive }) => (isActive ? "#F6ECD7" : "#F8F8F8")};
    border: ${({ isActive }) =>
      isActive ? "1px solid #F4B647" : "1px solid #C9CBD4"};
    cursor: pointer;
  `,
  RadiusButton: styled.div<StyleButton>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 33px;
    border-radius: 30px;
    border: 1px solid #f4b647;
    color: #f4b647;
    cursor: pointer;
    background-color: transparent;
  `,

  OptionButton: styled.div<StyleButton>`
    background-color: #fffaec;
    color: #f4b647;
    border: 1px solid #fffaec;
    border-radius: 5px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  `,
  PointAllin: styled.div<StyleButton>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 36px;
    border-radius: 18px; /* 버튼의 둥근 모서리 */
    color: #2d2d2d; /* 텍스트 색상 */
    background-color: #f7f8fa; /* 버튼 배경색 */
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #e9ecef; /* 마우스를 올렸을 때의 배경색 */
    }
  `,
};

// 재사용 될 이미지
type StyleImg = {
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
  pointer?: boolean;
};

export const Img = {
  RoundIcon: styled.img<StyleImg>`
    display: block;
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.width ? props.height : "auto")};
    border: ${(props) => props.border};
    border-radius: 100%;
    cursor: ${(props) => props.pointer && "pointer"};
  `,
  AngledIcon: styled.img<StyleImg>`
    display: block;
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.width ? props.height : "auto")};
    border: ${(props) => props.border};
    cursor: ${(props) => props.pointer && "pointer"};
  `,
};

// 재사용 될 이미지
type StyleInput = {
  width?: string;
  height?: string;
  pointer?: boolean;
  border?: string;
};

export const Input = {
  InfoBox: styled.input<StyleInput>`
    display: block;
    width: 100%;
    height: 53px;
    outline: #e3e2e0;
    padding-left: 16px;
    background-color: #ffffff;
    border: 1px solid #c9cbd4;
    border-radius: 10px;

    ::placeholder {
      color: #939292;
      font-size: 17px;
    }

    &:focus {
      border: 1px solid #000;
    }

    cursor: ${(props) => props.pointer && "pointer"};

    @media (max-width: 768px) {
      height: 45px;
      font-size: 15px;
      ::placeholder {
        font-size: 15px;
      }
    }

    @media (max-width: 480px) {
      height: 40px;
      font-size: 14px;
      ::placeholder {
        font-size: 14px;
      }
    }
  `,
  BirthBox: styled.input<StyleInput>`
    display: flex;
    flex: 1;
    height: 53px;
    outline: #e3e2e0;
    padding-left: 16px;
    background-color: #ffffff;
    border: 1px solid #c9cbd4;
    border-radius: 10px;
    width: 100%;
    min-width: 0;

    ::placeholder {
      color: #939292;
      font-size: 17px;
    }
    &:focus {
      border: 1px solid #000;
    }
    cursor: ${(props) => props.pointer && "pointer"};
  `,
};

type StyleMargin = {
  size: number;
  direction: "column" | "row";
};

export const Margin = styled.div<StyleMargin>`
  width: ${({ size, direction }) => (direction === "row" ? size : 0)}px;
  height: ${({ size, direction }) => (direction === "column" ? size : 0)}px;
`;

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh; // 화면 전체 높이
  overflow-y: scroll; // 세로 스크롤 활성화
  overflow-x: hidden; // 가로 스크롤 숨김
  scrollbar-width: none; // Firefox용 스크롤바 숨김
  -ms-overflow-style: none; // IE, Edge용 스크롤바 숨김

  &::-webkit-scrollbar {
    display: none; //스크롤바 숨김
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 90px; /* 헤더 높이에 따라 조정 */
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Divider = styled.div`
  width: 90%;
  height: 2px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

export const Divider2 = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 79px;
  max-width: 600px;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 99px;
  max-width: 600px;
  background-color: #ffffff;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 50px 0px;
`;
