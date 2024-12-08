import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { validateAge } from "../../utils/index";
import { birthDateContainer, pickerContainer, TextWrapper, pickerColumn, pickerItem, } from "./index.styles";
import { Text } from "../ui";
export default function InputBirthDate() {
    const [inputData, setInputData] = useRecoilState(inputState);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [isValid, setIsValid] = useState(true);
    const years = useMemo(() => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i), []);
    const days = useMemo(() => Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => i + 1), [selectedYear, selectedMonth]);
    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);
    useEffect(() => {
        const formattedMonth = String(selectedMonth).padStart(2, "0");
        const formattedDay = String(selectedDay).padStart(2, "0");
        const birthDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;
        const isValidAge = validateAge(birthDate);
        setIsValid(isValidAge);
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { birthDate: isValidAge ? birthDate : "" })));
    }, [selectedYear, selectedMonth, selectedDay, setInputData]);
    useEffect(() => {
        const scrollToCenter = (ref, index) => {
            if (ref.current) {
                const itemHeight = ref.current.firstElementChild instanceof HTMLElement
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
    return (_jsxs("div", { css: birthDateContainer, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uC0DD\uB144\uC6D4\uC77C\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsxs("div", { css: pickerContainer, children: [_jsx("div", { css: pickerColumn, ref: yearRef, children: years.map((year) => (_jsxs("div", { css: [
                                pickerItem,
                                year === selectedYear && {
                                    fontWeight: "bold",
                                    color: "#ff084a",
                                },
                            ], onClick: () => setSelectedYear(year), tabIndex: 0, children: [year, "\uB144"] }, year))) }), _jsx("div", { css: pickerColumn, ref: monthRef, children: months.map((month) => (_jsxs("div", { css: [
                                pickerItem,
                                month === selectedMonth && {
                                    fontWeight: "bold",
                                    color: "#ff084a",
                                },
                            ], onClick: () => setSelectedMonth(month), tabIndex: 0, children: [month, "\uC6D4"] }, month))) }), _jsx("div", { css: pickerColumn, ref: dayRef, children: days.map((day) => (_jsxs("div", { css: [
                                pickerItem,
                                day === selectedDay && { fontWeight: "bold", color: "#ff084a" },
                            ], onClick: () => setSelectedDay(day), tabIndex: 0, children: [day, "\uC77C"] }, day))) })] }), _jsx("div", { css: TextWrapper, style: { height: "20px" }, children: _jsx(Text.FocusedWarning, { "$isFocused": !isValid, style: {
                        visibility: isValid ? "hidden" : "visible",
                        color: "#ff084a",
                    }, children: "\uB9CC 14\uC138 \uC774\uC0C1\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }) })] }));
}
