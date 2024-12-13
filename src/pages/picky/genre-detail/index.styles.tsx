import { css, SerializedStyles } from "@emotion/react";

export default {
  title(): SerializedStyles {
    return css`
      width: 100%;
      padding: 0 16px;

      font-size: 18px;
      font-weight: 600;
      color: #191919;

      margin-bottom: 24px;
    `;
  },

  movies(): SerializedStyles {
    return css`
      width: 100%;
      flex: 1;
      padding: 0 16px;

      display: flex;
      align-items: center;

      & > div {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 4px;
      }
    `;
  },

  movieCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;

      border-radius: 4px;
      overflow: hidden;

      cursor: pointer;

      background-color: #262626;
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 4px;

      & > img {
        width: 100%;
        /* height: 100%; */
      }

      & > .alt-text {
        position: absolute;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: #b3b3b3;
        font-size: 14px;
        font-weight: 600;
      }
    `;
  },
};
