import { useRecoilState } from "recoil";
import { userState, inputState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useEffect } from "react";
import { nickNameContainer, textWrapper } from "./index.styles";

export default function InputNickname() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;

    setUserInfo((prev) => ({ ...prev, nickname: newData }));
    setInputData((prev) => ({ ...prev, nickname: newData }));
  };

  useEffect(() => {
    if (userInfo.nickname && inputData.nickname === "") {
      setInputData((prev) => ({ ...prev, nickname: userInfo.nickname }));
    }
  }, [userInfo.nickname, inputData.nickname, setInputData]);

  return (
    <>
      <div css={nickNameContainer}>
        <Text.TitleMenu300>당신의 이름을 입력해주세요.</Text.TitleMenu300>
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
        {/* <Block.FlexBox $alignItems="center" $gap="10px"> */}
        <div css={textWrapper}>
          <Text.FocusedWarning $isFocused={isFocused}>
            닉네임은 다른 사용자와 겹치지 않도록 입력해주세요
          </Text.FocusedWarning>
        </div>
      </div>
    </>
  );
}
