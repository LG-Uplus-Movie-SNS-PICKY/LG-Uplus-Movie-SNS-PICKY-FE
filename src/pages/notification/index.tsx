import React, { useEffect, useRef, useState } from "react";
import styles from "./index.styles";
import { Notification, notificationDummyData } from "./constants";

interface GroupNotifications {
  today: Array<Notification>;
  last7days: Array<Notification>;
  last30days: Array<Notification>;
  older: Array<Notification>;
}

function groupNotificationsByDate(
  notifications: Notification[]
): GroupNotifications {
  // 오늘 날짜를 가져온다.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 일주일 전 날짜를 계산
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30일 전 날짜를 계산

  // 배열 객체 reduce 메서드를 활용하여 알림 데이터의 날짜를 계산한다.
  return notifications.reduce<GroupNotifications>(
    (acc, notification) => {
      const createdAt = new Date(notification.created_at);

      if (createdAt >= today) acc.today.push(notification);
      else if (createdAt >= sevenDaysAgo) acc.last7days.push(notification);
      else if (createdAt >= thirtyDaysAgo) acc.last30days.push(notification);
      else acc.older.push(notification);

      return acc;
    },
    { today: [], last7days: [], last30days: [], older: [] }
  );
}

const formatRelativeTime = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  ); // 초 단위 차이 계산
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일`;
  } else if (diffInDays < 30) {
    return `${diffInWeeks}주`;
  } else {
    return `${diffInWeeks}주`;
  }
};

function NotificationPage() {
  const groupedNotifications = groupNotificationsByDate(notificationDummyData);

  // 날짜별 섹션 컴포넌트 구성
  const renderNotifications = (title: string, section: Notification[]) => {
    return (
      <div css={styles.notificationContainer()}>
        <h2 className="title">{title}</h2>
        <ul>
          {section.map((notif, index) => (
            <li key={notif.id} css={styles.notificationCard()}>
              <div className="req-user">
                <div className="profile">
                  <img
                    src={notif.req_user_profile}
                    alt={`${notif.req_user_nickname}-profile`}
                  />
                </div>

                <p className="content">
                  <span className="bold">{notif.req_user_nickname}</span>님이{" "}
                  <span className="bold">
                    {notif.req_user_movie.movie_tile}
                  </span>
                  에 새로운 게시물을 등록했습니다.
                  <span className="date">
                    {formatRelativeTime(notif.created_at)}
                  </span>
                </p>
              </div>

              <div className="movie-log-thumbnail">
                <img
                  src={notif.req_user_movie_log.movie_image}
                  alt={`${notif.req_user_movie.movie_tile}-movie-log-${notif.req_user_movie_log.movie_log_id}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {groupedNotifications.today.length > 0 &&
        renderNotifications("오늘", groupedNotifications.today)}
      {groupedNotifications.last7days.length > 0 &&
        renderNotifications("최근 7일", groupedNotifications.last7days)}
      {groupedNotifications.last30days.length > 0 &&
        renderNotifications("최근 30일", groupedNotifications.last30days)}
      {groupedNotifications.older.length > 0 &&
        renderNotifications("이전활동", groupedNotifications.older)}
    </>
  );
}

export default NotificationPage;
