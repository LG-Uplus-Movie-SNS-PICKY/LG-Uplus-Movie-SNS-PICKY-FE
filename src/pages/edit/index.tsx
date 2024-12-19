import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import profileIcon from "@assets/icons/profile.svg";
import defaultUserImage from "@assets/images/default_userImage.png";
import {
  containerStyle,
  headerStyle,
  profileImageContainerStyle,
  profileImageStyle,
  labelStyle,
  photoEditStyle,
  defaultPhotoEditStyle,
  inputRowStyle,
  inputWrapperStyle,
  inputLabelStyle,
  readonlyInputStyle,
  edityInputStyle,
  errorTextStyle,
  profileWrapper,
  saveButtonStyle,
  buttonWrapper,
  photoEditWrapper,
} from "./index.styles";
import SEO from "@components/seo";
import { Toast } from "@stories/toast";
import {
  fetchGetUserInfo,
  fetchProfileUser,
  fetchNicknameValidation,
} from "@api/user"; // API 호출 모듈
import { useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { getCookie, setCookie } from "@util/cookie";
import { useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const [userData, setUserData] = useState({
    name: "",
    nickname: "",
    profile: "" as string | null,
    birthdate: "",
    gender: "",
    nationality: "",
    email: "",
    movieId: [],
    genreId: [],
  });

  const [nickname, setNickname] = useState(userData.nickname);
  const [profileImage, setProfileImage] = useState<string | null>(
    userData.profile || ""
  );
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [nicknameSuccess, setNicknameSuccess] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const setUserInfoUpdate = useSetRecoilState(isLogin);
  const navigate = useNavigate();

  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/;

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // 사용자 정보를 가져오는 API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchGetUserInfo();
        setUserData({
          name: data.data.name,
          nickname: data.data.nickname,
          profile: data.data.profileUrl,
          birthdate: data.data.birthdate,
          gender: data.data.gender === "MALE" ? "남자" : "여자",
          nationality:
            data.data.nationality === "DOMESTIC" ? "내국인" : "외국인",
          email: data.data.email,
          movieId: data.data.movieId || [],
          genreId: data.data.genreId || [],
        });
        setNickname(data.data.nickname);
        setProfileImage(data.data.profileUrl);
      } catch (error) {
        showToast("사용자 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchUserData();
  }, []);

  const debouncedCheckNickname = useMemo(
    () =>
      debounce(async (nickname: string) => {
        if (nickname === userData.nickname) {
          setNicknameError(null);
          setNicknameSuccess(null);
          setIsNicknameValid(true);
          return;
        }

        try {
          const response = await fetchNicknameValidation(nickname);
          if (!response.data.isValid) {
            setNicknameError("이미 사용 중인 닉네임입니다.");
            setNicknameSuccess(null);
            setIsNicknameValid(false);
          } else {
            setIsNicknameValid(null);
            setNicknameSuccess("사용 가능한 닉네임입니다.");
            setIsNicknameValid(true);
          }
        } catch (error) {
          setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
          setNicknameSuccess(null);
          setIsNicknameValid(false);
        }
      }, 300),
    [userData.nickname]
  );

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 특수기호 검사 (알파벳, 숫자, 한글만 허용)
    if (!regex.test(value)) {
      setNicknameError("닉네임에 특수기호는 사용할 수 없습니다.");
      setIsNicknameValid(false);
      return;
    }

    if (value.length > 15) {
      setNicknameError("닉네임은 15자 이하로만 입력해주세요.");
      return;
    }
    setNickname(value);

    if (value.length < 2 || value.length > 15) {
      setNicknameError("닉네임은 2자 이상, 15자 이하로 입력해주세요.");
      setIsNicknameValid(false);
    } else if (/\s/.test(value)) {
      setNicknameError("닉네임에 공백은 포함될 수 없습니다.");
      setIsNicknameValid(false);
    } else {
      setNicknameError(null);
      setIsNicknameValid(null);
      debouncedCheckNickname(value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
          setImageError(null);
        } else {
          setImageError("이미지를 처리하는 중 문제가 발생했습니다.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetDefaultImage = () => {
    setProfileImage(defaultUserImage); // 상태에 기본 이미지 설정
    setImageError(null); // 이미지 에러 초기화
    showToast("기본 이미지로 설정되었습니다.");
  };

  const handleSave = async () => {
    const isUnchanged =
      nickname === userData.nickname && profileImage === userData.profile;

    if (isUnchanged) {
      showToast("변경 사항이 없습니다.");
      return;
    }

    if (nicknameError || imageError || isNicknameValid === false) {
      showToast("입력을 확인해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nickname", nickname);

      // 프로필 이미지가 변경되었을 경우에만 이미지 추가
      if (profileImage && profileImage !== userData.profile) {
        const response = await fetch(profileImage);
        if (!response.ok)
          throw new Error("이미지를 Blob으로 변환하는 데 실패했습니다.");
        const imageBlob = await response.blob();
        formData.append("profile", imageBlob, "profileImage.jpg");
      }

      // API 호출
      const data = await fetchProfileUser(formData);

      if (data) {
        showToast("프로필이 수정되었습니다.");

        // 변경된 데이터 반영
        setUserData((prev) => ({
          ...prev,
          nickname,
          profile:
            profileImage !== userData.profile ? profileImage : prev.profile,
        }));

        // 쿠키와 전역 상태로 저장해 둔 사용자 정보 변환

        // 전역 상태 업데이트
        setUserInfoUpdate((prev) => ({
          ...prev,
          isLoginInfo: {
            ...prev.isLoginInfo,
            nickname,
            profile_url:
              profileImage !== userData.profile
                ? profileImage
                : userData.profile,
          },
          isLoading: false,
        }));

        // 쿠키 상태 업데이트
        const userCookie = getCookie("user");
        setCookie(
          "user",
          {
            ...userCookie,
            user: {
              ...userCookie.user,
              nickname,
              profile_url:
                profileImage !== userData.profile
                  ? profileImage
                  : userData.profile,
            },
          },
          {
            path: "/", // 모든 경로에서 접근 가능
            maxAge: 60 * 60 * 24, // 1일 (초 단위)
            sameSite: "strict", // 보안 설정
            secure: true, // HTTPS 필요 여부 (개발 시 false)
          }
        );

        setNicknameSuccess(null); // 성공 메시지 초기화
        setIsSaveDisabled(true); // 버튼 비활성화

        navigate(`/user/${nickname}`);
      } else {
        throw new Error("프로필 수정 중 문제가 발생했습니다.");
      }
    } catch (error) {
      showToast("프로필 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const isUnchanged =
      nickname === userData.nickname && profileImage === userData.profile;

    const hasError =
      !!nicknameError || !!imageError || isNicknameValid === false;

    setIsSaveDisabled(isUnchanged || hasError);
  }, [
    nickname,
    profileImage,
    nicknameError,
    imageError,
    isNicknameValid,
    userData,
  ]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <SEO title={`${nickname}: 프로필 수정`} />

      <div css={containerStyle}>
        <header css={headerStyle}></header>

        <div css={profileImageContainerStyle}>
          <div css={profileWrapper}>
            <img
              src={profileImage || profileIcon}
              alt="프로필 이미지"
              css={profileImageStyle}
            />
            <p onClick={handleSetDefaultImage} css={defaultPhotoEditStyle}>
              기본 이미지로 설정
            </p>
            <label htmlFor="profileImageInput" css={photoEditWrapper}>
              <p css={photoEditStyle}>사진수정</p>
            </label>
          </div>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div css={profileWrapper}>
          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>닉네임</label>
            <div css={inputWrapperStyle}>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                css={edityInputStyle}
                maxLength={10}
              />
              <span
                css={errorTextStyle}
                style={{
                  visibility:
                    nicknameError || nicknameSuccess ? "visible" : "hidden",
                  // color: nicknameError ? "red" : "black",
                  color: "red",
                }}
              >
                {nicknameError || nicknameSuccess}
              </span>
            </div>
          </div>
          <div css={inputRowStyle}>
            <label css={labelStyle}>이름</label>
            <input
              type="text"
              value={userData.name}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
          <div css={inputRowStyle}>
            <label css={labelStyle}>이메일</label>
            <input
              type="text"
              value={userData.email}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
          <div css={inputRowStyle}>
            <label css={labelStyle}>생년월일</label>
            <input
              type="text"
              value={userData.birthdate}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
          <div css={inputRowStyle}>
            <label css={labelStyle}>성별</label>
            <input
              type="text"
              value={userData.gender}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
        </div>
        <div css={buttonWrapper}>
          <button
            onClick={
              isSaveDisabled
                ? () => showToast("수정할 내용이 없습니다.")
                : handleSave
            }
            css={saveButtonStyle}
            style={{
              backgroundColor: isSaveDisabled ? "#d9d9d9" : "#ff084a",
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
            }}
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}
