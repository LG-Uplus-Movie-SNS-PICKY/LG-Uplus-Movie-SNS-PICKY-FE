import { css, SerializedStyles } from "@emotion/react";

export default {
  deleteModalOuter(): SerializedStyles {
    return css`
      position: absolute;
      z-index: 9999;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.25);
    `;
  },

  deleteModalContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      flex-direction: column;
      gap: 12px;

      width: 100%;
      max-width: 400px;

      padding: 16px;

      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      background-color: #fff;

      & > div.playlist-warning-message {
        display: flex;
        flex-direction: column;
        gap: 8px;

        line-height: 1.2;
        font-size: 16px;
        font-weight: 600;
        color: #333;

        & > p {
          font-size: 14px;
          color: #979797;
        }
      }

      & > div.playlist-delete-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;

        & > button {
          color: #fff;
          border: none;

          padding: 4px 12px;
          border-radius: 4px;

          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          outline: none;

          &:first-of-type {
            background-color: #9e9e9e;
          }

          &:last-child {
            background-color: #ef5353;
          }
        }
      }
    `;
  },
};
