import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px;
`;

export const banner = css`
  width: 100%;
  height: 80px;
  margin: 16px 0;
  background: #000000;
`;

export const feedContainer = css`
  width: 100%;
  padding: 16px 0;
  border: none;
  border-top: 0.5px solid #d9d9d9;
  border-bottom: 0.5px solid #d9d9d9;
`;

export const feedItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const infoSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const profileSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const textSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;
  gap: 2px;
`;

export const movieTitle = css`
  color: #9d9d9d;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.48px;
`;

export const timeSection = css`
  color: #c8c8c8;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.48px;
`;

export const contentSection = css`
  margin: 16px 0;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.64px;
`;

export const carouselSection = css`
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 8px;
`;

export const reactionsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  justify-content: space-between;
`;

export const reactionsSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.64px;
  }
`;

export const moreOptions = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalContent = css`
  position: absolute;
  bottom: 55px;
  border-radius: 10px 10px 0px 0px;
  background: #fff;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  max-width: 768px;

  button:first-of-type {
    border-radius: 10px 10px 0 0;
    border-bottom: 0.5px solid rgba(217, 217, 217, 0.85);
  }

  button:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  button {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    border: none;
    background: #f1f1f1;
    color: #f00;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
  }
`;

export const spoilerImageWrapper = css`
  position: relative;
  width: 100%;
  cursor: pointer;
  p {
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
    margin-top: 8px;
  }
`;

export const blank = css`
  height: 50px;
  color: #fff;
`;

export const commentSection = css`
  width: 100%;
  padding: 16px 0;
`;

export const commentItem = css`
  display: flex;
  flex-direction: column;
`;

export const commentProfileSection = css`
  display: flex;
  align-items: center;
  margin-bottom: 11px;
  width: 100%; /* 가로폭을 100%로 설정 */
  justify-content: space-between; /* 양쪽 끝에 배치 */
`;

export const commentProfileDetails = css`
  display: flex;
  align-items: center;
  gap: 8px; /* 요소 간 간격 */
`;

export const commentTextSection = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;

  span {
    font-weight: 600;
  }
  p {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
    margin-left: 48px;
  }
`;

export const commentTimeSection = css`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.64px;
`;
