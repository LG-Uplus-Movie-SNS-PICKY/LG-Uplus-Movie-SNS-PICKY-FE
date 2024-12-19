import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const feedContainer = css`
  width: 100%;
  padding: 16px 16px;
  border: none;
  border-top: 0.5px solid #d9d9d9;
  border-bottom: 0.5px solid #d9d9d9;
  margin-bottom: 16px;
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

export const CommentInfoSection = css`
  display: flex;
  color: #c8c8c8;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: -0.48px;
  gap: 4px;
  flex-direction: column;
`;

export const timeSection = css`
  display: flex;
  color: #c8c8c8;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: -0.48px;
  gap: 4px;
  flex-direction: column;
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
    cursor: pointer;

    &.reaction {
      min-width: 58px; /* 좋아요와 댓글 버튼 각각의 최소 너비를 고정 */
      justify-content: space-between; /* 버튼 내용 간 간격 유지 */
    }

    .like-number,
    .comment-number {
      min-width: 24px; /* 숫자의 최소 너비를 고정 */
      text-align: center; /* 숫자를 중앙 정렬 */
    }
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
  opacity: 1;
  animation: fadeIn 0.3s ease-out;
  z-index: 999;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const modalContent = css`
  position: absolute;
  bottom: 55px;
  border-radius: 10px 10px 0 0;
  background: #f1f1f1;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  max-width: 768px;
  animation: slideUp 0.3s ease-out;

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
    gap: 12px;
  }
`;

export const commentSection = css`
  width: 100%;
  padding: 0 16px 0 32px;
  margin-bottom: 64px;
`;

export const commentItem = css`
  display: flex;
  flex-direction: column;
`;

export const commentProfileSection = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 0 16px 0;
`;

export const commentProfileDetails = css`
  display: flex;
  gap: 8px;
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
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.48px;
  }
`;

export const commentTimeSection = css`
  color: #000;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

export const slideUp = css`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const commentInputSection = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 430px;
  border-radius: 8px 8px 0px 0px;
  border-top: 1px solid #c8c8c8;
  background: #fff;
  padding: 20px 16px 12px 16px;
`;

export const inputWrapper = css`
  position: relative;
  flex: 1 0 0;

  input {
    width: 100%;
    padding: 12px 16px;
    padding-right: 40px;
    font-size: 14px;
    outline: none;
    border-radius: 50px;
    border: 1px solid #d9d9d9;
    background: #fff;
  }
`;

export const registerImage = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const commentBox = css`
  display: flex;
  gap: 4px;
`;

export const carouselWrapper = css`
  position: relative; /* 스포주의 텍스트가 블러된 요소 위에 표시되도록 설정 */
`;
