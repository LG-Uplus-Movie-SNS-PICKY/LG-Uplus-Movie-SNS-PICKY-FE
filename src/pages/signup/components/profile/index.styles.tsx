import { css, keyframes } from "@emotion/react";

// 한 바퀴만 도는 애니메이션 정의
const spinAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

export const fileInput = css`
  display: none;
`;

export const customFileLabel = css`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff084a;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0073f;
  }
`;

export const imageContainer = css`
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 12px;
  border-radius: 200px;
  border: 2px solid #d9d9d9;
  perspective: 1000px; /* 3D 효과를 위한 원근법 */
`;

export const styledImage = (isAnimating: boolean) => css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
  ${isAnimating &&
  css`
    animation: ${spinAnimation} 1s ease;
  `}
`;

export const defaultImageText = css`
  color: #9d9d9d;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    color: #9d9d9d;
  }
`;

export const profileContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;