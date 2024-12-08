import { css } from "@emotion/react";
export default {
    swiper() {
        return css `
      width: 100%;
      height: 380px;

      & > .swiper-wrapper > .swiper-slide {
        position: relative;

        max-width: 360px;
        height: 360px;
        /* max-height: 360px; */

        display: flex;
        justify-content: center;
        align-items: center;

        & > img,
        & > video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      & > .swiper-pagination > .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
      }
    `;
    },
};
