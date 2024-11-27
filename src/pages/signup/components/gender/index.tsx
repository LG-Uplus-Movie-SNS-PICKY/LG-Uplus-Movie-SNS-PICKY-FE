import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import useFocus from "../../../../components/hooks/useFocus";
import { Text } from "../ui";
import {
  GenderContainer,
  GenderButton,
  GenderWrapper,
  TextWrapper,
} from "./index.styles";

export default function InputGender() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();
  const handleGenderSelect = (gender: string) => {
    setInputData((prev) => ({ ...prev, gender }));
  };

  return (
    <GenderWrapper>
      <Text.TitleMenu300>당신의 성별을 선택해주세요</Text.TitleMenu300>
      <TextWrapper>
        <Text.FocusedMenu $isFocused={isFocused}>성별</Text.FocusedMenu>
      </TextWrapper>
      <GenderContainer>
        <GenderButton
          $isSelected={inputData.gender === "male"}
          onClick={() => handleGenderSelect("male")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          남자
        </GenderButton>
        <GenderButton
          $isSelected={inputData.gender === "female"}
          onClick={() => handleGenderSelect("female")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          여자
        </GenderButton>
      </GenderContainer>
      <TextWrapper>
        <Text.FocusedWarning $isFocused={isFocused}>
          성별을 선택해주세요.
        </Text.FocusedWarning>
      </TextWrapper>
    </GenderWrapper>
  );
}
