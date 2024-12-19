import { css, SerializedStyles } from "@emotion/react";

export default {
  swiperContainer(): SerializedStyles {
    return css`
      width: 100%;
      padding: 0 16px;

      margin: 12px 0 20px;

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

  genreButton(): SerializedStyles {
    return css``;
  },
};
