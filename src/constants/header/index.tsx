import { NavigateFunction } from "react-router-dom";

// SVG 파일 import
import { ReactNode } from "react";

// SVG Icons import
import AddCircle from "@assets/icons/add_circle_small.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";
import UesrLogo from "@assets/icons/user_circle.svg?react";

// Header Config 함수 타입 지정
// type HeaderConfigFunction = (
//   isLogin?: boolean,
//   navigate?: NavigateFunction
// ) => HeaderConfigReturn;

// Header Config 반환값 지정
// interface HeaderConfigReturn {
//   buttons?: Array<ReactNode> | undefined;
// }

export type HeaderConfigReturn = Array<ReactNode> | undefined;

/*

  To Do
  1. Title Type일 경우 -> 이전 정보 히스토리

*/

export function useHeaderConfig(
  isLogin: boolean,
  navigate: NavigateFunction
): HeaderConfigReturn {
  // 반환값으로 보낼 버튼 액션 정의
  const buttons = isLogin
    ? [
        <AddCircle
          className="active-icon-btn"
          onClick={() => navigate && navigate("/movie-log/add")}
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
        <div
          onClick={() => navigate && navigate("/auth/sign-in")}
          className="login-action-btn"
        >
          <UesrLogo />
          <span>로그인</span>
        </div>,
      ];

  // 객체 반환
  return buttons;
}
