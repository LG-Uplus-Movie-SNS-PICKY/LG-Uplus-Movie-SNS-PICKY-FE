import { css, SerializedStyles } from "@emotion/react";

export default {
  modalOuter(): SerializedStyles {
    return css`
      position: absolute;
      z-index: 9999;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.25);
    `;
  },

  modalContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      flex-direction: column;

      width: 100%;
      max-width: 400px;

      height: 600px;

      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      background-color: #fff;
    `;
  },

  modalTitle(): SerializedStyles {
    return css`
      padding: 18px 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 12px;

      font-size: 14px;
      font-weight: 600;

      & > input[type="text"] {
        flex: 1;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        outline: none;

        transition: 0.4s;

        &:focus {
          border-color: #606060;
        }
      }

      & > button[type="submit"] {
        padding: 4px 16px;
        border: 1px solid #606060;
        border-radius: 4px;
        background-color: #606060;
        color: #ddd;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
    `;
  },

  modalMovies(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      overflow-y: scroll;

      scrollbar-width: none; /* Firefox: 스크롤바 숨김 */
      -ms-overflow-style: none; /* IE: 스크롤바 숨김 */

      &::-webkit-scrollbar {
        display: none; /* Webkit (Chrome, Safari): 스크롤바 숨김 */
      }

      /* padding: 10px 0; */
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin: 18px 0;

      & > .movies-container {
        width: 100%;
        padding: 0 16px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        & > .movie-lists {
          width: 100%;
          flex: 1;

          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
        }
      }
    `;
  },

  select(): SerializedStyles {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(4px);

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
    `;
  },
};
