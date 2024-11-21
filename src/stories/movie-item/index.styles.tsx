import { css, SerializedStyles } from "@emotion/react";

export default {
  movieItemContainer(): SerializedStyles {
    return css`
      width: fit-content;

      display: flex;
      flex-direction: column;
      gap: 2px;

      .movie-title {
        font-size: 14px;
        font-weight: 400;
      }
    `;
  },

  movieItemThumbnail(): SerializedStyles {
    return css`
      max-width: 90px;
      overflow: hidden;
      border-radius: 4px;
      object-fit: cover;

      img {
        width: 100%;
        display: block;
      }
    `;
  },

  movieItemRate(): SerializedStyles {
    return css`
      display: flex;
      /* flex-direction: column; */
      align-items: center;

      font-size: 12px;
      color: #7e7e7e;
      font-weight: 400;

      & > svg {
        /* padding-bottom: 2px; */
      }

      & > span:last-child {
        margin-left: 2px;
        /* padding-bottom: 2px; */
      }
    `;
  },

  movieItemAllInfo(): SerializedStyles {
    return css`
      display: flex;
      gap: 8px;

      font-size: 12px;
      align-items: center;
      color: #7e7e7e;
      font-weight: 400;

      & > .item_layout {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      & > .item_layout:first-of-type svg {
        padding-bottom: 2px;
      }

      & > .item_layout svg path {
        fill: #7e7e7e;
      }
    `;
  },
};
