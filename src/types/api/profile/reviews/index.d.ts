export interface LineReviewType {
  id: number;
  writerNickname: string;
  userId: number;
  rating: number;
  context: string;
  isSpoiler: boolean;
  likes: number;
  dislikes: number;
  createdAt: string;
  movie: {
    movieId: number;
    movieTitle: string;
    moviePosterUrl: string;
  };
  isAuthor: boolean;
}

// 좋아요 누른 영화 항목 데이터 타입
export interface QueryLineReviewTypes {
  success: boolean;
  code: number;
  message: string;
  data: {
    content: LineReviewType[];
    pageable: any;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: any;
  };
}

// 알림 무한 스크롤 데이터 타입
export interface ResponseLineReviewTypes {
  pageParams: { lastNotificationId: number }[];
  pages: QueryLineReviewTypes[];
}
