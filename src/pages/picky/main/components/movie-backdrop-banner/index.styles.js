import { css } from "@emotion/react";
export default {
    backdropBanner(backdrop) {
        return css `
      position: relative;

      width: 100%;
      aspect-ratio: 16 / 9; /* 가로와 세로 비율 설정 (예: 16:9 비율) */
      cursor: pointer;

      background-image: url(https://image.tmdb.org/t/p/original/${backdrop});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      & > .shadow-box {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: linear-gradient(
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.15) 16%,
          rgba(0, 0, 0, 0.38) 64%,
          rgba(0, 0, 0, 0.63) 100%
        );

        display: flex;
        align-items: flex-end;

        & > .movie-info {
          width: 100%;

          display: flex;
          flex-direction: column;

          padding: 24px;

          font-size: 18px;
          font-weight: 700;
          color: #fff;

          & > h3 {
            margin-bottom: 8px;
          }

          & > div {
            display: flex;
            gap: 8px;

            font-size: 14px;
            font-weight: 400;
          }
        }
      }
    `;
    },
};
