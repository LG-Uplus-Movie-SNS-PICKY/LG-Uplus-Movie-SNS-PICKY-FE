import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import DefaultImage from "@assets/icons/defaultImage.svg?react";
import { useState } from "react";
import { Toast } from "@stories/toast";
import defaultUserImage from "@assets/images/default_userImage.png";
import { fileInput, customFileLabel, imageContainer, defaultImageText, profileContainer, } from "./index.styles";
export default function InputProfile() {
    const { isFocused } = useFocus();
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [inputData, setInputData] = useRecoilState(inputState);
    const [toastMessage, setToastMessage] = useState(null);
    const showToastMessage = (message) => {
        setToastMessage(null);
        setTimeout(() => setToastMessage(message), 0);
        setTimeout(() => setToastMessage(null), 3000);
    };
    const handleProfileUpload = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        e.target.value = "";
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToastMessage("파일 크기는 5MB를 초과할 수 없습니다.");
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setUserInfo((prev) => (Object.assign(Object.assign({}, prev), { profileImage: imageUrl })));
            setInputData((prev) => (Object.assign(Object.assign({}, prev), { profileImage: imageUrl })));
            showToastMessage("이미지가 성공적으로 업로드되었습니다.");
            return () => URL.revokeObjectURL(imageUrl);
        }
    };
    const setDefaultImage = () => {
        if (userInfo.profileImage !== defaultUserImage) {
            setUserInfo((prev) => (Object.assign(Object.assign({}, prev), { profileImage: defaultUserImage })));
            setInputData((prev) => (Object.assign(Object.assign({}, prev), { profileImage: defaultUserImage })));
            showToastMessage("기본 이미지가 설정되었습니다.");
        }
        else {
            showToastMessage("이미 기본 이미지가 설정되어 있습니다.");
        }
    };
    return (_jsxs("div", { css: profileContainer, children: [_jsx(Text.TitleMenu300, { children: "\uB2F9\uC2E0\uC758 \uD504\uB85C\uD544\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694" }), _jsx(Text.FocusedMenu, { "$isFocused": isFocused, children: "\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0" }), toastMessage && _jsx(Toast, { message: toastMessage }), _jsx("div", { css: imageContainer, children: userInfo.profileImage ? (_jsx("img", { src: userInfo.profileImage, alt: "\uD504\uB85C\uD544 \uBBF8\uB9AC\uBCF4\uAE30", width: 240, height: 240 })) : (_jsx(DefaultImage, { width: "100%", height: "100%" })) }), _jsx("input", { type: "file", id: "profile-upload", accept: "image/*", onChange: handleProfileUpload, css: fileInput }), _jsx("label", { htmlFor: "profile-upload", css: customFileLabel, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), _jsx("span", { css: [
                    defaultImageText,
                    {
                        visibility: userInfo.profileImage === defaultUserImage ? "hidden" : "visible",
                    },
                ], onClick: setDefaultImage, children: "\uAE30\uBCF8 \uC774\uBBF8\uC9C0 \uC124\uC815" })] }));
}
