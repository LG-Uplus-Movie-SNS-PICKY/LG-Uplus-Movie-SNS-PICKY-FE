import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect } from "react";
import { Checked, Unchecked } from "@assets/svg";
import { consentWrapper, consentContainer, textWrapper, warning, customCheckbox, consentText, } from "./index.styles";
export default function InputConsentForm() {
    const [inputData, setInputData] = useRecoilState(inputState);
    const { handleFocus, handleBlur } = useFocus();
    const [isValid, setIsValid] = useState(true);
    const toggleConsentAll = () => {
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { consentAll: !prev.consentAll })));
    };
    const toggleConsentAge = () => {
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { consentAge: !prev.consentAge })));
    };
    // 유효성 검사 로직
    useEffect(() => {
        setIsValid(inputData.consentAll && inputData.consentAge);
    }, [inputData.consentAll, inputData.consentAge]);
    return (_jsxs("div", { css: consentWrapper, children: [_jsx(Text.TitleMenu300, { children: "\uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD574\uC8FC\uC138\uC694" }), _jsxs("div", { css: consentContainer(!!inputData.consentAll), onClick: toggleConsentAll, onFocus: handleFocus, onBlur: handleBlur, tabIndex: 0, children: [_jsx("div", { css: customCheckbox, children: inputData.consentAll ? _jsx(Checked, {}) : _jsx(Unchecked, {}) }), _jsxs("span", { css: consentText, children: ["[\uD544\uC218] ", _jsx("span", { children: "\uC778\uC99D \uC57D\uAD00 \uC804\uCCB4 \uB3D9\uC758" })] })] }), _jsxs("div", { css: consentContainer(!!inputData.consentAge), onClick: toggleConsentAge, onFocus: handleFocus, onBlur: handleBlur, tabIndex: 0, children: [_jsx("div", { css: customCheckbox, children: inputData.consentAge ? _jsx(Checked, {}) : _jsx(Unchecked, {}) }), _jsxs("span", { css: consentText, children: ["[\uD544\uC218] ", _jsx("span", { children: "\uB9CC 14\uC138 \uC774\uC0C1\uC785\uB2C8\uB2E4." })] })] }), _jsx("div", { css: textWrapper, style: { height: "20px" }, children: _jsx("div", { css: warning, style: { visibility: isValid ? "hidden" : "visible" }, children: "\uD544\uC218 \uC57D\uAD00\uC5D0 \uBAA8\uB450 \uB3D9\uC758 \uD574\uC8FC\uC138\uC694." }) })] }));
}
