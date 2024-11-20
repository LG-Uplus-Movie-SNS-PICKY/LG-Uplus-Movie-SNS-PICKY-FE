import { css, SerializedStyles } from "@emotion/react";

export default {
  // 모든 헤더의 공통 영역
  headerContainer(): SerializedStyles {
    return css`
      width: 100px;
      height: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      background-color: black;
    `;
  },
};
