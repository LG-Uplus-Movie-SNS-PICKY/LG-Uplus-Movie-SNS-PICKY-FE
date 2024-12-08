import { css } from "@emotion/react";
export default {
    // Filter Container CSS
    filterContainer() {
        return css `
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    },
    // Filter CSS
    filter() {
        return css `
      display: flex;
      align-items: center;

      font-size: 14px;
      font-weight: 600;
      color: #141414;

      & > label {
        margin-right: 10px;
      }

      & > select {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 2px 18px 2px 5px;
        outline: none;
      }
    `;
    },
    // Search CSS
    search() {
        return css `
      display: flex;
      align-items: center;
      background-color: #fff;
      overflow: hidden;
      border-radius: 4px;

      box-sizing: border-box;
      border: 1px solid #d9d9d9;

      & > input[type="text"] {
        border: none;
        background-color: transparent;
        outline: none;
        padding-left: 5px;
      }

      & > button[type="submit"] {
        box-sizing: border-box;
        border: none;
        padding: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
      }
    `;
    },
    // Table CSS
    tableContainer() {
        return css `
      margin-top: 24px;
      width: 100%;
      overflow: hidden;

      border-radius: 8px;
      padding: 16px;

      box-shadow: 0 0 4px rgba(200, 200, 200, 0.3);

      & > thead {
        background-color: #f9fafb;
        border-bottom: 1px solid #ebecee;

        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: #9d9d9d;

        & > tr > th:first-of-type {
          width: 40%;
        }

        & > tr > th {
          padding: 8px;
          text-align: start;

          &:nth-of-type(1) {
            width: 30%;
          }

          &:nth-of-type(2) {
            width: 50%;
          }
        }
      }

      & > tbody {
        background-color: #fff;

        & > tr {
          border-bottom: 1px solid #ebecee;

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    `;
    },
    tableBodyItem() {
        return css `
      padding: 16px 8px;
      vertical-align: middle;

      font-size: 14px;
      font-weight: 400;

      & > div.profile {
        display: flex;
        align-items: center;
        gap: 12px;

        font-weight: 600;

        & > .profile-image {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: aliceblue;
        }
      }

      & > select.roleSelect {
        padding: 0 0 0 5px;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        color: #9d9d9d;
        font-weight: 600;

        transition: color 0.3s;

        &:hover {
          color: #191919;
        }
      }
    `;
    },
};
