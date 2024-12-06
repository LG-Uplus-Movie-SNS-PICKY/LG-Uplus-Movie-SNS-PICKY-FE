import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 16px 24px;
  align-items: center;
  box-sizing: border-box;
`;

export const pageContainer = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 20px;
  gap: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
`;

export const titleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const titleContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

export const title = css`
  color: #5e5e5e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.64px;
`;

export const subtitle = css`
  font-size: 12px;
  color: #c8c8c8;
  font-weight: 400;
  text-align: left;
`;

export const genreGroup = css`
  display: flex;
  flex-direction: column;
`;

export const requiredBadge = css`
  padding: 4px 8px;
  background-color: #2e2e2e;
  color: #fff;
  border-radius: 12px;
  /* font-size: 12px; */
  /* font-weight: bold; */
  display: flex;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// export const genreGrid = css`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
//   justify-content: center;
// `;

// export const genreGrid = css`
//   display: grid;
//   gap: 8px; /* 버튼 간격 및 줄 사이 간격 */
//   grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); /* 반응형 설정 */
//   justify-items: center;
//   width: 100%;
//   box-sizing: border-box;
// `;

export const genreGrid = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const genreButton = ($isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: ${$isSelected ? "0.5px solid #000000" : "0.5px solid #f1f1f1"};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  background-color: ${$isSelected ? "#000000" : "#ffffff"};
  color: ${$isSelected ? "#ffffff" : "#5e5e5e"};
  font-weight: 400;
  font-size: ${$isSelected ? "12px" : "12px"};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0;
`;

export const Warning = css`
color: #FF084A;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.52px;
visibility: hidden; 
height: 20px;
`;

export const TextWrapper = css`
  display: flex;
  width: 100%;
  padding-left: 16px;
`;