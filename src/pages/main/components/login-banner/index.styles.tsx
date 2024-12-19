import { css, SerializedStyles } from "@emotion/react";

export default {
  bannerContainer(image: string): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      min-height: 240px;

      background-image: linear-gradient(
          180deg,
          rgba(94, 94, 94, 0.5) 0%,
          rgba(48, 48, 48, 0.5) 40%,
          rgba(23, 23, 23, 0.5) 50%,
          rgba(0, 0, 0, 0.8) 100%
        ),
        url(${image});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      backdrop-filter: blur(5px);

      /* background: 
      ); */

      & > .box {
        position: absolute;

        bottom: 18px;
        left: 30px;

        display: flex;
        flex-direction: column;
        gap: 4px;

        color: #fff;

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

          & > strong {
            font-weight: 600;
            color: #ff084a;
          }
        }
      }
    `;
  },
};
