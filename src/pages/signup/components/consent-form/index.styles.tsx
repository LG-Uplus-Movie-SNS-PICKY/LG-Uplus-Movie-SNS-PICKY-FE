// import styled from "styled-components";
import { css } from "@emotion/react";

export const consentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 8px 32px;
`;

export const consentContainer = ($isSelected: boolean) => css`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 2px solid ${($isSelected ? "red" : "#d9d9d9")};
  border-radius: 10px;
  padding: 12px 16px;
  background-color: #ffffff;
  cursor: pointer;
  width: 100%;
`;

export const customCheckbox =  css`
  width: 20px;
  height: 20px;
  border-radius: 4px; /* 모서리를 둥글게 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

export const consentText = css`
  font-size: 16px;
  font-weight: bold;
  color: #ff084a;

  & > span {
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
`;

export const textWrapper = css`
  display: flex;
  width: 100%;
  padding-left: 16px;
`;