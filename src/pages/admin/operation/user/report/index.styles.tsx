import { css, SerializedStyles } from "@emotion/react";

export default {
  titleHeaderContainer(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      gap: 28px;

      background-color: #fff;
      padding: 8px;
      border-radius: 4px;

      box-shadow: 0 0 4px rgba(232, 232, 232, 0.4);

      & > .container {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 14px;
        font-weight: 600;

        & > h3 {
          color: #9d9d9d;
          margin-right: 8px;
        }
      }
    `;
  },
};
