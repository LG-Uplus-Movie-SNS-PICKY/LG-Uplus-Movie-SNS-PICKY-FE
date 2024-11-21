import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../review/atoms"; // IInputData 타입 import
import styled from "styled-components";
import { Block, Text } from "../../styles/ui";
import { Checked } from "../../assets/svg";
import useFocus from "../hooks/useFocus";
import { Unchecked } from "../../assets/svg";

// 스타일 정의
const ConsentContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ $isChecked }) => ($isChecked ? "#ff084a" : "#d9d9d9")};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #ffffff;
  cursor: pointer;
  max-width: 400px;
`;

const CustomCheckbox = styled.div<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;

`;

const ConsentText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #ff084a;

  & > span {
    font-size: 14px;
    font-weight: normal;
    color: #333333; /* 회색 텍스트 */
  }
`;

export default function InputConsentForm() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused } = useFocus();

  const toggleConsentAll = () => {
    setInputData((prev: IInputData) => ({
      ...prev,
      consentAll: !prev.consentAll, // 'consentAll' 상태 반전
    }));
  };

  const toggleConsentAge = () => {
    setInputData((prev: IInputData) => ({
      ...prev,
      consentAge: !prev.consentAge, // 'consentAge' 상태 반전
    }));
  };

  return (
    <Block.FlexBox width="20%" direction="column" gap="10px">
      <Text.FocusedMenu isFocused={isFocused}>이용약관</Text.FocusedMenu>
      <ConsentContainer
        $isChecked={!!inputData.consentAll}
        onClick={toggleConsentAll}
      >
        <CustomCheckbox isChecked={!!inputData.consentAll}>
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
        <CustomCheckbox isChecked={!!inputData.consentAge}>
          {inputData.consentAge ? <Checked /> : <Unchecked />}
        </CustomCheckbox>
        <ConsentText>
          [필수] <span>만 14세 이상입니다.</span>
        </ConsentText>
      </ConsentContainer>
      <Text.FocusedWarning isFocused={isFocused}>
        필수 약관에 모두 동의 해주세요.
      </Text.FocusedWarning>
    </Block.FlexBox>
  );
}
