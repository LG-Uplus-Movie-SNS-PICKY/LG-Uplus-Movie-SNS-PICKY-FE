import { css } from "@emotion/react";
export default {
    container() {
        return css `
      background-color: #fff;

      margin-top: 24px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;

      display: flex;
      flex-direction: column;
      gap: 12px;

      & > .line {
        background-color: #e5e5e5;
        height: 1px;
        border-radius: 1px;
      }
    `;
    },
    containerTitle() {
        return css `
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 12px;
      font-weight: 600;
      color: #9e9e9e;
    `;
    },
    listContainer() {
        return css `
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
    },
    listItemContainer(bgColor) {
        return css `
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;

      background: ${bgColor};
      border-radius: 5px;

      cursor: pointer;

      & > .info-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `;
    },
    listItemInfo() {
        return css `
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;
    },
    listItemInfoTitle() {
        return css `
      display: flex;
      flex-direction: column;
      gap: 6px;

      font-size: 14px;
      font-weight: 600;
      color: #fff;

      & > h3.titleInfo:first-of-type {
        font-size: 12px;
      }
    `;
    },
    listSubItemInfoContainer() {
        return css `
      display: flex;
      gap: 12px;

      & > .list-sub-item-info {
        display: flex;
        flex-direction: column;
        gap: 6px;

        font-weight: 400;
        color: #fff;
        font-size: 12px;

        & > .subItemTitle {
          font-size: 10px;
        }
      }
    `;
    },
};
