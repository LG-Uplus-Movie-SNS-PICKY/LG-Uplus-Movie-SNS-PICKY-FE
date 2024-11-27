import useFocus from "../../../../components/hooks/useFocus";
import { Input, Text } from "../ui";
import { useState, useEffect } from "react";
import { validateMonth, validateDay } from "../../../../util/validator";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { BirthDateContainer, BirthDate, TextWrapper } from "./index.styles";

export default function InputBirthDate() {
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [inputData, setInputData] = useRecoilState(inputState);

  const { isFocused, handleFocus, handleBlur } = useFocus();

  useEffect(() => {
    if (inputData.birthDate) {
      const [year, month, day] = inputData.birthDate.split("-");
      setBirthYear(year);
      setBirthMonth(month.startsWith("0") ? month.slice(1) : month);
      setBirthDay(day.startsWith("0") ? day.slice(1) : day);
    }
  }, [inputData.birthDate]);

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setBirthYear(value);
    }
  };

  const handleBirthMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (value.length <= 2 && validateMonth(value))) {
      setBirthMonth(value);
    }
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (value.length <= 2 && validateDay(value, birthMonth, birthYear))
    ) {
      setBirthDay(value);
    }
  };

  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const formattedMonth = birthMonth.padStart(2, "0");
      const formattedDay = birthDay.padStart(2, "0");
      const birthDate = `${birthYear}-${formattedMonth}-${formattedDay}`;
      setInputData((prev) => ({ ...prev, birthDate }));
    } else {
      setInputData((prev) => ({ ...prev, birthDate: "" }));
    }
  }, [birthYear, birthMonth, birthDay, setInputData]);

  return (
    <>
      <BirthDateContainer>
        <Text.TitleMenu300>당신의 생년월일을 입력해주세요</Text.TitleMenu300>
        <TextWrapper>
          <Text.FocusedMenu $isFocused={isFocused}>생년월일</Text.FocusedMenu>
        </TextWrapper>
        <BirthDate>
          <Input.BirthBox
            type="text"
            value={birthYear}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleBirthYearChange}
            placeholder="년도"
          />
          <Input.BirthBox
            type="text"
            value={birthMonth}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleBirthMonthChange}
            placeholder="월"
          />
          <Input.BirthBox
            type="text"
            value={birthDay}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleBirthDayChange}
            placeholder="일"
          />
        </BirthDate>
        <TextWrapper>
          <Text.FocusedWarning $isFocused={isFocused}>
            생년월일을 정확하게 입력해주세요
          </Text.FocusedWarning>
        </TextWrapper>
      </BirthDateContainer>
    </>
  );
}
