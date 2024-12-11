/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { inputState } from "../../review/atoms";
import BackButtonIcon from "@assets/icons/back_button_red.svg?react";
import { Button, Text } from "../../styles/ui";
import { Toast } from "@stories/toast";
import { validateField } from "../../util/validator";
import {
  InputUserName,
  InputBirthDate,
  InputNickname,
  InputGender,
  InputNationality,
  InputConsentForm,
  InputProfile,
  InputFavoriteGenre,
  InputFavoriteMovie,
} from "./components";
import {
  progressBarContainer,
  progressStyle,
  responsiveButtonWrapper,
  wrapper,
  slideDesign,
  backWrapper,
  backButtonStyle,
  slideWrapper,
  slideContent,
} from "./index.styles";
import SEO from "@components/seo";

export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [step, setStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        components: [<InputUserName key="name" />],
        requiredFields: ["name"],
        fieldMessages: ["이름을 올바르게 입력해주세요."],
      },
      {
        components: [
          <InputNickname key="nickname" onValidChange={setIsNicknameValid} />,
        ],
        requiredFields: ["nickname"],
        fieldMessages: ["닉네임을 올바르게 입력해주세요."],
      },
      {
        components: [<InputBirthDate key="birthDate" />],
        requiredFields: ["birthDate"],
        fieldMessages: ["생년월일을 올바르게 입력해주세요."],
      },
      {
        components: [<InputGender key="gender" />],
        requiredFields: ["gender"],
        fieldMessages: ["성별을 선택해주세요."],
      },
      {
        components: [<InputNationality key="nationality" />],
        requiredFields: ["nationality"],
        fieldMessages: ["국적을 선택해주세요."],
      },
      {
        components: [<InputProfile key="profile" />],
        requiredFields: ["profileImage"],
        fieldMessages: ["프로필 이미지를 선택해주세요."],
      },
      {
        components: [<InputFavoriteGenre key="favoriteGenres" />],
        requiredFields: ["favoriteGenres"],
        fieldMessages: ["최소 3개, 최대 5개의 장르를 선택해주세요."],
      },
      {
        components: [<InputFavoriteMovie key="favoriteMovie" />],
        requiredFields: ["favoriteMovie"],
        fieldMessages: ["최소 5개, 최대 15개의 영화를 선택해주세요."],
      },
      {
        components: [<InputConsentForm key="consent" />],
        requiredFields: ["consentAll", "consentAge"],
        fieldMessages: ["필수 약관에 동의해주세요."],
      },
    ],
    []
  );

  const isStepValid = useCallback(() => {
    const requiredFields = steps[step].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof typeof inputData];
      return validateField(field, value, { isNicknameValid });
    });
  }, [steps, step, inputData, isNicknameValid]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleNextStep = useCallback(() => {
    if (isStepValid()) {
      setStep((prev) => prev + 1);
    } else {
      showToast(steps[step]?.fieldMessages?.[0] || "조건을 충족해주세요.");
    }
  }, [isStepValid, steps, step, showToast]);

  const handleBackStep = useCallback(() => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleComplete = useCallback(async () => {
    if (!isStepValid()) {
      showToast(steps[step]?.fieldMessages?.[0] || "조건을 충족해주세요.");
      return;
    }

    const payload = {
      name: inputData.name,
      nickname: inputData.nickname,
      profile_url: inputData.profileImage,
      birthdate: inputData.birthDate,
      gender: inputData.gender,
      nationality: inputData.nationality,
      movieId: inputData.favoriteMovie || [],
      genreId: inputData.favoriteGenres || [],
    };

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인 해주세요.");
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("회원가입 성공:", response.data);

      showToast("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      showToast("회원가입 요청 중 오류가 발생했습니다.");
    }
  }, [isStepValid, inputData, navigate, showToast, step, steps]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !toastMessage) {
        if (step === steps.length - 1) {
          handleComplete();
        } else {
          handleNextStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [step, handleNextStep, handleComplete, toastMessage, steps.length]);

  return (
    <>
      <SEO title="PICKY: 회원가입" />

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
              <div css={slideDesign} key={index}>
                {stepData.components}
              </div>
            ))}
          </div>
        </div>

        {toastMessage && <Toast message={toastMessage} />}
        <div css={responsiveButtonWrapper}>
          <Button.Confirm
            onClick={
              step === steps.length - 1 ? handleComplete : handleNextStep
            }
            $isDisabled={!isStepValid()}
            style={{ maxWidth: "768px", width: "100%", fontSize: "16px" }}
          >
            <Text.TitleMenu300 color="White" style={{ fontSize: "16px" }}>
              {step === steps.length - 1 ? "완료" : "다음"}
            </Text.TitleMenu300>
          </Button.Confirm>
        </div>
      </div>
    </>
  );
}
