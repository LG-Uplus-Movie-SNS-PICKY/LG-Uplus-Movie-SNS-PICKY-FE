import React, { useEffect, useRef, useState } from "react";
import styles from "./index.styles";
import { Notification, notificationDummyData } from "./constants";
import NotificationRander from "./components/notification-rander";
import SEO from "@components/seo";
import { useUnreadNotificationQuery } from "@hooks/notification/fetch";
import { useInView } from "react-intersection-observer";

interface GroupNotifications {
  today: Array<Notification>;
  last7days: Array<Notification>;
  last30days: Array<Notification>;
  older: Array<Notification>;
}

// DB에서 가져온 알림의 날짜를 '오늘', '7일', '30일', '이후' 별로 나누는 함수
function groupNotificationsByDate(
  notifications: Notification[]
): GroupNotifications {
  // console.log(notifications);

  // 오늘 날짜를 가져온다.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 일주일 전 날짜를 계산
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30일 전 날짜를 계산

  return notifications?.reduce(
    (days, notification) => {
      const createdAt = new Date(notification.createdAt);

      if (createdAt >= today) days.today.push(notification);
      else if (createdAt >= sevenDaysAgo) days.last7days.push(notification);
      else if (createdAt >= thirtyDaysAgo) days.last30days.push(notification);
      else days.older.push(notification);

      return days;
    },
    { today: [], last7days: [], last30days: [], older: [] }
  );

  // return notifications?.map((element) => {
  //   return element?.data?.content;

  //   // return element?.data?.content.redcue(
  //   //   (acc, notifictaion) => {
  //   //     const createdAt = new Date(notifictaion.createdAt);

  //   //     if (createdAt >= today) acc.today.push(notifictaion);
  //   //     else if (createdAt >= sevenDaysAgo) acc.last7days.push(notifictaion);
  //   //     else if (createdAt >= thirtyDaysAgo) acc.last30days.push(notifictaion);
  //   //     else acc.older.push(notifictaion);

  //   //     return acc;
  //   //   },
  //   //   { today: [], last7days: [], last30days: [], older: [] }
  //   // );
  // });

  // // 배열 객체 reduce 메서드를 활용하여 알림 데이터의 날짜를 계산한다.
  // return notifications?.data?.content.reduce(
  //   (acc, notifictaion) => {
  //     const createdAt = new Date(notifictaion.createdAt);

  //     if (createdAt >= today) acc.today.push(notifictaion);
  //     else if (createdAt >= sevenDaysAgo) acc.last7days.push(notifictaion);
  //     else if (createdAt >= thirtyDaysAgo) acc.last30days.push(notifictaion);
  //     else acc.older.push(notifictaion);

  //     return acc;
  //   },
  //   { today: [], last7days: [], last30days: [], older: [] }
  // );
}

function NotificationPage() {
  // // 더미데이터로 알림 데이터를 가져왔지만 이후 API로 수정

  // 리액트 쿼리를 통해 읽지 않은 알림 정보를 가져온다.
  const {
    data: notificaiton,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUnreadNotificationQuery();

  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  const groupedNotifications = groupNotificationsByDate(
    notificaiton?.pages
      .map((element) => element?.data?.content)
      .flatMap((element) => element)
  );
  console.log(groupedNotifications);

  // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // useEffect(() => {
  //   if (!isLoading) console.log(groupedNotifications);
  // }, [isLoading]);

  return (
    <>
      <SEO title="PICKY: NOTIFICATION" />

      {groupedNotifications.today.length > 0 && (
        <NotificationRander title="오늘" section={groupedNotifications.today} />
      )}

      {groupedNotifications.last7days.length > 0 && (
        <NotificationRander
          title="최근 7일"
          section={groupedNotifications.last7days}
        />
      )}
      {groupedNotifications.last30days.length > 0 && (
        <NotificationRander
          title="최근 30일"
          section={groupedNotifications.last30days}
        />
      )}
      {groupedNotifications.older.length > 0 && (
        <NotificationRander
          title="이전활동"
          section={groupedNotifications.older}
        />
      )}
    </>
  );
}

export default NotificationPage;
