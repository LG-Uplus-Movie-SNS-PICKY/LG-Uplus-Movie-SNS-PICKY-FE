import { css, SerializedStyles } from "@emotion/react";

export default {
  wrapper(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 56px;
    `;
  },
};
