import { css, SerializedStyles } from "@emotion/react";

export default {
  // 버튼 컴포넌트 기본 스타일
  storybookButton(): SerializedStyles {
    return css`
      display: inline-block;
      cursor: pointer;
      border: 0;
      border-radius: 4px;
      font-family: "Pretendard", sans-serif;
      font-weight: 400;
    `;
  },

  // 버튼 Genre Rectangle Tab 스타일
  storybookGenreRectangle(isActive: boolean): SerializedStyles {
    return css`
      padding: 8px 12px;
      border-radius: 4px;
      border: ${isActive ? "0.5px solid #000000" : "0.5px solid #F1F1F1"};
      font-size: 12px;
      background-color: ${isActive ? "#000000" : "#FFFFFF"};
      color: ${isActive ? "#ffffff" : "#5E5E5E"};
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    `;
  },

  // 버튼 Genre Round Tab 스타일
  storybookGenreRound(isActive: boolean): SerializedStyles {
    return css`
      padding: 8px 12px;
      border-radius: 24px;
      border: ${isActive ? "2px solid #000000" : "2px solid #F1F1F1"};
      font-size: 12px;
      background-color: ${isActive ? "#000000" : "#FFFFFF"};
      color: ${isActive ? "#ffffff" : "#7E7E7E"};
    `;
  },

};
