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
    `;
  },

  movieLog(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
      background-color: #262626;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #b3b3b3;
      font-weight: 600;
      font-size: 14px;

      & > span.empty {
        font-size: 12px;
      }

      & .lazy-load-image-background {
        width: 100%;
        height: 100%;

        & > img {
          width: 100%;
        }
      }

      & > span.alt {
        position: absolute;
      }
    `;
  },
};
