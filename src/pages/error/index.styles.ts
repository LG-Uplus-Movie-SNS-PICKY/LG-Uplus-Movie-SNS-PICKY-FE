import { css } from "@emotion/react";

export const Wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding: 0 33px;
`;

export const IconWrapper = css`
  margin-bottom: 40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Message = css`
  text-align: center;
  margin-bottom: 24px;

  h2 {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.64px;
    margin-bottom: 16px;
  }

  p {
    color: #9d9d9d;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.48px;
  }
`;

export const ButtonWrapper = css`
  display: flex;
  gap: 16px;
`;

export const Button = css`
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid #5e5e5e;
  background: #fff;
  color: #5e5e5e;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;

  &:hover {
    font-weight: 600;
  }
`;
