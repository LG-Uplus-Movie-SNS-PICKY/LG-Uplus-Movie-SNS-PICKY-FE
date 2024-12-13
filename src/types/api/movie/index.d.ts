// Top 10 Movies Type 정의
export interface MovieDataTypes {
  [key: string]: unknown; // 명시적이지 않은 데이터의 타입은 인덱싱 타입을 사용한다.
  movieId: number;
  posterUrl: string;
  title: string;
  totalRating: number;
  likes: number;
}

// 추천 영화 데이터 타입 정의
export interface RecommendMovieDataTypes {
  [key: string]: unknown;
  movieId: number;
  genres: GenresMovieDataTypes[];
  platforms: PlatformDataTypes[];
  posterUrl: string;
  title: string;
  totalRating: number;
}

export interface GenresMovieDataTypes {
  genre_id: number;
  genre_name: string;
}

export interface PlatformDataTypes {
  platformId: number;
  platformName: string;
  platformUrl: string;
}
