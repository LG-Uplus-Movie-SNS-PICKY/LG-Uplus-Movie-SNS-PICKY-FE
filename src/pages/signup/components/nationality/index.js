import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { nationalityContainer, nationContainer, nationalityButton, textWrapper, } from "./index.styles";
// import { useEffect } from "react";
// import { NationContainer } from "./index.styles";˝
export default function InputNationality() {
    const [inputData, setInputData] = useRecoilState(inputState);
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const handleNationalitySelect = (nationality) => {
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { nationality })));
    };
    return (_jsxs("div", { css: nationContainer, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uAD6D\uC801\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx("div", { css: textWrapper, children: _jsx(Text.FocusedMenu, { "$isFocused": isFocused, children: "\uAD6D\uC801" }) }), _jsxs("div", { css: nationalityContainer, children: [_jsx("button", { css: nationalityButton(inputData.nationality === "domestic"), onClick: () => handleNationalitySelect("domestic"), onFocus: handleFocus, onBlur: handleBlur, children: "\uB0B4\uAD6D\uC778" }), _jsx("button", { css: nationalityButton(inputData.nationality === "foreigner"), onClick: () => handleNationalitySelect("foreigner"), onFocus: handleFocus, onBlur: handleBlur, children: "\uC678\uAD6D\uC778" })] })] }));
}
