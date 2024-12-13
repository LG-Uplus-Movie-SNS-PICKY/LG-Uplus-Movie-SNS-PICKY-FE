import { atom } from "recoil";

export interface LoginUserInfoTypes {
  [key: string]: unknown;
  name: string;
  nickname: string;
  profile_url: string;
  nationlity: string;
  birthdate: string;
  gender: string;
}

interface LoginStateTypes {
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
      name: "",
      nickname: "",
      profile_url: "",
      nationlity: "",
      birthdate: "",
      gender: "",
    },
    isLoading: true,
  },
});
