import { css } from "@emotion/react";

export const progressBarContainer = css`
  width: 100%;
  height: 10px;
  background-color: #f3f3f3;
  margin-bottom: 20px;

  @media (max-width: 76px) {
    height: 8px;
  }

  @media (max-width: 48px) {
    height: 6px;
    margin-bottom: 15px;
  }
`;

export const progressStyle = (progress: number) => css`
  width: ${progress}%;
  height: 100%;
  background-color: #ff084a;
  transition: width 0.3s ease-in-out;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const responsiveFlexBox = css`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const responsiveButtonWrapper = css`
  max-width: 768px;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;

  @media (max-width: 768px) {
    button {
      width: 90%;
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
      font-size: 12px;
      padding: 8px;
    }
  }
`;
export const backButtonWrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const backButton = css`
  align-items: left;
  background-color: transparent;
  border: none;
  color: #ff084a;
  font-size: 16px;
  font-weight: bold;
  /* padding: 16px 16px 16px 8px; */
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const logoContainer = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 32px;
`;

export const block = {
  FlexBox: ({
    $direction = "row",
    $justifyContent = "flex-start",
    $alignItems = "stretch",
    $width = "100%",
    $height = "auto",
    $margin = "0",
    $padding = "0",
    $border = "none",
    $borderRadius = "0",
    $bgColor = "transparent",
    $gap = "0",
    $pointer = false,
  }: StyleBlock) => css`
    display: flex;
    flex-direction: ${$direction};
    justify-content: ${$justifyContent};
    align-items: ${$alignItems};
    width: ${$width};
    height: ${$height};
    margin: ${$margin};
    padding: ${$padding};
    border: ${$border};
    border-radius: ${$borderRadius};
    background-color: ${$bgColor};
    cursor: ${$pointer ? "pointer" : "default"};
    gap: ${$gap};
  `,
};

type StyleBlock = {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $direction?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $border?: string;
  $borderRadius?: string;
  $bgColor?: string;
  $gap?: string;
  $pointer?: boolean;
};