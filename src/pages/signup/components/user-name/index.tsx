import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect } from "react";
import { UserNameContainer, TextWrapper, Warning } from "./index.styles";

export default function InputUserName() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();
  const [isValid, setIsValid] = useState(true);

  const validateName = (name: string) => {
    return name.length >= 2 && name.length <= 10 && /^[^\d]+$/.test(name);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newData = e.target.value;

    if (newData.length > 10) {
      newData = newData.slice(0, 10);
    }

    const isValidName = validateName(newData);
    setIsValid(isValidName);

    const sanitizedData = newData.replace(/\d/g, "");
    setUserInfo((prev) => ({ ...prev, username: sanitizedData }));
    setInputData((prev) => ({ ...prev, name: sanitizedData }));
  };

  useEffect(() => {
    if (userInfo.name && inputData.name === "") {
      setInputData((prev) => ({ ...prev, name: userInfo.name }));
    }
  }, [userInfo.name, inputData.name, setInputData]);

  return (
    <>
      <div css={UserNameContainer}>
        <Text.TitleMenu300>당신의 이름을 입력해주세요.</Text.TitleMenu300>
        <div css={TextWrapper}>
          <Text.FocusedMenu $isFocused={isFocused}>이름</Text.FocusedMenu>
        </div>
        <Input.InfoBox
          value={userInfo.name}
          placeholder="이름을 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleUserNameChange}
        />
        <div css={TextWrapper} style={{ height: "20px" }}>
          <div css ={Warning}
            style={{ visibility: isValid ? "hidden" : "visible" }}
          >
            이름은 최소 2글자 최대 10글자 입니다.
          </div>
        </div>
      </div>
    </>
  );
}