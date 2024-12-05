// pages/my/components/logout-modal/index.tsx
import React, { useEffect, useState } from 'react';
import { Modal } from '@stories/modal'
import {
    ModalContainer,
    ModalWrapper,
    ModalItem,
    ModalBackground
} from './index.styles';
import { Toast } from '@stories/toast'

interface LogoutModalProps {
    onClose: () => void;
    targetRef: React.RefObject<HTMLButtonElement>; // SettingsButton의 ref 전달
}

function LogoutModal({ onClose, targetRef }: LogoutModalProps) {
    const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

    useEffect(() => {
        if (targetRef?.current) {
          const rect = targetRef.current.getBoundingClientRect();
          const rightOffset = window.innerWidth - rect.right;
          setModalPosition({
            top: rect.bottom + window.scrollY + 4,
            right: rightOffset,
          });
        }
      }, [targetRef]);
    

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);

    const showToast = (message: string, direction: 'none' | 'up' | 'down'): Promise<void> => {
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

    const handleConfirmLogout = async () => {
        await showToast('로그아웃이 완료되었습니다.', 'up');
        window.location.reload();
    };

    const handleCancelMembershipClick = () => {
        setModalMessage('회원탈퇴하시겠습니까?');
        setIsConfirmModalOpen(true);
    };

    const handleConfirmCancelMembership = async () => {
        await showToast('회원탈퇴가 완료되었습니다.', 'up');
        window.location.reload();
    };


    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <>
            {/* 기존 모달 */}
            <ModalContainer onClick={onClose}>
                <ModalWrapper
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        top: modalPosition.top,
                        right: modalPosition.right,
                      }}
                >
                    <ModalItem onClick={handleLogoutClick}>로그아웃</ModalItem>
                    <ModalItem onClick={handleCancelMembershipClick}>탈퇴하기</ModalItem>
                </ModalWrapper>
            </ModalContainer>

            {/* 확인 모달 */}
            {isConfirmModalOpen && (
                <ModalBackground onClick={() => setIsConfirmModalOpen(false)}>
                    <Modal
                        message={modalMessage}
                        confirmText={modalMessage === '로그아웃하시겠습니까?' ? '로그아웃' : '회원탈퇴'}
                        cancelText="취소"
                        onConfirm={modalMessage === '로그아웃하시겠습니까?' ? handleConfirmLogout : handleConfirmCancelMembership}
                        onCancel={handleCancel}
                    />
                </ModalBackground>
            )}

            {/* Toast 메시지 */}
            {toast && <Toast message={toast.message} direction={toast.direction} />}
        </>
    );
}

export default LogoutModal;