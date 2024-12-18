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
  name: string;
}

export interface PlatformDataTypes {
  platformId: number;
  platformName: string;
  platformUrl: string;
}

// 영화 상세 정보 타입 정의
export interface MovieDetailTypes {
  [key: string]: unknown;
  movie_info: MovieDetailMovieInfoTypes;
  movie_behind_videos: string[];
  trailer: string;
  ost: string;
  streaming_platform: Record<string, boolean>;
}

export interface MovieDetailMovieInfoTypes {
  [key: string]: unknown;
  id: number;
  title: string;
}
