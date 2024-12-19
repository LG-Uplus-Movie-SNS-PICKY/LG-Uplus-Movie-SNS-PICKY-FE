// pages/my/components/followers-modal/index.tsx
import React, { useState } from "react";
import {
  ModalContainer,
  ModalWrapper,
  TabContainer,
  TabItem,
  UserList,
  UserItem,
  ProfileImage,
  UserName,
  CloseButton,
  EmptyContainer,
} from "./index.styles";
import ClawMachineSvg from "@assets/icons/claw_machine.svg?react";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import { useNavigate } from "react-router-dom";

interface FollowersModalProps {
  onClose: () => void;
  followers: {
    userId: number;
    userNickname: string;
    userProfileUrl?: string;
    userRole?: string;
  }[];
  followings: {
    userId: number;
    userNickname: string;
    userProfileUrl?: string;
    userRole?: string;
  }[];
  activeTab: "followers" | "followings";
}

function FollowersModal({
  onClose,
  followers,
  followings,
  activeTab: initialTab,
}: FollowersModalProps) {
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    initialTab
  );
  const userList = activeTab === "followers" ? followers : followings;
  const navigate = useNavigate();

  // 프로필 클릭 시 해당 사용자의 페이지로 이동
  const handleProfileClick = (nickname: string) => {
    onClose(); // 모달 닫기
    navigate(`/user/${nickname}`); // 페이지 이동
  };

  return (
    <ModalContainer onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <TabContainer>
          <TabItem
            isActive={activeTab === "followers"}
            onClick={() => setActiveTab("followers")}
          >
            {followers.length} 팔로워
          </TabItem>
          <TabItem
            isActive={activeTab === "followings"}
            onClick={() => setActiveTab("followings")}
          >
            {followings.length} 팔로잉
          </TabItem>
        </TabContainer>

        {userList.length > 0 ? (
          <UserList>
            {userList.map((user) => (
              <UserItem
                key={user.userId}
                onClick={() => handleProfileClick(user.userNickname)} // 클릭 시 이동
              >
                <ProfileImage src={user.userProfileUrl} />
                <UserName>
                  {user.userNickname}
                  {user.userRole === "CRITIC" && <CriticBadge />}{" "}
                  {/* CRITIC 뱃지 렌더링 */}
                </UserName>
              </UserItem>
            ))}
          </UserList>
        ) : activeTab === "followers" ? (
          <EmptyContainer>
            <ClawMachineSvg />
            팔로워가 존재하지 않습니다.
          </EmptyContainer>
        ) : (
          <EmptyContainer>
            <ClawMachineSvg />
            팔로잉이 존재하지 않습니다.
          </EmptyContainer>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalWrapper>
    </ModalContainer>
  );
}

export default FollowersModal;
