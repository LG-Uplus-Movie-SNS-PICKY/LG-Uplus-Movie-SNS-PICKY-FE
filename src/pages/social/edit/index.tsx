import React, { useEffect, useState } from "react";
import profileIcon from "@assets/icons/profile.svg";
import {
  containerStyle,
  headerStyle,
  headerTitleStyle,
  profileImageContainerStyle,
  profileImageStyle,
  photoEditStyle,
  inputRowStyle,
  inputLabelStyle,
  inputStyle,
  readonlyInputStyle,
  profileWrapper,
  saveButtonStyle,
  buttonWrapper,
  photoEditWrapper,
  errorTextStyle,
} from "./index.styles";
import SEO from "@components/seo";

export default function ProfileEditPage() {
  const initialNickname = "먹식이";
  const initialProfileImage = null;

  const [nickname, setNickname] = useState(initialNickname);
  const [profileImage, setProfileImage] = useState<string | null>(
    initialProfileImage
  );
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null); // 프로필 이미지 오류 상태
  const [isSaveDisabled, setIsSaveDisabled] = useState(true); // 수정 버튼 활성/비활성

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    // 유효성 검사: 최소 2자 이상, 최대 10자, 공백 포함 금지
    if (value.length < 2 || value.length > 10) {
      setNicknameError("닉네임은 2자 이상, 10자 이하로 입력해주세요.");
    } else if (/\s/.test(value)) {
      setNicknameError("닉네임에 공백은 포함될 수 없습니다.");
    } else {
      setNicknameError(null);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
        setImageError(null); // 이미지 업로드 시 오류 상태 초기화
      };
      reader.readAsDataURL(file);
    }
  };

  // 수정 버튼 클릭 핸들러
  const handleSave = () => {
    if (nicknameError || imageError) {
      alert("입력을 확인해주세요.");
      return;
    }

    alert("프로필이 수정되었습니다.");
  };

  // 초기값과 비교하여 수정 버튼 활성/비활성 상태 업데이트
  useEffect(() => {
    const isUnchanged =
      nickname === initialNickname && profileImage === initialProfileImage;

    const hasError = !!nicknameError || !!imageError;

    setIsSaveDisabled(isUnchanged || hasError);
  }, [nickname, profileImage, nicknameError, imageError]);

  return (
    <>
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
          {imageError && <p css={errorTextStyle}>{imageError}</p>} {/* 이미지 오류 메시지 */}
        </div>

        <div css={profileWrapper}>
          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>닉네임</label>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                css={inputStyle}
              />
              {nicknameError && (
                <p css={errorTextStyle}>{nicknameError}</p> // 닉네임 오류 메시지
              )}
            </div>
          </div>

          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>이름</label>
            <input
              type="text"
              value="최우진"
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>생년월일</label>
            <input
              type="text"
              value="2002-09-18"
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>성별</label>
            <input type="text" value="여자" readOnly css={readonlyInputStyle} />
          </div>

          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>국적</label>
            <input
              type="text"
              value="내국인"
              readOnly
              css={readonlyInputStyle}
            />
          </div>
        </div>
        <div css={buttonWrapper}>
          <button
            onClick={handleSave}
            css={saveButtonStyle}
            disabled={isSaveDisabled} // 비활성화 상태 적용
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