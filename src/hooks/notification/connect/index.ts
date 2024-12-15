import { isLogin } from "@recoil/atoms/isLoginState";
import { notificationsState } from "@recoil/atoms/isNotificationState";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

function NotificationSSE() {
  const setNotifications = useSetRecoilState(notificationsState);
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);

  useEffect(() => {
    const fetchNotifications = async () => {
      // 사용자가 로그인을 했을 경우에 SSE랑 연결을 시도한다.

      if (isLoginState && !isAuthUser) {
        console.log("HEllo");

        // SSE 연결 시작
        const eventSource = new EventSource(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/notification/conntent`
        );
      }
    };

    fetchNotifications();
  }, [isLoginState, setNotifications]);

  return null;
}

export default NotificationSSE;
