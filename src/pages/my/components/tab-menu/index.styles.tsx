import { css, SerializedStyles } from "@emotion/react";

export default {
  tabMenuContainer(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;

      /* display: flex;
      flex-direction: column; */
    `;
  },

  tabMenu(): SerializedStyles {
    return css`
      width: 100%;
      height: 60px;

      background-color: #fff;
      z-index: 10;

      border-bottom: 1px solid #eee;

      // 특정 위치에 고정
      &.sticky {
        position: sticky;

        top: 0;
        max-width: 722.37px;

        z-index: 10;
      }

      & > .swiper-wrapper > .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 8px;

        & > div {
          cursor: pointer;
        }
      }
    `;
  },

  tabMenuContent(): SerializedStyles {
    return css`
      /* flex: 1; */
      height: 2000px;
      /* background-color: azure; */
    `;
  },
};
