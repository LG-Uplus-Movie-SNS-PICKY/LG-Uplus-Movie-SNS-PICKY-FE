import { css, SerializedStyles } from "@emotion/react";

export default {
  pickyPageContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      flex-direction: column;
      /* gap: 24px; */
    `;
  },
};
