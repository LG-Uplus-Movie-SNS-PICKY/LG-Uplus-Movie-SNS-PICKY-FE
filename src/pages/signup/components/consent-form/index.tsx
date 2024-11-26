import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Block, Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { Unchecked, Checked } from "../../../../assets/svg";
import {ConsentContainer, CustomCheckbox, ConsentText} from "./index.styles"

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
    <Block.FlexBox $width="20%" $direction="column" $gap="10px">
 <Text.FocusedMenu $isFocused={isFocused}>이용약관</Text.FocusedMenu>
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
    </Block.FlexBox>
  );
}
