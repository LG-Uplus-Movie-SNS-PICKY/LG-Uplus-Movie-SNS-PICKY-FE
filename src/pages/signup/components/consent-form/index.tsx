import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { Checked, Unchecked } from "@assets/svg";

import {
  consentWrapper,
  consentContainer,
  customCheckbox,
  consentText,
} from "./index.styles";

export default function InputConsentForm() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const toggleConsentAll = () => {
    setInputData((prev: IInputData) => ({
      ...prev,
      consentAll: !prev.consentAll,
    }));
  };

  const toggleConsentAge = () => {
    setInputData((prev: IInputData) => ({
      ...prev,
      consentAge: !prev.consentAge,
    }));
  };

  return (
    <div css={consentWrapper}>
      <Text.TitleMenu300>이용 약관에 동의해주세요</Text.TitleMenu300>

      <div
        css={consentContainer(!!inputData.consentAll)}
        onClick={toggleConsentAll}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div css={customCheckbox}>
          {inputData.consentAll ? <Checked /> : <Unchecked />}
        </div>
        <span css={consentText}>
          [필수] <span>인증 약관 전체 동의</span>
        </span>
      </div>

      <div
        css={consentContainer(!!inputData.consentAge)}
        onClick={toggleConsentAge}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div css={customCheckbox}>
          {inputData.consentAge ? <Checked /> : <Unchecked />}
        </div>
        <span css={consentText}>
          [필수] <span>만 14세 이상입니다.</span>
        </span>
      </div>

      <Text.FocusedWarning $isFocused={isFocused}>
        필수 약관에 모두 동의 해주세요.
      </Text.FocusedWarning>
    </div>
  );
}
