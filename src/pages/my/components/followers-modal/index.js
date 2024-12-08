import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
// pages/my/components/followers-modal/index.tsx
import { useState } from 'react';
import { ModalContainer, ModalWrapper, TabContainer, TabItem, UserList, UserItem, ProfileImage, UserName, CloseButton } from './index.styles';
function FollowersModal({ onClose, followers, followings, activeTab: initialTab }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const userList = activeTab === 'followers' ? followers : followings;
    return (_jsx(ModalContainer, { onClick: onClose, children: _jsxs(ModalWrapper, { onClick: (e) => e.stopPropagation(), children: [_jsxs(TabContainer, { children: [_jsxs(TabItem, { isActive: activeTab === 'followers', onClick: () => setActiveTab('followers'), children: [followers.length, " \uD314\uB85C\uC6CC"] }), _jsxs(TabItem, { isActive: activeTab === 'followings', onClick: () => setActiveTab('followings'), children: [followings.length, " \uD314\uB85C\uC789"] })] }), _jsx(UserList, { children: userList.map((user) => (_jsxs(UserItem, { children: [_jsx(ProfileImage, { src: user.profileImage || '/default-profile.png' }), _jsx(UserName, { children: user.name })] }, user.id))) }), _jsx(CloseButton, { onClick: onClose, children: "\uB2EB\uAE30" })] }) }));
}
export default FollowersModal;
