/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { validateAge } from "./utils/index";
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
import SEO from "@components/seo";

export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [step, setStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      { components: [<InputUserName key="name" />], requiredFields: ["name"] },
      {
        components: [<InputBirthDate key="birthDate" />],
        requiredFields: ["birthDate"],
      },

      {
        components: [<InputGender key="gender" />],
        requiredFields: ["gender"],
      },
      {
        components: [<InputNationality key="nationality" />],
        requiredFields: ["nationality"],
      },
      {
        components: [<InputProfile key="profile" />],
        requiredFields: ["profileImage"],
      },
      {
        components: [<InputConsentForm key="consent" />],
        requiredFields: ["consentAll", "consentAge"],
      },
      {
        components: [<InputFavoriteGenre key="favoriteGenres" />],
        requiredFields: ["favoriteGenres"],
      },
      {
        components: [<InputFavoriteMovie key="favoriteMovie" />],
        requiredFields: ["favoriteMovie"],
      },
      {
        components: [
          <InputNickname key="nickname" onValidChange={setIsNicknameValid} />,
        ],
        requiredFields: ["nickname"],
      },
    ],
    []
  );

  const isStepValid = useCallback(() => {
    const requiredFields = steps[step].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof typeof inputData];
      if (field === "name")
        return (
          typeof value === "string" && value.length >= 2 && value.length <= 10
        );
      if (field === "profilePicture")
        return typeof value === "string" && value.trim() !== "";
      if (field === "nickname") return isNicknameValid;
      if (field === "birthDate") {
        const isValid = typeof value === "string" && validateAge(value);
        return isValid;
      }
      if (field === "favoriteGenres")
        return Array.isArray(value) && value.length > 2 && value.length < 6;
      if (field === "favoriteMovie")
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      return field === "consentAll" || field === "consentAge"
        ? value === true
        : !!value?.toString().trim();
    });
  }, [steps, step, inputData, isNicknameValid]);

  const handleNextStep = useCallback(() => {
    if (isStepValid() && step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      const stepMessages = [
        "이름을 올바르게 입력해주세요.",
        "생년월일을 올바르게 입력해주세요.",
        "성별을 선택해주세요.",
        "국적을 선택해주세요.",
        "프로필 이미지를 선택해주세요.",
        "필수 약관에 동의해주세요.",
        "최소 3개, 최대 5개의 장르를 선택해주세요.",
        "최소 5개, 최대 15개의 영화를 선택해주세요.",
        "닉네임을 올바르게 입력해주세요.",
      ];

      setToastMessage(stepMessages[step] || "조건을 충족해주세요.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [isStepValid, step, steps.length]);

  const handleBackStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = useCallback(async () => {
    const isValid = Object.keys(inputData).every((key) => {
      const value = inputData[key as keyof typeof inputData];

      if (key === "name") {
        return typeof value === "string" && value.length > 1;
      }

      if (key === "nickname") {
        return isNicknameValid;
      }

      if (key === "profileImage") {
        return typeof value === "string" && value.trim() !== "";
      }

      if (key === "favoriteGenres") {
        return Array.isArray(value) && value.length > 0 && value.length < 6;
      }

      if (key === "favoriteMovie") {
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      }

      if (key === "consentAll" || key === "consentAge") {
        return value === true;
      }

      if (key === "birthDate") {
        const isValidDate = typeof value === "string" && validateAge(value);

        return isValidDate;
      }

      return typeof value === "string" ? value.trim() !== "" : !!value;
    });

    if (isValid) {
      const payload = {
        name: inputData.name,
        nickname: inputData.nickname,
        profile_url: inputData.profileImage,
        birthdate: inputData.birthDate,
        gender: inputData.gender.toUpperCase(),
        nationality: inputData.nationality.toUpperCase(),
        movieId: inputData.favoriteMovie || [],
        genreId: inputData.favoriteGenres || [],
      };

      console.log(payload);

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

        setToastMessage("회원가입이 완료되었습니다!");
        setTimeout(() => setToastMessage(null), 3000);

        navigate("/");
      } catch (error) {
        console.error("회원가입 요청 중 오류 발생:", error);
        setToastMessage("회원가입 요청 중 오류가 발생했습니다.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } else {
      setToastMessage("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [inputData, isNicknameValid, navigate]);

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
              <div
                key={index}
                style={{
                  width: "100%",
                  height: "100%",
                  alignContent: "center",
                }}
              >
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
