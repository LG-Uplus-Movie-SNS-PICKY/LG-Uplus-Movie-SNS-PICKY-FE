import { css } from "@emotion/react";

export const birthDateContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  max-width: 768px;
  width: 100%;
  align-items: center;
`;

export const pickerContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  width: 100%;
  overflow: hidden;
  max-height: 150px;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const pickerColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  width: 30%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const pickerItem = css`
  padding: 8px;
  cursor: pointer;
  color: #333;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    font-weight: bold;
    color: #ff084a;
  }
`;

export const TextWrapper = css`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-left: 16px;
`;