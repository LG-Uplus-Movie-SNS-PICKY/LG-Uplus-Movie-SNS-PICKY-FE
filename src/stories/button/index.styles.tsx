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
      font-weight: 600;
      line-height: 1;
    `;
  },

  // 버튼 Active Btn 스타일
  storybookButtonActive(isActive: boolean): SerializedStyles {
    return css`
      width: 361px;
      padding: 16px 0;
      border-radius: 10px;
      font-size: 16px;
      background-color: ${isActive ? "#FF084A" : "#D9D9D9"};
      color: #fff;
    `;
  },

  // 버튼 Social Btn 스타일
  storybookButtonSocial(isActive: boolean): SerializedStyles {
    return css`
      width: 309px;
      padding: 12px 0;
      font-size: 14px;
      border-radius: 8px;
      background-color: ${isActive ? "#0095F6" : "#EFEFEF"};
      color: ${isActive ? "#fff" : "#000"};
    `;
  },

  // 버튼 More Btn 스타일
  storybookButtonMore(): SerializedStyles {
    return css`
      width: 393px;
      padding: 10px 16px;
      font-size: 12px;
      background-color: #f8f8f8;
      color: #9d9d9d;
      border-top: 0.5px solid #d9d9d9;
      border-bottom: 0.5px solid #d9d9d9;
      border-radius: 0px;
      font-weight: 400;
    `;
  },
};
