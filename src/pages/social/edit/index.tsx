import React, { useState } from "react";
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
} from "./index.styles";

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState("먹식이");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (nicknameError) {
      alert("닉네임을 올바르게 입력해주세요.");
      return;
    }

    alert("프로필이 수정되었습니다.");
  };

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <h1 css={headerTitleStyle}>프로필 편집</h1>
      </header>

      <div css={profileImageContainerStyle}>
        <label htmlFor="profileImageInput" style={{ cursor: "pointer" }}>
          <div css={profileWrapper}>
            <img
              src={profileImage || profileIcon}
              alt="프로필 이미지"
              css={profileImageStyle}
            />
            <p css={photoEditStyle}>사진수정</p>
          </div>
        </label>
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
          <div style={{ width: "65%" }}>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              css={inputStyle}
            />
            {nicknameError && (
              <p
                style={{
                  color: "#FF084A",
                  fontSize: "12px",
                  marginTop: "4px",
                  marginLeft: "4px",
                }}
              >
                {nicknameError}
              </p>
            )}
          </div>
        </div>

        <div css={inputRowStyle}>
          <label css={inputLabelStyle}>이름</label>
          <input type="text" value="최우진" readOnly css={readonlyInputStyle} />
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
          <input type="text" value="내국인" readOnly css={readonlyInputStyle} />
        </div>
      </div>
      <div css={buttonWrapper}>
        <button onClick={handleSave} css={saveButtonStyle}>
          수정하기
        </button>
      </div>
    </div>
  );
}