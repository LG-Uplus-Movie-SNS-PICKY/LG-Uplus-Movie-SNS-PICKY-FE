import { css } from "@emotion/react";

export const wrapper = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f5f5f5;
`;

export const postContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const pText = css`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.64px;
`;

export const searchBox = css`
  position: relative; /* BackPost 기준 위치 설정 */
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 8px 16px 24px 16px;
  border-radius: 0 0 8px 8px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition: height 0.3s ease;
  gap: 10px;
`;

export const searchBoxExpanded = css`
  padding-bottom: 0; /* 자동완성 리스트와 간격 제거 */
`;

export const searchInput = css`
  width: 100%;
  padding: 0 16px 24px 16px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1.5px solid #d9d9d9;
  background: #fff;
  color: #9d9d9d;
  font-weight: 400;
`;

export const searchInputWithPadding = css`
  width: 100%;
  padding: 16px 16px 16px 48px;
  font-size: 16px;
  border-radius: 12px;
  border: 1.5px solid #d9d9d9;
  background: #fff;
  color: #000;
  font-weight: 400;
  &:focus {
    outline: none;
    background: #f1f1f1;
    border-radius: 8px 8px 0px 0px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.64px;
  }
`;

export const searchSection = css`
  position: relative;
  width: 100%;
`;

export const movieSearchIcon = css`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none; /* 포커스 시 클릭 이벤트 방지 */
`;

export const autocompleteBox = css`
  width: 100%;
  margin-top: 0;
  margin-bottom: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 150px;
  overflow-y: auto;
`;

export const autocompleteItem = css`
  padding: 8px 16px;
  color: #9d9d9d;
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const modalOverlayBack = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const modalContainer = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: 63%;
`;

export const modalContent = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const searchContainer = css`
  position: relative;
  width: 100%;
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
  padding: 9px 16px 9px 48px;
`;

export const deleteIcon = css`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
`;

export const reviewInputWrapper = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const reviewIcon = css`
  /* position: absolute;
  left: 10%;
  top: 650px;
  transform: translateY(-50%); */
`;

export const reviewInputWithIcon = css`
  width: 100%;
  padding: 12px 12px 12px 40px; /* 왼쪽 패딩을 아이콘 크기에 맞게 설정 */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;

  ::placeholder {
    color: #aaa;
  }
`;

export const reviewSection = css`
  width: 100%;
  padding: 0 16px;
`;

export const reviewContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 16px;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background: #fff;
`;

export const reviewInput = css`
  width: 100%;
  height: 120px;
  border: none;
  outline: none;
  resize: none;
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.64px;
`;

export const charCount = css`
  text-align: right;
  pointer-events: none;
  color: #9d9d9d;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  padding-top: 16px;
`;

export const spoilerSection = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const spoilerContainer = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 16px;
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
  padding: 16px;
  align-self: center;
  width: 100%;
`;

export const backButton = css`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const movieInfo = css`
  width: 100%;
  padding: 20px 16px 24px 16px;
  background-color: #fff;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const movieTitle = css`
  color: #000;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.96px;
  margin-bottom: 16px;
`;

export const movieDetails = css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;
  margin-bottom: 4px;
  span {
    font-weight: 400;
  }
`;

export const movieCountry = css`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.64px;
  margin-bottom: 4px;
`;

export const movieGenres = css`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    padding: 4px 8px;
    border-radius: 4px;
    border: 0.5px solid #f1f1f1;
    background: #eee;
    color: #5e5e5e;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.48px;
  }
`;

export const highlightedText = css`
  color: red;
  font-weight: bold;
`;

export const activeAutocompleteItem = css`
  background-color: #f0f0f0;
  cursor: pointer;
`;
