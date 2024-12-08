import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect } from "react";
import { UserNameContainer, TextWrapper, Warning } from "./index.styles";
export default function InputUserName() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [inputData, setInputData] = useRecoilState(inputState);
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const [isValid, setIsValid] = useState(true);
    const validateName = (name) => {
        return name.length >= 2 && name.length <= 10 && /^[^\d]+$/.test(name);
    };
    const handleUserNameChange = (e) => {
        let newData = e.target.value;
        if (newData.length > 10) {
            newData = newData.slice(0, 10);
        }
        const isValidName = validateName(newData);
        setIsValid(isValidName);
        const sanitizedData = newData.replace(/\d/g, "");
        setUserInfo((prev) => (Object.assign(Object.assign({}, prev), { username: sanitizedData })));
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { name: sanitizedData })));
    };
    useEffect(() => {
        if (userInfo.username && inputData.name === "") {
            setInputData((prev) => (Object.assign(Object.assign({}, prev), { name: userInfo.username })));
        }
    }, [userInfo.username, inputData.name, setInputData]);
    return (_jsx(_Fragment, { children: _jsxs("div", { css: UserNameContainer, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." }), _jsx("div", { css: TextWrapper, children: _jsx(Text.FocusedMenu, { "$isFocused": isFocused, children: "\uC774\uB984" }) }), _jsx(Input.InfoBox, { value: userInfo.username, placeholder: "\uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", onFocus: handleFocus, onBlur: handleBlur, onChange: handleUserNameChange }), _jsx("div", { css: TextWrapper, style: { height: "20px" }, children: _jsx("div", { css: Warning, style: { visibility: isValid ? "hidden" : "visible" }, children: "\uC774\uB984\uC740 \uCD5C\uC18C 2\uAE00\uC790 \uCD5C\uB300 10\uAE00\uC790 \uC785\uB2C8\uB2E4." }) })] }) }));
}
