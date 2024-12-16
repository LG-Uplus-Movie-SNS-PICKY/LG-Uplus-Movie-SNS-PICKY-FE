import apiClient from "@api";

// 사용자 로그인 시 알림 초기 데이터를 받는 GET API
export const fetchUnReadNotification = async (lastNotificationId: number) => {
  const params = new URLSearchParams();

  // lastNotificationId가 Truthy 값일 경우 param을 추가한다.
  if (lastNotificationId) {
    params.append("lastNotificationId", lastNotificationId.toString());
  }

  // 요청을 보내고 읽지 않은 알림을 조회한다.
  const { data } = await apiClient.get(
    `/notification/notifications?lastNotificationId=${params.toString()}`
  );

  return data;
};
