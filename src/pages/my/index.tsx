// pages/my/index.tsx
import React, { useRef, useState } from "react";
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
  SettingsButton,
} from "./index.styles";

import SettingsSvg from "@assets/icons/settings.svg?react";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import defaultProfileImage from "@assets/images/default_profile.png";

import LogoutModal from "./components/logout-modal";
import FollowersModal from "./components/followers-modal";
import TabMenu from "./components/tab-menu";

import { Button } from "@stories/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "@stories/toast";
import SEO from "@components/seo";

function My() {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null); // SettingsButton ref 추가

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    "followers"
  );
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

  const [followersCount, setFollowersCount] = useState(
    dummyData.followers.length
  );

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
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

  const openFollowersModal = (tab: "followers" | "followings") => {
    setActiveTab(tab);
    setIsFollowersModalOpen(true);
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  return (
    <>
      <SEO
        title={`PICKY: ${dummyData.nickname}`}
        description={`${dummyData.nickname}님의 프로필(팔로워: ${dummyData.followers.length}명, 팔로잉: ${dummyData.followings.length}명)`}
        image={dummyData.profileImage}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <Wrapper ref={wrapperRef}>
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
              <Text>게시글</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followers")}>
              {" "}
              {/* 팔로워 클릭 시 */}
              <BoldText isZero={dummyData.followers.length === 0}>
                {followersCount}
              </BoldText>
              <Text>팔로워</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followings")}>
              {" "}
              {/* 팔로잉 클릭 시 */}
              <BoldText isZero={dummyData.followings.length === 0}>
                {dummyData.followings.length}
              </BoldText>
              <Text>팔로잉</Text>
            </ProfileInfo>
          </ProfileInfoContainer>
        </ProfileContainer>

        <NickNameContainer>
          <NickName>{dummyData.nickname}</NickName>
          {dummyData.role === "critic" && <CriticBadge />}{" "}
          {/* critic일 때만 렌더링 */}
        </NickNameContainer>

        {/* 프로필 편집 or 팔로우/팔로잉 버튼 */}
        <ButtonContainer>
          {isCurrentUser ? (
            <EditButton onClick={handleEditClick}>프로필 편집</EditButton>
          ) : (
            <Button
              btnType="Social"
              primary={isFollowing}
              label={isFollowing ? "팔로잉" : "팔로우"}
              size="Large"
              onClick={handleFollowClick}
            />
          )}
          <SettingsButton ref={settingsButtonRef} onClick={toggleModal}>
            <SettingsSvg />
          </SettingsButton>
        </ButtonContainer>

        {/* 탭 메뉴 */}
        <TabMenu wrapperRef={wrapperRef} />
      </Wrapper>

      {/* 로그아웃 or 탈퇴 확인 모달 */}
      {isModalOpen && (
        <div>
          <LogoutModal onClose={closeModal} targetRef={settingsButtonRef} />
        </div>
      )}

      {/* 팔로워/팔로잉 리스트 모달 */}
      {isFollowersModalOpen && (
        <FollowersModal
          onClose={closeFollowersModal}
          followers={dummyData.followers}
          followings={dummyData.followings}
          activeTab={activeTab} // 현재 활성화된 탭 전달
        />
      )}
    </>
  );
}

export default My;
