export interface LikeMovieDataType {
  movieId: number;
  movieLikeId: number;
  moviePosterUrl: string;
  movieTitle: string;
  movieTotalRating: number;
}

// 좋아요 누른 영화 항목 데이터 타입
export interface QueryLikeMoviesDataTypes {
  success: boolean;
  code: number;
  message: string;
  data: {
    content: LikeMovieDataType[];
    pageable: any;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: any;
  };
}
