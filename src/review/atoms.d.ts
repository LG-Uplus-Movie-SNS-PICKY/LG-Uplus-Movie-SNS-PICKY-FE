export declare const userState: import("recoil").RecoilState<{
    username: string;
    nickname: string;
    profileImage: string;
    favoriteGenres: never[];
    favoriteMovie: never[];
    gender: string;
    nationality: string;
    kakao_id: string;
    google_id: string;
    naver_id: string;
}>;
export interface IInputData {
    name: string;
    nickname: string;
    birthDate: string;
    gender: string;
    nationality: string;
    consentAll: boolean;
    consentAge: boolean;
    profileImage: string;
    favoriteGenres: number[];
    favoriteMovie: number[];
}
export declare const inputState: import("recoil").RecoilState<IInputData>;
