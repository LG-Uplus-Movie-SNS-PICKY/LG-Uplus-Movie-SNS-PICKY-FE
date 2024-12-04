// pages/my/components/logout-modal/index.tsx
import React, { useState } from 'react';
import { Modal } from '@stories/modal'
import {
    ModalContainer,
    ModalWrapper,
    ModalItem,
    ModalBackground
} from './index.styles';

interface LogoutModalProps {
    onClose: () => void;
}

function LogoutModal({ onClose }: LogoutModalProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    const handleLogoutClick = () => {
        setModalMessage('로그아웃하시겠습니까?');
        setIsConfirmModalOpen(true);
    };

    const handleConfirmLogout = () => {
        console.log('로그아웃 완료');
        alert('로그아웃이 완료되었습니다.');
        setIsConfirmModalOpen(false);
        onClose();
    };

    const handleCancelMembershipClick = () => {
        setModalMessage('회원탈퇴하시겠습니까?');
        setIsConfirmModalOpen(true);
    };

    const handleConfirmCancelMembership = () => {
        console.log('회원탈퇴 완료');
        alert('회원탈퇴가 완료되었습니다.');
        setIsConfirmModalOpen(false);
        onClose();
    };

    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <>
            {/* 기존 모달 */}
            <ModalContainer onClick={onClose}>
                <ModalWrapper onClick={(e) => e.stopPropagation()}>
                    <ModalItem onClick={handleLogoutClick}>로그아웃</ModalItem>
                    <ModalItem onClick={handleCancelMembershipClick}>탈퇴하기</ModalItem>
                </ModalWrapper>
            </ModalContainer>

            {/* 확인 모달 */}
            {isConfirmModalOpen && (
                <ModalBackground onClick={onClose}>
                    <Modal
                        message={modalMessage}
                        confirmText={modalMessage === '로그아웃하시겠습니까?' ? '로그아웃' : '회원탈퇴'}
                        cancelText="취소"
                        onConfirm={modalMessage === '로그아웃하시겠습니까?' ? handleConfirmLogout : handleConfirmCancelMembership}
                        onCancel={handleCancel}
                    />
                </ModalBackground>
            )}
        </>
    );
}

export default LogoutModal;