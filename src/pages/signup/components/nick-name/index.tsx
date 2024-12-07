/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { userState, inputState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { nickNameContainer, textWrapper } from "./index.styles";
import { debounce } from "lodash";

interface InputNicknameProps {
  onValidChange: (isValid: boolean) => void;
}

export default function InputNickname({ onValidChange }: InputNicknameProps) {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const validateNickname = (nickname: string) => {
    return nickname.length >= 2 && nickname.length <= 15;
  };

  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await axios.get(
        `https://api.picky-movie.com/api/v1/user/nickname-validation`,
        // `http://43.202.51.30/api/v1/user/nickname-validation`,
        { params: { nickname } }
      );

      console.log("API 응답:", response.data);

      if (!response.data.data.isValid) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
      } else {
        setNicknameError("사용이 가능한 닉네임입니다.");
        setIsNicknameValid(true);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  };

  const debouncedCheckNicknameAvailability = useCallback(
    debounce((nickname: string) => {
      if (validateNickname(nickname)) {
        checkNicknameAvailability(nickname);
      }
    }, 300),
    []
  );

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newData = e.target.value;

    if (newData.length > 15) {
      newData = newData.slice(0, 15);
    }

    if (!validateNickname(newData)) {
      setNicknameError("닉네임은 2자 이상 15자 이하로 입력해주세요.");
      setIsNicknameValid(false);
    } else {
      setNicknameError(null);
    }

    setUserInfo((prev) => ({ ...prev, nickname: newData }));
    setInputData((prev) => ({ ...prev, nickname: newData }));

    debouncedCheckNicknameAvailability(newData);
  };

  useEffect(() => {
    onValidChange(isNicknameValid);
  }, [isNicknameValid, onValidChange]);

  return (
    <>
      <div css={nickNameContainer}>
        <Text.TitleMenu300>당신의 닉네임을 입력해주세요.</Text.TitleMenu300>
        <div css={textWrapper}>
          <Text.FocusedMenu $isFocused={isFocused}>닉네임</Text.FocusedMenu>
        </div>
        <Input.InfoBox
          value={userInfo.nickname || ""}
          placeholder="닉네임을 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleNicknameChange}
        />
        <div css={textWrapper} style={{ height: "20px" }}>
          <Text.FocusedWarning
            $isFocused={isFocused}
            style={{
              visibility: nicknameError ? "visible" : "hidden",
            }}
          >
            {nicknameError || ""}
          </Text.FocusedWarning>
        </div>
      </div>
    </>
  );
}
