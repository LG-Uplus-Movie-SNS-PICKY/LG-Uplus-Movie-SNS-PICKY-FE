// 서버에서 받아올 데이터 타입 구성
export interface DashboardAPIResponse {
  // User API Resoposne 응답 데이터 타입 저의
  userData: {
    // 사용자 역할에 맞는 수
    user: {
      commonUserCount: number;
      criticUserCount: number;
      adminUserCount: number;
    };

    // 신고 접수 내용
    reportUser: {
      reportUserCompleteCount: number;
      reportUserIncompleteCount: number;
    };

    // 정지된 사용자 정보
    accountSuspendedUser: {
      totalAccountSuspendedUser: number;
      objectionCount: number; // 이의 신청 개수
      sustainedCount: number; // 접수된 이의 신청 개수
    };
  };

  // Movie API Resoposne 응답 데이터 타입 저의
  movieData: {
    genreCount: number;
    movieCount: number;
    playlsitCount: number;
  };

  // Review API Resoposne 응답 데이터 타입 저의
  reviewData: {
    reviewCount: number;
    reportReview: {
      reportReviewCompleteCount: number;
      reportReviewIncompleteCount: number;
    };
  };

  // Movie Log API Resoposne 응답 데이터 타입 저의
  movieLogData: {
    movieLogCount: number;
    reportMovieLog: {
      reportMovieLogCompleteCount: number;
      reportMovieLogReviewCompleteCount: number;
      reportMovieLogAndReviewIncompleteCount: number;
    };
  };
}

// 컴포넌트에 필요한 데이터 타입 구성
export interface DashboardInfoSubItemTypes {
  subItemTitle: string;
  subItemTotalCount?: number;
}

export interface DashboardInfoItemTypes {
  itemIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  itemBgColor: string;
  itemTitle: string;
  itemTotalCount?: number;
  subItems?: Array<DashboardInfoSubItemTypes>;
}

export interface DashboardInfoListTypes {
  listTitle: string;
  listItem: DashboardInfoItemTypes[];
}
