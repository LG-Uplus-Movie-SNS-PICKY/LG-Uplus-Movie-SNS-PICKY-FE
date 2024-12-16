// 알림 무한 스크롤 - 페이지 데이터 타입
export interface PageDataTypes {
  success: boolean;
  code: number;
  message: string;
  data: {
    content: NotificationTypes[];
    pageable: any;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: any;
  };
}

// 알림 무한 스크롤 데이터 타입
export interface UnreadNotificationsTypes {
  pageParams: { lastNotificationId: number }[];
  pages: PageDataTypes[];
}

// 알림 데이터 타입
export interface NotificationTypes {
  notificationId: number;
  boardId: number;
  movieId: number;
  movieTitle: string;
  moviePosterUrl: string;
  senderId: number;
  senderProfileUrl: string;
  senderNickname: string;
  createdAt: string;
  isRead: boolean;
}

// 날짜별 데이터 타입
export interface GroupNotifications {
  today: NotificationTypes[];
  last7days: NotificationTypes[];
  last30days: NotificationTypes[];
  older: NotificationTypes[];
}
