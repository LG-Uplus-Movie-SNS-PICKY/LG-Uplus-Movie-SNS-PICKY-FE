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
