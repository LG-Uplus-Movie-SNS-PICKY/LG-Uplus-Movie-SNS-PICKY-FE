// pages/my/components/logout-modal/index.styles.tsx
import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: transparent;
  z-index: 10000; /* TabMenu보다 높은 값 설정 */
`;

export const ModalWrapper = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 8px;
    padding: 0 8px;
    backdrop-filter: blur(20px);
    z-index: 10002; /* ModalBackground보다 높은 값 설정 */
`;

export const ModalItem = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    padding: 12px 16px;
    border-bottom: 1px solid #D9D9D9;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 10001; /* LogoutModal보다 높은 값 설정 */
`;
