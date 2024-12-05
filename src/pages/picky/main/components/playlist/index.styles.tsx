import { css, SerializedStyles } from "@emotion/react";

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      padding: 0 16px;

      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
  },

  playlistCard(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 8px;

      & > h3 {
        font-size: 20px;
        font-weight: 600;
        text-transform: uppercase;
      }
    `;
  },

  swiperContainer(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      & > .swiper-wrapper > .swiper-slide {
        position: relative;

        width: fit-content;
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      & > .swiper-wrapper > .swiper-slide > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  },
};
