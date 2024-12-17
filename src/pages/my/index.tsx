// pages/my/index.tsx
import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "@stories/toast";
import SEO from "@components/seo";
import { useRecoilValue } from "recoil";
import { isLogin } from "@/recoil/atoms/isLoginState";
import {
  fetchGetUserInfo,
  fetchNicknameValidation,
  fetchUserInfo,
} from "@api/user";

function My() {
  const { nickname } = useParams(); // URL에서 nickname 추출
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null); // SettingsButton ref 추가

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    "followers"
  );
  const [isFollowing, setIsFollowing] = useState(false);

  // 로그인 상태에서 사용자 정보 가져오기
  const loginState = useRecoilValue(isLogin);
  const myNickname = loginState.isLoginInfo.nickname; // Recoil 상태에서 nickname 추출

  const [isValid, setIsValid] = useState<boolean | null>(null); // 닉네임 유효성 상태
  const [userData, setUserData] = useState<{
    userId: number;
    boardCount: number;
    followerCount: number;
    followingCount: number | null;
  } | null>(null); // 전체 사용자 정보를 객체로 관리

  const [profileImage, setProfileImage] = useState<string>(""); // 프로필 이미지 상태
  const [boardCount, setBoardCount] = useState(0); // 게시글 수 상태
  const [followersCount, setFollowersCount] = useState(0); // 팔로워 수 상태
  const [followingCount, setFollowingCount] = useState(0); // 팔로잉 수 상태

  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // // 닉네임 검증 함수
  // async function checkNickname(nickname: string) {
  //   try {
  //     const response = await fetchNicknameValidation(nickname);
  //     setIsValid(response.isValid); // 상태 업데이트
  //   } catch (error) {
  //     console.error("닉네임 검증 중 오류가 발생했습니다:", error);
  //   }
  // }

  // // 닉네임 검증 함수
  // async function checkNickname(nickname: string) {
  //   try {
  //     const response = await fetchNicknameValidation(nickname);
  //     setIsValid(response.isValid); // API에서 받은 값을 상태로 설정
  //   } catch (error) {
  //     console.error("닉네임 검증 중 오류가 발생했습니다:", error);
  //     setIsValid(false); // 오류가 발생한 경우 기본값으로 false 설정 -> 서버 오류로 일단 임시로 처리
  //   }
  // }

  // // 닉네임 검증 후 사용자 정보 로드
  // useEffect(() => {
  //   if (nickname) {
  //     checkNickname(nickname); // 닉네임 검증
  //   }
  // }, [nickname]);

  // useEffect(() => {
  //   if (isValid === false) {
  //     // 닉네임이 사용 가능할 때만 사용자 정보 로드
  //     const loadUserInfo = async () => {
  //       try {
  //         setLoading(true);
  //         const data = await fetchUserInfo(nickname as string);

  //         setUserData(data);
  //         setBoardCount(data.boardCount ?? 0);
  //         setFollowersCount(data.followerCount ?? 0);
  //         setFollowingCount(data.followingCount ?? 0);
  //       } catch (err) {
  //         console.error(err);
  //         setError("사용자 정보를 불러오는 중 문제가 발생했습니다.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     loadUserInfo();
  //   }
  // }, [isValid, nickname]);

  //   // 사용자 정보 로드
  //   useEffect(() => {
  //     const loadUserProfile = async () => {
  //       try {
  //         setLoading(true);
  //         const userInfo = await fetchGetUserInfo(); // GET API 호출
  //         console.log("유저 데이터:", userInfo); // API 응답 데이터 로그 출력

  //         // API 응답 데이터에서 profileUrl 설정
  //         setProfileImage(userInfo.data.profileUrl || defaultProfileImage);
  //       } catch (err) {
  //         console.error("Error fetching user info:", err);
  //         setError("사용자 정보를 불러오는 중 문제가 발생했습니다.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (nickname) {
  //       loadUserProfile();
  //     }
  //   }, [nickname]); // nickname이 변경될 때마다 실행

  //   // 게시글/팔로워/팔로잉 수 가져오기
  //   useEffect(() => {
  //     const loadUserInfo = async () => {
  //         if (!nickname) {
  //             console.error("닉네임이 없습니다.");
  //             setError("닉네임이 제공되지 않았습니다.");
  //             return;
  //         }

  //         try {
  //             setLoading(true);
  //             const data = await fetchUserInfo(nickname); // nickname은 string으로 보장됨
  //             console.log("게시글/팔로워/팔로잉 수:", data);

  //             // 상태 업데이트
  //             setUserData(data);
  //             setBoardCount(data.boardCount ?? 0);
  //             setFollowersCount(data.followerCount ?? 0);
  //             setFollowingCount(data.followingCount ?? 0);
  //         } catch (err) {
  //             console.error("Error fetching user info:", err);
  //             setError("사용자 정보를 불러오는 중 문제가 발생했습니다.");
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     loadUserInfo();
  // }, [nickname]);

  useEffect(() => {
    const loadUserProfileAndInfo = async () => {
      if (!nickname) {
        console.error("닉네임이 없습니다.");
        setError("닉네임이 제공되지 않았습니다.");
        return;
      }

      // 상태 초기화
      setUserData(null);
      setProfileImage("");
      setBoardCount(0);
      setFollowersCount(0);
      setFollowingCount(0);

      try {
        setLoading(true);
        const data = await fetchUserInfo(nickname); // 특정 닉네임 정보 가져오기
        const userInfo = await fetchGetUserInfo(); // 유저 정보 가져오기
        console.log("닉네임:", nickname);
        console.log("게시글/팔로워/팔로잉 수:", data);
        console.log("프로필 사진:", userInfo.data.profileUrl);

        setProfileImage(userInfo.data.profileUrl || defaultProfileImage);
        setBoardCount(data.boardCount ?? 0);
        setFollowersCount(data.followerCount ?? 0);
        setFollowingCount(data.followingCount ?? 0);
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("사용자 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfileAndInfo();
  }, [nickname]); // nickname이 변경될 때만 실행

  // const dummyData = {
  //   id: 1,
  //   profileImage: "",
  //   reviews: 0,
  //   // nickname: "Nick Name",
  //   role: "critic",
  //   followers: [
  //     {
  //       id: 1,
  //       name: "Follower1",
  //       profileImage: "https://via.placeholder.com/50",
  //     },
  //     {
  //       id: 2,
  //       name: "Follower2",
  //       profileImage: "https://via.placeholder.com/50",
  //     },
  //   ],
  //   followings: [
  //     {
  //       id: 1,
  //       name: "Following1",
  //       profileImage: "https://via.placeholder.com/50",
  //     },
  //     {
  //       id: 2,
  //       name: "Following2",
  //       profileImage: "https://via.placeholder.com/50",
  //     },
  //     {
  //       id: 3,
  //       name: "Following3",
  //       profileImage: "https://via.placeholder.com/50",
  //     },
  //   ],
  // };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    navigate(`/user/${myNickname}/edit`);
  };

  const handleFollowClick = () => {
    if (isFollowing) {
      console.log("팔로우 취소");
      setFollowersCount((prev) => prev - 1);
    } else {
      console.log("팔로우 완료 - 팔로잉");
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

  // useEffect(() => {
  //   const { nickname } = param;

  //   const fetchUserInfo = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         `${
  //           import.meta.env.VITE_SERVER_URL
  //         }/api/v1/user/validate-user?nickname=${nickname}`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: 1,
  //           },
  //         }
  //       );

  //       console.log(data.message);
  //     } catch (error) {
  //       if (error instanceof AxiosError && error.response) {
  //         switch (error.response.data.errorCode) {
  //           case "AUTH_HEADER_MISSING":
  //             navigate("/"); // Authorization 값을 보내지 않는 경우
  //             break;

  //           case "USER_NOT_FOUND":
  //             // navigate("/"); // 존재하지 않는 사용자인 경우
  //             break;
  //         }
  //       }
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

  return (
    <>
      <SEO
        title={`PICKY: ${nickname}`}
        description={`${nickname}님의 프로필(팔로워: ${followersCount}명, 팔로잉: ${followingCount}명)`}
        image={profileImage}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <Wrapper ref={wrapperRef}>
        <ProfileContainer>
          {profileImage ? (
            <ProfileImage src={profileImage} />
          ) : (
            <ProfileImage src={defaultProfileImage} />
          )}

          <ProfileInfoContainer>
            <ProfileInfo>
              <BoldText isZero={boardCount === 0}>{boardCount}</BoldText>
              <Text>게시글</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followers")}>
              {" "}
              {/* 팔로워 클릭 시 */}
              <BoldText isZero={followersCount === 0}>
                {followersCount}
              </BoldText>
              <Text>팔로워</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followings")}>
              {" "}
              {/* 팔로잉 클릭 시 */}
              <BoldText isZero={followingCount === 0}>
                {followingCount}
              </BoldText>
              <Text>팔로잉</Text>
            </ProfileInfo>
          </ProfileInfoContainer>
        </ProfileContainer>

        <NickNameContainer>
          <NickName>{nickname}</NickName>
          {/* {dummyData.role === "critic" && <CriticBadge />}{" "} */}
          {/* critic일 때만 렌더링 */}
        </NickNameContainer>

        {/* 프로필 편집 or 팔로우/팔로잉 버튼 */}
        <ButtonContainer>
          {nickname === myNickname ? (
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

          {/* 설정 버튼 */}
          {nickname === myNickname ? (
            <SettingsButton ref={settingsButtonRef} onClick={toggleModal}>
              <SettingsSvg />
            </SettingsButton>
          ) : null}
        </ButtonContainer>

        {/* 탭 메뉴 */}
        <TabMenu wrapperRef={wrapperRef} nickname={nickname || "guest_user"} />
      </Wrapper>

      {/* 로그아웃 or 탈퇴 확인 모달 */}
      {isModalOpen && (
        <div>
          <LogoutModal onClose={closeModal} targetRef={settingsButtonRef} />
        </div>
      )}

      {/* 팔로워/팔로잉 리스트 모달
      {isFollowersModalOpen && (
        <FollowersModal
          onClose={closeFollowersModal}
          followers={dummyData.followers}
          followings={dummyData.followings}
          activeTab={activeTab} // 현재 활성화된 탭 전달
        />
      )} */}
    </>
  );
}

export default My;
