import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { Block, Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";

export default function InputEmail() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setInputData((prev) => ({ ...prev, email: newEmail }));
  };

  return (
    <>
      <Block.FlexBox $width="20%" $direction="column" $gap="10px">
        <Text.FocusedMenu $isFocused={isFocused}>이메일</Text.FocusedMenu>
        <Input.InfoBox
          type="email"
          value={inputData.email || ""}
          placeholder="이메일을 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleEmailChange}
        />
        <Block.FlexBox $alignItems="center" $gap="10px">
          <Text.FocusedWarning $isFocused={isFocused}>
            올바른 이메일 주소를 입력해주세요
          </Text.FocusedWarning>
        </Block.FlexBox>
      </Block.FlexBox>
    </>
  );
}
