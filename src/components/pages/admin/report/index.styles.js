import { css } from "@emotion/react";
export default {
    titleHeaderContainer() {
        return css `
      width: 100%;
      display: flex;
      gap: 28px;

      background-color: #fff;
      padding: 12px 8px;
      border-radius: 4px;

      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      & > .container {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 14px;
        font-weight: 600;

        & > h3 {
          color: #9d9d9d;
          margin-right: 8px;
        }
      }
    `;
    },
    reportContainer() {
        return css `
      width: 100%;
      background-color: #f0f0f0;
      padding: 16px;
    `;
    },
    reportCard() {
        return css `
      width: 100%;
      background-color: #fff;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      & > .line {
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 16px 0;
        border-radius: 1px;
      }
    `;
    },
    reportCardHeader() {
        return css `
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
    },
    profilePanel() {
        return css `
      display: flex;
      justify-content: center;
      align-items: center;

      & > .profile_image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: bisque;
        overflow: hidden;
        margin-right: 12px;

        & > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      & > .profile_info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        font-weight: 400;

        & > span:first-of-type {
          font-weight: 600;
        }
      }
    `;
    },
    status() {
        return css `
      padding: 4px 16px;

      border-radius: 12px;
      background-color: #d2fae5;
      color: #148e4f;

      font-size: 14px;
      font-weight: 600;
    `;
    },
    actionButton() {
        return css `
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      & > button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;

        &:first-of-type:hover svg path {
          fill: #20b568;
        }

        &:last-child:hover svg path {
          fill: #cb4b4b;
        }
      }
    `;
    },
    reportInfoContainer() {
        return css `
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    },
    reportMessageBox() {
        return css `
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      & > .title {
        font-size: 20px;
        font-weight: 600;
      }

      & > .description {
        line-height: 1.4;
        word-break: keep-all;
      }
    `;
    },
};
