/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { validateAge } from "../../../../util/validator";
import {
  birthDateContainer,
  pickerContainer,
  TextWrapper,
  pickerColumn,
  pickerItem,
} from "./index.styles";
import { Text } from "../ui";

export default function InputBirthDate() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [isValid, setIsValid] = useState(true);

  const years = useMemo(
    () => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
    []
  );
  const days = useMemo(
    () =>
      Array.from(
        { length: new Date(selectedYear, selectedMonth, 0).getDate() },
        (_, i) => i + 1
      ),
    [selectedYear, selectedMonth]
  );

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const formattedDay = String(selectedDay).padStart(2, "0");
    const birthDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;
  
    const isValidAge = validateAge(birthDate);
  
    setIsValid(isValidAge);
  
    setInputData((prev) => ({
      ...prev,
      birthDate: isValidAge ? birthDate : "",
    }));
  }, [selectedYear, selectedMonth, selectedDay, setInputData]);

  useEffect(() => {
    const scrollToCenter = (
      ref: React.RefObject<HTMLDivElement>,
      index: number
    ) => {
      if (ref.current) {
        const itemHeight =
          ref.current.firstElementChild instanceof HTMLElement
            ? ref.current.firstElementChild.offsetHeight
            : 0;
        const containerHeight = ref.current.clientHeight;

        ref.current.scrollTo({
          top: index * itemHeight - containerHeight / 2 + itemHeight / 2,
          behavior: "smooth",
        });
      }
    };

    scrollToCenter(yearRef, years.indexOf(selectedYear));
    scrollToCenter(monthRef, months.indexOf(selectedMonth));
    scrollToCenter(dayRef, days.indexOf(selectedDay));
  }, [selectedYear, years, selectedMonth, months, selectedDay, days]);

  return (
    <div css={birthDateContainer}>
      <Text.TitleMenu300>당신의 생년월일을 선택해주세요</Text.TitleMenu300>
      <div css={pickerContainer}>
        <div css={pickerColumn} ref={yearRef}>
          {years.map((year) => (
            <div
              key={year}
              css={[
                pickerItem,
                year === selectedYear && {
                  fontWeight: "bold",
                  color: "#ff084a",
                },
              ]}
              onClick={() => setSelectedYear(year)}
              tabIndex={0}
            >
              {year}년
            </div>
          ))}
        </div>
        <div css={pickerColumn} ref={monthRef}>
          {months.map((month) => (
            <div
              key={month}
              css={[
                pickerItem,
                month === selectedMonth && {
                  fontWeight: "bold",
                  color: "#ff084a",
                },
              ]}
              onClick={() => setSelectedMonth(month)}
              tabIndex={0}
            >
              {month}월
            </div>
          ))}
        </div>
        <div css={pickerColumn} ref={dayRef}>
          {days.map((day) => (
            <div
              key={day}
              css={[
                pickerItem,
                day === selectedDay && { fontWeight: "bold", color: "#ff084a" },
              ]}
              onClick={() => setSelectedDay(day)}
              tabIndex={0}
            >
              {day}일
            </div>
          ))}
        </div>
      </div>
      <div css={TextWrapper} style={{ height: "20px" }}>
        <Text.FocusedWarning
          $isFocused={!isValid}
          style={{
            visibility: isValid ? "hidden" : "visible",
            color: "#ff084a",
          }}
        >
          만 14세 이상만 사용할 수 있습니다.
        </Text.FocusedWarning>
      </div>
    </div>
  );
}
