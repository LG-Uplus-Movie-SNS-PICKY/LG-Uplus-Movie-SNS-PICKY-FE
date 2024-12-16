import { css, SerializedStyles } from "@emotion/react";

export default {
    // 토스트 메시지 기본 스타일
    toastMessage(direction: 'none' | 'up' | 'down'): SerializedStyles {
        return css`
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(8px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        color: #FFFFFF;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 400;
        box-sizing: border-box;
        white-space: normal;
        text-align: center;
        max-width: 90%;
        white-space: nowrap;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        z-index: 9999;

        /* 위치 설정 */
        ${direction === "up" && "top: 16px;"}
        ${direction === "down" && "bottom: 16px;"}
        ${direction === "none" && "top: 50%; transform: translate(-50%, -50%);"}
        `;
    },
};