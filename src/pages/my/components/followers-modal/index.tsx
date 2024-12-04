// pages/my/components/followers-modal/index.tsx
import React, { useState } from 'react';
import {
    ModalContainer,
    ModalWrapper,
    TabContainer,
    TabItem,
    UserList,
    UserItem,
    ProfileImage,
    UserName,
    CloseButton
} from './index.styles';

interface FollowersModalProps {
    onClose: () => void;
    followers: { id: number; name: string; profileImage?: string }[];
    followings: { id: number; name: string; profileImage?: string }[];
    activeTab: 'followers' | 'followings'; // activeTab 추가
}

function FollowersModal({ onClose, followers, followings, activeTab: initialTab }: FollowersModalProps) {
    const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(initialTab);

    const userList = activeTab === 'followers' ? followers : followings;

    return (
        <ModalContainer onClick={onClose}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <TabContainer>
                    <TabItem
                        isActive={activeTab === 'followers'}
                        onClick={() => setActiveTab('followers')}
                    >
                        {followers.length} 팔로워
                    </TabItem>
                    <TabItem
                        isActive={activeTab === 'followings'}
                        onClick={() => setActiveTab('followings')}
                    >
                        {followings.length} 팔로잉
                    </TabItem>
                </TabContainer>
                <UserList>
                    {userList.map((user) => (
                        <UserItem key={user.id}>
                            <ProfileImage src={user.profileImage || '/default-profile.png'} />
                            <UserName>{user.name}</UserName>
                        </UserItem>
                    ))}
                </UserList>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalWrapper>
        </ModalContainer>
    );
}

export default FollowersModal;