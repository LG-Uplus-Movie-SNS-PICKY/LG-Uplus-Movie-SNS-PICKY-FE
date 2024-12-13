import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import profileIcon from "@assets/icons/profile.svg";
import {
  containerStyle,
  headerStyle,
  headerTitleStyle,
  profileImageContainerStyle,
  profileImageStyle,
  labelStyle,
  photoEditStyle,
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

export default function ProfileEditPage() {
  const [userData, setUserData] = useState({
    name: "",
    nickname: "",
    profile: "",
    birthdate: "",
    gender: "",
    nationality: "",
    email: "",
    movieId: [],
    genreId: [],
  });

  const [nickname, setNickname] = useState(userData.nickname);
  const [profileImage, setProfileImage] = useState(userData.profile);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // 사용자 정보를 가져오는 API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchGetUserInfo();
        console.log("Fetched User Data:", data);
        setUserData({
          name: data.name,
          nickname: data.nickname,
          profile: data.profile_url,
          birthdate: data.birthdate,
          gender: data.gender === "MALE" ? "남자" : "여자",
          nationality: data.nationality === "DOMESTIC" ? "내국인" : "외국인",
          email: data.email,
          movieId: data.movieId || [],
          genreId: data.genreId || [],
        });
        setNickname(data.nickname);
        setProfileImage(data.profile_url);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error);
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
          setIsNicknameValid(true);
          return;
        }

        try {
          const response = await fetchNicknameValidation(nickname);
          if (!response.data.isValid) {
            setNicknameError("이미 사용 중인 닉네임입니다.");
            setIsNicknameValid(false);
          } else {
            setNicknameError(null);
            setIsNicknameValid(true);
          }
        } catch (error) {
          console.error("닉네임 확인 중 오류 발생:", error);
          setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
          setIsNicknameValid(false);
        }
      }, 300),
    [userData.nickname]
  );

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 10) return;

    setNickname(value);

    if (value.length < 2 || value.length > 10) {
      setNicknameError("닉네임은 2자 이상, 10자 이하로 입력해주세요.");
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

    const formData = new FormData();
    formData.append("nickname", nickname);

    if (profileImage && profileImage !== userData.profile) {
      try {
        const response = await fetch(profileImage);
        if (!response.ok)
          throw new Error("이미지를 Blob으로 변환하는 데 실패했습니다.");
        const blob = await response.blob();
        formData.append("profile", blob, "profileImage.jpg");
      } catch (error) {
        console.error("이미지 변환 중 오류 발생:", error);
        showToast("이미지를 업로드하는 중 문제가 발생했습니다.");
        return;
      }
    }

    try {
      const data = await fetchProfileUser(formData); // `fetchProfileUser` 사용
      if (data) {
        showToast("프로필이 성공적으로 수정되었습니다.");
        setUserData({ ...userData, nickname, profile: profileImage });
      } else {
        throw new Error("프로필 수정 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
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
        <header css={headerStyle}>
          <h1 css={headerTitleStyle}>프로필 편집</h1>
        </header>

        <div css={profileImageContainerStyle}>
          <div css={profileWrapper}>
            <img
              src={profileImage || profileIcon}
              alt="프로필 이미지"
              css={profileImageStyle}
            />
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
                  visibility: nicknameError ? "visible" : "hidden",
                }}
              >
                {nicknameError && nicknameError}
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