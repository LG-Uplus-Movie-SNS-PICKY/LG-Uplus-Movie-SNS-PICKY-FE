import { css, SerializedStyles } from "@emotion/react";

export default {
  // 모든 헤더의 공통 영역
  headerContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 0;
      z-index: 9999;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 60px;

      background-color: #fff;

      box-sizing: border-box;

      & > .main-logo {
        width: 82px;
      }
    `;
  },

  headerTitleBox(): SerializedStyles {
    return css`
      display: flex;
      align-items: center;

      cursor: pointer;

      & > span {
        font-size: 16px;
        font-weight: 600;
        color: #141414;
        padding-top: 2px;
      }
    `;
  },

  // 헤더 버튼 Container
  headerActivesBtn(isLogin: boolean): SerializedStyles {
    return css`
      & > div,
      & .login-action-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        ${isLogin ? "" : ""}

        gap: ${!isLogin ? "4px" : "8px"};

        border: ${!isLogin ? "1px solid #D9D9D9" : ""};
        border-radius: ${!isLogin ? "20px" : ""};
        padding: ${!isLogin ? "8px 12px" : ""};

        cursor: ${!isLogin ? "pointer" : ""};

        & > span {
          font-size: 12px;
          font-weight: 400;
          padding-top: 2px;
        }

        & > .active-icon-btn {
          cursor: pointer;
        }
      }
    `;
  },
};
