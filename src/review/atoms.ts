import { atom } from "recoil";

// 사용자 정보 상태
export const userState = atom({
  key: "userState",
  default: {
    username: "",
    nickname: "",
    profile_picture: "",
    email: "",
    gender: "",
    nationality: "",
    kakao_id: "",
    google_id: "",
    naver_id: "",
  },
});

// 입력 데이터 상태
export interface IInputData {
  name: string;
  email: string;
  nickname: string;
  birthDate: string;
  gender: string | null;
  nationality: string | null;
  consentAll: boolean;
  consentAge: boolean;
}

export const inputState = atom<IInputData>({
  key: "inputState",
  default: {
    name: "",
    email: "",
    nickname: "",
    birthDate: "",
    gender: null,
    nationality: null,
    consentAll: false,
    consentAge: false,
  },
});