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
      }

      & > .select-genre {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 12px;

        box-sizing: border-box;
        overflow: hidden;
      }

      & > .more-genre-movies {
        cursor: pointer;

        display: flex;
        justify-content: center;

        & > button {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 50px;
          background-color: #ffffff;
          border: 1px solid #d9d9d9;
          color: #5e5e5e;
          cursor: pointer;
        }
      }

      margin-bottom: 24px;
    `;
  },
};
