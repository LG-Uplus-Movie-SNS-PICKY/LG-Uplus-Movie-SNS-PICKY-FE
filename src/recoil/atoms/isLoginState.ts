import { atom, selector } from "recoil";

export interface LoginUserInfoTypes {
  [key: string]: unknown;
  nickname: string;
  profile_url: string | null;
  gender: string;
}

export interface LoginStateTypes {
  isLoginState: boolean;
  isAuthUser: boolean;
  isLoginInfo: LoginUserInfoTypes;
  isLoading: boolean;
}

// 로그인 상태 유무 정의
export const isLogin = atom<LoginStateTypes>({
  key: "isLoginState",
  default: {
    isLoginState: false,
    isAuthUser: false,
    isLoginInfo: {
      nickname: "",
      profile_url: "",
      gender: "",
    },
    isLoading: true,
  },
});
