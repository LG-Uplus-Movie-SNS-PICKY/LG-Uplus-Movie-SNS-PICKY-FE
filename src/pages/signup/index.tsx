/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../review/atoms";
import InputUserName from "./components/user-name";
import InputBirthDate from "./components/birth-date";
import InputNickname from "./components/nick-name";
import InputGender from "./components/gender";
import InputNationality from "./components/nationality";
import InputConsentForm from "./components/consent-form";
import InputProfile from "./components/profile";
import InputFavoriteGenre from "./components/favorite-genre";
import InputFavoriteMovie from "./components/favorite-movie";
import BackButtonIcon from "@assets/icons/back_button_red.svg?react";
import { Button, Text } from "../../styles/ui";
import { Toast } from "@stories/toast";
import {
  progressBarContainer,
  progressStyle,
  responsiveButtonWrapper,
  wrapper,
  backWrapper,
  backButtonStyle,
  slideWrapper,
  slideContent,
} from "./index.styles";

export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [step, setStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const steps = useMemo(
    () => [
      { components: [<InputUserName key="name" />], requiredFields: ["name"] },
      { components: [<InputNickname key="nickname" />], requiredFields: ["nickname"] },
      { components: [<InputBirthDate key="birthDate" />], requiredFields: ["birthDate"] },
      { components: [<InputGender key="gender" />], requiredFields: ["gender"] },
      { components: [<InputNationality key="nationality" />], requiredFields: ["nationality"] },
      { components: [<InputProfile key="profile" />], requiredFields: ["profileImage"] },
      { components: [<InputFavoriteGenre key="favoriteGenres" />], requiredFields: ["favoriteGenres"] },
      { components: [<InputFavoriteMovie key="favoriteMovie" />], requiredFields: ["favoriteMovie"] },
      { components: [<InputConsentForm key="consent" />], requiredFields: ["consentAll", "consentAge"] },
    ],
    []
  );

  const isStepValid = useCallback(() => {
    const requiredFields = steps[step].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof typeof inputData];
      if (field === "profilePicture") return typeof value === "string" && value.trim() !== "";
      if (field === "favoriteGenres") return Array.isArray(value) && value.length > 2;
      if (field === "favoriteMovie") return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      if (field === "birthDate") {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const today = new Date();
          const fourteenYearsAgo = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
          return new Date(value) <= fourteenYearsAgo;
        }
        return false;
      }
      return field === "consentAll" || field === "consentAge" ? value === true : !!value?.toString().trim();
    });
  }, [steps, step, inputData]);

  const handleNextStep = useCallback(() => {
    if (isStepValid() && step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setToastMessage("모든 조건을 충족해주세요.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [isStepValid, step, steps.length]);
  

  const handleBackStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = useCallback(() => {
    const isValid = Object.keys(inputData).every((key) => {
      const value = inputData[key as keyof typeof inputData];
      if (key === "profileImage") return typeof value === "string" && value.trim() !== "";
      if (key === "favoriteGenres") return Array.isArray(value) && value.length > 0;
      if (key === "favoriteMovie") return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      if (key === "consentAll" || key === "consentAge") return value === true;
      if (key === "birthDate") {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const today = new Date();
          const fourteenYearsAgo = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
          return new Date(value) <= fourteenYearsAgo;
        }
        return false;
      }
      return typeof value === "string" ? value.trim() !== "" : !!value;
    });

    if (isValid) {
      setToastMessage("회원가입이 완료되었습니다!");
      setTimeout(() => setToastMessage(null), 3000); 
      console.log("회원가입 데이터:", inputData);
    } else {
      setToastMessage("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
      setTimeout(() => setToastMessage(null), 3000); // 3초 후 메시지 초기화
    }
  }, [inputData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (step === steps.length - 1) {
          handleComplete();
        } else if (isStepValid()) {
          handleNextStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step, isStepValid, handleNextStep, handleComplete, steps.length]);

  return (
    <div css={wrapper}>
      <div css={backWrapper}>
        <div css={progressBarContainer}>
          <div css={progressStyle(((step + 1) / steps.length) * 100)} />
        </div>
        {step > 0 && (
          <button css={backButtonStyle} onClick={handleBackStep}>
            <BackButtonIcon width="16px" height="16px" />
            <p>뒤로</p>
          </button>
        )}
      </div>

      <div css={slideWrapper}>
        <div css={slideContent(step)}>
          {steps.map((stepData, index) => (
            <div key={index} style={{ width: "100%", height: "100%", alignContent: "center" }}>
              {stepData.components}
            </div>
          ))}
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} />}
      <div css={responsiveButtonWrapper}>
        <Button.Confirm
          onClick={step === steps.length - 1 ? handleComplete : handleNextStep}
          $isDisabled={!isStepValid()}
          style={{ maxWidth: "768px", width: "100%", fontSize: "16px" }}
        >
          <Text.TitleMenu300 color="White" style={{ fontSize: "16px" }}>
            {step === steps.length - 1 ? "완료" : "다음"}
          </Text.TitleMenu300>
        </Button.Confirm>
      </div>
    </div>
  );
}