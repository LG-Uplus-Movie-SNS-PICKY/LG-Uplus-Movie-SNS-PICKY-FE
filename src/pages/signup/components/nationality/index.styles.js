// import styled from "styled-components";
import { css } from "@emotion/react";
export const nationalityContainer = css `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
`;
export const nationalityButton = ($isSelected) => css `
  flex: 1;
  padding: 10px 0;
  height: 53px;
  border: 2px solid ${($isSelected ? "red" : "#d9d9d9")};
  background-color: #ffffff;
  color: ${($isSelected ? "#FF084A" : "#d9d9d9")};
  font-size: 16px;
  font-weight: ${($isSelected ? "bold" : "normal")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
`;
export const nationContainer = css `
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 8px 32px;
  align-items: center;
`;
export const textWrapper = css `
  display: flex;
  width: 100%;
  padding-left: 16px;
`;
