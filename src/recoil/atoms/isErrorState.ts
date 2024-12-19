import { atom } from "recoil";

// 에러 상태 전역 관리
export const isErrorState = atom<string | null>({
  key: "errorState",
  default: null,
});
