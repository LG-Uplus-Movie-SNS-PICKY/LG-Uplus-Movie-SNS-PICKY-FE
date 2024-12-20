import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;

      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(100px, 1fr)
      ); // 한 열에 3개의 아이템
      /* grid-template-rows: repeat(3, 1fr); // 한 행에 4개의 아이템 */

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

  movieCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      aspect-ratio: 1 / 1.44;
      border-radius: 2px;

      overflow: hidden;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #262626;

      & > span.lazy-load-image-background {
        width: 100%;
      }

      & > span:first-of-type img {
        display: block;
        width: 100%;
      }

      & > span:last-of-type {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #b3b3b3;
        font-size: 14px;
        font-weight: 600;
      }
    `;
  },

  emptyState(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 120px;
    `;
  },
};
