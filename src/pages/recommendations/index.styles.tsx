import { css } from "@emotion/react";

export const containerStyle = css`
  height: 100vh;
  max-width: 768px;
`;

export const headerWrapperStyle = css`
  display: flex;
  padding: 16px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const headerStyle = css`
  display: flex;
  padding: 24px 16px 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 0.5px solid #d9d9d9;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const titleStyle = css`
  color: #5e5e5e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.64px;
`;

export const highlightStyle = css`
  color: #ff084a;
  /* color: #5E5E5E; */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;
`;

export const subtitleStyle = css`
  padding-left: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;

  b {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.8px;
  }
`;

export const movieGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  justify-content: center;
  padding: 0px 32px;
`;

export const movieCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const movieImageStyle = css`
  width: 100px;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const movieTitleStyle = css`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
`;

export const movieRatingStyle = css`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  color: #555;
`;

export const movieWrapperStyle = css`
  display: flex;
  padding: 0px 32px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const movieContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;
