/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import {
  birthDateContainer,
  pickerContainer,
  pickerColumn,
  strokeOverlay,
  monthPickerColumn,
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

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from(
    { length: new Date(selectedYear, selectedMonth, 0).getDate() },
    (_, i) => i + 1
  );

  useEffect(() => {
    const formattedMonth = String(selectedMonth).padStart(2, "0");
    const formattedDay = String(selectedDay).padStart(2, "0");
    const birthDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;
    setInputData((prev) => ({ ...prev, birthDate }));
  }, [selectedYear, selectedMonth, selectedDay, setInputData]);

  return (
    <div css={birthDateContainer}>
      <Text.TitleMenu300>당신의 생년월일을 선택해주세요</Text.TitleMenu300>
      <div css={pickerContainer}>
        <div css={pickerColumn}>
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
            >
              {year}년
            </div>
          ))}
        </div>
        <div css={pickerColumn}>
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
            >
              {month}월
            </div>
          ))}
        </div>
        <div css={pickerColumn}>
          {days.map((day) => (
            <div
              key={day}
              css={[
                pickerItem,
                day === selectedDay && { fontWeight: "bold", color: "#ff084a" },
              ]}
              onClick={() => setSelectedDay(day)}
            >
              {day}일
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
