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

  TitleMenu100: styled.span<StyleText>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
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
  `,
  FocusedMenu: styled.span<StyleText & { isFocused: boolean }>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
    color: ${({ isFocused }) =>
      isFocused ? theme.color.Red : theme.color.Gray};
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
  FocusedWarning: styled.span<StyleText & { isFocused: boolean }>`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.weight[weight] : theme.weight.Normal};
    font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
    color: ${({ isFocused }) =>
      isFocused ? theme.color.Red : theme.color.Gray};
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
  FlexBox: styled.div<StyleBlock>`
    display: flex;
    flex-direction: ${({ $direction }) => $direction || "row"};
    justify-content: ${({ $justifyContent }) =>
      $justifyContent || "flex-start"};
    align-items: ${({ $alignItems }) => $alignItems || "stretch"};
    width: ${({ $width }) => $width || "100%"};
    height: ${({ $height }) => $height || "auto"};
    margin: ${({ $margin }) => $margin || "0"};
    padding: ${({ $padding }) => $padding || "0"};
    border: ${({ $border }) => $border || "none"};
    border-radius: ${({ $borderRadius }) => $borderRadius || "0"};
    background-color: ${({ $bgColor, theme }) =>
      $bgColor
        ? theme.color[$bgColor as keyof DefaultTheme["color"]] || $bgColor
        : "transparent"};
    cursor: ${({ $pointer }) => ($pointer ? "pointer" : "default")};
    gap: ${({ $gap }) => $gap || "0"};
  `,
};

type StyleButton = {
  $display?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $borderRadius?: string;
  $color?: keyof DefaultTheme["color"] | string;
  $bgColor?: keyof DefaultTheme["color"] | string;
  $cursor?: string;
  $border?: string;
  $variant?: "primary" | "secondary";
};

export const Button = {
  Confirm: styled.div<StyleButton & { $isDisabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 53px;
    border-radius: 10px;
    color: #ffffff;
    background-color: ${({ $isDisabled }) =>
      $isDisabled ? "#e8e8e8 " : "#FF084A"};
    cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  `,
  Select: styled.button<{ isSelected: boolean }>`
    padding: 10px 20px;
    border: 1px solid
      ${({ isSelected }) => (isSelected ? "#007BFF" : "#D9D9D9")};
    background-color: ${({ isSelected }) => (isSelected ? "#007BFF" : "#FFF")};
    color: ${({ isSelected }) => (isSelected ? "#FFF" : "#000")};
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};

    &:hover {
      background-color: ${({ isSelected }) =>
        isSelected ? "#0056b3" : "#f0f0f0"};
    }
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
    padding-left: 15px;
    background-color: #ffffff;
    border: 1px solid #c9cbd4;
    border-radius: 19px;

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
    display: block;
    width: auto;
    min-width: 100px;
    height: 53px;
    outline: #e3e2e0;
    padding-left: 15px;
    background-color: #ffffff;
    border: 1px solid #c9cbd4;
    border-radius: 19px;
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
