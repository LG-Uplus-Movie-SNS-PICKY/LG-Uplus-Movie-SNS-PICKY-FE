// pages/my/components/followers-modal/index.styles.tsx
import styled from "@emotion/styled";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalWrapper = styled.div`
    width: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const TabContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
`;

export const TabItem = styled.div<{ isActive: boolean }>`
    font-size: 16px;
    font-weight: ${(props) => (props.isActive ? '600' : '400')};
    color: ${(props) => (props.isActive ? '#000' : '#9d9d9d')};
    cursor: pointer;
    padding-bottom: ${(props) => (props.isActive ? '4px' : '0')};
    border-bottom: ${(props) => (props.isActive ? '2px solid #000' : 'none')};
`;

export const UserList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    max-height: 300px;
    overflow-y: auto;
`;

export const UserItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0;
    gap: 12px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
`;

export const UserName = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #000;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: #9d9d9d;
    font-size: 14px;
    padding: 16px;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: #000;
    }
`;