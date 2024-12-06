import { useRecoilState } from "recoil";
import { inputState, IInputData } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect } from "react";
import { Checked, Unchecked } from "@assets/svg";

import {
  consentWrapper,
  consentContainer,
  customCheckbox,
  consentText,
} from "./index.styles";

export default function InputConsentForm() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const { handleFocus, handleBlur } = useFocus();
  const [isValid, setIsValid] = useState(true); // 유효성 상태 추가

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

  // 유효성 검사 로직
  useEffect(() => {
    setIsValid(inputData.consentAll && inputData.consentAge);
  }, [inputData.consentAll, inputData.consentAge]);

  return (
    <div css={consentWrapper}>
      <Text.TitleMenu300>이용 약관에 동의해주세요</Text.TitleMenu300>

      <div
        css={consentContainer(!!inputData.consentAll)}
        onClick={toggleConsentAll}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
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
        tabIndex={0}
      >
        <div css={customCheckbox}>
          {inputData.consentAge ? <Checked /> : <Unchecked />}
        </div>
        <span css={consentText}>
          [필수] <span>만 14세 이상입니다.</span>
        </span>
      </div>

      <div
        style={{
          color: isValid ? "transparent" : "#FF084A",
          minHeight: "20px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        필수 약관에 모두 동의 해주세요.
      </div>
    </div>
  );
}