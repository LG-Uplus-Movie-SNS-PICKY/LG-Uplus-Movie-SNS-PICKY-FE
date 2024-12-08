import React from 'react';
interface LogoutModalProps {
    onClose: () => void;
    targetRef: React.RefObject<HTMLButtonElement>;
}
declare function LogoutModal({ onClose, targetRef }: LogoutModalProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default LogoutModal;
