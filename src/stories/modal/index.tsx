import { useState } from 'react';
import styles from './index.styles';

interface ModalProps {
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function Modal({
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    if (!isVisible) return null;

    return (
        <div css={styles.modalContainer}>
            <div css={styles.modalMessage}>{message}</div>
            <div css={styles.confirmButton} onClick={onConfirm}>{confirmText}</div>
            <div css={styles.cancelButton} onClick={handleCancel}>{cancelText}</div>
        </div>
    );
}