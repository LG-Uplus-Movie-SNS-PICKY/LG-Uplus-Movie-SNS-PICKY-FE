import { css, SerializedStyles } from "@emotion/react";

export default {
  registerContainer(): SerializedStyles {
    return css`
      width: 100%;
      /* padding: 8px 16px; */
      /* background-color: #fff; */
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 24px;
    `;
  },

  registerSearch(): SerializedStyles {
    return css`
      flex: 1;

      display: flex;
      flex-direction: column;
      background-color: #fff;
      /* border-radius: 4px; */

      box-shadow: 0 1px 4px rgba(170, 170, 170, 0.4);

      & > .search {
        width: 100%;
        display: flex;

        & > input[type="text"] {
          flex: 1;
          border: none;
          background-color: transparent;
          padding: 12px;
          outline: none;
          font-size: 14px;

          &::placeholder {
            color: #aaa;
          }
        }

        & > button {
          background-color: transparent;
          border: none;
          padding: 12px 16px;

          & > svg path {
            fill: #aaa;
          }
        }
      }
    `;
  },

  registerButton(): SerializedStyles {
    return css`
      padding: 12px 24px;
      background-color: #fff;
      border: none;
      box-shadow: 0 1px 4px rgba(170, 170, 170, 0.4);
      cursor: pointer;
      color: #555;
      font-weight: 600;
    `;
  },

  movieAutoCompleteContainer(): SerializedStyles {
    return css`
      padding: 12px;
      display: flex;
      flex-direction: column;

      & > .list-item {
        display: flex;
        gap: 8px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 12px 0;
        cursor: pointer;

        transition: background-color 0.2s;

        &:hover {
          background-color: #f0f0f0;
        }

        &:last-of-type {
          border-bottom: none;
        }
      }
    `;
  },
};
