import { css, SerializedStyles } from "@emotion/react";

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      gap: 8px;
      padding: 16px 0;

      &.centered {
        justify-content: center;
        gap: 12px;

        font-size: 24px;
        font-weight: 600;
        color: #191919;
      }
    `;
  },

  reviewCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      display: flex;
      gap: 8px;

      & > .poster {
        width: 60px;
        border-radius: 4px;
        overflow: hidden;

        & > img {
          width: 100%;
          height: 100%;
        }
      }
    `;
  },

  reviewInfo(): SerializedStyles {
    return css``;
  },
};
