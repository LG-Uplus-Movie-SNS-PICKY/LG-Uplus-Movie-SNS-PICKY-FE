// pages/movie-detail/components/share-modal/index.styles.tsx
import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #FFFFFF;
  padding: 20px 16px;
  border-radius: 16px;
  border: 2px solid #D9D9D9;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
  max-width: 398px;
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

export const UrlDisplay = styled.div`
  background-color: #F1F1F1;
  padding: 12px 8px;
  border-radius: 10px;
  word-break: break-all;
`;

export const CopyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  background-color: #FF084A;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;