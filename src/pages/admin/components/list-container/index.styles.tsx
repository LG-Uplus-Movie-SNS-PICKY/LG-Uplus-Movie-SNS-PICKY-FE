import { css, SerializedStyles } from "@emotion/react";

export default {
  dashboardListItemContainer(
    bgColor: string,
    boxShadowColor: string
  ): SerializedStyles {
    return css`
      width: calc((100% - 18px) / 2);
      border-radius: 4px;

      display: flex;
      flex-direction: column;

      gap: 8px;

      padding: 10px;
      background: ${bgColor};
      /* ${bgColor}; */
      box-shadow: 0 4px 4px ${boxShadowColor};

      font-size: 12px;
      font-weight: 600;
      color: #fff;

      cursor: pointer;
    `;
  },

  dashboardListItemCircle(): SerializedStyles {
    return css`
      width: 32px;
      height: 32px;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #fff;
    `;
  },

  dashboardListItemInfo(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      gap: 2px;

      & > .description {
        display: flex;
        justify-content: space-between;

        font-size: 10px;
        font-weight: 400;
      }
    `;
  },
};
