import { css, SerializedStyles } from "@emotion/react";

export default {
  titleHeaderContainer(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      background-color: #fff;
      padding: 16px;
      border-radius: 4px;

      font-size: 14px;
      font-weight: 600;

      & > .playlist-button {
        display: flex;
        gap: 4px;
        border: 1px solid #aaa;
        padding: 2px 8px;

        border-radius: 16px;
        background-color: transparent;

        align-items: center;
        cursor: pointer;

        color: #333;
      }
    `;
  },

  playlistContainer(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;
      /* background-color: #f0f0f0; */
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
  },

  playlistCard(): SerializedStyles {
    return css`
      width: 100%;
      background-color: #fff;
      padding: 8px 16px;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      & > .line {
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 16px 0;
        border-radius: 1px;
      }
    `;
  },

  playlistCardHeader(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > .playlist-title {
        font-size: 14px;
        font-weight: 600;
      }
    `;
  },

  profilePanel(): SerializedStyles {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;

      & > .profile_image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: bisque;
        overflow: hidden;
        margin-right: 12px;

        & > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      & > .profile_info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        font-weight: 400;

        & > span:first-of-type {
          font-weight: 600;
        }
      }
    `;
  },

  status(status?: boolean): SerializedStyles {
    return css`
      padding: 4px 16px;

      border-radius: 12px;
      background-color: ${status ? "#d2fae5" : "#ffbbbb"};
      color: ${status ? "#148e4f" : "#b91717"};

      font-size: 14px;
      font-weight: 600;
    `;
  },

  actionButton(): SerializedStyles {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      & > button {
        background-color: transparent;
        border: 1px solid #666;
        padding: 2px 16px;
        border-radius: 16px;
        cursor: pointer;
        outline: none;

        color: #666;
        font-weight: 600;
        font-size: 12px;
        transition: 0.3s;

        &:hover {
          border-color: #000;
          color: #000;
        }
      }
    `;
  },

  reportInfoContainer(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 8px 0;
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

      & > .swiper-wrapper > .swiper-slide.add-circle {
        width: fit-content;
        & > svg {
          cursor: pointer;
        }
      }
    `;
  },
};
