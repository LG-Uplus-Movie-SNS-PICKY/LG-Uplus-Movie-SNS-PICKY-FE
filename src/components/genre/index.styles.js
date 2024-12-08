import { css } from "@emotion/react";
export default {
    genreButton() {
        return css `
      border: none;
      background-color: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;

      & > span {
        margin-left: 4px;
        color: #5e5e5e;
        font-size: 12px;
      }
    `;
    },
};
