/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
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

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const fetchUserData = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인 해주세요.");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.data;

      setNickname(data.nickname);
      setProfileImage(data.profile_url || null);
      setBirthDate(data.birthdate);
      setGender(data.gender === "MALE" ? "남자" : "여자");
      setNationality(data.nationality === "DOMESTIC" ? "내국인" : "외국인");
    } catch (error) {
      console.error("유저 데이터 조회 중 오류 발생:", error);
      showToast("유저 정보를 불러오는 데 실패했습니다.");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const checkNicknameAvailability = useCallback(async (nickname: string) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/nickname-validation`,
        {
          params: {
            nickname,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.data.isValid) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
      } else {
        setNicknameError(null);
        setIsNicknameValid(true);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  }, []);

  const debouncedCheckNickname = useMemo(
    () =>
      debounce((nickname: string) => {
        checkNicknameAvailability(nickname);
      }, 100),
    [checkNicknameAvailability]
  );

  useEffect(() => {
    return () => {
      debouncedCheckNickname.cancel();
    };
  }, [debouncedCheckNickname]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 10) {
      return;
    }

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
        setProfileImage(reader.result as string);
        setImageError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialNickname = "";
  const initialProfileImage = null;

  const handleSave = () => {
    const isUnchanged =
      nickname === initialNickname && profileImage === initialProfileImage;

    if (isUnchanged) {
      showToast("변경 사항이 없습니다.");
      return;
    }

    if (nicknameError || imageError || isNicknameValid === false) {
      showToast("입력을 확인해주세요.");
      return;
    }

    showToast("프로필이 수정되었습니다.");
  };

  const handleDisabledClick = () => {
    if (!isSaveDisabled) return;

    const isUnchanged =
      nickname === initialNickname && profileImage === initialProfileImage;

    if (isUnchanged) {
      showToast("변경 사항이 없습니다.");
    } else if (nicknameError || imageError) {
      showToast("닉네임의 요구사항을 따라주세요.");
    }
  };

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
            <label css={labelStyle}>생년월일</label>
            <input
              type="text"
              value={birthDate}
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>성별</label>
            <input
              type="text"
              value={gender}
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>국적</label>
            <input
              type="text"
              value={nationality}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
        </div>
        <div css={buttonWrapper}>
          <button
            onClick={isSaveDisabled ? handleDisabledClick : handleSave}
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
