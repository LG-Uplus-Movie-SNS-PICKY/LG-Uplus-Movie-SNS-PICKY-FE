import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../review/atoms"; // IInputData 타입 import
import { Block, Text } from "../../styles/ui";
import useFocus from "../hooks/useFocus";
import styled from "styled-components";

// 스타일 정의
const NationalityContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const NationalityButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 60px;
  border: 2px solid ${({ isSelected }) => (isSelected ? "red" : "#d9d9d9")};
  background-color: #ffffff;
  color: ${({ isSelected }) => (isSelected ? "##FF084A" : "#d9d9d9")};
  font-size: 16px;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  border-radius: 10px;
  cursor: pointer;
  outline: none;

  /* &:hover {
    border-color: ${({ isSelected }) => (isSelected ? "darkred" : "#b3b3b3")};
  } */
`;

export default function InputNationality() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused,handleFocus, handleBlur} = useFocus();

  const handleNationalitySelect = (nationality: string) => {
    setInputData((prev: IInputData) => ({
      ...prev,
      nationality,
    }));
  };

  return (
    <Block.FlexBox width="20%" direction="column" gap="10px">
      {/* 국적 입력 라벨 */}
      <Text.FocusedMenu isFocused={isFocused}>국적</Text.FocusedMenu>

      {/* 국적 선택 버튼 */}
      <NationalityContainer>
        <NationalityButton
          isSelected={inputData.nationality === "domestic"}
          onClick={() => handleNationalitySelect("domestic")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          내국인
        </NationalityButton>
        <NationalityButton
          isSelected={inputData.nationality === "foreigner"}
          onClick={() => handleNationalitySelect("foreigner")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          외국인
        </NationalityButton>
      </NationalityContainer>

      {/* 경고 메시지 */}
      <Text.FocusedWarning isFocused={isFocused}>
        국적을 선택해주세요.
      </Text.FocusedWarning>
    </Block.FlexBox>
  );
}