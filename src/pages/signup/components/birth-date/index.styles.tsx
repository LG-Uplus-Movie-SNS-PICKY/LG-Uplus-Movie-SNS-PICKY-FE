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

  /* 테두리 추가 */
  border: 2px solid #ddd; /* 테두리 색상 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 8px; /* 내부 여백 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

export const pickerColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  width: 30%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
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

export const monthPickerColumn = css`
  ${pickerColumn};

  /* 양옆 스트로크 추가 */
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #ff084a; /* 스트로크 색상 */
    top: 0;
  }

  &::before {
    left: 0; /* 왼쪽 스트로크 */
  }

  &::after {
    right: 0; /* 오른쪽 스트로크 */
  }
`;

export const strokeOverlay = css`
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: #ff084a; /* 스트로크 색상 */
  top: 0;
`;

// export const leftStroke = css`
//   ${strokeOverlay};
//   left: calc(35% - 16px); /* 월 pickerColumn의 왼쪽 위치 */
// `;

// export const rightStroke = css`
//   ${strokeOverlay};
//   right: calc(35% - 16px); /* 월 pickerColumn의 오른쪽 위치 */
// `;