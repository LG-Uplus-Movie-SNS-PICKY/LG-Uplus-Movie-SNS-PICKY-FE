// pages/movie-detail/components/share-modal/index.tsx
import React, { useState } from 'react';
import {
  ModalContainer,
  ModalContent,
  ModalTitle,
  UrlDisplay,
  CopyButton
} from './index.styles';

interface ShareModalProps {
    url: string;
    onClose: () => void;
  }

  const ShareModal = ({ url, onClose }: ShareModalProps) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess('URL이 복사되었습니다!');
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    } catch (err) {
      setCopySuccess('복사 실패!');
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>URL 복사하기</ModalTitle>
        <UrlDisplay>{url}</UrlDisplay>
        <CopyButton onClick={handleCopy}>
          {copySuccess || '복사'}
        </CopyButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ShareModal;