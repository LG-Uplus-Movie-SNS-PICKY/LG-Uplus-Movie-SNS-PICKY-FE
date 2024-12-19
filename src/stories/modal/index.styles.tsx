import { css, SerializedStyles } from "@emotion/react";

export default {
    modalContainer(): SerializedStyles {
        return css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 20px;
        text-align: center;
        white-space: normal;
        box-sizing: border-box;
        max-width: 398px;
        width: 100%;
        `;
    },
    modalMessage(): SerializedStyles {
        return css`
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        padding: 16px 36px;
        border-bottom: 1px solid #D9D9D9;
        width: 100%;
        `;
    },
    confirmButton(): SerializedStyles {
        return css`
        color: #FF0000;
        font-size: 16px;
        font-weight: 600;
        padding: 12px 36px;
        border-bottom: 1px solid #D9D9D9;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        `;
    },
    cancelButton(): SerializedStyles {
        return css`
        color: #000000;
        font-size: 16px;
        font-weight: 400;
        padding: 12px 36px;
        cursor: pointer;
        `;
    }
};