import { css, SerializedStyles } from "@emotion/react";

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;

      display: grid;
      grid-template-columns: repeat(3, 1fr); // 한 열에 3개의 아이템
      grid-template-rows: repeat(4, 1fr); // 한 행에 4개의 아이템

      gap: 3px;
      height: 100%;

      &.centered {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 12px;
        font-size: 24px;
        font-weight: 600;
        color: #191919;
      }

      & > .movie-log {
        width: 100%;
        height: 100%;
        background-color: black;
      }
    `;
  },
};
