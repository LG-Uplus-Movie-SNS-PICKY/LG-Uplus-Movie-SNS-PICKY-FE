import { css, SerializedStyles } from "@emotion/react";

export default {
  genreContainer(): SerializedStyles {
    return css`
      width: 100%;
      padding: 0 16px;
    `;
  },

  genreCard(): SerializedStyles {
    return css`
      width: 100%;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;

      /* Title */
      & > .title {
        display: flex;
        gap: 8px;
        align-items: center;

        & > div > img {
          width: 16px;
        }

        & > span {
          font-size: 16px;
          color: #5e5e5e;
        }
      }

      /* Genres Button */
      & > .genres {
        width: 100%;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        /* align-items: center; */

        /* background-color: aliceblue;
        height: 10px; */

        & > .genre-btn {
          border: none;
          background-color: #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;

          & > span {
            margin-left: 4px;
            color: #5e5e5e;
            font-size: 12px;
          }
        }
      }

      & > .select-genre {
        width: 100%;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
      }

      margin-bottom: 24px;
    `;
  },
};
