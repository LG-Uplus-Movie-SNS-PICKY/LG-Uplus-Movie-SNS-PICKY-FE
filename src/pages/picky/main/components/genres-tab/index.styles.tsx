import { css, SerializedStyles } from "@emotion/react";

export default {
  swiperContainer(): SerializedStyles {
    return css`
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

      margin-bottom: 24px;
    `;
  },

  genreButton(): SerializedStyles {
    return css``;
  },
};
