import { isLogin } from "@recoil/atoms/isLoginState";
import { notificationsState } from "@recoil/atoms/isNotificationState";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "@util/cookie";
import { useQueryClient } from "@tanstack/react-query";

function NotificationSSE() {
  const queryClient = useQueryClient();

  const setNotifications = useSetRecoilState(notificationsState);
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    // 이미 프론트와 서버 간의 SSE가 연결되어 있다면 중복 연결을 방지한다.
    if (eventSourceRef.current) {
      return;
    }

    // 사용자가 로그인을 했을 경우에 SSE랑 연결을 시도한다.
    if (isLoginState && !isAuthUser) {
      // 1. 읽지 않은 알림은 무한 스크롤링을 지원하는 것이기 때문에 React Query를 통해 데이터를 캐싱하고 무한 스크롤링 기능을 구현한다.
      // 2. 프론트-서버 간의 SSE를 연결한다.
      const token = getCookie("user") || {};

      // Header를 포함시켜야 하기 때문에 기존 EventSource가 아닌 EventSourcePolyfill 라이브러리를 사용한다.
      const eventSource = new EventSourcePolyfill(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/notification/connect`,
        {
          headers: {
            Authorization: `Bearer ${token.localJwtDto.accessToken}`,
          },
        }
      );

      // 메세지 수신
      eventSource.onmessage = (event) => {
        console.log("Received data:", event);
        console.log(event.data);
        // 3. 실시간으로 데이터 올 시 해당 데이터를 상태 관리를 한다.
        // const data = JSON.parse(event.data);
        // console.log(data);
      };

      // 에러 처리
      eventSource.onerror = (error) => {
        console.log("SSE Error:", error);
      };

      // 컴포넌트 언마운트 시 SSE 연결 종료
      return () => {
        eventSource.close();
      };
    }
  }, [isLoginState]);

  return null;
}

export default NotificationSSE;
