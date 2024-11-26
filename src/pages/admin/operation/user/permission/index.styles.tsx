import { css, SerializedStyles } from "@emotion/react";

export default {
  filterContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  },

  filter(): SerializedStyles {
    return css`
      display: flex;
      align-items: center;

      font-size: 14px;
      font-weight: 600;
      color: #141414;

      & > label {
        margin-right: 10px;
      }

      & > select {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 2px 18px 2px 5px;
        outline: none;
        /* back */
      }
    `;
  },

  search(): SerializedStyles {
    return css``;
  },
};
