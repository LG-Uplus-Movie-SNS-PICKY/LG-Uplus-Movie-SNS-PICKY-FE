import { css, SerializedStyles } from "@emotion/react";

export default {
  fileInputContainer(isFile: boolean, isType: boolean): SerializedStyles {
    return css`
      width: 240px;
      height: 240px;
      background-color: ${isFile ? "#fff" : "#d9d9d9"};
      border-radius: ${isFile ? (isType ? "0px" : "10px") : "10px"};

      cursor: ${isFile ? "" : "pointer"};
      overflow: hidden;

      & > div {
        position: relative;

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & video,
        & img {
          outline: none;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        & > .label {
          font-weight: 600;
          font-size: 16px;
          color: #9d9d9d;
        }
      }
    `;
  },

  swiperContainer(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      & > .swiper-wrapper > .swiper-slide {
        position: relative;

        width: 90%;

        border-radius: 10px;
        overflow: hidden;

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

      & > .swiper-wrapper > .swiper-slide > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
