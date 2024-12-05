import { css, SerializedStyles } from "@emotion/react";

export default {
  fileInputContainer(isFile: boolean): SerializedStyles {
    return css`
      width: 240px;
      height: 240px;
      background-color: ${isFile ? "#fff" : "#d9d9d9"};
      border-radius: 10px;

      cursor: pointer;
      overflow: hidden;

      & > div {
        position: relative;

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & img {
          outline: none;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        & > .label {
          font-weight: 600;
          font-size: 16px;
          color: #9d9d9d;
        }
      }
    `;
  },
};
