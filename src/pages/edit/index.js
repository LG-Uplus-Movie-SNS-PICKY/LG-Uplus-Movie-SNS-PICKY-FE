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
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { debounce } from "lodash";
import profileIcon from "@assets/icons/profile.svg";
import { containerStyle, headerStyle, headerTitleStyle, profileImageContainerStyle, profileImageStyle, labelStyle, photoEditStyle, inputRowStyle, inputWrapperStyle, inputLabelStyle, readonlyInputStyle, edityInputStyle, errorTextStyle, profileWrapper, saveButtonStyle, buttonWrapper, photoEditWrapper, } from "./index.styles";
import SEO from "@components/seo";
import { Toast } from "@stories/toast";
export default function ProfileEditPage() {
    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [nicknameError, setNicknameError] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [toastMessage, setToastMessage] = useState(null);
    const [isNicknameValid, setIsNicknameValid] = useState(null);
    const showToast = (message) => {
        setToastMessage(message);
    };
    const fetchUserData = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("인증 토큰이 없습니다. 다시 로그인 해주세요.");
            }
            const response = yield axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data;
            setNickname(data.nickname);
            setProfileImage(data.profile_url || null);
            setBirthDate(data.birthdate);
            setGender(data.gender === "MALE" ? "남자" : "여자");
            setNationality(data.nationality === "DOMESTIC" ? "내국인" : "외국인");
        }
        catch (error) {
            console.error("유저 데이터 조회 중 오류 발생:", error);
            showToast("유저 정보를 불러오는 데 실패했습니다.");
        }
    }), []);
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    const checkNicknameAvailability = useCallback((nickname) => __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = yield axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/nickname-validation`, {
                params: {
                    nickname,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.data.data.isValid) {
                setNicknameError("이미 사용 중인 닉네임입니다.");
                setIsNicknameValid(false);
            }
            else {
                setNicknameError(null);
                setIsNicknameValid(true);
            }
        }
        catch (error) {
            console.error("API 요청 중 오류 발생:", error);
            setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
            setIsNicknameValid(false);
        }
    }), []);
    const debouncedCheckNickname = useMemo(() => debounce((nickname) => {
        checkNicknameAvailability(nickname);
    }, 100), [checkNicknameAvailability]);
    useEffect(() => {
        return () => {
            debouncedCheckNickname.cancel();
        };
    }, [debouncedCheckNickname]);
    const handleNicknameChange = (e) => {
        const value = e.target.value;
        if (value.length > 10) {
            return;
        }
        setNickname(value);
        if (value.length < 2 || value.length > 10) {
            setNicknameError("닉네임은 2자 이상, 10자 이하로 입력해주세요.");
            setIsNicknameValid(false);
        }
        else if (/\s/.test(value)) {
            setNicknameError("닉네임에 공백은 포함될 수 없습니다.");
            setIsNicknameValid(false);
        }
        else {
            setNicknameError(null);
            setIsNicknameValid(null);
            debouncedCheckNickname(value);
        }
    };
    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                setImageError(null);
            };
            reader.readAsDataURL(file);
        }
    };
    const initialNickname = "";
    const initialProfileImage = null;
    const handleSave = () => {
        const isUnchanged = nickname === initialNickname && profileImage === initialProfileImage;
        if (isUnchanged) {
            showToast("변경 사항이 없습니다.");
            return;
        }
        if (nicknameError || imageError || isNicknameValid === false) {
            showToast("입력을 확인해주세요.");
            return;
        }
        showToast("프로필이 수정되었습니다.");
    };
    const handleDisabledClick = () => {
        if (!isSaveDisabled)
            return;
        const isUnchanged = nickname === initialNickname && profileImage === initialProfileImage;
        if (isUnchanged) {
            showToast("변경 사항이 없습니다.");
        }
        else if (nicknameError || imageError) {
            showToast("닉네임의 요구사항을 따라주세요.");
        }
    };
    return (_jsxs(_Fragment, { children: [toastMessage && _jsx(Toast, { message: toastMessage }), _jsx(SEO, { title: `${nickname}: 프로필 수정` }), _jsxs("div", { css: containerStyle, children: [_jsx("header", { css: headerStyle, children: _jsx("h1", { css: headerTitleStyle, children: "\uD504\uB85C\uD544 \uD3B8\uC9D1" }) }), _jsxs("div", { css: profileImageContainerStyle, children: [_jsxs("div", { css: profileWrapper, children: [_jsx("img", { src: profileImage || profileIcon, alt: "\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0", css: profileImageStyle }), _jsx("label", { htmlFor: "profileImageInput", css: photoEditWrapper, children: _jsx("p", { css: photoEditStyle, children: "\uC0AC\uC9C4\uC218\uC815" }) })] }), _jsx("input", { id: "profileImageInput", type: "file", accept: "image/*", style: { display: "none" }, onChange: handleImageUpload })] }), _jsxs("div", { css: profileWrapper, children: [_jsxs("div", { css: inputRowStyle, children: [_jsx("label", { css: inputLabelStyle, children: "\uB2C9\uB124\uC784" }), _jsxs("div", { css: inputWrapperStyle, children: [_jsx("input", { type: "text", value: nickname, onChange: handleNicknameChange, css: edityInputStyle, maxLength: 10 }), _jsx("span", { css: errorTextStyle, style: {
                                                    visibility: nicknameError ? "visible" : "hidden",
                                                }, children: nicknameError && nicknameError })] })] }), _jsxs("div", { css: inputRowStyle, children: [_jsx("label", { css: labelStyle, children: "\uC0DD\uB144\uC6D4\uC77C" }), _jsx("input", { type: "text", value: birthDate, readOnly: true, css: readonlyInputStyle })] }), _jsxs("div", { css: inputRowStyle, children: [_jsx("label", { css: labelStyle, children: "\uC131\uBCC4" }), _jsx("input", { type: "text", value: gender, readOnly: true, css: readonlyInputStyle })] }), _jsxs("div", { css: inputRowStyle, children: [_jsx("label", { css: labelStyle, children: "\uAD6D\uC801" }), _jsx("input", { type: "text", value: nationality, readOnly: true, css: readonlyInputStyle })] })] }), _jsx("div", { css: buttonWrapper, children: _jsx("button", { onClick: isSaveDisabled ? handleDisabledClick : handleSave, css: saveButtonStyle, style: {
                                backgroundColor: isSaveDisabled ? "#d9d9d9" : "#ff084a",
                                cursor: isSaveDisabled ? "not-allowed" : "pointer",
                            }, children: "\uC218\uC815\uD558\uAE30" }) })] })] }));
}
