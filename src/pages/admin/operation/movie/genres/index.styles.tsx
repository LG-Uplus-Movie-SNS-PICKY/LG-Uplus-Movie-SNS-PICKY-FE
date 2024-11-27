import { css, SerializedStyles } from "@emotion/react";

export default {
  // Filter Container CSS
  filterContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  },

  // Filter CSS
  filter(): SerializedStyles {
    return css`
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
  search(): SerializedStyles {
    return css`
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
  tableContainer(): SerializedStyles {
    return css`
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
            width: 13%;
          }

          &:nth-of-type(2) {
            width: 70%;
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

  tableBodyItem(): SerializedStyles {
    return css`
      padding: 16px 8px;
      vertical-align: middle;

      font-size: 12px;
      font-weight: 400;

      & > .title {
        font-weight: 600;
      }

      & > div.movie-info {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;

        & > .movie-info_thumbnail {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: black;
        }

        & > .movie-info_detail {
          display: flex;
          flex-direction: column;
          gap: 4px;

          & > .genre {
            font-weight: 400;
          }
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

      & > .buttons {
        display: flex;
        gap: 12px;

        & > button {
          padding: 2px 12px;
          font-size: 12px;
          background-color: #fff;
          border: 1px solid #aaa;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;

          transition: background-color, color 0.3s;

          &:hover {
            background-color: #191919;
            color: #fff;
          }
        }
      }
    `;
  },

  toggleBtn(): SerializedStyles {
    return css`
      position: relative;
      background-color: #ddd;
      border: 1px solid #aaa;
      border-radius: 30px;
      width: 60px;
      height: 24px;
      transition: background-color 0.1s ease, border-color 0.2s ease;
      cursor: pointer;

      &.toggled {
        background-color: #15b58e;
      }

      &:hover {
        border-color: #6f6f6f;
      }

      & > .thumb {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        transform: translateX(0);
        transition: left 0.15s ease;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.toggled .thumb {
        left: calc(60px - 24px);
      }
    `;
  },
};
