/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import useFocus from "../../../../components/hooks/useFocus";
import { Text } from "../ui";
import {
  genderContainer,
  genderButton,
  genderWrapper,
  textWrapper,
} from "./index.styles";

export default function InputGender() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleGenderSelect = (gender: string) => {
    setInputData((prev) => ({ ...prev, gender }));
  };

  return (
    <div css={genderWrapper}>
      <Text.TitleMenu300>당신의 성별을 선택해주세요</Text.TitleMenu300>
      <div css={textWrapper}>
        <Text.FocusedMenu $isFocused={isFocused}>성별</Text.FocusedMenu>
      </div>
      <div css={genderContainer}>
        <button
          css={genderButton(inputData.gender === "MALE")}
          onClick={() => handleGenderSelect("MALE")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          남자
        </button>
        <button
          css={genderButton(inputData.gender === "FEMALE")}
          onClick={() => handleGenderSelect("FEMALE")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          여자
        </button>
      </div>
    </div>
  );
}
