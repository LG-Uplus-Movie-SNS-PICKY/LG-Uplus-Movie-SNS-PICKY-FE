import { NavigateFunction } from "react-router-dom";

// SVG 파일 import
import { ReactNode } from "react";

// SVG Icons import
import AddCircle from "@assets/icons/add_circle_small.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";
import UesrLogo from "@assets/icons/user_circle.svg?react";

// Header Config 함수 타입 지정
type HeaderConfigFunction = (
  isLogin?: boolean,
  navigate?: NavigateFunction
) => HeaderConfigReturn;

// Header Config 반환값 지정
interface HeaderConfigReturn {
  type?: "basic" | "login" | "main" | "title";
  label?: string | undefined;
  buttons?: Array<ReactNode> | undefined;
}

// Header Config 타입 지정
interface HeaderConfigType {
  // 프로퍼티의 key는 문자열, value는 화살표 함수(HeaderConfigFunction)
  [path: string]: HeaderConfigFunction;
}

const headerConfig: HeaderConfigType = {
  "/": (isLogin) => ({
    // 메인페이지
    type: isLogin ? "main" : "login",
  }),

  // 회원가입 페이지
  "/signup": () => ({
    type: "basic",
  }),

  // 무비로그 페이지
  "/movie-log": () => ({
    type: "main",
  }),

  // 마이 페이지
  "/my-page": () => ({
    type: "main",
  }),

  // 알림 페이지
  "/notification": () => ({ type: "title", label: "알림" }),

  "/wishlist": () => ({ type: "main" }),

  // 추천 페이지
  "/recommend": () => ({ type: "main" }),
};

export function useHeaderConfig(
  path: string,
  isLogin: boolean,
  navigate: NavigateFunction
): HeaderConfigReturn {
  // 반환값으로 보낼 버튼 액션 정의
  const buttons = isLogin
    ? [
        <AddCircle
          className="active-icon-btn"
          onClick={() => navigate && navigate("/add-feed")}
        />,
        <Notification
          className="active-icon-btn"
          onClick={() => navigate && navigate("/notification")}
        />,
        <Search
          className="active-icon-btn"
          onClick={() => navigate && navigate("/search")}
        />,
      ]
    : [
        <div onClick={() => navigate && navigate("/login")}>
          <UesrLogo />
          <span>로그인</span>
        </div>,
      ];

  // 객체 타입 정의
  const config = headerConfig[path];

  // 객체 반환
  return config ? { ...config(isLogin), buttons } : { type: "basic" };
}
