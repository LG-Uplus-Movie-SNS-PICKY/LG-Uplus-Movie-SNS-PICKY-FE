import { atom } from "recoil";
// 사용자 정보 상태
export const userState = atom({
    key: "userState",
    default: {
        username: "",
        nickname: "",
        profileImage: "",
        favoriteGenres: [],
        favoriteMovie: [],
        // email: "",
        gender: "",
        nationality: "",
        kakao_id: "",
        google_id: "",
        naver_id: "",
    }
});
export const inputState = atom({
    key: "inputState",
    default: {
        name: "",
        // email: "",
        nickname: "",
        birthDate: "",
        gender: "",
        nationality: "",
        consentAll: false,
        consentAge: false,
        profileImage: "",
        favoriteGenres: [],
        favoriteMovie: [],
    },
});
