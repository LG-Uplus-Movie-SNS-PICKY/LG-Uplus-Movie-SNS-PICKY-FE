import { NavigateFunction } from "react-router-dom";

// SVG 파일 import
import { ReactNode } from "react";

// SVG Icons import
import AddCircle from "@assets/icons/add_circle_small.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";
import UesrLogo from "@assets/icons/user_circle.svg?react";
import { removeCookie } from "@util/cookie";
import { Resetter, SetterOrUpdater } from "recoil";
import { LoginStateTypes } from "@recoil/atoms/isLoginState";

export type HeaderConfigReturn = Array<ReactNode> | undefined;

export function useHeaderConfig(
  isLoginState: boolean,
  isAuthUser: boolean,
  navigate: NavigateFunction,
  resetLoginState: Resetter,
  setLoginState: SetterOrUpdater<LoginStateTypes>
): HeaderConfigReturn {
  if (isLoginState) {
    if (isAuthUser) {
      return [
        <div
          onClick={() => {
            removeCookie("user");
            resetLoginState();

            setLoginState((prev) => ({
              ...prev,
              isLoading: false,
            }));

            navigate("/");
          }}
          className="admin_btn"
        >
          <span>로그아웃</span>
        </div>,
      ];
    }

    return [
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
    ];
  }

  // 객체 반환
  return [
    <div
      onClick={() => navigate && navigate("/auth/sign-in")}
      className="login-action-btn"
    >
      <UesrLogo />
      <span>로그인</span>
    </div>,
  ];
}
