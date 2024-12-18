import { css, SerializedStyles } from "@emotion/react";

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;

      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(100px, 1fr)
      ); // 한 열에 3개의 아이템
      /* grid-template-rows: repeat(4, 1fr); // 한 행에 4개의 아이템 */

      gap: 3px;
      padding: 2px;

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
        aspect-ratio: 1;
        background-color: black;
        cursor: pointer;
      }
    `;
  },
};
