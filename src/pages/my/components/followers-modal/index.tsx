// pages/my/components/followers-modal/index.tsx
import React, { useEffect, useState } from "react";
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
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import Loading from "@components/loading";
import { useInView } from "react-intersection-observer";

interface FollowerTypes {
  userId: number;
  userNickname: string;
  userProfileUrl: string;
  userRole: string;
}

interface FollowersModalProps {
  onClose: () => void;
  followers: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>;
  followersCount: number;
  followings: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>;
  followingCount: number;
  activeTab: "followers" | "followings";
}

function LoadingContainer() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading />
    </div>
  );
}

function FollowersModal({
  onClose,
  followers,
  followersCount,
  followings,
  followingCount,
  activeTab: initialTab,
}: FollowersModalProps) {
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    initialTab
  );
  const userList = activeTab === "followers" ? followers : followings;
  const navigate = useNavigate();

  const {
    data: followerData,
    isLoading: followerDataLoading,
    hasNextPage: followerHasNextPage,
    isFetchingNextPage: followerIsFetchingNextPage,
    fetchNextPage: followerFetchNextPage,
  } = followers;

  const {
    data: followingData,
    isLoading: followingDataLoading,
    hasNextPage: followingHasNextPage,
    isFetchingNextPage: followingIsFetchingNextPage,
    fetchNextPage: followingFetchNextPage,
  } = followings;

  // 프로필 클릭 시 해당 사용자의 페이지로 이동
  const handleProfileClick = (nickname: string) => {
    onClose(); // 모달 닫기
    navigate(`/user/${nickname}`); // 페이지 이동
  };

  const { ref: followerRef, inView: followerInView } = useInView({
    threshold: 1.0,
  });

  const { ref: followingRef, inView: followingInView } = useInView({
    threshold: 1.0,
  });

  // 팔로워 리스트 다음 항목 불러옴
  useEffect(() => {
    if (followerInView && followerHasNextPage && !followerIsFetchingNextPage) {
      followerFetchNextPage();
    }
  }, [followerInView, followerHasNextPage, followerIsFetchingNextPage]);

  useEffect(() => {
    if (
      followingInView &&
      followingHasNextPage &&
      !followingIsFetchingNextPage
    ) {
      followingFetchNextPage();
    }
  }, [followingInView, followingHasNextPage, followingIsFetchingNextPage]);

  return (
    <ModalContainer onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <TabContainer>
          <TabItem
            isActive={activeTab === "followers"}
            onClick={() => setActiveTab("followers")}
          >
            {followersCount} 팔로워
          </TabItem>
          <TabItem
            isActive={activeTab === "followings"}
            onClick={() => setActiveTab("followings")}
          >
            {followingCount} 팔로잉
          </TabItem>
        </TabContainer>

        {/* Active 상태에 따른 렌더링 변환 */}
        {activeTab === "followers" && (
          <>
            {followerDataLoading && <LoadingContainer />}
            {!followerDataLoading && Array.isArray(followerData?.pages) && (
              <>
                {/* 팔로워가 존재하지 않을 경우 */}
                {followerData.pages.every(
                  (page) => !page.data.content.length
                ) ? (
                  <EmptyContainer>
                    <ClawMachineSvg />
                    팔로잉이 존재하지 않습니다.
                  </EmptyContainer>
                ) : (
                  <UserList>
                    {followerData.pages.map((page, idx) => (
                      <React.Fragment key={idx}>
                        {page.data.content.map((follower: FollowerTypes) => (
                          <UserItem
                            key={follower.userId}
                            onClick={() =>
                              handleProfileClick(follower.userNickname)
                            }
                          >
                            <ProfileImage src={follower.userProfileUrl} />
                            <UserName>
                              {follower.userNickname}
                              {follower.userRole === "CRITIC" && (
                                <CriticBadge />
                              )}
                            </UserName>
                          </UserItem>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* 무한 스크롤을 위한 Ref */}
                    <div ref={followerRef} style={{ height: "10px" }} />
                  </UserList>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "followings" && (
          <>
            {followingDataLoading && <LoadingContainer />}
            {!followingDataLoading && Array.isArray(followingData?.pages) && (
              <>
                {/* 팔로워가 존재하지 않을 경우 */}
                {followingData.pages.every(
                  (page) => !page.data.content.length
                ) ? (
                  <EmptyContainer>
                    <ClawMachineSvg />
                    팔로잉이 존재하지 않습니다.
                  </EmptyContainer>
                ) : (
                  <UserList>
                    {followingData.pages.map((page, idx) => (
                      <React.Fragment key={idx}>
                        {page.data.content.map((following: FollowerTypes) => (
                          <UserItem
                            key={following.userId}
                            onClick={() =>
                              handleProfileClick(following.userNickname)
                            }
                          >
                            <ProfileImage src={following.userProfileUrl} />
                            <UserName>
                              {following.userNickname}
                              {following.userRole === "CRITIC" && (
                                <CriticBadge />
                              )}
                            </UserName>
                          </UserItem>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* 무한 스크롤을 위한 Ref */}
                    <div ref={followingRef} style={{ height: "10px" }} />
                  </UserList>
                )}
              </>
            )}
          </>
        )}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalWrapper>
    </ModalContainer>
  );
}

export default FollowersModal;

// {userList.length > 0 ? (
// <UserList>
//       {userList.map((user) => (
//         <UserItem
//           key={user.userId}
//           onClick={() => handleProfileClick(user.userNickname)} // 클릭 시 이동
//         >
//           <ProfileImage src={user.userProfileUrl} />
//           <UserName>
//             {user.userNickname}
//             {user.userRole === "CRITIC" && <CriticBadge />}{" "}
//             {/* CRITIC 뱃지 렌더링 */}
//           </UserName>
//         </UserItem>
//       ))}
//     </UserList>
//   ) : activeTab === "followers" ? (
//     <EmptyContainer>
//       <ClawMachineSvg />
//       팔로워가 존재하지 않습니다.
//     </EmptyContainer>
//   ) : (
//     <EmptyContainer>
//       <ClawMachineSvg />
//       팔로잉이 존재하지 않습니다.
//     </EmptyContainer>
//   )}
