export interface MovieLogData {
  boardId: number;
  contents: {
    contentUrl: string; // 영화 포스터 URL
    boardContentType: string;
  }[];
}

export interface MovieLogDataType {
  boardId: 0;
  writerId: 0;
  writerNickname: "string";
  writerProfileUrl: "string";
  writerRole: "string";
  context: "string";
  isSpoiler: true;
  createdDate: "2024-12-18T20:53:20.754Z";
  updatedDate: "2024-12-18T20:53:20.754Z";
  likesCount: 0;
  commentsCount: 0;
  contents: [
    {
      contentUrl: "string";
      boardContentType: "string";
    }
  ];
  movieId: 0;
  movieTitle: "string";
  releaseDate: "2024-12-18T20:53:20.754Z";
  genres: [
    {
      id: 0;
    }
  ];
  isLike: true;
  isAuthor: true;
}

// 좋아요 누른 영화 항목 데이터 타입
export interface QueryMovieLogsDataTypes {
  success: boolean;
  code: number;
  message: string;
  data: {
    content: MovieLogDataType[];
    pageable: any;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: any;
  };
}
