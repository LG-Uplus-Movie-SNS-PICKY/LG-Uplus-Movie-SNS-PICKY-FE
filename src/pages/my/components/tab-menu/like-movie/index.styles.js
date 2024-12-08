import { css } from "@emotion/react";
export default {
    container() {
        return css `
      width: 100%;

      display: grid;
      grid-template-columns: repeat(3, 1fr); // 한 열에 3개의 아이템
      grid-template-rows: repeat(3, 1fr); // 한 행에 4개의 아이템

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
    `;
    },
    movieCard() {
        return css `
      position: relative;

      width: 100%;
      border-radius: 4px;

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
};
