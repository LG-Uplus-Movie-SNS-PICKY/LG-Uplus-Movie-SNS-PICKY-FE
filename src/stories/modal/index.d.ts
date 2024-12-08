interface ModalProps {
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export declare function Modal({ message, confirmText, cancelText, onConfirm, onCancel }: ModalProps): import("@emotion/react/jsx-runtime").JSX.Element | null;
export {};
