import { css, SerializedStyles } from "@emotion/react";

export default {
  tabMenuContainer(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;
    `;
  },

  tabMenu(): SerializedStyles {
    return css`
      width: auto;
      height: 60px;
      background-color: red;

      display: flex;
      justify-content: space-around;
      align-items: flex-end;

      &.sticky {
        position: fixed;

        top: 60px;
        left: 16px;
        right: 16px;

        z-index: 10;
      }
    `;
  },

  tabMenuContent(): SerializedStyles {
    return css`
      height: 1000px;
    `;
  },
};
