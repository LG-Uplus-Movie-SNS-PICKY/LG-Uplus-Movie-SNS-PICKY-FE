import { css, SerializedStyles } from "@emotion/react";

export default {
  registerContainer(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      gap: 8px;
    `;
  },

  registerSearch(): SerializedStyles {
    return css`
      flex: 1;

      display: flex;
      flex-direction: column;

      background-color: #fff;
      /* border-radius: 4px; */

      box-shadow: 0 1px 4px rgba(170, 170, 170, 0.4);

      & > .search {
        width: 100%;
        display: flex;

        & > input[type="text"] {
          flex: 1;
          border: none;
          background-color: transparent;
          padding: 12px;
          outline: none;
          font-size: 14px;

          &::placeholder {
            color: #aaa;
          }
        }

        & > button {
          background-color: transparent;
          border: none;
          padding: 12px 16px;

          & > svg path {
            fill: #aaa;
          }
        }
      }
    `;
  },

  registerButton(): SerializedStyles {
    return css`
      height: 45.61px;
      padding: 12px 24px;
      background-color: #fff;
      border: none;
      box-shadow: 0 1px 4px rgba(170, 170, 170, 0.4);
      cursor: pointer;
      color: #555;
      font-weight: 600;
    `;
  },

  movieAutoCompleteContainer(data: boolean): SerializedStyles {
    return css`
      max-height: 320px;

      padding: ${data ? "12px" : ""};
      display: flex;
      flex-direction: column;

      justify-content: flex-start;
      align-items: center;
      overflow-y: scroll;

      & > .list-item {
        width: 100%;

        display: flex;
        justify-content: space-between;

        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 12px 0;
        cursor: pointer;

        transition: 0.2s;

        &:hover {
          background-color: #f0f0f0;

          & > svg path {
            stroke: #191919;
          }
        }

        &:last-of-type {
          border-bottom: none;
        }

        & > div {
          display: flex;
          gap: 8px;

          & > .poster {
            width: 100%;
            max-width: 120px;

            & > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          & > .title {
            display: flex;
            flex-direction: column;
            gap: 2px;

            min-width: 52px;

            font-size: 10px;
            font-weight: 600;
            color: #aaa;

            padding-top: 4px;

            & > h3 {
              font-size: 14px;
              color: #191919;
            }

            & > div {
              display: flex;
              flex-direction: column;
            }
          }
        }

        & > svg {
          margin: auto 0;
          width: fit-content;
          padding-right: 8px;

          & > path {
            stroke: #9d9d9d;
          }
        }
      }
    `;
  },
};
