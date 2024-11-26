import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const postContainer = css`
  width: 100%;
  height: 303px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 32px 0;
`;

export const pText = css`
  color: #000;
  font-size: 12px;
  font-weight: 400;
`;

export const searchBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 8px;
  width: 100%;
  height: 40px;
`;

export const searchInput = css`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  color: #c8c8c8;
  font-weight: 400;
  background: #f1f1f1;
`;

export const searchInputWithPadding = css`
  ${searchInput};
  padding-left: 40px;
`;

export const searchInputActive = css`
  color: #000;
`;

export const searchSection = css`
  position: relative;
  width: 100%;
`;

export const movieSearchIcon = css`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  color: #ccc;
`;

export const autocompleteBox = css`
  margin-top: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const autocompleteItem = css`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  border-bottom: 1px solid #d9d9d9;

  &:last-child {
    border-bottom: none;
  }
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const modalContent = css`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 308px;
  position: relative;
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -30%);
`;

export const searchInputModal = css`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  color: #000;
  font-weight: 400;
  background: #f1f1f1;
`;

export const inputContainer = css`
  position: relative;
  width: 100%;
`;

export const deleteIcon = css`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #ccc;
`;

export const reviewContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

export const reviewInput = css`
  width: 100%;
  height: 103px;
  font-size: 16px;
  border: none;
  outline: none;
  color: #000000;
  resize: none;
`;

export const spoilerContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  border-top: 1px solid #d9d9d9;
`;

export const buttonContainer = css`
  display: flex;
  gap: 31px;
  margin-top: 12px;
`;

export const buttonStyle = css`
  width: 48px;
  height: 20px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 80px;
  background: #fff;
  cursor: pointer;
`;

export const activeButtonStyle = css`
  border: 1px solid #756262;
  color: #756262;
  background: #75626233;
`;

export const shareButton = css`
  margin-top: 40%;
  align-self: center;
  width: 100%;
`;
