interface MovieLogContentsType {
  contentUrl: string;
  boardContentType: "IMAGE" | "VIDEO";
}

export interface MovieLogDataType {
  boardId: number;
  writerId: number;
  writerNickname: string;
  writerProfileUrl: string;
  writerRole: string;
  context: string;
  isSpoiler: true;
  createdDate: string;
  updatedDate: string;
  likesCount: number;
  commentsCount: number;
  contents: MovieLogContentsType[];
  movieId: number;
  movieTitle: string;
  releaseDate: string;
  genres: [
    {
      id: number;
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
