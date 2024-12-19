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
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

      & > .main-logo {
        width: 82px;
        cursor: pointer;
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
      & .login-action-btn {
        border: ${isLogin ? "1px solid #D9D9D9" : ""};
        border-radius: ${isLogin ? "20px" : ""};
        padding: ${isLogin ? "4px 8px" : ""};

        cursor: ${isLogin ? "pointer" : ""};
      }

      & > div,
      & .login-action-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        gap: ${isLogin ? "4px" : "8px"};

        & > span {
          font-size: 12px;
          font-weight: 400;
          padding-top: 2px;
        }

        & > .active-icon-btn {
          cursor: pointer;

          /* Notification Badge */
          & > .notification {
            position: relative;

            & > .notification-badge {
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: #ff0000;
              border-radius: 50%;
              top: 0px;
              right: 3px;
            }
          }
        }
      }

      div.admin_btn {
        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid #d9d9d9;
        border-radius: 20px;
        padding: 4px 16px;

        cursor: pointer;

        & > span {
          font-size: 12px;
          font-weight: 400;
          padding-top: 2px;
        }
      }
    `;
  },
};
