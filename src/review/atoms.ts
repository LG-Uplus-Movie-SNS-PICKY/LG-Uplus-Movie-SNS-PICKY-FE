import { atom } from "recoil";

// 사용자 정보 상태
export const userState = atom({
  key: "userState",
  default: {
    username: "",
    nickname: "",
    profileImagePreview: null as string | null,
    favoriteGenres: [],
    favoriteMovie: [],
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
  nickname: string;
  birthDate: string;
  gender: string;
  nationality: string;
  consentAll: boolean;
  consentAge: boolean;
  profileImageData: FormData | null;
  profileImagePreview: string | null; 
  favoriteGenres: number[];
  favoriteMovie: number[];
}

export const inputState = atom<IInputData>({
  key: "inputState",
  default: {
    name: "",
    nickname: "",
    birthDate: "",
    gender: "",
    nationality: "",
    consentAll: false,
    consentAge: false,
    profileImageData: null,
    profileImagePreview: null,
    favoriteGenres: [],
    favoriteMovie: [],
  },
});