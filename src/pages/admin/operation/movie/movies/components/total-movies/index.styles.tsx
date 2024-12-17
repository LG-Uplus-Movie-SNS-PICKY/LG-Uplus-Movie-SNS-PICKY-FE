import { css, SerializedStyles } from "@emotion/react";

export default {
  titleHeaderContainer(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      background-color: #fff;
      padding: 12px 8px;
      border-radius: 4px;

      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      /* Total, Search Bar Container */
      & > .container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 14px;
        font-weight: 600;

        & > .section {
          display: flex;
        }

        & > .section.total {
          gap: 4px;
          color: #9d9d9d;
        }

        & > .section.search {
          display: flex;
          align-items: center;
          border: 1px solid #aaa;
          overflow: hidden;
          border-radius: 12px;
          background-color: #f0f0f0;

          & > input[type="text"],
          & > button {
            background-color: transparent;
            border: none;
            outline: none;
            padding: 2px 4px 2px 8px;
          }

          & > input[type="text"] {
            font-size: 12px;
          }

          & > button {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Genres Button Section */
        & > .genres {
        }
      }
    `;
  },

  movieContainer(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      /* gap: 24px; */

      & > .movies {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    `;
  },
};
