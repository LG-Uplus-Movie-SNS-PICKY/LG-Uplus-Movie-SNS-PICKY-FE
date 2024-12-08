import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
import Logo from "@assets/icons/logo.svg?react";
import ArrowLeft from "@assets/icons/arrow_left.svg?react";
// Header 스토리 설정
export function Header({ type, label, activeBtn, }) {
    if (!type) {
        return null;
    }
    const isLogin = type !== "login";
    return (_jsxs("header", { css: styles.headerContainer(), children: [type === "title" ? (_jsxs("div", { css: styles.headerTitleBox(), children: [_jsx(ArrowLeft, {}), _jsx("span", { children: label })] })) : (_jsx(Logo, { className: "main-logo" })), _jsxs("div", { css: styles.headerActivesBtn(isLogin), children: [type === "login" && _jsx(_Fragment, { children: activeBtn && activeBtn[0] }), !["basic", "login"].includes(type) && (_jsx("div", { children: activeBtn &&
                            activeBtn.map((btn, idx) => _jsx("div", { children: btn }, idx)) }))] })] }));
}
