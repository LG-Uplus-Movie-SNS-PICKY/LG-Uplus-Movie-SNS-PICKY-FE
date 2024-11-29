import { css, SerializedStyles } from "@emotion/react";

export default {
  bannerContainer(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      min-height: 240px;

      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(240, 243, 255, 0.5) 100%
      );

      & > .box {
        position: absolute;

        top: 50%;
        left: 30px;

        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        gap: 16px;

        & > h3 {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.2;
        }

        & > p {
          font-size: 12px;

          & > .underline {
            text-decoration: underline;
          }
        }
      }
    `;
  },
};
