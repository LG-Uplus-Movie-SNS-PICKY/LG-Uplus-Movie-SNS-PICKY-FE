import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { Unchecked, Checked } from "../../../../assets/svg";
import {
  ConsentWrapper,
  ConsentContainer,
  CustomCheckbox,
  ConsentText,
} from "./index.styles";

export default function InputConsentForm() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused } = useFocus();

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
    <ConsentWrapper>
      <Text.TitleMenu300>이용 약관에 동의해주세요</Text.TitleMenu300>
      <ConsentContainer
        $isChecked={!!inputData.consentAll}
        onClick={toggleConsentAll}
      >
        <CustomCheckbox $isChecked={!!inputData.consentAll}>
          {inputData.consentAll ? <Checked /> : <Unchecked />}
        </CustomCheckbox>
        <ConsentText>
          [필수] <span>인증 약관 전체 동의</span>
        </ConsentText>
      </ConsentContainer>

      <ConsentContainer
        $isChecked={!!inputData.consentAge}
        onClick={toggleConsentAge}
      >
        <CustomCheckbox $isChecked={!!inputData.consentAge}>
          {inputData.consentAge ? <Checked /> : <Unchecked />}
        </CustomCheckbox>
        <ConsentText>
          [필수] <span>만 14세 이상입니다.</span>
        </ConsentText>
      </ConsentContainer>
      <Text.FocusedWarning $isFocused={isFocused}>
        필수 약관에 모두 동의 해주세요.
      </Text.FocusedWarning>
    </ConsentWrapper>
  );
}
