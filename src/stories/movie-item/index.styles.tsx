import { css, SerializedStyles } from "@emotion/react";

export default {
  movieItemContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      flex-direction: column;

      gap: 4px;
      cursor: pointer;

      .movie-title {
        max-width: calc(100% - 5px);

        font-size: 12px;
        font-weight: 400;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `;
  },

  movieItemThumbnail(isActive: boolean): SerializedStyles {
    return css`
      width: 100%;
      /* aspect-ratio: 1 / 1.44; */
      display: flex;

      overflow: hidden;
      border-radius: 4px;
      object-fit: cover;
      isolation: isolate;

      position: relative;
      background-color: #262626;

      ${isActive &&
      `
          &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(1.5px);
          border-radius: 4px;
          }

          & > svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}

      & > span {
        display: block;

        & img {
          width: 100%;
          /* height: 100%; */
          object-fit: cover;
          display: block;
        }
      }

      & > .alt {
        position: absolute;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: #b3b3b3;
        font-size: 14px;
        font-weight: 600;
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
