import { css, SerializedStyles } from "@emotion/react";

export default {
  famousContainer(): SerializedStyles {
    return css`
      padding: 32px 16px;

      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
  },

  titleWrapper(): SerializedStyles {
    return css`
      display: flex;
      align-items: center;
      gap: 8px;

      & > .title {
        display: flex;
        align-items: center;
        gap: 4px;

        & > h3 {
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
        }
      }
    `;
  },

  movies(): SerializedStyles {
    return css`
      width: 100%;
    `;
  },
};
