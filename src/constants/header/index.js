import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// SVG Icons import
import AddCircle from "@assets/icons/add_circle_small.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";
import UesrLogo from "@assets/icons/user_circle.svg?react";
const headerConfig = {
    "/": (isLogin) => ({
        // 메인페이지
        type: isLogin ? "main" : "login",
    }),
    // 회원가입 페이지
    // "/signup": () => ({
    //   type: "basic",
    // }),
    // 무비로그 페이지
    "/movie-log": () => ({
        type: "main",
    }),
    // 마이 페이지
    "/my-page": () => ({
        type: "main",
    }),
    "/feed-list": () => ({
        type: "main",
    }),
    "/comment": () => ({
        type: "title",
    }),
    // 알림 페이지
    "/notification": () => ({ type: "title", label: "알림" }),
    "/wishlist": () => ({ type: "main" }),
    // 추천 페이지
    "/recommend": () => ({ type: "main" }),
    "/admin": () => ({ type: "basic" }),
};
/*

  To Do
  1. Title Type일 경우 -> 이전 정보 히스토리

*/
export function useHeaderConfig(path, isLogin, navigate) {
    // 반환값으로 보낼 버튼 액션 정의
    const buttons = isLogin
        ? [
            _jsx(AddCircle, { className: "active-icon-btn", onClick: () => navigate && navigate("/add-feed") }),
            _jsx(Notification, { className: "active-icon-btn", onClick: () => navigate && navigate("/notification") }),
            _jsx(Search, { className: "active-icon-btn", onClick: () => navigate && navigate("/search") }),
        ]
        : [
            _jsxs("div", { onClick: () => navigate && navigate("/login"), className: "login-action-btn", children: [_jsx(UesrLogo, {}), _jsx("span", { children: "\uB85C\uADF8\uC778" })] }),
        ];
    // 객체 타입 정의
    const config = headerConfig[path];
    // 객체 반환
    return config ? Object.assign(Object.assign({}, config(isLogin)), { buttons }) : {};
}
