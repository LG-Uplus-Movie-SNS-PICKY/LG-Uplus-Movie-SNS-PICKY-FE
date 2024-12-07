import { css, SerializedStyles } from "@emotion/react";

export default {
  container(isFile: boolean): SerializedStyles {
    return css`
      width: 100%;
      /* width: 361px; */
      /* max-width: 361px; */
      height: 361px;
      background-color: #fff;

      border: ${isFile ? "" : "1px solid #d9d9d9"};
      border-radius: ${isFile ? "" : "16px"};

      cursor: ${isFile ? "" : "pointer"};
      overflow: ${isFile ? "" : "hidden"};

      /* Container 자식 div 태그 */
      & > div {
        position: relative;

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > .label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
      }
    `;
  },
};
