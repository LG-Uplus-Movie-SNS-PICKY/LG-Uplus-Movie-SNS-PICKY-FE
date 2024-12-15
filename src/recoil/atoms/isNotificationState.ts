import { atom, selector } from "recoil";

// 알림 리스트 상태 전역 관리
export const notificationsState = atom({
  key: "notificationsState",
  default: [], // 알림의 상태는
});

// 읽지 않은 알림 수 상태 (selector로 계산)
export const unreadCountState = selector({
  key: "notificationsState",
  get: ({ get }) => {
    const notifications = get(notificationsState);
    return notifications.filter((notifications) => !notifications.isRead)
      .length;
  },
});
