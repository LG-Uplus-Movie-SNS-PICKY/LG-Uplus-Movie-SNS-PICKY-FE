import { css, SerializedStyles } from "@emotion/react";

export default {
  wrapper(): SerializedStyles {
    return css`
      padding: 32px 16px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 56px;
    `;
  },
};
