import { atom } from "recoil";

// 읽지 않은 알림 수
export const unreadCountState = atom<number>({
  key: "unreadCountState",
  default: 0, // 알림의 상태는 처음에는 빈 배열로 초기화 시킨다.
});
