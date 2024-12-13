import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
`;

export const backWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
`;

export const progressBarContainer = css`
  width: 100%;
  height: 8px;
  /* background-color: #f3f3f3; */
  background-color: #d9d9d9;

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

export const responsiveButtonWrapper = css`
  max-width: 768px;
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 16px;
  padding: 0 16px;

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

export const backButtonStyle = css`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    color: #ff084a;
  }
`;

export const slideWrapper = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const slideContent = (step: number) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateY(-${step * 100}%);

  & > div {
    width: 100%;
    height: 100%;
    visibility: hidden;
    pointer-events: none;
  }

  & > div:nth-of-type(${step + 1}) {
    visibility: visible;
    pointer-events: auto;
  }
`;

export const slideDesign = css`
  width: 100%;
  height: 100%;
  align-content: center;
`;

export const currentPage = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const totalPage = css`
  margin-left: auto;
  margin-right: 12px;
  font-size: 16px;
  color: #ff084a;
`;
