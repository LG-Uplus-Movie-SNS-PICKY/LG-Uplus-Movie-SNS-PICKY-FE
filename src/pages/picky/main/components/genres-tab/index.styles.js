import { css } from "@emotion/react";
export default {
    swiperContainer() {
        return css `
      width: 100%;
      padding: 0 16px;

      & > .swiper-wrapper > .swiper-slide {
        position: relative;

        width: fit-content;
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
    },
    genreButton() {
        return css ``;
    },
};
