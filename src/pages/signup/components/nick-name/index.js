var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { userState, inputState } from "../../../../review/atoms";
import { Text, Input } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { nickNameContainer, textWrapper } from "./index.styles";
import { debounce } from "lodash";
export default function InputNickname({ onValidChange }) {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [inputData, setInputData] = useRecoilState(inputState);
    const { isFocused, handleFocus, handleBlur } = useFocus();
    const [nicknameError, setNicknameError] = useState(null);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const validateNickname = (nickname) => {
        return nickname.length >= 2 && nickname.length <= 15;
    };
    const checkNicknameAvailability = (nickname) => __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            console.log(accessToken);
            const response = yield axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/nickname-validation`, {
                params: {
                    nickname,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("API 응답:", response.data);
            if (!response.data.data.isValid) {
                setNicknameError("이미 사용 중인 닉네임입니다.");
                setIsNicknameValid(false);
            }
            else {
                setNicknameError("사용이 가능한 닉네임입니다.");
                setIsNicknameValid(true);
            }
        }
        catch (error) {
            console.error("API 요청 중 오류 발생:", error);
            setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
            setIsNicknameValid(false);
        }
    });
    const debouncedCheckNicknameAvailability = useCallback(debounce((nickname) => {
        if (validateNickname(nickname)) {
            checkNicknameAvailability(nickname);
        }
    }, 300), []);
    const handleNicknameChange = (e) => {
        let newData = e.target.value;
        if (newData.length > 15) {
            newData = newData.slice(0, 15);
        }
        if (!validateNickname(newData)) {
            setNicknameError("닉네임은 2자 이상 15자 이하로 입력해주세요.");
            setIsNicknameValid(false);
        }
        else {
            setNicknameError(null);
        }
        setUserInfo((prev) => (Object.assign(Object.assign({}, prev), { nickname: newData })));
        setInputData((prev) => (Object.assign(Object.assign({}, prev), { nickname: newData })));
        debouncedCheckNicknameAvailability(newData);
    };
    useEffect(() => {
        onValidChange(isNicknameValid);
    }, [isNicknameValid, onValidChange]);
    return (_jsx(_Fragment, { children: _jsxs("div", { css: nickNameContainer, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." }), _jsx("div", { css: textWrapper, children: _jsx(Text.FocusedMenu, { "$isFocused": isFocused, children: "\uB2C9\uB124\uC784" }) }), _jsx(Input.InfoBox, { value: userInfo.nickname || "", placeholder: "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", onFocus: handleFocus, onBlur: handleBlur, onChange: handleNicknameChange }), _jsx("div", { css: textWrapper, style: { height: "20px" }, children: _jsx(Text.FocusedWarning, { "$isFocused": isFocused, style: {
                            visibility: nicknameError ? "visible" : "hidden",
                        }, children: nicknameError || "" }) })] }) }));
}
