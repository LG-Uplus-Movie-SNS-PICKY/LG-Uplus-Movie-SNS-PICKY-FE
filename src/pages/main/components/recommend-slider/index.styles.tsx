import { css, SerializedStyles } from "@emotion/react";

export default {
  sliderItem(posterDummySrc: string): SerializedStyles {
    return css`
      position: relative;

      width: 320px;
      min-height: fit-content;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;

      overflow: hidden;
      border-radius: 8px;

      & > .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image: url(${posterDummySrc});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(10px);

        z-index: 1;
      }
    `;
  },

  content(): SerializedStyles {
    return css`
      position: relative;

      top: 0;
      left: 0;

      width: 100%;
      min-height: fit-content;
      gap: 20px;

      z-index: 2;
      backdrop-filter: blur(10px);

      padding: 12px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      color: #fff;
    `;
  },

  badgeContainer(): SerializedStyles {
    return css`
      width: 100%;

      & > .badge {
        width: fit-content;

        padding: 6px 12px;
        background-color: #191919;

        font-size: 12px;
        font-weight: 600;

        border-radius: 4px;
        border: 1px solid #555;
      }
    `;
  },

  moviePosterContainer(): SerializedStyles {
    return css`
      width: 140px;
      aspect-ratio: 2 / 3;

      border-radius: 4px;
      overflow: hidden;

      & > img {
        width: 100%;
      }
    `;
  },

  movieInfoContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .movie-info {
        width: fit-content;

        font-size: 14px;
        font-weight: 600;

        & > .movie-sub-info {
          margin-top: 4px;

          display: flex;
          gap: 8px;
          font-size: 10px;
          color: #fafafa;
        }
      }

      & > .ott-service {
        width: fit-content;
        max-width: 160px;

        display: flex;
        align-items: center;
        overflow: hidden;
        gap: 10px;

        & > .badge {
          width: 32px;
          height: 32px;
          box-sizing: border-box;
          background-color: #000;
          border-radius: 50%;

          color: #fff;
          font-weight: 600;
        }

        & > .badge.more-service {
          text-align: center;
          line-height: 1.9;
        }
      }
    `;
  },
};
