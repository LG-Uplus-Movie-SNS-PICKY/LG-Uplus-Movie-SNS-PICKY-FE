import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import useFocus from "../../../../components/hooks/useFocus";
import { Text } from "../ui";
import { genderContainer, genderButton, genderWrapper, textWrapper, } from "./index.styles";
export default function InputGender() {
    const [inputData, setInputData] = useRecoilState(inputState);
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const handleGenderSelect = (gender) => {
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { gender })));
    };
    return (_jsxs("div", { css: genderWrapper, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uC131\uBCC4\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx("div", { css: textWrapper, children: _jsx(Text.FocusedMenu, { "$isFocused": isFocused, children: "\uC131\uBCC4" }) }), _jsxs("div", { css: genderContainer, children: [_jsx("button", { css: genderButton(inputData.gender === "male"), onClick: () => handleGenderSelect("male"), onFocus: handleFocus, onBlur: handleBlur, children: "\uB0A8\uC790" }), _jsx("button", { css: genderButton(inputData.gender === "female"), onClick: () => handleGenderSelect("female"), onFocus: handleFocus, onBlur: handleBlur, children: "\uC5EC\uC790" })] })] }));
}
