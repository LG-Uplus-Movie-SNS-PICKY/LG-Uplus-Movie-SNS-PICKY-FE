import { css, SerializedStyles } from "@emotion/react";

export default {
  splashContainer(): SerializedStyles {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: #f5f5f5;

      display: flex;
      justify-content: center;
      align-items: center;

      z-index: 9999;
    `;
  },

  logoAnimation(): SerializedStyles {
    return css`
      /* 애니메이션 속도 및 딜레이 조정 */
      animation: zoomOut 0.4s ease-in-out 1.2s forwards; /* 0.6초 동안 실행, 2초 후 시작 */

      @keyframes zoomOut {
        from {
          opacity: 1;
          transform: scale(1) rotate(0deg); /* 초기 크기 */
        }
        to {
          opacity: 0;
          transform: scale(3) rotate(15deg); /* 3배 크기로 확대 */
        }
      }
    `;
  },
};
