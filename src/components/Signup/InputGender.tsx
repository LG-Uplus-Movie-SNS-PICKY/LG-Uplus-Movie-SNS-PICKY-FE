import { useRecoilState } from "recoil";
import { inputState } from "../../review/atoms";
import useFocus from "../hooks/useFocus";
import { Block, Text } from "../../styles/ui";
import styled from "styled-components";

// 스타일 정의
const GenderContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 67px;
  border: 2px solid ${({ isSelected }) => (isSelected ? "red" : "#d9d9d9")};
  background-color: #ffffff;
  color: ${({ isSelected }) => (isSelected ? "##FF084A" : "#d9d9d9")};
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;
`;

export default function InputGender() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();
  // const { isFocused} = useFocus();

  const handleGenderSelect = (gender: string) => {
    setInputData((prev) => ({ ...prev, gender }));
  };

  return (
    <Block.FlexBox width="20%" direction="column" gap="10px">
      <Text.FocusedMenu isFocused={isFocused}>성별</Text.FocusedMenu>
      <GenderContainer>
        <GenderButton
          isSelected={inputData.gender === "male"}
          onClick={() => handleGenderSelect("male")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          남자
        </GenderButton>
        <GenderButton
          isSelected={inputData.gender === "female"}
          onClick={() => handleGenderSelect("female")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          여자
        </GenderButton>
      </GenderContainer>
      <Text.FocusedWarning isFocused={isFocused}>
        성별을 선택해주세요.
      </Text.FocusedWarning>
    </Block.FlexBox>
  );
}
