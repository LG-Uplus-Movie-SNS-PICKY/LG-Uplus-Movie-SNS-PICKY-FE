import { css, SerializedStyles } from "@emotion/react";

export default {
  swiper(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      & > .swiper-wrapper > .swiper-slide {
        position: relative;

        width: 90%;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      // 파일 제거 버튼 CSS
      & > .swiper-wrapper > .swiper-slide > button {
        position: absolute;
        z-index: 9999;

        background-color: transparent;

        top: 5px;
        right: 5px;

        border: none;
        cursor: pointer;
      }

      & > .swiper-wrapper > .swiper-slide > img,
      & > .swiper-wrapper > .swiper-slide > video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }

      & > .swiper-wrapper > .swiper-slide.add-circle {
        width: fit-content;
        & > svg {
          cursor: pointer;
        }
      }
    `;
  },
};
