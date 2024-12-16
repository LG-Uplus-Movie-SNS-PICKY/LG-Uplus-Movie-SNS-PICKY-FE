import React, { useEffect, useRef, useState } from "react";
import styles from "./index.styles";
import NotificationRander from "./components/notification-rander";
import SEO from "@components/seo";
import { useUnreadNotificationQuery } from "@hooks/notification/fetch";
import { useInView } from "react-intersection-observer";
import { GroupNotifications, NotificationTypes } from "@type/api/notification";

// DB에서 가져온 알림의 날짜를 '오늘', '7일', '30일', '이후' 별로 나누는 함수
function groupNotificationsByDate(
  notifications: NotificationTypes[]
): GroupNotifications {
  // 오늘 날짜를 가져온다.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 일주일 전 날짜를 계산
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30일 전 날짜를 계산

  return notifications.reduce<GroupNotifications>(
    (days, notification) => {
      if (notification.isRead) return days;

      const createdAt = new Date(notification.createdAt);

      if (createdAt >= today) days.today.push(notification);
      else if (createdAt >= sevenDaysAgo) days.last7days.push(notification);
      else if (createdAt >= thirtyDaysAgo) days.last30days.push(notification);
      else {
        days.older.push(notification);
      }

      return days;
    },
    {
      today: [],
      last7days: [],
      last30days: [],
      older: [],
    }
  );
}

function NotificationPage() {
  // 리액트 쿼리를 통해 읽지 않은 알림 정보를 가져온다.
  const {
    data: notificaitons,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUnreadNotificationQuery();

  // 날짜별로 그룹화된 알림 데이터를 저장할 상태 변수
  const [groupNotifications, setGroupNotifications] =
    useState<GroupNotifications>({
      today: [],
      last7days: [],
      last30days: [],
      older: [],
    });

  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // 리액트 쿼리를 통해 캐싱된 데이터의 상태 값이 변경을 감지했을 경우
  useEffect(() => {
    // 변경이 감지되고 데이터를 가지고 오기 위한 isLoading 상태값이 false가 될 경우
    if (!isLoading && notificaitons?.pages) {
      const allNotifications: NotificationTypes[] = notificaitons.pages
        ?.map((page) => page?.data?.content)
        ?.flat();

      // 상태 변수에 리액트 쿼리를 통해 얻어온 데이터를 날짜별로 그룹화 시킨 뒤 값을 저장한다.
      setGroupNotifications(groupNotificationsByDate(allNotifications));
    }
  }, [isLoading, notificaitons]);

  return (
    <>
      <SEO title="PICKY: NOTIFICATION" />

      <div style={{ flex: 1 }}>
        {groupNotifications.today.length > 0 && (
          <NotificationRander
            title="오늘"
            section={groupNotifications.today}
            setGroupNotifications={setGroupNotifications}
          />
        )}

        {groupNotifications.last7days.length > 0 && (
          <NotificationRander
            title="최근 7일"
            section={groupNotifications.last7days}
            setGroupNotifications={setGroupNotifications}
          />
        )}
        {groupNotifications.last30days.length > 0 && (
          <NotificationRander
            title="최근 30일"
            section={groupNotifications.last30days}
            setGroupNotifications={setGroupNotifications}
          />
        )}
        {groupNotifications.older.length > 0 && (
          <NotificationRander
            title="이전활동"
            section={groupNotifications.older}
            setGroupNotifications={setGroupNotifications}
          />
        )}

        <div ref={ref} style={{ height: "10px" }} />
      </div>
    </>
  );
}

export default NotificationPage;
