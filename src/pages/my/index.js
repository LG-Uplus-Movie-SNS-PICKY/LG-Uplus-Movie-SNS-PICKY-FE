import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// pages/my/index.tsx
import { useRef, useState } from "react";
import { Wrapper, ProfileContainer, ProfileImage, ProfileInfoContainer, ProfileInfo, Text, BoldText, NickNameContainer, NickName, ButtonContainer, EditButton, SettingsButton, } from "./index.styles";
import SettingsSvg from "@assets/icons/settings.svg?react";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import defaultProfileImage from "@assets/images/default_profile.png";
import LogoutModal from "./components/logout-modal";
import FollowersModal from "./components/followers-modal";
import TabMenu from "./components/tab-menu";
import { Button } from "@stories/button";
import { useNavigate } from "react-router-dom";
import SEO from "@components/seo";
function My() {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const settingsButtonRef = useRef(null); // SettingsButton ref 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("followers");
    const [isFollowing, setIsFollowing] = useState(false);
    const dummyData = {
        id: 1,
        profileImage: "",
        reviews: 0,
        nickname: "Nick Name",
        role: "critic",
        followers: [
            {
                id: 1,
                name: "Follower1",
                profileImage: "https://via.placeholder.com/50",
            },
            {
                id: 2,
                name: "Follower2",
                profileImage: "https://via.placeholder.com/50",
            },
        ],
        followings: [
            {
                id: 1,
                name: "Following1",
                profileImage: "https://via.placeholder.com/50",
            },
            {
                id: 2,
                name: "Following2",
                profileImage: "https://via.placeholder.com/50",
            },
            {
                id: 3,
                name: "Following3",
                profileImage: "https://via.placeholder.com/50",
            },
        ],
    };
    const currentUserId = 2; // 현재 로그인한 사용자 ID (예시)
    const isCurrentUser = dummyData.id === currentUserId;
    const [followersCount, setFollowersCount] = useState(dummyData.followers.length);
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleEditClick = () => {
        navigate(`/user/${dummyData.nickname}/edit`);
    };
    const handleFollowClick = () => {
        if (isFollowing) {
            setFollowersCount((prev) => prev - 1);
        }
        else {
            setFollowersCount((prev) => prev + 1);
        }
        setIsFollowing((prev) => !prev);
    };
    const openFollowersModal = (tab) => {
        setActiveTab(tab);
        setIsFollowersModalOpen(true);
    };
    const closeFollowersModal = () => {
        setIsFollowersModalOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: `PICKY: ${dummyData.nickname}`, description: `${dummyData.nickname}님의 프로필(팔로워: ${dummyData.followers.length}명, 팔로잉: ${dummyData.followings.length}명)`, image: dummyData.profileImage, url: `http://localhost:5173/${location.pathname}` }), _jsxs(Wrapper, { ref: wrapperRef, children: [_jsxs(ProfileContainer, { children: [dummyData.profileImage ? (_jsx(ProfileImage, { src: dummyData.profileImage })) : (_jsx(ProfileImage, { src: defaultProfileImage })), _jsxs(ProfileInfoContainer, { children: [_jsxs(ProfileInfo, { children: [_jsx(BoldText, { isZero: dummyData.reviews === 0, children: dummyData.reviews }), _jsx(Text, { children: "\uAC8C\uC2DC\uAE00" })] }), _jsxs(ProfileInfo, { onClick: () => openFollowersModal("followers"), children: [" ", _jsx(BoldText, { isZero: dummyData.followers.length === 0, children: followersCount }), _jsx(Text, { children: "\uD314\uB85C\uC6CC" })] }), _jsxs(ProfileInfo, { onClick: () => openFollowersModal("followings"), children: [" ", _jsx(BoldText, { isZero: dummyData.followings.length === 0, children: dummyData.followings.length }), _jsx(Text, { children: "\uD314\uB85C\uC789" })] })] })] }), _jsxs(NickNameContainer, { children: [_jsx(NickName, { children: dummyData.nickname }), dummyData.role === "critic" && _jsx(CriticBadge, {}), " "] }), _jsxs(ButtonContainer, { children: [isCurrentUser ? (_jsx(EditButton, { onClick: handleEditClick, children: "\uD504\uB85C\uD544 \uD3B8\uC9D1" })) : (_jsx(Button, { btnType: "Social", primary: isFollowing, label: isFollowing ? "팔로잉" : "팔로우", size: "Large", onClick: handleFollowClick })), _jsx(SettingsButton, { ref: settingsButtonRef, onClick: toggleModal, children: _jsx(SettingsSvg, {}) })] }), _jsx(TabMenu, { wrapperRef: wrapperRef })] }), isModalOpen && (_jsx("div", { children: _jsx(LogoutModal, { onClose: closeModal, targetRef: settingsButtonRef }) })), isFollowersModalOpen && (_jsx(FollowersModal, { onClose: closeFollowersModal, followers: dummyData.followers, followings: dummyData.followings, activeTab: activeTab }))] }));
}
export default My;
