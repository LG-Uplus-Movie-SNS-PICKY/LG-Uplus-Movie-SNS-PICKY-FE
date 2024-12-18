import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* max-width: 768px; */
  width: 100%;
`;

export const headerStyle = css`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const backButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* margin-right: 8px; */
`;

export const filterContainerStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 0 8px 0 0;
  border-right: 1px solid #d9d9d9;
  font-family: 12px;
  font-weight: 600;
  color: #ff084a;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const filterLabelStyle = css`
  color: #ff084a;
  font-size: 12px;
  font-style: normal;
  font-weight: 00;
  text-align: center;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
`;

export const filterModalStyle = (isFilterActive: boolean) => css`
  position: absolute;
  top: 36px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 4px;
  z-index: 1000;
`;

export const filterOptionStyle = css`
  padding: 4px 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  letter-spacing: -0.5px;
  border-bottom: 0.5px solid #f1f1f1;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const filterButtonStyle = css`
  position: relative;
  display: flex;
  /* width: 80px; */
  /* height: 38px; */
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  padding: 8px 0 8px 12px;
  text-wrap: nowrap;
`;

export const filterIconStyle = css`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const searchInputStyle = css`
  padding: 4px 0 4px 8px;

  background-color: transparent;
  flex: 1;
  border: none;
  color: #000000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  /* letter-spacing: 0.5px; */
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9d9d9d;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const recentSearchHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: none;
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
  margin-top: 140px;
  flex: 1;
  color: #c8c8c8;
  text-align: center;
  width: 100%;
`;

export const emptyIconStyle = css`
  width: 100px;
  height: 100px;
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
  background: none;
  display: flex;
  border: none;
  padding: 0 12px 0 0;
  cursor: pointer;
`;

export const searchInputContainerStyle = (isFocused: boolean) => css`
  flex: 1;

  background-color: #f1f1f1;

  display: flex;
  align-items: center;
  /* position: relative; */

  border-radius: 50px;
  border: 1px solid ${isFocused ? "#FF084A" : "transparent"};
  transition: border-color 0.3s ease;
`;

export const suggestionListStyle = css`
  display: flex;
  padding-left: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;

  li {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
      width: 12px;
      height: 12px;
    }

    span {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
  }
`;

export const recentSearchListStyle = css`
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    div:first-of-type {
      display: flex;
      align-items: center;

      img {
        margin-right: 8px;
        width: 16px;
        height: 17.45px;
      }

      span {
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 400;
        color: #9d9d9d;
      }
    }

    /* 닫기 버튼 스타일 */
    div:last-of-type img {
      cursor: pointer;
      width: 14px;
      height: 14px;
    }
  }
`;
