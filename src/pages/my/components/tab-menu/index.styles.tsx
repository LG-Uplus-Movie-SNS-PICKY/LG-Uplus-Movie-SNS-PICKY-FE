import { css, SerializedStyles } from "@emotion/react";

export default {
  tabMenuContainer(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;

      display: flex;
      flex-direction: column;
    `;
  },

  tabMenu(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      height: 60px;

      display: flex;
      justify-content: space-around;
      align-items: flex-end;

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

      /* Tab Button Styles */
      & > .tab-btn {
        cursor: pointer;

        display: flex;

        width: 48px;
        height: 48px;

        display: flex;
        justify-content: center;
        align-items: center;

        &.active svg path {
          fill: #191919;
        }
      }

      /* Tab Active Button Line Position */
      & > .line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 48px;
        height: 2px;
        background-color: #191919;
        border-radius: 8px;
        transition: all 0.3s ease-in-out;
      }
    `;
  },

  tabMenuContent(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;
      /* height: 2000px; */
      background-color: azure;
    `;
  },

  moveBoard(): SerializedStyles {
    return css`
      position: absolute;
      top: 0;
      width: 48px;
      height: 2px;
      background-color: black;
      transition: "left 0.3s ease"; // 부드러운 이동 애니메이션
    `;
  },
};
