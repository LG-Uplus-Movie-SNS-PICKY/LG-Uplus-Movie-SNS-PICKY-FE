import { isLogin } from "@recoil/atoms/isLoginState";
import { notificationsState } from "@recoil/atoms/isNotificationState";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "@util/cookie";

function NotificationSSE() {
  const setNotifications = useSetRecoilState(notificationsState);
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = getCookie("user") || {};

      // 사용자가 로그인을 했을 경우에 SSE랑 연결을 시도한다.
      if (isLoginState && !isAuthUser) {
        // Header를 포함시켜야 하기 때문에 기존 EventSource가 아닌 EventSourcePolyfill 라이브러리를 사용한다.
        const eventSource = new EventSourcePolyfill(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/notification/connect`,
          {
            headers: {
              Authorization: `Bearer ${token.localJwtDto.accessToken}`,
            },
          }
        );

        eventSource.onmessage = (event) => {
          console.log("Received data:", event);
        };

        eventSource.onerror = (error) => {
          console.log("SSE Error:", error);
        };
      }
    };

    fetchNotifications();
  }, [isLoginState, setNotifications]);

  return null;
}

export default NotificationSSE;
