// pages/my/components/followers-modal/index.styles.tsx
import styled from "@emotion/styled";
export const ModalContainer = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
export const ModalWrapper = styled.div `
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 350px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 12px 16px;
`;
export const TabContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #D9D9D9;
    margin: 0 32px;
`;
export const TabItem = styled.div `
    font-size: 16px;
    font-weight: 600;
    padding: 12px 16px;
    color: ${(props) => (props.isActive ? '#000000' : '#C8C8C8')};
    border-bottom: ${(props) => (props.isActive ? '2px solid #000000' : 'none')};
    cursor: pointer;
`;
export const UserList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
    overflow-y: auto;
`;
export const UserItem = styled.div `
    display: flex;
    align-items: center;
    gap: 8px;
`;
export const ProfileImage = styled.img `
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;
export const UserName = styled.div `
    font-size: 12px;
    font-weight: 500;
    color: #000000;
`;
export const CloseButton = styled.button `
    background: none;
    border: none;
    color: #9D9D9D;
    font-size: 14px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
`;
