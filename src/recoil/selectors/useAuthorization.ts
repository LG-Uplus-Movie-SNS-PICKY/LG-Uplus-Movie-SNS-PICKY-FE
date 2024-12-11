import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";

// 사용자 권한에 따른 페이지 접근 권환 관리
function useAuthorizaion() {
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin); // 사용자 로그인 유무와 관리자 유무 값을 가져온다.

  return {
    accessCommonPage: (isLoginState || !isLoginState) && !isAuthUser, // 비로그인 또는 로그인 사용자가 공통으로 접근 가능한 페이지
    accessGuestPage: !isLoginState, // 비로그인 사용자만 접근 가능한 페이지
    accessUserPage: isLoginState && !isAuthUser, // 로그인 사용자만 접근 가능한 페이지
    accessAdminPage: isAuthUser, // 관리자만 접근 가능한 페이지
  };
}

export default useAuthorizaion;
