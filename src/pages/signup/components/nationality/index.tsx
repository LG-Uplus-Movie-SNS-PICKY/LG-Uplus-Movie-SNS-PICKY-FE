import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Block, Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import {NationalityContainer, NationalityButton} from "./index.styles"

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
    <Block.FlexBox $width="20%" $direction="column" $gap="10px">
      <Text.FocusedMenu $isFocused={isFocused}>국적</Text.FocusedMenu>
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

      <Text.FocusedWarning $isFocused={isFocused}>
        국적을 선택해주세요.
      </Text.FocusedWarning>
    </Block.FlexBox>
  );
}