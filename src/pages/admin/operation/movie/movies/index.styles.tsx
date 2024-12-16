import { css, SerializedStyles } from "@emotion/react";

export default {
  wrapper(): SerializedStyles {
    return css`
      padding: 16px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
  },
};
