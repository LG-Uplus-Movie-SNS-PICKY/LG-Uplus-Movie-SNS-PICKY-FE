import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { NationalityContainer, NationalityButton } from "./index.styles";
import { NationContainer, TextWrapper } from "./index.styles";

// import { NationContainer } from "./index.styles";

export default function InputNationality() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { isFocused, handleFocus, handleBlur } = useFocus();

  const handleNationalitySelect = (nationality: string) => {
    setInputData((prev: IInputData) => ({
      ...prev,
      nationality,
    }));
  };

  return (
    <NationContainer>
      <Text.TitleMenu300>당신의 국적을 선택해주세요</Text.TitleMenu300>
      <TextWrapper>
        <Text.FocusedMenu $isFocused={isFocused}>국적</Text.FocusedMenu>
      </TextWrapper>
      <NationalityContainer>
        <NationalityButton
          $isSelected={inputData.nationality === "domestic"}
          onClick={() => handleNationalitySelect("domestic")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          내국인
        </NationalityButton>
        <NationalityButton
          $isSelected={inputData.nationality === "foreigner"}
          onClick={() => handleNationalitySelect("foreigner")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          외국인
        </NationalityButton>
      </NationalityContainer>

      <TextWrapper>
        <Text.FocusedWarning $isFocused={isFocused}>
          국적을 선택해주세요.
        </Text.FocusedWarning>
      </TextWrapper>
    </NationContainer>
  );
}
