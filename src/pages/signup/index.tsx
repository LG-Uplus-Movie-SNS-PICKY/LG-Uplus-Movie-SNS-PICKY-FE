/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { inputState } from "../../review/atoms";
import { useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import InputBirthDate from "../../components/Signup/InputBirthDate";
import InputNickname from "../../components/Signup/InputNickName";
import InputEmail from "../../components/Signup/InputEmail";
import InputGender from "../../components/Signup/InputGender";
import InputNationality from "../../components/Signup/InputNationality";
import { IInputData } from "../../review/atoms";
import { PickyLogo } from "../../assets/svg";
import { Block, Button, Text } from "../../styles/ui";
import InputConsentForm from "../../components/Signup/InputConsentForm";

export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState); // 상태 관리
  const [step, setStep] = useState(1); // 현재 단계 관리

  // 단계별 설정
  const steps: {
    title: string;
    // subtitle: string;
    components: JSX.Element[];
    requiredFields: (keyof IInputData)[];
  }[] = [
    {
      title: "당신의 이름을 입력해주세요",
      // subtitle: "입력해주세요",
      components: [<InputUserName key="name" />],
      requiredFields: ["name"],
    },
    {
      title: "닉네임을 입력해주세요",
      // subtitle: "입력해주세요",
      components: [<InputNickname key="nickname" />],
      requiredFields: ["nickname"],
    },
    {
      title: "생년월일을 입력해주세요",
      // subtitle: "입력해주세요",
      components: [<InputBirthDate key="birthDate" />],
      requiredFields: ["birthDate"],
    },
    {
      title: "이메일을 입력해주세요",
      // subtitle: "입력해주세요",
      components: [<InputEmail key="email" />],
      requiredFields: ["email"],
    },
    {
      title: "성별을 선택해주세요",
      // subtitle: "",
      components: [<InputGender key="gender" />],
      requiredFields: ["gender"],
    },
    {
      title: "내국인/외국인을 선택해주세요",
      // subtitle: "선택해주세요",
      components: [<InputNationality key="nationality" />],
      requiredFields: ["nationality"],
    },
    {
      title: "",
      // subtitle: "선택해주세요",
      components: [<InputConsentForm key="consent" />],
      requiredFields: ["consentAll", "consentAge"],
    },
  ];

  // 유효성 검사
  const isStepValid = () => {
    const requiredFields = steps[step - 1].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof IInputData];
      // Boolean 필드 확인
      if (field === "consentAll" || field === "consentAge") {
        return value === true; // 필수 동의 확인
      }
      // 문자열 필드 확인
      return typeof value === "string" ? value.trim() !== "" : value !== null;
    });
  };

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (isStepValid()) {
      setStep((prev) => prev + 1);
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  // 완료 처리 및 데이터 로그
  const handleComplete = () => {
    console.log("Final Input Data:", inputData);

    const isValid = Object.keys(inputData).every((key) => {
      const value = inputData[key as keyof IInputData];
      return typeof value === "string" ? value.trim() !== "" : value !== null;
    });

    if (isValid) {
      alert("회원가입이 완료되었습니다!");
    } else {
      alert("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
    }
  };

  const { title, components } = steps[step - 1];

  return (
    <Block.FlexBox
      width="100%"
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="34px"
    >
      {/* 로고 및 플랫폼 소개 */}
      {/* <Text.TitleMenu100>회원가입</Text.TitleMenu100> */}
      <Text.TitleMenu300>회원가입</Text.TitleMenu300>
      <PickyLogo width={231} height={83} />

      {/* 단계별 입력 컴포넌트 */}
      <Block.FlexBox
        width="100%"
        height="auto"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap="20px"
      >
        <Text.TitleMenu100>{title}</Text.TitleMenu100>
        {/* <Text.Subtitle>{subtitle}</Text.Subtitle> */}
        {components.map((component) => component)}
      </Block.FlexBox>

      {/* 단계별 버튼 */}
      <Button.Confirm
        onClick={step === steps.length ? handleComplete : handleNextStep}
        isDisabled={!isStepValid()}
      >
        <Text.TitleMenu300 color="White">
          {step === steps.length ? "완료" : "다음"}
        </Text.TitleMenu300>
      </Button.Confirm>
    </Block.FlexBox>
  );
}
