import { css, SerializedStyles } from "@emotion/react";

export default {
  // navbar 공통 영역 style
  navbarContainer(): SerializedStyles {
    return css`
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #d4d4d4;
      display: flex;
      padding: 0 16px;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      z-index: 9999;
    `;
  },

  navbarMenuItem(name: string, isActive: boolean): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;

      align-items: center;
      gap: 4px;

      font-size: 12px;
      font-weight: 600;

      cursor: pointer;
      text-transform: uppercase;

      // 탭 항목에 맞는 텍스트 컬러 변환
      color: ${isActive ? (name !== "picky" ? "#000" : "#FF084A") : "#c8c8c8"};
    `;
  },
};
