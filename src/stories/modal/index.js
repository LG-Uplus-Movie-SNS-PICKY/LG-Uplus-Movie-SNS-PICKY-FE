import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import styles from './index.styles';
export function Modal({ message, confirmText, cancelText, onConfirm, onCancel }) {
    const [isVisible, setIsVisible] = useState(true);
    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };
    if (!isVisible)
        return null;
    return (_jsxs("div", { css: styles.modalContainer, children: [_jsx("div", { css: styles.modalMessage, children: message }), _jsx("div", { css: styles.confirmButton, onClick: onConfirm, children: confirmText }), _jsx("div", { css: styles.cancelButton, onClick: handleCancel, children: cancelText })] }));
}
