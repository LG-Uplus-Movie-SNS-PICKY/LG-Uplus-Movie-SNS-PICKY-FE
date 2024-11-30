import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-between;
  max-width: 768px;
  width: 100%;
`;

export const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
`;

export const backButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 16px;
`;

export const searchInputStyle = css`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  background: #f1f1f1;
  flex: 1;
  border: none;
  color: #9d9d9d;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
`;

export const recentSearchHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
`;

export const titleStyle = css`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const clearAllButtonStyle = css`
  background: none;
  color: #9d9d9d;
  border: none;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
`;

export const emptyStateContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #c8c8c8;
  text-align: center;
  width: 100%;
`;

export const emptyIconStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const emptyTextStyle = css`
  border-top: 12px;
  font-size: 14px;
  align-self: stretch;
  color: #9d9d9d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const searchButtonStyle = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  display: flex;
  border: none;
  cursor: pointer;
`;

export const searchInputContainerStyle = css`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;
