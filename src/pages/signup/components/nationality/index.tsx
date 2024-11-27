import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import {
  nationalityContainer,
  nationContainer,
  nationalityButton,
  textWrapper,
} from "./index.styles";

// import { NationContainer } from "./index.styles";˝

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
    <div css={nationContainer}>
      <Text.TitleMenu300>당신의 국적을 선택해주세요</Text.TitleMenu300>
      <div css={textWrapper}>
        <Text.FocusedMenu $isFocused={isFocused}>국적</Text.FocusedMenu>
      </div>
      <div css={nationalityContainer}>
        <button css={nationalityButton(inputData.nationality === "domestic")}
          onClick={() => handleNationalitySelect("domestic")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          
        >
          내국인
        </button>
        <button css={nationalityButton(inputData.nationality === "foreigner")}
          onClick={() => handleNationalitySelect("foreigner")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          외국인
        </button>
      </div>

      <div css={textWrapper}>
        <Text.FocusedWarning $isFocused={isFocused}>
          국적을 선택해주세요.
        </Text.FocusedWarning>
      </div>
    </div>
  );
}
