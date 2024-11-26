/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { inputState } from "../../review/atoms";
import { useState } from "react";
import InputUserName from "../Signup/components/user-name";
import InputBirthDate from "../Signup/components/birth-date";
import InputNickname from "../Signup/components/nick-name";
import InputEmail from "./components/e-mail";
import InputGender from "../Signup/components/gender";
import InputNationality from "../Signup/components/nationality";
import InputConsentForm from "../Signup/components/consent-form";
import InputProfile from "../Signup/components/profile";
import InputFavoriteGenre from "../Signup/components/favorite-genre";
import InputFavoriteMovie from "../Signup/components/favorite-movie";
import { IInputData } from "../../review/atoms";
import { PickyLogo } from "../../assets/svg";
import { Block, Button, Text } from "../../styles/ui";
import {ProgressBarContainer, Progress, ResponsiveFlexBox, ResponsiveButtonWrapper, BackButton} from "./index.styles"


export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "약관의 동의해 주세요",
      components: [<InputConsentForm key="consent" />],
      requiredFields: ["consentAll", "consentAge"],
    },
    {
      title: "당신의 이름을 입력해주세요",
      components: [<InputUserName key="name" />],
      requiredFields: ["name"],
    },
    {
      title: "닉네임을 입력해주세요",
      components: [<InputNickname key="nickname" />],
      requiredFields: ["nickname"],
    },
    {
      title: "생년월일을 입력해주세요",
      components: [<InputBirthDate key="birthDate" />],
      requiredFields: ["birthDate"],
    },
    {
      title: "이메일을 입력해주세요",
      components: [<InputEmail key="email" />],
      requiredFields: ["email"],
    },
    {
      title: "성별을 선택해주세요",
      components: [<InputGender key="gender" />],
      requiredFields: ["gender"],
    },
    {
      title: "내국인/외국인을 선택해주세요",
      components: [<InputNationality key="nationality" />],
      requiredFields: ["nationality"],
    },
    {
      title: "",
      components: [<InputProfile key="profile" />],
      requiredFields: ["profileImage"],
    },
    {
      title: "",
      components: [<InputFavoriteGenre key="favoriteGenres" />],
      requiredFields: ["favoriteGenres"],
    },
    {
      title: "",
      components: [<InputFavoriteMovie key="favoriteMovie" />],
      requiredFields: ["favoriteMovie"],
    },
  ];

  const isStepValid = () => {
    const requiredFields = steps[step - 1].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof IInputData];
      if (field === "profilePicture") {
        return typeof value === "string" && value.trim() !== "";
      }
      if (field === "favoriteGenres") {
        return Array.isArray(value) && value.length > 0;
      }
      if (field === "favoriteMovie") {
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      }
      return field === "consentAll" || field === "consentAge"
        ? value === true
        : typeof value === "string"
        ? value.trim() !== ""
        : value !== null;
    });
  };

  const handleNextStep = () => {
    if (isStepValid()) setStep((prev) => prev + 1);
    else alert("모든 필드를 입력해주세요.");
  };

  const handleBackStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    const isValid = Object.keys(inputData).every((key) => {
      const value = inputData[key as keyof IInputData];
      if (key === "profileImage") {
        return typeof value === "string" && value.trim() !== "";
      }
      if (key === "favoriteGenres") {
        return Array.isArray(value) && value.length > 0;
      }
      if (key === "favoriteMovie") {
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      }
      return typeof value === "string" ? value.trim() !== "" : value !== null;
    });

    if (isValid) {
      alert("회원가입이 완료되었습니다!");
      console.log("회원가입 데이터:", inputData);
    } else {
      alert("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
    }
  };

  const { title, components } = steps[step - 1];

  return (
    <Block.FlexBox
      $direction="column"
      $alignItems="center"
      $justifyContent="flex-start"
      $gap="20px"
    >
      <ProgressBarContainer>
        <Progress progress={(step / steps.length) * 100} />
      </ProgressBarContainer>

      {step > 1 && <BackButton onClick={handleBackStep}>뒤로</BackButton>}
            <PickyLogo width={99} height={35} />
      <Text.TitleMenu100>회원가입 페이지</Text.TitleMenu100>


      <ResponsiveFlexBox
        $width="100%"
        $height="auto"
        $justifyContent="center"
        $alignItems="center"
        $direction="column"
        $gap="10px"
      >
        <Text.TitleMenu100>{title}</Text.TitleMenu100>
        {components.map((component) => component)}
      </ResponsiveFlexBox>
      <ResponsiveButtonWrapper>
        <Button.Confirm
          onClick={step === steps.length ? handleComplete : handleNextStep}
          $isDisabled={!isStepValid()}
          style={{
            width: "361px",
            height: "51px",
          }}
        >
          <Text.TitleMenu300 color="White">
            {step === steps.length ? "완료" : "다음"}
          </Text.TitleMenu300>
        </Button.Confirm>
      </ResponsiveButtonWrapper>
    </Block.FlexBox>
  );
}