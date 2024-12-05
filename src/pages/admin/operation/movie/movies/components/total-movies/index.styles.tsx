import { css, SerializedStyles } from "@emotion/react";

export default {
  titleHeaderContainer(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      background-color: #fff;
      padding: 12px 8px;
      border-radius: 4px;

      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      /* Total, Search Bar Container */
      & > .container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 14px;
        font-weight: 600;

        & > .section {
          display: flex;
        }

        & > .section.total {
          gap: 4px;
          color: #9d9d9d;
        }

        & > .section.search {
          display: flex;
          align-items: center;
          border: 1px solid #aaa;
          overflow: hidden;
          border-radius: 12px;
          background-color: #f0f0f0;

          & > input[type="text"],
          & > button {
            background-color: transparent;
            border: none;
            outline: none;
            padding: 2px 4px 2px 8px;
          }

          & > input[type="text"] {
            font-size: 12px;
          }

          & > button {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Genres Button Section */
        & > .genres {
        }
      }
    `;
  },

  movieContainer(): SerializedStyles {
    return css`
      width: 100%;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
  },

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

        & > img {
          width: 100%;
          height: 100%;
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
