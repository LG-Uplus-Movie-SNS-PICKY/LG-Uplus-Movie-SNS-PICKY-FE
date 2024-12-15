import { css, SerializedStyles } from "@emotion/react";

export default {
  movieCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      display: flex;
      flex-direction: column;

      gap: 16px;
      background-color: #fff;
      padding: 12px;
    `;
  },

  movieDetailTop(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;

      & > .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & > .info {
          display: flex;
          align-items: center;

          font-size: 14px;
          font-weight: 600;
          color: #aaa;

          & > h3 {
            width: 60px;
            font-size: 12px;
          }

          & > span {
            margin-right: 4px;
            color: #191919;
          }
        }
      }

      & > .movie-poster {
        width: 88px;
        height: 132px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #191919;

        display: flex;
        justify-content: center;
        align-items: center;

        & img {
          display: block;
          width: 100%;
        }
      }
    `;
  },

  movieDetailDescription(): SerializedStyles {
    return css`
      font-size: 14px;
      font-weight: 600;
      color: #aaa;

      & > h3 {
        font-size: 12px;
        margin-bottom: 8px;
      }

      & > p {
        font-weight: 400;
        color: #191919;
        text-align: justify;
        word-break: keep-all;
      }
    `;
  },

  movieDetailInput(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;

      & > .input-container {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        color: #aaa;

        & > label {
          display: block;
          width: 60px;
        }

        & > .input {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;

          & > .update {
            display: flex;
            gap: 8px;

            & > input[type="text"] {
              flex: 1;
              background-color: #f6f8fa;
              border: 1px solid #d1d9e0;
              border-radius: 6px;
              outline: none;
              font-size: 12px;
              padding: 4px;

              &:focus {
                border-color: #191919;
              }
            }

            & > button {
              padding: 5px 16px;
              font-size: 12px;
              font-weight: 600;
              border-radius: 6px;

              background-color: #f6f8fa;
              border: 1px solid #d1d9e0;
            }
          }

          & > span {
            font-size: 10px;
          }
        }
      }
      margin: 12px 0;
    `;
  },

  movieDetailWatchService(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      gap: 24px;

      & > .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 12px;
        font-weight: 600;
        color: #aaa;

        & > .update {
        }
      }

      & > .service {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > .icon-btn {
          position: relative;

          &.to-updated {
            cursor: pointer;
          }

          & > svg {
            display: block;
          }

          & > .selected {
            position: absolute;
            top: 0;
            bottom: 0;

            width: 100%;
            border-radius: 50%;

            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;

            & > svg path {
              fill: #ff084a;
            }
          }
        }
      }
    `;
  },
};
