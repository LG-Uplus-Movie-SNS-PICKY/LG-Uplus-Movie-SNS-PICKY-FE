// pages/my/index.tsx
import React, { useState } from 'react';
import {
    Wrapper,
    ProfileContainer,
    ProfileImage,
    ProfileInfoContainer,
    ProfileInfo,
    Text,
    BoldText,
    NickNameContainer,
    NickName,
    ButtonContainer,
    EditButton,
    SettingsButton
} from './index.styles';
import SettingsSvg from '@assets/icons/settings.svg?react'
import CriticBadge from '@assets/icons/critic_badge.svg?react';
import defaultProfileImage from '@assets/images/default_profile.png';
import LogoutModal from './components/logout-modal';
import FollowersModal from './components/followers-modal';
import { Button } from '@stories/button';
import { useNavigate } from 'react-router-dom';

function My() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'followers' | 'followings'>('followers');
    const [isFollowing, setIsFollowing] = useState(false);

    const dummyData = {
        id: 1,
        profileImage: '',
        reviews: 0,
        nickname: 'Nick Name',
        role: 'critic',
        followers: [
            { id: 1, name: 'User1', profileImage: 'https://via.placeholder.com/50' },
            { id: 2, name: 'User2', profileImage: 'https://via.placeholder.com/50' },
            // ... 추가
        ],
        followings: [
            { id: 1, name: 'User3', profileImage: 'https://via.placeholder.com/50' },
            { id: 2, name: 'User4', profileImage: 'https://via.placeholder.com/50' },
            // ... 추가
        ]
    };

    const [followersCount, setFollowersCount] = useState(dummyData.followers.length);

    const currentUserId = 1; // 현재 로그인한 사용자 ID (예시)
    const isCurrentUser = dummyData.id === currentUserId;

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFollowClick = () => {
        if (isFollowing) {
            alert('팔로우 취소');
            setFollowersCount((prev) => prev - 1);
        } else {
            alert('팔로우 완료');
            setFollowersCount((prev) => prev + 1);
        }
        setIsFollowing((prev) => !prev);
    };

    const handleEditClick = () => {
        navigate('/user-profile/edit');
    };

    const openFollowersModal = (tab: 'followers' | 'followings') => {
        setActiveTab(tab);
        setIsFollowersModalOpen(true);
    };

    const closeFollowersModal = () => {
        setIsFollowersModalOpen(false);
    };

    return (
        <Wrapper>
            <ProfileContainer>
                {dummyData.profileImage ? (
                    <ProfileImage src={dummyData.profileImage} />
                ) : (
                    <ProfileImage src={defaultProfileImage} />
                )}
                <ProfileInfoContainer>
                    <ProfileInfo>
                        <BoldText isZero={dummyData.reviews === 0}>
                            {dummyData.reviews}
                        </BoldText>
                        <Text>리뷰</Text>
                    </ProfileInfo>
                    <ProfileInfo onClick={() => openFollowersModal('followers')}> {/* 팔로워 클릭 시 */}
                        <BoldText isZero={dummyData.followers.length === 0}>
                            {followersCount}
                        </BoldText>
                        <Text>팔로워</Text>
                    </ProfileInfo>
                    <ProfileInfo onClick={() => openFollowersModal('followings')}> {/* 팔로잉 클릭 시 */}
                        <BoldText isZero={dummyData.followings.length === 0}>
                            {dummyData.followings.length}
                        </BoldText>
                        <Text>팔로잉</Text>
                    </ProfileInfo>
                </ProfileInfoContainer>
            </ProfileContainer>
            <NickNameContainer>
                <NickName>{dummyData.nickname}</NickName>
                {dummyData.role === 'critic' && <CriticBadge />} {/* critic일 때만 렌더링 */}
            </NickNameContainer>

            { /* 프로필 편집 or 팔로우/팔로잉 버튼 */}
            <ButtonContainer>
                {isCurrentUser ? (
                    <EditButton onClick={handleEditClick}>프로필 편집</EditButton>
                ) : (
                    <Button
                        btnType="Social"
                        primary={isFollowing}
                        label={isFollowing ? '팔로잉' : '팔로우'}
                        size="Large"
                        onClick={handleFollowClick}
                    />
                )}
                <SettingsButton onClick={toggleModal}>
                    <SettingsSvg />
                </SettingsButton>
            </ButtonContainer>

            { /* 로그아웃 or 탈퇴하기 모달 */}
            {isModalOpen && (
                <div>
                    <LogoutModal onClose={closeModal} />
                </div>
            )}

            { /* 팔로워/팔로잉 리스트 모달 */}
            {isFollowersModalOpen && (
                <FollowersModal
                    onClose={closeFollowersModal}
                    followers={dummyData.followers}
                    followings={dummyData.followings}
                    activeTab={activeTab} // 현재 활성화된 탭 전달
                />
            )}
        </Wrapper>
    );
}

export default My;