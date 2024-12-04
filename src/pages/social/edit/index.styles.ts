import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-width: 768px;
  justify-content: space-between;
`;

export const headerStyle = css`
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
`;

export const headerTitleStyle = css`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.8px;
  padding: 16px 0;
`;

export const profileImageContainerStyle = css`
  text-align: center;
`;

export const profileImageStyle = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

export const profileWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
`;

export const photoEditStyle = css`
  color: #0095f6;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const inputRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
`;

export const inputLabelStyle = css`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  flex: 1 0 0;
`;

const sharedInputStyle = css`
  width: 65%;
  padding: 16px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 1px solid #d9d9d9;

  &:focus {
    outline: none;
  }
`;

export const inputStyle = css`
  ${sharedInputStyle};
`;

export const readonlyInputStyle = css`
  ${sharedInputStyle};
  color: #9d9d9d;
`;

export const protfileWrapper = css`
  justify-content: space-between;
  padding: 0px 16px;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
  align-self: stretch;
`;

export const saveButtonStyle = css`
  width: 100%;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background: #ff084a;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.64px;
`;

export const buttonWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
