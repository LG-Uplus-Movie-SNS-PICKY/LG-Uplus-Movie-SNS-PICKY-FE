import { atom } from "recoil";

// 로그인 상태 유무 정의
export const isLogin = atom({
  key: "isLoginState",
  default: {
    isLoginState: false,
    isAuthUser: false,
    isLoginInfo: {},
  },
});
