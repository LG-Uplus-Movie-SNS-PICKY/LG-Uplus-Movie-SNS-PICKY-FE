import { atom } from "recoil";

// 로그인 상태 유무 정의
export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});
