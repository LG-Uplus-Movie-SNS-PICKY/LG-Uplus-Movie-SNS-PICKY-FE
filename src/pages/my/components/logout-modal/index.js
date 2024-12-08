var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// pages/my/components/logout-modal/index.tsx
import { useEffect, useState } from 'react';
import { Modal } from '@stories/modal';
import { ModalContainer, ModalWrapper, ModalItem, ModalBackground } from './index.styles';
import { Toast } from '@stories/toast';
function LogoutModal({ onClose, targetRef }) {
    const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
    useEffect(() => {
        if (targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const rightOffset = window.innerWidth - rect.right;
            setModalPosition({
                top: rect.bottom + window.scrollY + 4,
                right: rightOffset,
            });
        }
    }, [targetRef]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [toast, setToast] = useState(null);
    const showToast = (message, direction) => {
        return new Promise((resolve) => {
            setToast({ message, direction });
            setTimeout(() => {
                setToast(null);
                resolve();
            }, 1500);
        });
    };
    const handleLogoutClick = () => {
        setModalMessage('로그아웃하시겠습니까?');
        setIsConfirmModalOpen(true);
    };
    const handleConfirmLogout = () => __awaiter(this, void 0, void 0, function* () {
        yield showToast('로그아웃이 완료되었습니다.', 'up');
        window.location.reload();
    });
    const handleCancelMembershipClick = () => {
        setModalMessage('회원탈퇴하시겠습니까?');
        setIsConfirmModalOpen(true);
    };
    const handleConfirmCancelMembership = () => __awaiter(this, void 0, void 0, function* () {
        yield showToast('회원탈퇴가 완료되었습니다.', 'up');
        window.location.reload();
    });
    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ModalContainer, { onClick: onClose, children: _jsxs(ModalWrapper, { onClick: (e) => e.stopPropagation(), style: {
                        position: 'absolute',
                        top: modalPosition.top,
                        right: modalPosition.right,
                    }, children: [_jsx(ModalItem, { onClick: handleLogoutClick, children: "\uB85C\uADF8\uC544\uC6C3" }), _jsx(ModalItem, { onClick: handleCancelMembershipClick, children: "\uD0C8\uD1F4\uD558\uAE30" })] }) }), isConfirmModalOpen && (_jsx(ModalBackground, { onClick: () => setIsConfirmModalOpen(false), children: _jsx(Modal, { message: modalMessage, confirmText: modalMessage === '로그아웃하시겠습니까?' ? '로그아웃' : '회원탈퇴', cancelText: "\uCDE8\uC18C", onConfirm: modalMessage === '로그아웃하시겠습니까?' ? handleConfirmLogout : handleConfirmCancelMembership, onCancel: handleCancel }) })), toast && _jsx(Toast, { message: toast.message, direction: toast.direction })] }));
}
export default LogoutModal;
