import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useEffect } from "react";
import { UserNameContainer, TextWrapper } from "./index.styles";

export default function InputUserName() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value.replace(/\d/g, "");
    setUserInfo((prev) => ({ ...prev, username: newData }));
    setInputData((prev) => ({ ...prev, name: newData }));
  };

  useEffect(() => {
    if (userInfo.username && inputData.name === "") {
      setInputData((prev) => ({ ...prev, name: userInfo.username }));
    }
  }, [userInfo.username, inputData.name, setInputData]);

  return (
    <>
      <div css={UserNameContainer}>
        <Text.TitleMenu300>당신의 이름을 입력해주세요.</Text.TitleMenu300>
        <div css={TextWrapper}>
          <Text.FocusedMenu $isFocused={isFocused}>이름</Text.FocusedMenu>
        </div>
        <Input.InfoBox
          value={userInfo.username}
          placeholder="이름을 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleUserNameChange}
        />
        <div css={TextWrapper}>
          <Text.FocusedWarning $isFocused={isFocused}>
            이름은 수정이 불가하니 정확하게 입력해주세요
          </Text.FocusedWarning>
        </div>
      </div>
    </>
  );
}
