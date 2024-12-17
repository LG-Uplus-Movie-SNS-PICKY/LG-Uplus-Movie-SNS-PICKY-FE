import apiClient from "@api";
import { getCookie } from "@util/cookie";
import { isEmpty } from "lodash";

// 사용자 로그인 시 알림 초기 데이터를 받는 GET API
export const fetchUnreadNotification = async (lastNotificationId: number) => {
  const user = getCookie("user") || {};

  const params = new URLSearchParams();

  // lastNotificationId가 Truthy 값일 경우 param을 추가한다.
  if (lastNotificationId) {
    params.append("lastNotificationId", lastNotificationId.toString());
  }

  // 요청을 보내고 읽지 않은 알림을 조회한다.
  const { data } = await apiClient.get(
    `/notification/notifications?${params.toString()}`
  );

  return data;
};

// 사용자 알림 읽음 처리 PATCH API
export const fetchReadNotification = async (notificationId: number) => {
  const { data } = await apiClient.patch(
    `notification/notifications/${notificationId}`
  );
  return data;
};
