import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import React from "react";

// 사용자 권한에 따른 페이지 접근 권환 관리
export function useAuthorizaion() {
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin); // 사용자 로그인 유무와 관리자 유무 값을 가져온다.

  return {
    accessGuestPage: !isLoginState, // 비로그인 사용자만 접근 가능한 페이지
    accessUserPage: isLoginState && !isAuthUser, // 로그인 사용자만 접근 가능한 페이지
    accessAdminPage: isAuthUser, // 관리자만 접근 가능한 페이지
  };
}

// 세션 데이터 동기화 Hook
export const useSyncLoginState = () => {
  const setLoginState = useSetRecoilState(isLogin);

  React.useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("authData") || "{}");
    if (sessionData) {
      setLoginState({
        isLoginState: !!sessionData.oAuth2Token?.access_token,
        isAuthUser: sessionData.isAuthUser,
        isLoginInfo: sessionData.user || {},
        isLoading: false,
      });
    }
  }, [setLoginState]);
};
