import { DashboardAPIResponse } from "../type/index.d";

// Test 용도 더미데이터 구성
export const RESPONSE_DATA: DashboardAPIResponse = {
  userData: {
    // 사용자 역할에 맞는 수
    user: {
      commonUserCount: 1938,
      criticUserCount: 215,
      adminUserCount: 17,
    },

    // 신고 접수 내용
    reportUser: {
      reportUserCompleteCount: 72,
      reportUserIncompleteCount: 272,
    },

    // 정지된 사용자 정보
    accountSuspendedUser: {
      totalAccountSuspendedUser: 74,
      objectionCount: 29, // 이의 신청 개수
      sustainedCount: 4, // 접수된 이의 신청 개수
    },
  },

  // Movie API Resoposne 응답 데이터 타입 저의
  movieData: {
    genreCount: 15,
    movieCount: 305,
    playlsitCount: 36,
  },

  // Review API Resoposne 응답 데이터 타입 저의
  reviewData: {
    reviewCount: 7213,
    reportReview: {
      reportReviewCompleteCount: 617,
      reportReviewIncompleteCount: 587,
    },
  },

  // Movie Log API Resoposne 응답 데이터 타입 저의
  movieLogData: {
    movieLogCount: 4621,
    reportMovieLog: {
      reportMovieLogCompleteCount: 192,
      reportMovieLogReviewCompleteCount: 2124,
      reportMovieLogAndReviewIncompleteCount: 78,
    },
  },
};
